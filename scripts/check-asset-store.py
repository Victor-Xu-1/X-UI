"""Focused asset-store publication checks; no website or scientific tests."""
import hashlib
import importlib.util
import json
import os
from pathlib import Path
import subprocess
import sys
import tempfile
import unittest

sys.dont_write_bytecode = True
SCRIPT = Path(__file__).resolve().parents[1] / "ops" / "publish-assets.py"
SPEC = importlib.util.spec_from_file_location("asset_store", SCRIPT)
STORE = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(STORE)
OLD, NEW = "old-AAAAAAAA.js", "new-1234567890abcdef.css"


class AssetStoreChecks(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory(prefix="x-science-assets-check-")
        self.addCleanup(self.tmp.cleanup)
        self.site = Path(self.tmp.name) / "site"
        (self.site / "releases").mkdir(parents=True)
        (self.site / ".x-science-managed.json").write_text('{"schema":1,"role":"primary"}')
        self.shared = self.site / "shared"
        self.target = self.shared / "assets" / "build"

    def release(self, name="v1", files=None):
        release = self.site / "releases" / name
        (release / "assets" / "build").mkdir(parents=True)
        manifest = {"files": {}}
        for filename, data in (files or {OLD: b"old asset"}).items():
            (release / "assets" / "build" / filename).write_bytes(data)
            manifest["files"]["/assets/build/" + filename] = {
                "bytes": len(data), "sha256": hashlib.sha256(data).hexdigest()}
        (release / "asset-manifest.json").write_text(json.dumps(manifest))
        return release

    def change(self, release, mutate):
        path = release / "asset-manifest.json"
        data = json.loads(path.read_text())
        mutate(data)
        path.write_text(json.dumps(data))

    def test_cli_publish_repeat_and_retain_old(self):
        first = self.release()
        command = [sys.executable, "-B", str(SCRIPT), str(first), "--root", str(self.site)]
        result = subprocess.run(command, capture_output=True, text=True, check=True)
        self.assertEqual(["/assets/build/" + OLD], json.loads(result.stdout)["added"])
        self.assertEqual(["/assets/build/" + OLD], STORE.publish(first, self.site)["reused"])
        STORE.publish(self.release("v2", {NEW: b"new asset"}), self.site)
        self.assertEqual(b"old asset", (self.target / OLD).read_bytes())
        self.assertEqual(b"new asset", (self.target / NEW).read_bytes())
        self.assertEqual({OLD, NEW}, {p.name for p in self.target.iterdir()})

    def test_collision_fails_without_overwriting(self):
        STORE.publish(self.release(), self.site)
        release = self.release("v2", {OLD: b"conflicting bytes"})
        with self.assertRaisesRegex(ValueError, "digest/size mismatch|collision"):
            STORE.publish(release, self.site)
        self.assertEqual(b"old asset", (self.target / OLD).read_bytes())
        self.assertEqual([OLD], [p.name for p in self.target.iterdir()])

    def test_unsafe_manifest_names_are_rejected(self):
        release = self.release()
        record = next(iter(json.loads((release / "asset-manifest.json").read_text())["files"].values()))
        names = ["../escape-AAAAAAAA.js", "nested/asset-AAAAAAAA.js", r"nested\asset-AAAAAAAA.js",
                 ".hidden-AAAAAAAA.js", "bad-AAAAAAA.js", "bad-AAAAAAAAAAAAAAAAA.js",
                 "bad-AAAAAAAA.gif", "bad-AAAAAAAA.js?x=1", "bad..name-AAAAAAAA.js"]
        for name in names:
            with self.subTest(name=name):
                self.change(release, lambda m: m.update(files={"/assets/build/" + name: record}))
                with self.assertRaisesRegex(ValueError, "Unsafe"):
                    STORE.publish(release, self.site)
                self.assertFalse(self.shared.exists())

    def test_wrong_digest_size_and_metadata_create_nothing(self):
        release = self.release()
        for changes in ({"sha256": "0" * 64}, {"bytes": 999}, {"bytes": True},
                        {"bytes": -1}, {"sha256": "z" * 64}):
            with self.subTest(changes=changes):
                self.change(release, lambda m: m["files"].update({"/assets/build/" + OLD: {
                    "bytes": 9, "sha256": hashlib.sha256(b"old asset").hexdigest(), **changes}}))
                with self.assertRaises(ValueError):
                    STORE.publish(release, self.site)
                self.assertFalse(self.shared.exists())

    def test_unmanaged_or_wrongly_owned_shared_is_preserved(self):
        release = self.release()
        self.shared.mkdir()
        retained = self.shared / "user.txt"
        retained.write_text("keep")
        with self.assertRaisesRegex(ValueError, "not managed"):
            STORE.publish(release, self.site)
        self.assertEqual("keep", retained.read_text())
        marker = self.shared / STORE.OWNER
        self.assertFalse(marker.exists())
        marker.write_text('{"owner":"another application"}')
        with self.assertRaisesRegex(ValueError, "ownership"):
            STORE.publish(release, self.site)
        self.assertEqual("keep", retained.read_text())
        self.assertFalse(self.target.exists())

    def test_outside_nested_and_unmanaged_releases_are_rejected(self):
        release = self.release()
        for value in (Path(self.tmp.name), self.site / "releases", release / "assets"):
            with self.subTest(path=value), self.assertRaisesRegex(ValueError, "direct child"):
                STORE.publish(value, self.site)
        (self.site / ".x-science-managed.json").unlink()
        with self.assertRaises(OSError):
            STORE.publish(release, self.site)
        self.assertFalse(self.shared.exists())

    def test_duplicate_manifest_keys_are_rejected(self):
        release = self.release()
        (release / "asset-manifest.json").write_text('{"files":{},"files":{}}')
        with self.assertRaisesRegex(ValueError, "Duplicate"):
            STORE.publish(release, self.site)

    def test_source_release_and_destination_symlinks_are_rejected(self):
        release = self.release()
        source = release / "assets" / "build" / OLD
        retained = Path(self.tmp.name) / "retained"; retained.write_bytes(source.read_bytes())
        try:
            source.unlink(); source.symlink_to(retained)
        except OSError as error:
            self.skipTest("Symlink creation unavailable: " + str(error))
        with self.assertRaisesRegex(ValueError, "Symlink"):
            STORE.publish(release, self.site)
        source.unlink(); source.write_bytes(retained.read_bytes())
        linked = self.site / "releases" / "linked"; linked.symlink_to(release, target_is_directory=True)
        with self.assertRaisesRegex(ValueError, "Symlink"):
            STORE.publish(linked, self.site)
        STORE.publish(release, self.site)
        (self.target / OLD).unlink(); (self.target / OLD).symlink_to(retained)
        with self.assertRaisesRegex(ValueError, "Symlink"):
            STORE.publish(release, self.site)
        self.assertEqual(b"old asset", retained.read_bytes())

    @unittest.skipUnless(os.name == "posix", "POSIX permission contract")
    def test_primary_permissions_survive_restrictive_deployment_umask(self):
        release = self.release()
        previous = os.umask(0o077)
        try:
            STORE.publish(release, self.site)
        finally:
            os.umask(previous)
        for path in [self.site / "shared", self.site / "shared/assets", self.site / "shared/assets/build"]:
            self.assertEqual(path.stat().st_mode & 0o777, 0o755)
        self.assertEqual((self.site / "shared/assets/build" / OLD).stat().st_mode & 0o777, 0o644)

    @unittest.skipUnless(hasattr(os, "mkfifo"), "POSIX FIFO check")
    def test_special_source_is_rejected_without_blocking(self):
        release = self.release()
        source = release / "assets" / "build" / OLD
        source.unlink(); os.mkfifo(source)
        with self.assertRaisesRegex(ValueError, "regular file"):
            STORE.publish(release, self.site)


if __name__ == "__main__":
    unittest.main(verbosity=2)


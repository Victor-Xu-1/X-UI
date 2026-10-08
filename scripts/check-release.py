"""Focused checks for website archive staging and its filesystem boundary."""

import hashlib
import io
import json
from pathlib import Path
import sys
import tarfile
import tempfile
import unittest

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / 'ops'))
from archive import inspect_archive
from release import stage

MANIFEST = json.loads((ROOT / 'dist/_transfer/manifest.json').read_text())
ARCHIVE = ROOT / 'dist/_transfer' / MANIFEST['filename']
SHA = MANIFEST['sha256']


def fixture(path, members):
    with tarfile.open(path, 'w:gz') as output:
        for name, data, kind in members:
            item = tarfile.TarInfo(name)
            item.type = kind
            item.size = len(data) if kind == tarfile.REGTYPE else 0
            item.linkname = '/outside' if kind == tarfile.SYMTYPE else ''
            output.addfile(item, io.BytesIO(data) if item.isfile() else None)
    return hashlib.sha256(path.read_bytes()).hexdigest()


class ReleaseChecks(unittest.TestCase):
    def test_built_backup_contains_english_and_chinese_routes_and_original_logo(self):
        with tempfile.TemporaryDirectory() as tmp:
            receipt = stage(ARCHIVE, SHA, Path(tmp) / 'backup', 'backup')
            release = Path(receipt['release'])
            self.assertEqual(42, len(list(release.rglob('index.html'))))
            self.assertEqual(6, len(receipt['languages']))
            self.assertEqual('en', receipt['defaultLanguage'])
            self.assertIn('<html lang="en">', (release / 'index.html').read_text(encoding='utf-8'))
            self.assertIn('<html lang="zh-CN">', (release / 'zh/index.html').read_text(encoding='utf-8'))
            self.assertFalse((release / '_transfer').exists())
            self.assertEqual((ROOT / 'src/static/assets/logo.png').read_bytes(), (release / 'assets/logo.png').read_bytes())
            self.assertEqual(SHA, hashlib.sha256(Path(receipt['archive']).read_bytes()).hexdigest())
            self.assertEqual('staged; not yet activated', receipt['status'])

    def test_wrong_hash_creates_nothing(self):
        with tempfile.TemporaryDirectory() as tmp:
            target = Path(tmp) / 'target'
            with self.assertRaisesRegex(ValueError, 'SHA-256'):
                stage(ARCHIVE, '0' * 64, target, 'backup')
            self.assertFalse(target.exists())

    def test_unmanaged_directory_is_preserved(self):
        with tempfile.TemporaryDirectory() as tmp:
            target = Path(tmp) / 'existing'; target.mkdir()
            retained = target / 'user-file.txt'; retained.write_text('preserve me')
            with self.assertRaisesRegex(ValueError, 'not managed'):
                stage(ARCHIVE, SHA, target, 'primary')
            self.assertEqual('preserve me', retained.read_text())
            self.assertEqual([retained], list(target.iterdir()))

    def test_role_change_is_rejected(self):
        with tempfile.TemporaryDirectory() as tmp:
            target = Path(tmp) / 'backup'
            stage(ARCHIVE, SHA, target, 'backup')
            with self.assertRaisesRegex(ValueError, 'role'):
                stage(ARCHIVE, SHA, target, 'primary')
            self.assertEqual('backup', json.loads((target / '.x-science-managed.json').read_text())['role'])

    def test_unknown_parent_is_not_created(self):
        with tempfile.TemporaryDirectory() as tmp:
            target = Path(tmp) / 'unknown-parent' / 'site'
            with self.assertRaisesRegex(ValueError, 'parent directory must exist'):
                stage(ARCHIVE, SHA, target, 'primary')
            self.assertFalse(target.parent.exists())

    def test_unsafe_posix_windows_and_traversal_paths(self):
        with tempfile.TemporaryDirectory() as tmp:
            for name in ('../outside', '/outside', 'assets\\..\\outside', 'C:/outside', 'C:outside'):
                with self.subTest(path=name):
                    path = Path(tmp) / 'unsafe.tar.gz'
                    digest = fixture(path, [(name, b'x', tarfile.REGTYPE)])
                    with self.assertRaisesRegex(ValueError, 'Unsafe archive path'):
                        inspect_archive(path, digest)

    def test_links_and_special_files_are_rejected(self):
        with tempfile.TemporaryDirectory() as tmp:
            for kind in (tarfile.SYMTYPE, tarfile.LNKTYPE, tarfile.FIFOTYPE):
                with self.subTest(kind=kind):
                    path = Path(tmp) / 'special.tar.gz'
                    digest = fixture(path, [('assets/link', b'', kind)])
                    with self.assertRaisesRegex(ValueError, 'Links and special files'):
                        inspect_archive(path, digest)

    def test_missing_language_pages_are_rejected(self):
        with tempfile.TemporaryDirectory() as tmp:
            path = Path(tmp) / 'incomplete.tar.gz'
            metadata = (ROOT / 'dist/site-info.json').read_bytes()
            digest = fixture(path, [('site-info.json', metadata, tarfile.REGTYPE)])
            with self.assertRaisesRegex(ValueError, 'Incomplete multilingual release'):
                inspect_archive(path, digest)

    def test_duplicate_paths_are_rejected(self):
        with tempfile.TemporaryDirectory() as tmp:
            path = Path(tmp) / 'duplicate.tar.gz'
            metadata = json.dumps({'version':'1.1.0','defaultLanguage':'en','languages':['en'],'products':[],'pageCount':1}).encode()
            digest = fixture(path, [('site-info.json',metadata,tarfile.REGTYPE),('./index.html',b'a',tarfile.REGTYPE),('index.html',b'b',tarfile.REGTYPE)])
            with self.assertRaisesRegex(ValueError, 'Duplicate archive paths'):
                inspect_archive(path, digest)

    def test_new_release_requires_explicit_default_language(self):
        with tempfile.TemporaryDirectory() as tmp:
            path = Path(tmp) / 'missing-default.tar.gz'
            metadata = json.dumps({'version':'1.1.0','languages':['en'],'products':[],'pageCount':1}).encode()
            digest = fixture(path, [('site-info.json',metadata,tarfile.REGTYPE),('index.html',b'a',tarfile.REGTYPE)])
            with self.assertRaisesRegex(ValueError, 'default language'):
                inspect_archive(path, digest)

    def test_retained_initial_chinese_release_remains_valid(self):
        with tempfile.TemporaryDirectory() as tmp:
            path = Path(tmp) / 'legacy.tar.gz'
            metadata = json.dumps({'version':'1.0.1','languages':['zh','en'],'products':[],'pageCount':2}).encode()
            digest = fixture(path, [('site-info.json',metadata,tarfile.REGTYPE),('index.html',b'zh',tarfile.REGTYPE),('en/index.html',b'en',tarfile.REGTYPE)])
            _, parsed, actual = inspect_archive(path, digest)
            self.assertEqual('1.0.1', parsed['version'])
            self.assertEqual(digest, actual)


if __name__ == '__main__':
    unittest.main(verbosity=2)

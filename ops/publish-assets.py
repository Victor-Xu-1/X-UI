#!/usr/bin/env python3
"""Append verified release assets to the managed, immutable shared store."""
import argparse
import hashlib
import json
import os
from pathlib import Path
import re
import stat
import tempfile

OWNER = ".x-science-assets.json"
NAME = re.compile(r"[A-Za-z0-9][A-Za-z0-9._-]*[-.][A-Za-z0-9]{8,16}\.(?:js|css|woff2|png|webp|svg|pdb)")
SHA = re.compile(r"[0-9a-fA-F]{64}")

def safe_path(value):
    path = Path(value)
    if ".." in path.parts:
        raise ValueError("Traversal path is forbidden: " + str(path))
    path = path.absolute()
    for part in (path, *path.parents):
        if part.is_symlink() or getattr(part, "is_junction", lambda: False)():
            raise ValueError("Symlink path is forbidden: " + str(part))
    return path

def regular_bytes(path):
    path = safe_path(path)
    flags = os.O_RDONLY | getattr(os, "O_NOFOLLOW", 0) | getattr(os, "O_NONBLOCK", 0)
    descriptor = os.open(path, flags)
    with os.fdopen(descriptor, "rb") as stream:
        if not stat.S_ISREG(os.fstat(stream.fileno()).st_mode):
            raise ValueError("Expected regular file: " + str(path))
        return stream.read()

def unique_object(pairs):
    result = {}
    for key, value in pairs:
        if key in result:
            raise ValueError("Duplicate JSON key: " + key)
        result[key] = value
    return result

def read_json(path):
    return json.loads(regular_bytes(path), object_pairs_hook=unique_object)

def verified(path, info):
    if (not isinstance(info, dict) or not isinstance(info.get("sha256"), str)
            or not SHA.fullmatch(info["sha256"]) or type(info.get("bytes")) is not int
            or info["bytes"] < 0):
        raise ValueError("Invalid asset digest/size: " + str(path))
    data = regular_bytes(path)
    if len(data) != info["bytes"] or hashlib.sha256(data).hexdigest() != info["sha256"].lower():
        raise ValueError("Asset digest/size mismatch: " + str(path))
    return data


def append_file(path, data, mode):
    path = safe_path(path)
    info = {"bytes": len(data), "sha256": hashlib.sha256(data).hexdigest()}
    if path.exists():
        if verified(path, info) != data:
            raise ValueError("Existing asset collision: " + str(path))
        return False
    temporary = None
    try:
        with tempfile.NamedTemporaryFile(dir=path.parent, prefix=".publish-", delete=False) as stream:
            temporary = Path(stream.name)
            stream.write(data)
            stream.flush()
            os.fchmod(stream.fileno(), mode) if hasattr(os, "fchmod") else os.chmod(temporary, mode)
            os.fsync(stream.fileno())
        try:
            os.link(temporary, path, follow_symlinks=False)
        except FileExistsError:
            if verified(path, info) != data:
                raise ValueError("Existing asset collision: " + str(path))
            return False
        if os.name == "posix":
            descriptor = os.open(path.parent, os.O_RDONLY | os.O_DIRECTORY)
            try:
                os.fsync(descriptor)
            finally:
                os.close(descriptor)
        return True
    finally:
        if temporary is not None:
            temporary.unlink(missing_ok=True)


def asset_store(root, role):
    shared = safe_path(root / "shared")
    expected = {"schema": 1, "owner": "x-science-assets", "root": str(root), "role": role}
    mode = 0o700 if role == "backup" else 0o755
    shared.mkdir(mode=mode, exist_ok=True)
    marker = safe_path(shared / OWNER)
    if marker.exists():
        if read_json(marker) != expected:
            raise ValueError("Invalid shared ownership marker: " + str(marker))
    else:
        if any(shared.iterdir()):
            raise ValueError("Shared directory is not managed: " + str(shared))
        append_file(marker, (json.dumps(expected) + "\n").encode(), 0o600)
    shared.chmod(mode)  # Deployment jobs deliberately inherit a restrictive umask.
    target = shared
    for name in ("assets", "build"):
        target = safe_path(target / name)
        target.mkdir(mode=mode, exist_ok=True)
        target.chmod(mode)
    return target


def publish(release_path, root_path="/var/www/x-science"):
    root, release = safe_path(root_path), safe_path(release_path)
    managed = read_json(root / ".x-science-managed.json")
    if (not isinstance(managed, dict) or type(managed.get("schema")) is not int
            or managed["schema"] != 1 or managed.get("role") not in ("primary", "backup")):
        raise ValueError("Invalid deployment ownership marker")
    if release.parent != root / "releases" or not release.is_dir():
        raise ValueError("Release must be a real direct child of managed root/releases")
    manifest = read_json(release / "asset-manifest.json")
    files = manifest.get("files") if isinstance(manifest, dict) else None
    if not isinstance(files, dict) or not files:
        raise ValueError("Asset manifest requires a nonempty files mapping")
    assets = []
    for url, info in files.items():
        prefix = "/assets/build/"
        name = url[len(prefix):] if isinstance(url, str) and url.startswith(prefix) else ""
        if not NAME.fullmatch(name) or ".." in name:
            raise ValueError("Unsafe fingerprint asset URL: " + str(url))
        assets.append((url, name, verified(release / "assets" / "build" / name, info)))
    store = asset_store(root, managed["role"])
    receipt = {"release": str(release), "store": str(store), "added": [], "reused": []}
    for url, name, data in assets:
        added = append_file(store / name, data, 0o600 if managed["role"] == "backup" else 0o644)
        receipt["added" if added else "reused"].append(url)
    return receipt


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("release_path")
    parser.add_argument("--root", default="/var/www/x-science")
    args = parser.parse_args()
    try:
        print(json.dumps(publish(args.release_path, args.root), indent=2))
    except (OSError, ValueError) as error:
        parser.exit(1, "Asset publication failed: " + str(error) + "\n")


if __name__ == "__main__":
    main()


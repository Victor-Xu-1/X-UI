#!/usr/bin/env python3
"""Stage a verified static release. Web activation is a separate, explicit step."""

import argparse
from datetime import datetime, timezone
import json
from pathlib import Path
import re
import shutil
import uuid

from archive import inspect_archive, unpack


def stage(archive, expected_sha256, root, role):
    if role not in ("primary", "backup"):
        raise ValueError("Invalid deployment role")
    if not re.fullmatch(r"[0-9a-f]{64}", expected_sha256):
        raise ValueError("Expected SHA-256 must contain 64 lowercase hex digits")
    entries, metadata, digest = inspect_archive(archive, expected_sha256)
    version = metadata["version"]
    if not re.fullmatch(r"[0-9]+\.[0-9]+\.[0-9]+", version):
        raise ValueError("Invalid website version")
    root = Path(root).resolve()
    marker = root / ".x-science-managed.json"
    if root.exists() and any(root.iterdir()) and not marker.is_file():
        raise ValueError("Existing directory is not managed by X-Science: " + str(root))
    private = role == "backup"
    mode = 0o700 if private else 0o755
    if marker.exists():
        if json.loads(marker.read_text())["role"] != role:
            raise ValueError("Refusing to change the role of an existing deployment")
    root.mkdir(mode=mode, parents=True, exist_ok=True)
    root.chmod(mode)
    if not marker.exists():
        marker.write_text(json.dumps({"role": role, "schema": 1}) + "\n")
    releases = root / "releases"
    releases.mkdir(mode=mode, exist_ok=True)
    release = releases / (version + "-" + digest[:12])
    if release.exists():
        raise ValueError("Release already exists; inspect its receipt before reusing it")
    temporary = releases / ("staging-" + uuid.uuid4().hex)
    unpack(archive, temporary, entries, private)
    temporary.replace(release)
    archives = root / "archives"
    archives.mkdir(mode=mode, exist_ok=True)
    retained = archives / (release.name + ".tar.gz")
    shutil.copyfile(archive, retained)
    retained.chmod(0o600 if private else 0o644)
    receipt = {
        "version": version, "role": role, "sha256": digest,
        "release": str(release), "archive": str(retained),
        "languages": metadata["languages"], "pageCount": metadata["pageCount"],
        "stagedAt": datetime.now(timezone.utc).isoformat(),
        "status": "staged; not yet activated",
    }
    (root / (release.name + ".json")).write_text(json.dumps(receipt, indent=2) + "\n")
    return receipt


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--archive", required=True)
    parser.add_argument("--sha256", required=True)
    parser.add_argument("--root", required=True)
    parser.add_argument("--role", choices=("primary", "backup"), required=True)
    args = parser.parse_args()
    print(json.dumps(stage(args.archive, args.sha256, args.root, args.role), indent=2))


if __name__ == "__main__":
    main()

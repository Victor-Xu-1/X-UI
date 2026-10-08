"""Validate and unpack a public website archive without trusting tar paths."""

import hashlib
import json
from pathlib import Path, PurePosixPath, PureWindowsPath
import shutil
import tarfile

MAX_EXPANDED_BYTES = 64 * 1024 * 1024


def inspect_archive(archive, expected_sha256):
    archive = Path(archive)
    digest = hashlib.sha256(archive.read_bytes()).hexdigest()
    if digest != expected_sha256:
        raise ValueError("Archive SHA-256 does not match the release receipt")
    entries = []
    total = 0
    with tarfile.open(archive, "r:gz") as source:
        for member in source.getmembers():
            path = PurePosixPath(member.name)
            if path.is_absolute() or PureWindowsPath(member.name).drive or ".." in path.parts or "\\" in member.name:
                raise ValueError("Unsafe archive path: " + member.name)
            if not member.isdir() and not member.isfile():
                raise ValueError("Links and special files are not permitted")
            if not path.parts:
                continue
            if path.parts[0] == "_transfer":
                raise ValueError("A release must exclude its own transport files")
            total += member.size
            if total > MAX_EXPANDED_BYTES:
                raise ValueError("Expanded archive exceeds the release size limit")
            entries.append((member, path))
        files = {str(path): member for member, path in entries if member.isfile()}
        paths = set(files)
        if "site-info.json" not in paths:
            raise ValueError("Missing website release metadata")
        metadata = json.load(source.extractfile(files["site-info.json"]))
        root_language = metadata.get("defaultLanguage")
        if root_language is None and metadata.get("version") == "1.0.1":
            root_language = "zh"  # Explicit compatibility with the retained initial release.
        if root_language not in metadata["languages"]:
            raise ValueError("Missing or invalid default language")
        expected_pages = set()
        for language in metadata["languages"]:
            prefix = "" if language == root_language else language + "/"
            expected_pages.add(prefix + "index.html")
            for product in metadata["products"]:
                expected_pages.add(prefix + "products/" + product["id"] + "/index.html")
        if len(expected_pages) != metadata["pageCount"] or not expected_pages <= paths:
            raise ValueError("Incomplete multilingual release")
        if len(paths) != sum(member.isfile() for member, _ in entries):
            raise ValueError("Duplicate archive paths are not permitted")
    return entries, metadata, digest


def unpack(archive, destination, entries, private):
    destination = Path(destination)
    directory_mode, file_mode = (0o700, 0o600) if private else (0o755, 0o644)
    destination.mkdir(mode=directory_mode)
    destination.chmod(directory_mode)
    with tarfile.open(archive, "r:gz") as source:
        for member, path in entries:
            target = destination.joinpath(*path.parts)
            target.parent.mkdir(mode=directory_mode, parents=True, exist_ok=True)
            if member.isdir():
                target.mkdir(mode=directory_mode, exist_ok=True)
            else:
                with source.extractfile(member) as incoming, target.open("xb") as output:
                    shutil.copyfileobj(incoming, output)
                target.chmod(file_mode)
            target.parent.chmod(directory_mode)
    for directory in destination.rglob("*"):
        if directory.is_dir():
            directory.chmod(directory_mode)

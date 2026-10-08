"""Persist only the existing website rule; never reload the WireGuard firewall."""

from datetime import datetime, timezone
import os
from pathlib import Path
import re
import shutil
import subprocess

RULE = b'tcp dport { 80, 443 } ct state new accept comment "x-science-web"'


def append_web_rule(data):
    marker = b'comment "x-science-web"'
    if marker in data:
        if data.count(marker) != 1 or RULE not in data:
            raise ValueError('Conflicting existing X-Science firewall rule')
        return data
    matches = list(re.finditer(rb'(?m)^([ \t]*)udp dport 443 ct state new accept\n', data))
    if len(matches) != 1:
        raise ValueError('Expected exactly one existing WireGuard UDP443 rule')
    match = matches[0]
    before = data[:match.start()]
    if b'chain input {' not in before or b'chain forward {' in before:
        raise ValueError('WireGuard marker is not in the expected input chain')
    return data[:match.end()] + match.group(1) + RULE + b'\n' + data[match.end():]


def main():
    if os.geteuid() != 0:
        raise PermissionError('Run as root on the verified AlmaLinux primary')
    source = Path('/etc/nftables/wireguard.nft')
    configuration = Path('/etc/sysconfig/nftables.conf')
    state = Path('/var/lib/x-science')
    if source.is_symlink() or not source.is_file() or not state.is_dir():
        raise ValueError('Expected existing primary firewall and website state')
    if 'include "/etc/nftables/wireguard.nft"' not in configuration.read_text():
        raise ValueError('The existing nftables service does not use this ruleset')
    old = source.read_bytes()
    updated = append_web_rule(old)
    if updated == old:
        print('Website rule already persisted; no firewall reload performed')
        return
    candidate = source.with_name('wireguard.nft.x-science-next')
    if candidate.exists() or candidate.is_symlink():
        raise ValueError('A previous staged firewall update needs inspection')
    with candidate.open('xb') as output:
        output.write(updated)
    candidate.chmod(0o600)
    subprocess.run(['nft', '-c', '-f', str(candidate)], check=True)
    stamp = datetime.now(timezone.utc).strftime('%Y%m%dT%H%M%SZ')
    backup = state / ('nft-before-persist-' + stamp + '.nft')
    if backup.exists():
        raise ValueError('Firewall backup path already exists')
    shutil.copy2(source, backup)
    backup.chmod(0o600)
    os.replace(candidate, source)
    print('Persisted only the existing website TCP80/TCP443 rule')
    print('Original rules retained at ' + str(backup))
    print('No service restart or firewall reload performed')


if __name__ == '__main__':
    main()

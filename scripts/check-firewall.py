"""Focused additive-firewall checks; no live network operations are executed."""

import importlib.util
from pathlib import Path
import unittest

MODULE = Path(__file__).resolve().parents[1] / 'ops/persist-web-firewall.py'
SPEC = importlib.util.spec_from_file_location('web_firewall', MODULE)
FIREWALL = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(FIREWALL)
BEFORE = b'''table inet wireguard_filter {
    chain input {
        type filter hook input priority filter; policy drop;
        tcp dport 22 ct state new accept
        udp dport 443 ct state new accept
    }
    chain forward {
        iifname "wg0" oifname "eth0" accept
    }
}
table ip wireguard_nat { chain postrouting { masquerade } }
'''


class FirewallChecks(unittest.TestCase):
    def test_only_website_rule_is_added(self):
        after = FIREWALL.append_web_rule(BEFORE)
        self.assertEqual(BEFORE, after.replace(b'        ' + FIREWALL.RULE + b'\n', b''))
        self.assertIn(b'udp dport 443 ct state new accept', after)
        self.assertIn(b'tcp dport 22 ct state new accept', after)
        self.assertEqual(after, FIREWALL.append_web_rule(after))

    def test_missing_or_duplicate_wireguard_marker_is_rejected(self):
        for data in (BEFORE.replace(b'udp dport 443', b'udp dport 51820'), BEFORE + b'udp dport 443 ct state new accept\n'):
            with self.assertRaisesRegex(ValueError, 'exactly one'):
                FIREWALL.append_web_rule(data)

    def test_conflicting_website_rule_is_rejected(self):
        with self.assertRaisesRegex(ValueError, 'Conflicting'):
            FIREWALL.append_web_rule(BEFORE + b'tcp dport 22 accept comment "x-science-web"\n')

    def test_unexpected_chain_is_rejected(self):
        with self.assertRaisesRegex(ValueError, 'input chain'):
            FIREWALL.append_web_rule(BEFORE.replace(b'chain input {', b'chain forward {'))


if __name__ == '__main__':
    unittest.main(verbosity=2)

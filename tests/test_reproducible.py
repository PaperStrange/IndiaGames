"""Negative contracts for the complete build inventory, using disposable files."""
import hashlib
import json
import tempfile
import unittest
from pathlib import Path

from check_reproducible import OUTPUT_NAME, inventory


class InventoryContract(unittest.TestCase):
    def setUp(self):
        self.temporary = tempfile.TemporaryDirectory(prefix='bell-inventory-test-')
        self.addCleanup(self.temporary.cleanup)
        self.root = Path(self.temporary.name)
        self.output = self.root / OUTPUT_NAME
        self.output.write_bytes(b'portable game')
        self.catalog = self.root / 'locale-catalog.json'
        self.catalog.write_text(json.dumps({'schema_version':1,'game':'thirteenth-bell','default_locale':'en','locales':['en','ja','zh-Hans'],'units':[{'id':'thirteenth-bell','locales':['en','ja','zh-Hans']}]}))

    def test_complete_file_records_hash_and_size(self):
        self.assertEqual(inventory(self.root)[1:], [{'path': OUTPUT_NAME, 'bytes': 13,
                         'sha256': hashlib.sha256(b'portable game').hexdigest()}])

    def test_incomplete_locale_scope_fails(self):
        self.catalog.write_text('{}')
        with self.assertRaisesRegex(ValueError, 'Locale catalog'):
            inventory(self.root)

    def test_missing_catalog_fails(self):
        self.catalog.unlink()
        with self.assertRaisesRegex(ValueError, 'Expected only'):
            inventory(self.root)

    def test_missing_artifact_fails(self):
        self.output.unlink()
        with self.assertRaisesRegex(ValueError, 'Expected only'):
            inventory(self.root)

    def test_unlisted_hidden_file_fails(self):
        (self.root / '.accidental-copy').write_text('not part of the game')
        with self.assertRaisesRegex(ValueError, 'Expected only'):
            inventory(self.root)

    def test_empty_extra_directory_fails(self):
        (self.root / 'extra').mkdir()
        with self.assertRaisesRegex(ValueError, 'Expected only'):
            inventory(self.root)

    def test_symlink_fails(self):
        (self.root / 'alias.html').symlink_to(self.output)
        with self.assertRaisesRegex(ValueError, 'symbolic link'):
            inventory(self.root)



# Exporter checks share this hosted-CI entry point.
import importlib.util
import json
from pathlib import Path
import tempfile
import unittest

SPEC = importlib.util.spec_from_file_location('package_pilot', Path(__file__).resolve().parents[1] / 'scripts/package-pilot.py')
MODULE = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(MODULE)
CATALOG = {'schema_version': 1, 'game': 'thirteenth-bell', 'default_locale': 'en',
           'locales': ['en', 'ja', 'zh-Hans'],
           'units': [{'id': 'thirteenth-bell', 'locales': ['en', 'ja', 'zh-Hans']}]}

class CompleteExport(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory(prefix='bell-export-contract-')
        self.addCleanup(self.temp.cleanup)
        self.root = Path(self.temp.name)
        (self.root / 'thirteenth-bell-playable-demo.html').write_bytes(b'game')
        (self.root / 'locale-catalog.json').write_text(json.dumps(CATALOG))

    def test_complete_export_keeps_catalog_bytes_and_renames_entry(self):
        result = MODULE.read_build(self.root, True)
        self.assertEqual(set(result), {'index.html', 'locale-catalog.json'})
        self.assertEqual(result['index.html'], b'game')
        self.assertEqual(result['locale-catalog.json'], (self.root / 'locale-catalog.json').read_bytes())

    def test_missing_catalog_rejected_for_localized_source(self):
        (self.root / 'locale-catalog.json').unlink()
        with self.assertRaisesRegex(ValueError, 'Expected exactly'):
            MODULE.read_build(self.root, True)

    def test_wrong_locale_scope_rejected(self):
        (self.root / 'locale-catalog.json').write_text('{}')
        with self.assertRaisesRegex(ValueError, 'Locale catalog'):
            MODULE.read_build(self.root, True)

    def test_extra_file_rejected(self):
        (self.root / 'debug.log').write_text('not shipped')
        with self.assertRaisesRegex(ValueError, 'Expected exactly'):
            MODULE.read_build(self.root, True)

    def test_symlink_rejected(self):
        (self.root / 'link').symlink_to(self.root / 'locale-catalog.json')
        with self.assertRaisesRegex(ValueError, 'symbolic link'):
            MODULE.read_build(self.root, True)

    def test_pinned_historical_one_file_export_still_supported(self):
        (self.root / 'locale-catalog.json').unlink()
        self.assertEqual(MODULE.read_build(self.root, False), {'index.html': b'game'})


if __name__ == '__main__':
    unittest.main()

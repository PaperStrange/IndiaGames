"""Negative contracts for the complete build inventory, using disposable files."""
import hashlib
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

    def test_complete_file_records_hash_and_size(self):
        self.assertEqual(inventory(self.root), [{'path': OUTPUT_NAME, 'bytes': 13,
                         'sha256': hashlib.sha256(b'portable game').hexdigest()}])

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


if __name__ == '__main__':
    unittest.main()

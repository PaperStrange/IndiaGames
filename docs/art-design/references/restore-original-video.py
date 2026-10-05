import hashlib
import json
import sys
from pathlib import Path

reference_directory = Path(__file__).resolve().parent
parts_directory = reference_directory / 'original-video-parts'
manifest = json.loads((parts_directory / 'manifest.json').read_text())
output = Path(sys.argv[1]) if len(sys.argv) > 1 else reference_directory / manifest['filename']

# 写入前校验所有来源，保留已有输出文件。
for part in manifest['parts']:
    source = parts_directory / part['filename']
    if source.parent != parts_directory or not source.is_file():
        raise ValueError(f"Invalid part: {part['filename']}")
    with source.open('rb') as stream:
        digest = hashlib.file_digest(stream, 'sha256').hexdigest()
    if source.stat().st_size != part['bytes'] or digest != part['sha256']:
        raise ValueError(f"Checksum mismatch: {part['filename']}")

complete_hash = hashlib.sha256()
total_bytes = 0
with output.open('xb') as restored:
    for part in manifest['parts']:
        with (parts_directory / part['filename']).open('rb') as stream:
            while data := stream.read(1024 * 1024):
                restored.write(data)
                complete_hash.update(data)
                total_bytes += len(data)

if total_bytes != manifest['bytes'] or complete_hash.hexdigest() != manifest['sha256']:
    raise ValueError('Restored video checksum mismatch.')
print(f'Verified original video: {output} ({total_bytes} bytes)')

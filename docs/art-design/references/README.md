# Notebook video references

The playable review copy is `harry-potter-notebook-demo.mp4`, with its existing `.jpg` poster. It is the app's compressed derivative.

The full supplied video contains 58,230,571 bytes. Its complete original bytes are stored in `original-video-parts/`, with ordered filenames, byte counts, per-part SHA-256 and a full-file SHA-256 in `manifest.json`. Each part stays within the source remote's per-file limit.

From the project root, restore it using Python 3.11 or newer:

```bash
python3 docs/art-design/references/restore-original-video.py
```

The command writes `Harry_Potter.s_notebookDemo-original.mp4` beside this README. It verifies each part before writing and checks the complete result. It refuses to replace an existing file. An optional output path may be passed as the first argument.

The supplied video remains a project reference. The original attachment identity and provenance are retained in the part manifest. The filename alone does not establish that the recording comes from the feature film.

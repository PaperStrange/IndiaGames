import { writeFile } from "node:fs/promises";
import { catalog } from "../src/stories/catalog.js";
const stories = await Promise.all(
  catalog.map(async (entry) => {
    const { pack } = await entry.load();
    return {
      id: pack.manifest.id,
      revision: pack.manifest.revision,
      title: pack.manifest.title,
      release_profile: pack.manifest.releaseProfile,
    };
  }),
);
await writeFile(
  "dist/story-catalog.json",
  JSON.stringify(
    { schema_version: 1, game: "keepers-frame", stories },
    null,
    2,
  ) + "\n",
);

await writeFile('dist/locale-catalog.json', JSON.stringify({
  schema_version: 1,
  game: 'keepers-frame',
  default_locale: 'en',
  locales: ['en', 'ja', 'zh-Hans'],
  units: catalog.map(entry => ({ id: entry.id, locales: ['en', 'ja', 'zh-Hans'] })),
}, null, 2) + '\n');

import { createRequire } from "node:module";
import { readdir, mkdir, writeFile } from "node:fs/promises";
import { resolve, dirname, relative } from "node:path";
import { spawnSync } from "node:child_process";
const requireNext = createRequire(import.meta.resolve("next/package.json"));
const sharp = requireNext("sharp");
const project = resolve(import.meta.dirname, "..");
const sources = resolve(project, "public/artwork");
const output = resolve(project, "public/optimized/artwork");
async function optimize(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const source = resolve(directory, entry.name);
    if (entry.isDirectory()) {
      await optimize(source);
      continue;
    }
    if (!/\.(png|jpe?g)$/i.test(entry.name)) continue;
    const target = resolve(
      output,
      relative(sources, source).replace(/\.(png|jpe?g)$/i, ".webp"),
    );
    await mkdir(dirname(target), { recursive: true });
    await sharp(source)
      .resize({ width: 1200, withoutEnlargement: true })
      .webp({ quality: 90 })
      .toFile(target);
  }
}
await optimize(sources);
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "/fobia";
const publicUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://vhagakure.github.io/fobia/";
const result = spawnSync(
  process.execPath,
  ["node_modules/next/dist/bin/next", "build"],
  {
    cwd: project,
    stdio: "inherit",
    env: {
      ...process.env,
      STATIC_EXPORT: "1",
      NEXT_PUBLIC_BASE_PATH: basePath,
      NEXT_PUBLIC_SITE_URL: publicUrl,
      NEXT_PUBLIC_STATIC_IMAGES: "1",
    },
  },
);
if (result.error) throw result.error;
if (result.status !== 0) process.exit(result.status ?? 1);
await writeFile(resolve(project, "out/.nojekyll"), "");
console.log("Static Pages build: out/ — target URL:", publicUrl);

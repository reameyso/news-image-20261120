// news-image-20261120: copy the day's news image to /output/entry.png.
// The image (entry.png, 1024x1024) sums up Friday 20 November 2026 world
// news: the ICJ's Myanmar genocide ruling, the first Trump-Xi-Putin
// trilateral summit in Shenzhen, the Iran decision delayed to 2027,
// Cyclone Akvan, Voyager 1's light-day milestone and Europe's openness
// to Ukraine peace talks. No network, fully deterministic: the same
// bytes are written on every run.
import { copyFileSync, mkdirSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = dirname(fileURLToPath(import.meta.url));
const source = join(repoRoot, "entry.png");
const outDir = "/output";
const target = join(outDir, "entry.png");

mkdirSync(outDir, { recursive: true });
copyFileSync(source, target);

// Verify the copy is complete: same byte count as the source image.
const written = statSync(target).size;
const expected = statSync(source).size;
if (written !== expected) {
  throw new Error(`entry.png copy incomplete: ${written} of ${expected} bytes`);
}
console.log(`wrote ${target} (${written} bytes)`);

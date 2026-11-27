// Prepares a project's photographs for the web and the PDF.
//
//   node tools/project-images.mjs <slug>
//
// Reads the originals in assets/projects/<slug>/ and writes, for each one,
// public/projects/<slug>/<name>-1200.jpg and <name>-2400.jpg (never upscaled), plus
// public/projects/<slug>/manifest.json — each photo's true size, which is how every
// layout keeps its real aspect ratio.
//
// Colour: the pixels are converted to sRGB and tagged with an sRGB profile, so the
// photo looks the same in every browser and in the PDF. No grading, sharpening or
// cropping is applied. Orientation follows the camera's EXIF flag.
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const slug = process.argv[2];
if (!slug || !/^[a-z0-9-]+$/.test(slug)) {
  console.error("Usage: node tools/project-images.mjs <slug>");
  process.exit(1);
}

const root = path.resolve(import.meta.dirname, "..");
const src = path.join(root, "assets", "projects", slug);
const out = path.join(root, "public", "projects", slug);
const WIDTHS = [1200, 2400];
const QUALITY = 86;

if (!fs.existsSync(src)) {
  console.error(`No originals folder: ${path.relative(root, src)}`);
  process.exit(1);
}

const files = fs
  .readdirSync(src)
  .filter((f) => /\.(jpe?g|png|tiff?|webp)$/i.test(f))
  .sort();
if (!files.length) {
  console.error(`No photographs in ${path.relative(root, src)}`);
  process.exit(1);
}

fs.mkdirSync(out, { recursive: true });
// Clear old renditions so a removed original does not leave a file behind.
for (const f of fs.readdirSync(out)) fs.rmSync(path.join(out, f));

const manifest = {};
for (const file of files) {
  const base = path
    .parse(file)
    .name.toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  const sizes = {};
  let w = 0;
  let h = 0;
  for (const width of WIDTHS) {
    const name = `${base}-${width}.jpg`;
    const info = await sharp(path.join(src, file))
      .rotate()
      .resize({ width, withoutEnlargement: true })
      .withIccProfile("srgb")
      .jpeg({ quality: QUALITY, mozjpeg: true, chromaSubsampling: "4:4:4" })
      .toFile(path.join(out, name));
    // A small original yields the same size twice; keep the key honest.
    sizes[String(info.width)] = `/projects/${slug}/${name}`;
    if (info.width >= w) {
      w = info.width;
      h = info.height;
    }
  }
  manifest[file] = { w, h, sizes };
  console.log(`${file} → ${w}×${h}`);
}

fs.writeFileSync(path.join(out, "manifest.json"), JSON.stringify(manifest, null, 2) + "\n");
console.log(`\n${files.length} photographs → ${path.relative(root, out)}/manifest.json`);

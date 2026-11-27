// Exports a project's print documents from the built site.
//
//   npm run build
//   node tools/render-project.mjs <slug>
//
// Writes to exports/projects/<slug>/:
//   <slug>-case-study.pdf   A4 portrait, multi-page
//   <slug>-project-sheet.pdf  A4 editorial project sheet, one page
//   <slug>-project-sheet.jpg  the project sheet at 300 dpi (2481×3508), for Behance
//   <slug>-delivery-summary.pdf  PRIVATE client handover — only after `npm run build:client`
//
// It serves out/ itself, so fonts and photos load exactly as on the live site.
import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import { chromium } from "playwright";

const slug = process.argv[2];
if (!slug || !/^[a-z0-9-]+$/.test(slug)) {
  console.error("Usage: node tools/render-project.mjs <slug>");
  process.exit(1);
}

const root = path.resolve(import.meta.dirname, "..");
const site = path.join(root, "out");
const dest = path.join(root, "exports", "projects", slug);
if (!fs.existsSync(path.join(site, "projects", slug, "sheet.html"))) {
  console.error(`out/projects/${slug}/sheet.html not found — run \`npm run build\` first.`);
  process.exit(1);
}
fs.mkdirSync(dest, { recursive: true });

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css",
  ".js": "text/javascript",
  ".woff2": "font/woff2",
  ".jpg": "image/jpeg",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".json": "application/json",
  ".txt": "text/plain",
};
const server = http.createServer((req, res) => {
  const url = decodeURIComponent(new URL(req.url, "http://x").pathname);
  const candidates = [url, `${url}.html`, path.join(url, "index.html")];
  for (const c of candidates) {
    const file = path.join(site, path.normalize(c));
    if (file.startsWith(site) && fs.existsSync(file) && fs.statSync(file).isFile()) {
      res.writeHead(200, { "content-type": TYPES[path.extname(file)] ?? "application/octet-stream" });
      fs.createReadStream(file).pipe(res);
      return;
    }
  }
  res.writeHead(404).end();
});
await new Promise((r) => server.listen(0, "127.0.0.1", r));
const base = `http://127.0.0.1:${server.address().port}`;

// Without this, headless Chromium on Linux rounds each glyph to whole pixels and
// tracked caps come out unevenly spaced ("PHOT OGRAPH").
const browser = await chromium.launch({ args: ["--font-render-hinting=none"] });

async function open(route, scale = 1) {
  const ctx = await browser.newContext({ viewport: { width: 1000, height: 1400 }, deviceScaleFactor: scale });
  const page = await ctx.newPage();
  await page.goto(`${base}${route}`, { waitUntil: "networkidle" });
  await page.evaluate(async () => {
    await document.fonts.ready;
    await Promise.all(
      [...document.images].map((img) =>
        img.complete ? null : new Promise((r) => img.addEventListener("load", r, { once: true })),
      ),
    );
  });
  const broken = await page.evaluate(() => [...document.images].filter((i) => !i.naturalWidth).map((i) => i.src));
  if (broken.length) throw new Error(`Images failed to load on ${route}:\n${broken.join("\n")}`);
  return { ctx, page };
}

const pdf = (page, file) =>
  page.pdf({
    path: path.join(dest, file),
    format: "A4",
    printBackground: true,
    preferCSSPageSize: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
  });

{
  const { ctx, page } = await open(`/projects/${slug}/sheet`);
  await pdf(page, `${slug}-case-study.pdf`);
  const n = await page.locator(".sh-page").count();
  console.log(`${slug}-case-study.pdf — ${n} pages`);
  await ctx.close();
}
{
  const { ctx, page } = await open(`/projects/${slug}/project-sheet`);
  await pdf(page, `${slug}-project-sheet.pdf`);
  console.log(`${slug}-project-sheet.pdf`);
  await ctx.close();
}
{
  // 210 mm at 96 css px/in = 793.7 px; ×3.125 ≈ 2481 px = 300 dpi.
  const { ctx, page } = await open(`/projects/${slug}/project-sheet`, 3.125);
  // Pin the page to the top-left corner and clip to exactly A4, so no sliver of
  // the preview background lands on the image's edge.
  await page.addStyleTag({ content: ".sheet-doc{padding:0!important;align-items:flex-start!important}" });
  await page.screenshot({
    path: path.join(dest, `${slug}-project-sheet.jpg`),
    type: "jpeg",
    quality: 92,
    clip: { x: 0, y: 0, width: (210 / 25.4) * 96, height: (297 / 25.4) * 96 },
  });
  console.log(`${slug}-project-sheet.jpg`);
  await ctx.close();
}
// Private client document: present only in a CLIENT_DOCS=1 build.
if (fs.existsSync(path.join(site, "projects", slug, "delivery.html"))) {
  const { ctx, page } = await open(`/projects/${slug}/delivery`);
  await pdf(page, `${slug}-delivery-summary.pdf`);
  console.log(`${slug}-delivery-summary.pdf  (PRIVATE — for the client only)`);
  await ctx.close();
}

await browser.close();
server.close();
console.log(`\n→ ${path.relative(root, dest)}/`);

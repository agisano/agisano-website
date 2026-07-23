// Colour-contrast audit across every page, run against the real rendered DOM.
// Contrast bugs are invisible in source — a token that passes on ink fails on
// paper, and inherited opacity silently drags a passing colour under AA. This
// catches both. Reduced-motion state is irrelevant to contrast, so no scroll.
//
//   npm run build
//   (cd out && python3 -m http.server 4323 &)
//   node tools/a11y-contrast.mjs
//
// Exits non-zero if any page has a contrast violation.
import { chromium } from 'playwright';
import fs from 'fs';

const AXE = fs.readFileSync('./node_modules/axe-core/axe.min.js', 'utf8');
const BASE = process.env.BASE || 'http://localhost:4323';
const PAGES = [
  'index', 'about', 'observatory-girls', 'under-one-roof',
  'assessment', 'assessment-terms', 'privacy',
];

const b = await chromium.launch();
let failed = 0;
for (const pg of PAGES) {
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
  const p = await ctx.newPage();
  await p.goto(`${BASE}/${pg}.html`, { waitUntil: 'networkidle' });
  await p.addScriptTag({ content: AXE });
  const r = await p.evaluate(async () => window.axe.run({ runOnly: ['color-contrast'] }));
  const nodes = r.violations.flatMap((v) => v.nodes);
  console.log(`${pg}: ${nodes.length} contrast fail(s)`);
  for (const n of nodes.slice(0, 6)) {
    console.log('   ', (n.any?.[0]?.message || n.failureSummary || '').replace(/\s+/g, ' ').slice(0, 120));
  }
  failed += nodes.length;
  await ctx.close();
}
await b.close();
process.exit(failed ? 1 : 0);

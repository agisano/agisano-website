import fs from "node:fs";
import path from "node:path";
import type { Delivery } from "./types";

/**
 * Private delivery data: `private/projects/<slug>.delivery.json`, git-ignored.
 * Read with fs at build time — never imported — so the public build and the public repo
 * never contain it. Missing file = no delivery summary for that project.
 */
const DIR = path.join(process.cwd(), "private", "projects");

export function deliverySlugs(): string[] {
  if (!fs.existsSync(DIR)) return [];
  return fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith(".delivery.json"))
    .map((f) => f.replace(/\.delivery\.json$/, ""));
}

export function loadDelivery(slug: string): Delivery | undefined {
  const file = path.join(DIR, `${slug}.delivery.json`);
  if (!fs.existsSync(file)) return undefined;
  return JSON.parse(fs.readFileSync(file, "utf8")) as Delivery;
}

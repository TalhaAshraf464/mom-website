import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";

// Runs against the static GitHub Pages export in out/ (npm run build:pages).
const page = (path) => readFileSync(new URL(`../out/${path}`, import.meta.url), "utf8");

test("exports the homepage with GitHub Pages paths", () => {
  const html = page("index.html");
  assert.match(html, /<title>Sania Asif \| Clinical Psychologist<\/title>/i);
  assert.match(html, /Psychologist \| Addiction Recovery Specialist \| 18\+ Years of Clinical Experience/i);
  assert.match(html, /Online worldwide/i);
  assert.match(html, /href="tel:\+923002025956"/i);
  assert.match(html, /href="https:\/\/wa\.me\/923002025956"/i);
  assert.match(html, /instagram\.com\/opentalkcounselling/i);
  assert.match(html, /src="\/sania-asif-portrait\.jpeg"/);
  assert.match(html, /href="\/#contact"/);
  
});

test("keeps the blog hidden while no posts are published", () => {
  const html = page("index.html");
  assert.doesNotMatch(html, /From the blog/i);
  assert.doesNotMatch(html, /\/blog/);
  assert.doesNotMatch(html, /admin/i);
  assert.match(page("blog/index.html"), /Let’s find your way back/);
});

test("exports the testimonials page and a 404 page", () => {
  assert.match(page("testimonials/index.html"), /<title>Testimonials \| Sania Asif<\/title>/);
  for (const path of ["index.html", "testimonials/index.html"]) {
    const html = page(path);
    assert.match(html, /https:\/\/i\.ytimg\.com\/vi\/jazerxo0Vls\/hqdefault\.jpg/);
    assert.match(html, /https:\/\/i\.ytimg\.com\/vi\/ffaFkGtVALo\/hqdefault\.jpg/);
    assert.doesNotMatch(html, /hEHHrs-zUdE|cFPRjL5qYJ8/);
  }
  assert.ok(existsSync(new URL("../out/404.html", import.meta.url)));
});

import assert from "node:assert/strict";
import test from "node:test";

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${pathname}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the Sania Asif homepage", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Sania Asif \| Clinical Psychologist<\/title>/i);
  assert.match(html, /18 years of clinical experience/i);
  assert.match(html, /In-person in Karachi/i);
  assert.match(html, /Online worldwide/i);
  assert.match(html, /Scroll to watch/i);
  assert.match(html, /Watch &amp; learn/i);
  assert.match(html, /Stories from people who found a way forward/i);
  assert.match(html, /From the blog/i);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton/i);
});

test("renders the testimonials destination", async () => {
  const response = await render("/testimonials");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /Words shared in confidence/i);
  assert.match(html, /Written stories/i);
  assert.match(html, /Video stories/i);
});

test("renders the blog index and article system", async () => {
  const [indexResponse, articleResponse] = await Promise.all([
    render("/blog"),
    render("/blog/addiction-and-recovery"),
  ]);

  assert.equal(indexResponse.status, 200);
  assert.equal(articleResponse.status, 200);
  assert.match(await indexResponse.text(), /Understanding what you are going through/i);
  const articleHtml = await articleResponse.text();
  assert.match(articleHtml, /Understanding the path from addiction to recovery/i);
  assert.match(articleHtml, /In this article/i);
});

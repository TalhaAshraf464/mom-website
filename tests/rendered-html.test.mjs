import assert from "node:assert/strict";
import { before, after, test } from "node:test";
import { spawn } from "node:child_process";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { setTimeout as delay } from "node:timers/promises";

const origin = "http://localhost:3097";
let server,
  state,
  output = "";
let cookie = "";

before(async () => {
  state = await mkdtemp(join(tmpdir(), "sania-blog-test-"));
  server = spawn(
    process.execPath,
    [
      "node_modules/wrangler/bin/wrangler.js",
      "dev",
      "--config",
      "dist/server/wrangler.json",
      "--port",
      "3097",
      "--local",
      "--persist-to",
      state,
    ],
    {
      env: { ...process.env, WRANGLER_SEND_METRICS: "false", BROWSER: "none" },
      stdio: ["ignore", "pipe", "pipe"],
    },
  );
  server.stdout.on("data", (data) => {
    output += data;
  });
  server.stderr.on("data", (data) => {
    output += data;
  });
  for (let attempt = 0; attempt < 100; attempt++) {
    try {
      if ((await fetch(`${origin}/api/admin/session`)).ok) return;
    } catch {}
    await delay(250);
  }
  throw new Error(`Test server failed to start:\n${output}`);
});

after(async () => {
  if (server && server.exitCode === null) {
    const exited = new Promise((resolve) => server.once("exit", resolve));
    server.kill("SIGTERM");
    await Promise.race([exited, delay(3000)]);
  }
  if (state) await rm(state, { recursive: true, force: true });
});

async function request(
  path,
  { method = "GET", body, signedIn = false, requestOrigin = origin } = {},
) {
  return fetch(origin + path, {
    method,
    headers: {
      "Content-Type": "application/json",
      Origin: requestOrigin,
      ...(signedIn ? { Cookie: cookie } : {}),
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });
}

test("public pages, admin authentication, and complete publishing lifecycle", async (t) => {
  await t.test(
    "homepage has no dummy content or blog entry points before publication",
    async () => {
      const response = await request("/");
      assert.equal(response.status, 200);
      const html = await response.text();
      assert.match(html, /Sania Asif/);
      assert.match(html, /Online worldwide/);
      assert.match(html, /href="tel:\+923002025956"/);
      assert.match(html, /href="https:\/\/wa.me\/923002025956"/);
      assert.match(html, /https:\/\/www.instagram.com\/opentalkcounselling\//);
      assert.doesNotMatch(
        html,
        /href="\/blog|id="blog"|placeholder article|Approved testimonial/,
      );
      assert.equal((await request("/blog")).status, 404);
      assert.equal((await request("/blog/addiction-and-recovery")).status, 404);
      assert.equal((await request("/testimonials")).status, 200);
      const admin = await request("/admin");
      assert.equal(admin.status, 200);
      assert.match(await admin.text(), /noindex/);
    },
  );

  await t.test(
    "anonymous writes and cross-origin setup are blocked",
    async () => {
      assert.equal((await request("/api/admin/posts")).status, 401);
      assert.equal(
        (
          await request("/api/admin/posts", {
            method: "POST",
            body: { title: "Intruder" },
          })
        ).status,
        401,
      );
      assert.equal(
        (await request("/api/admin/posts?id=anything", { method: "DELETE" }))
          .status,
        401,
      );
      assert.equal(
        (
          await request("/api/admin/session", {
            method: "POST",
            requestOrigin: "https://other.example",
            body: {},
          })
        ).status,
        403,
      );
    },
  );

  const credentials = {
    action: "setup",
    email: "test@example.com",
    password: "Test-only passphrase 734!",
  };
  await t.test(
    "one-time setup creates a persistent authenticated session",
    async () => {
      const response = await request("/api/admin/session", {
        method: "POST",
        body: credentials,
      });
      assert.equal(response.status, 200, await response.clone().text());
      const header = response.headers.get("set-cookie");
      assert.match(header, /HttpOnly/);
      assert.match(header, /SameSite=Strict/);
      cookie = header.split(";")[0];
      assert.equal(
        (await request("/api/admin/posts", { signedIn: true })).status,
        200,
      );
      assert.equal(
        (await (await request("/api/admin/session")).json()).needsSetup,
        false,
      );
      const wrong = await request("/api/admin/session", {
        method: "POST",
        body: { ...credentials, password: "An incorrect password" },
      });
      assert.equal(wrong.status, 401);
    },
  );

  let post;
  await t.test(
    "saved drafts stay private, including direct article URLs",
    async () => {
      const response = await request("/api/admin/posts", {
        method: "POST",
        signedIn: true,
        body: {
          title: "Test article",
          category: "Wellbeing",
          excerpt: "An integration test summary.",
          content:
            "## A test heading\n\nA **thoughtful** paragraph.\n\n- First item\n- Second item\n\n<script>alert('unsafe')</script>",
          status: "draft",
        },
      });
      assert.equal(response.status, 200);
      post = (await response.json()).post;
      assert.equal(post.slug, "test-article");
      assert.equal((await request(`/blog/${post.slug}`)).status, 404);
      assert.doesNotMatch(await (await request("/")).text(), /href="\/blog/);
      const duplicate = await request("/api/admin/posts", {
        method: "POST",
        signedIn: true,
        body: { ...post, id: undefined },
      });
      assert.equal(duplicate.status, 409);
    },
  );

  await t.test(
    "publication reveals blog navigation, index, and safely formatted article",
    async () => {
      const response = await request("/api/admin/posts", {
        method: "POST",
        signedIn: true,
        body: { ...post, status: "published" },
      });
      assert.equal(response.status, 200);
      post = (await response.json()).post;
      assert.ok(post.publishedAt);
      const homepage = await (await request("/")).text();
      assert.match(homepage, /href="\/blog"/);
      assert.match(homepage, /id="blog"/);
      assert.equal((await request("/blog")).status, 200);
      const article = await request(`/blog/${post.slug}`);
      assert.equal(article.status, 200);
      const html = await article.text();
      assert.match(html, /<h2>A test heading<\/h2>/);
      assert.match(html, /<strong>thoughtful<\/strong>/);
      assert.doesNotMatch(html, /<script>alert/);
      assert.match(html, /&lt;script&gt;/);
      assert.equal(
        (
          await request("/api/admin/posts", {
            method: "POST",
            signedIn: true,
            requestOrigin: "https://other.example",
            body: post,
          })
        ).status,
        401,
      );
    },
  );

  await t.test(
    "unpublishing the last article hides the blog again",
    async () => {
      assert.equal(
        (
          await request("/api/admin/posts", {
            method: "POST",
            signedIn: true,
            body: { ...post, status: "draft" },
          })
        ).status,
        200,
      );
      assert.equal((await request("/blog")).status, 404);
      assert.equal((await request(`/blog/${post.slug}`)).status, 404);
      assert.doesNotMatch(await (await request("/")).text(), /href="\/blog/);
      assert.equal(
        (
          await request(`/api/admin/posts?id=${post.id}`, {
            method: "DELETE",
            signedIn: true,
          })
        ).status,
        200,
      );
      assert.deepEqual(
        (await (await request("/api/admin/posts", { signedIn: true })).json())
          .posts,
        [],
      );
    },
  );

  await t.test(
    "logout revokes the session, and login works with the saved account",
    async () => {
      assert.equal(
        (
          await request("/api/admin/session", {
            method: "DELETE",
            signedIn: true,
          })
        ).status,
        200,
      );
      assert.equal(
        (await request("/api/admin/posts", { signedIn: true })).status,
        401,
      );
      assert.equal(
        (
          await request("/api/admin/session", {
            method: "POST",
            body: { ...credentials, action: "login" },
          })
        ).status,
        200,
      );
    },
  );
});

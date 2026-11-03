"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { BlogPost } from "@/lib/blog";
import { ArticleContent } from "../components/ArticleContent";

type Draft = Pick<
  BlogPost,
  "title" | "slug" | "category" | "excerpt" | "content" | "status"
> & { id?: string };
const blank: Draft = {
  title: "",
  slug: "",
  category: "Wellbeing",
  excerpt: "",
  content: "",
  status: "draft",
};

async function api(path: string, options?: RequestInit) {
  const response = await fetch(`/api/admin/${path}`, {
    ...options,
    headers: { "Content-Type": "application/json" },
    cache: "no-store",
  });
  const data = (await response.json()) as {
    error?: string;
    needsSetup: boolean;
    posts: BlogPost[];
    post: BlogPost;
  };
  if (!response.ok)
    throw new Error(data.error || "Something went wrong. Please try again.");
  return data;
}

export function AdminWorkspace() {
  const [stage, setStage] = useState<"loading" | "setup" | "login" | "studio">(
    "loading",
  );
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [draft, setDraft] = useState<Draft | null>(null);
  const [dirty, setDirty] = useState(false);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [preview, setPreview] = useState(false);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const bodyRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    Promise.all([
      api("session"),
      fetch("/api/admin/posts", { cache: "no-store" }),
    ])
      .then(async ([session, response]) => {
        if (response.ok) {
          setPosts(((await response.json()) as { posts: BlogPost[] }).posts);
          setStage("studio");
        } else setStage(session.needsSetup ? "setup" : "login");
      })
      .catch(() => {
        setError("Unable to connect. Please refresh the page.");
        setStage("login");
      });
  }, []);

  useEffect(() => {
    const warn = (event: BeforeUnloadEvent) => {
      if (dirty) event.preventDefault();
    };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  function edit(next: Partial<Draft>) {
    setDraft((current) => (current ? { ...current, ...next } : null));
    setDirty(true);
    setMessage("");
  }

  function open(post: Draft | null) {
    if (
      dirty &&
      !window.confirm(
        "Discard your unsaved changes? Choose Cancel to keep writing.",
      )
    )
      return;
    setDraft(post);
    setDirty(false);
    setPreview(false);
    setMessage("");
    setError("");
  }

  async function signIn(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError("");
    const form = new FormData(event.currentTarget);
    try {
      await api("session", {
        method: "POST",
        body: JSON.stringify({
          email: form.get("email"),
          password: form.get("password"),
          setupToken: form.get("setupToken"),
          action: stage,
        }),
      });
      setPosts((await api("posts")).posts);
      setStage("studio");
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setBusy(false);
    }
  }

  async function save(status: Draft["status"]) {
    if (!draft) return;
    if (
      status === "published" &&
      draft.status !== "published" &&
      !window.confirm(
        "Publish this article? It will be visible to everyone, and the blog will appear on your website.",
      )
    )
      return;
    setBusy(true);
    setError("");
    setMessage("");
    try {
      const { post } = await api("posts", {
        method: "POST",
        body: JSON.stringify({ ...draft, status }),
      });
      setDraft(post);
      setDirty(false);
      setPosts((current) => [
        post,
        ...current.filter((item) => item.id !== post.id),
      ]);
      setMessage(
        status === "published"
          ? "Published. Your article is now live on the website."
          : "Draft saved. Only you can see this article.",
      );
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setBusy(false);
    }
  }

  function insert(before: string, after = "") {
    const textarea = bodyRef.current;
    if (!textarea || !draft) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    edit({
      content:
        draft.content.slice(0, start) +
        before +
        (draft.content.slice(start, end) || "Your text") +
        after +
        draft.content.slice(end),
    });
    requestAnimationFrame(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + before.length,
        start + before.length + (end - start || 9),
      );
    });
  }

  const published = posts.filter((post) => post.status === "published").length;
  const visiblePosts = posts.filter(
    (post) =>
      (filter === "all" || post.status === filter) &&
      `${post.title} ${post.category}`
        .toLowerCase()
        .includes(query.toLowerCase()),
  );

  return (
    <main className="admin-shell">
      <header className="studio-header">
        <Link
          className="brand"
          href="/"
          onClick={(event) => {
            if (dirty && !window.confirm("Leave without saving your changes?"))
              event.preventDefault();
          }}
        >
          <span className="brand-mark">SA</span>
          <span className="brand-copy">
            <strong>Sania Asif</strong>
            <small>Writing studio</small>
          </span>
        </Link>
        <div className="studio-header-actions">
          <a href="/" target="_blank" rel="noreferrer">
            View website ↗
          </a>
          {stage === "studio" && (
            <button
              disabled={busy}
              onClick={async () => {
                if (
                  dirty &&
                  !window.confirm("Sign out without saving your changes?")
                )
                  return;
                setBusy(true);
                setError("");
                try {
                  await api("session", { method: "DELETE" });
                  setStage("login");
                  setDraft(null);
                  setPosts([]);
                  setDirty(false);
                } catch (error) {
                  setError((error as Error).message);
                } finally {
                  setBusy(false);
                }
              }}
            >
              Sign out
            </button>
          )}
        </div>
      </header>

      {stage === "loading" ? (
        <p className="studio-loading" role="status">
          Opening your writing space…
        </p>
      ) : stage !== "studio" ? (
        <section className="login-layout">
          <div className="login-intro">
            <p className="eyebrow">A little space for your ideas</p>
            <h1>
              Thoughtful words.
              <br />
              <em>Meaningful impact.</em>
            </h1>
            <p>
              Share your knowledge, one article at a time. A simple, private
              space to write, refine, and publish when you feel ready.
            </p>
            <span className="login-flower" aria-hidden="true">
              ✳
            </span>
          </div>
          <form className="login-card" onSubmit={signIn}>
            <span className="studio-label">PRIVATE ADMIN ACCESS</span>
            <h2>
              {stage === "setup" ? "Make yourself at home." : "Welcome back."}
            </h2>
            <p>
              {stage === "setup"
                ? "Create your administrator account. This is a one-time step; only one account can be created."
                : "Sign in to manage your articles."}
            </p>
            <label>
              Email address
              <input
                name="email"
                type="email"
                autoComplete="username"
                required
                maxLength={254}
                placeholder="you@example.com"
              />
            </label>
            <label>
              Password
              <input
                name="password"
                type="password"
                autoComplete={
                  stage === "setup" ? "new-password" : "current-password"
                }
                minLength={stage === "setup" ? 12 : undefined}
                maxLength={256}
                required
                placeholder={
                  stage === "setup" ? "At least 12 characters" : "Your password"
                }
              />
            </label>
            {stage === "setup" && (
              <label>
                Setup key{" "}
                <span className="field-hint">Not required on localhost</span>
                <input name="setupToken" type="password" autoComplete="off" />
              </label>
            )}
            {error && (
              <p className="form-error" role="alert">
                {error}
              </p>
            )}
            <button className="button button-primary" disabled={busy}>
              {busy
                ? "One moment…"
                : stage === "setup"
                  ? "Create my account →"
                  : "Open writing studio →"}
            </button>
            <p className="login-footnote">
              Drafts stay private. Your blog appears on the website only when
              you publish.
            </p>
          </form>
        </section>
      ) : (
        <div className="studio-main">
          {!draft ? (
            <>
              <div className="studio-title">
                <div>
                  <p className="eyebrow">Your writing space</p>
                  <h1>Words that make a difference.</h1>
                  <p>
                    A place for your insights, reflections, and practical
                    guidance.
                  </p>
                </div>
                <button
                  className="button button-primary"
                  onClick={() => open({ ...blank })}
                >
                  + Write an article
                </button>
              </div>
              <div className="studio-stats">
                <div>
                  <strong>{posts.length}</strong>
                  <span>Total articles</span>
                </div>
                <div>
                  <strong>{published}</strong>
                  <span>Published</span>
                </div>
                <div>
                  <strong>{posts.length - published}</strong>
                  <span>Private drafts</span>
                </div>
                <p>
                  <span
                    className={`status-dot ${published ? "" : "status-muted"}`}
                  />
                  {published
                    ? "Your blog is visible on the website."
                    : "Your blog is hidden until your first article is published."}
                </p>
              </div>
              <div className="studio-filters">
                <div role="group" aria-label="Filter articles">
                  {["all", "draft", "published"].map((value) => (
                    <button
                      className={filter === value ? "selected" : ""}
                      onClick={() => setFilter(value)}
                      key={value}
                    >
                      {value === "all"
                        ? "All articles"
                        : value === "draft"
                          ? "Drafts"
                          : "Published"}
                    </button>
                  ))}
                </div>
                <input
                  aria-label="Search articles"
                  placeholder="Search your articles…"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                />
              </div>
              {visiblePosts.length ? (
                <div className="post-list">
                  {visiblePosts.map((post) => (
                    <button
                      className="post-row"
                      key={post.id}
                      onClick={() => open(post)}
                    >
                      <span className="post-icon" aria-hidden="true">
                        ✎
                      </span>
                      <span className="post-row-copy">
                        <span className="blog-category">{post.category}</span>
                        <strong>{post.title}</strong>
                        <small>
                          Edited{" "}
                          {new Date(post.updatedAt).toLocaleDateString(
                            "en-GB",
                            { day: "numeric", month: "short", year: "numeric" },
                          )}
                        </small>
                      </span>
                      <span className={`post-status ${post.status}`}>
                        {post.status === "published" ? "Published" : "Draft"}
                      </span>
                      <span aria-hidden="true">↗</span>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="studio-empty">
                  <span aria-hidden="true">✎</span>
                  <h2>
                    {posts.length
                      ? "No articles found."
                      : "Your next chapter starts here."}
                  </h2>
                  <p>
                    {posts.length
                      ? "Try another search or filter."
                      : "You don’t need to have it all figured out. Start with an idea, save it as a draft, and come back when inspiration strikes."}
                  </p>
                  {!posts.length && (
                    <button
                      className="button button-primary"
                      onClick={() => open({ ...blank })}
                    >
                      Write your first article →
                    </button>
                  )}
                </div>
              )}
            </>
          ) : (
            <>
              <div className="editor-top">
                <button
                  className="text-link"
                  disabled={busy}
                  onClick={() => open(null)}
                >
                  ← All articles
                </button>
                <span className="save-status">
                  {dirty
                    ? "Unsaved changes"
                    : draft.id
                      ? "All changes saved"
                      : "New article"}
                </span>
                <div className="editor-actions">
                  <button
                    className="button button-secondary"
                    disabled={busy}
                    onClick={() => setPreview(!preview)}
                  >
                    {preview ? "Back to writing" : "Preview"}
                  </button>
                  <button
                    className="button button-secondary"
                    disabled={busy}
                    onClick={() => save(draft.status)}
                  >
                    {busy
                      ? "Saving…"
                      : draft.status === "published"
                        ? "Save changes"
                        : "Save draft"}
                  </button>
                  {draft.status === "draft" && (
                    <button
                      className="button button-primary"
                      disabled={busy}
                      onClick={() => save("published")}
                    >
                      Publish article ↗
                    </button>
                  )}
                </div>
              </div>
              {message && (
                <p className="form-success" role="status">
                  {message}
                  {draft.status === "published" && (
                    <>
                      {" "}
                      <a
                        href={`/blog/${draft.slug}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        View article ↗
                      </a>
                    </>
                  )}
                </p>
              )}
              {error && (
                <p className="form-error" role="alert">
                  {error}
                </p>
              )}
              {preview ? (
                <article className="editor-preview">
                  <p className="eyebrow">Private preview · {draft.category}</p>
                  <h1>{draft.title || "Your article title"}</h1>
                  <p className="article-excerpt">{draft.excerpt}</p>
                  <div className="article-meta">By Sania Asif</div>
                  <ArticleContent
                    content={draft.content || "Your words will appear here."}
                  />
                </article>
              ) : (
                <div className="editor-grid">
                  <section className="editor-writing">
                    <label className="sr-only" htmlFor="article-title">
                      Article title
                    </label>
                    <input
                      id="article-title"
                      className="title-input"
                      placeholder="Give your thoughts a title…"
                      maxLength={160}
                      value={draft.title}
                      onChange={(event) => edit({ title: event.target.value })}
                    />
                    <div
                      className="writing-toolbar"
                      role="group"
                      aria-label="Text formatting"
                    >
                      <button onClick={() => insert("\n\n## ", "\n\n")}>
                        Heading
                      </button>
                      <button onClick={() => insert("**", "**")}>
                        <b>Bold</b>
                      </button>
                      <button onClick={() => insert("*", "*")}>
                        <i>Italic</i>
                      </button>
                      <button onClick={() => insert("\n\n- ", "\n\n")}>
                        • List
                      </button>
                      <button onClick={() => insert("\n\n> ", "\n\n")}>
                        “ Quote
                      </button>
                    </div>
                    <label className="sr-only" htmlFor="article-body">
                      Article content
                    </label>
                    <textarea
                      id="article-body"
                      ref={bodyRef}
                      className="body-input"
                      placeholder="Start writing here. Share an insight, offer a little clarity, or explore a topic that matters to you…"
                      value={draft.content}
                      onChange={(event) =>
                        edit({ content: event.target.value })
                      }
                      maxLength={100000}
                    />
                    <div className="editor-word-count">
                      {draft.content.trim()
                        ? draft.content.trim().split(/\s+/).length
                        : 0}{" "}
                      words · Separate paragraphs with a blank line
                    </div>
                  </section>
                  <aside className="editor-settings">
                    <h2>Article details</h2>
                    <p>
                      The finishing touches that help readers find your words.
                    </p>
                    <label>
                      Topic
                      <input
                        value={draft.category}
                        maxLength={80}
                        onChange={(event) =>
                          edit({ category: event.target.value })
                        }
                        list="topics"
                      />
                      <datalist id="topics">
                        {[
                          "Wellbeing",
                          "Anxiety",
                          "Depression",
                          "Addiction & recovery",
                          "Family & relationships",
                          "OCD",
                        ].map((topic) => (
                          <option key={topic}>{topic}</option>
                        ))}
                      </datalist>
                    </label>
                    <label>
                      Short summary
                      <textarea
                        value={draft.excerpt}
                        maxLength={500}
                        rows={5}
                        onChange={(event) =>
                          edit({ excerpt: event.target.value })
                        }
                        placeholder="A welcoming introduction for readers browsing your blog."
                      />
                      <span className="field-hint">
                        {draft.excerpt.length}/500 characters
                      </span>
                    </label>
                    <label>
                      Article URL
                      <input
                        value={draft.slug}
                        maxLength={180}
                        onChange={(event) => edit({ slug: event.target.value })}
                        placeholder="Created from your title"
                      />
                      <span className="field-hint">
                        /blog/{draft.slug || "your-article-title"}
                      </span>
                    </label>
                    <div className="publishing-note">
                      <span className={`post-status ${draft.status}`}>
                        {draft.status === "published"
                          ? "Published"
                          : "Private draft"}
                      </span>
                      <p>
                        {draft.status === "published"
                          ? "This article is visible to everyone. Save changes to update it."
                          : "Take your time. Only you can see this until you choose to publish."}
                      </p>
                    </div>
                    {draft.status === "published" && (
                      <button
                        className="text-link"
                        disabled={busy}
                        onClick={() => {
                          if (
                            window.confirm(
                              "Move this article to drafts? It will be removed from the public website.",
                            )
                          )
                            save("draft");
                        }}
                      >
                        Unpublish & move to drafts
                      </button>
                    )}
                    {draft.id && (
                      <button
                        className="delete-button"
                        disabled={busy}
                        onClick={async () => {
                          if (
                            !window.confirm(
                              "Permanently delete this article? This cannot be undone.",
                            )
                          )
                            return;
                          setBusy(true);
                          setError("");
                          try {
                            await api(
                              `posts?id=${encodeURIComponent(draft.id!)}`,
                              { method: "DELETE" },
                            );
                            setPosts((current) =>
                              current.filter((post) => post.id !== draft.id),
                            );
                            setDraft(null);
                            setDirty(false);
                          } catch (error) {
                            setError((error as Error).message);
                          } finally {
                            setBusy(false);
                          }
                        }}
                      >
                        Delete article
                      </button>
                    )}
                  </aside>
                </div>
              )}
            </>
          )}
          {!draft && error && (
            <p className="form-error" role="alert">
              {error}
            </p>
          )}
        </div>
      )}
      <p className="studio-footer">
        Sania Asif · A thoughtful space for thoughtful words.
      </p>
    </main>
  );
}

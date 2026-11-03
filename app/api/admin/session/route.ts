import { env } from "cloudflare:workers";
import {
  authenticated,
  cookieToken,
  hash,
  json,
  passwordHash,
  randomToken,
  readBody,
  sameOrigin,
  sessionHeader,
} from "@/lib/admin";
import { database } from "@/lib/blog";

export const dynamic = "force-dynamic";

export async function GET() {
  const db = await database();
  return json({
    needsSetup: !(await db
      .prepare("SELECT id FROM blog_admin WHERE id = 1")
      .first()),
  });
}

export async function POST(request: Request) {
  if (!sameOrigin(request))
    return json({ error: "Please sign in from this website." }, 403);
  try {
    const data = await readBody(request);
    const db = await database();
    const email = String(data.email ?? "")
      .trim()
      .toLowerCase();
    const password = String(data.password ?? "");
    if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
      email.length > 254 ||
      password.length > 256
    )
      return json({ error: "Enter a valid email and password." }, 400);
    // Persistent limits apply across Worker instances, to both the IP and account.
    const keys = [
      `ip:${request.headers.get("cf-connecting-ip") ?? "local"}`,
      `email:${email}`,
    ];
    for (const key of keys) {
      await db
        .prepare(
          "INSERT INTO blog_login_attempts (key, attempts, resetAt) VALUES (?, 1, ?) ON CONFLICT(key) DO UPDATE SET attempts = CASE WHEN resetAt < ? THEN 1 ELSE attempts + 1 END, resetAt = CASE WHEN resetAt < ? THEN excluded.resetAt ELSE resetAt END",
        )
        .bind(key, Date.now() + 900000, Date.now(), Date.now())
        .run();
      const limit = await db
        .prepare("SELECT attempts FROM blog_login_attempts WHERE key = ?")
        .bind(key)
        .first<{ attempts: number }>();
      if (limit && limit.attempts > 10)
        return json(
          { error: "Too many attempts. Please try again in 15 minutes." },
          429,
        );
    }
    const admin = await db
      .prepare("SELECT * FROM blog_admin WHERE id = 1")
      .first<{ email: string; passwordHash: string; salt: string }>();
    if (!admin) {
      const local = ["localhost", "127.0.0.1", "[::1]"].includes(
        new URL(request.url).hostname,
      );
      const setupToken = (env as unknown as { ADMIN_SETUP_TOKEN?: string })
        .ADMIN_SETUP_TOKEN;
      if (!local && (!setupToken || data.setupToken !== setupToken))
        return json(
          { error: "Enter the setup key configured by the site owner." },
          403,
        );
      if (data.action !== "setup" || password.length < 12)
        return json(
          { error: "Choose a password with at least 12 characters." },
          400,
        );
      const salt = randomToken();
      const created = await db
        .prepare(
          "INSERT OR IGNORE INTO blog_admin (id, email, passwordHash, salt) VALUES (1, ?, ?, ?)",
        )
        .bind(email, await passwordHash(password, salt), salt)
        .run();
      if (!created.meta.changes)
        return json(
          { error: "An account already exists. Please sign in." },
          409,
        );
    } else if (
      email !== admin.email ||
      (await passwordHash(password, admin.salt)) !== admin.passwordHash
    ) {
      return json({ error: "The email or password is incorrect." }, 401);
    }
    const token = randomToken();
    await db.batch([
      db
        .prepare("DELETE FROM blog_sessions WHERE expiresAt < ?")
        .bind(Date.now()),
      db
        .prepare(
          "INSERT INTO blog_sessions (tokenHash, expiresAt) VALUES (?, ?)",
        )
        .bind(await hash(token), Date.now() + 604800000),
    ]);
    return json({ ok: true }, 200, {
      "Set-Cookie": sessionHeader(request, token),
    });
  } catch {
    return json(
      { error: "Unable to sign in. Please check your details and try again." },
      400,
    );
  }
}

export async function DELETE(request: Request) {
  if (!sameOrigin(request)) return json({ error: "Invalid origin." }, 403);
  if (await authenticated(request)) {
    const db = await database();
    await db
      .prepare("DELETE FROM blog_sessions WHERE tokenHash = ?")
      .bind(await hash(cookieToken(request)!))
      .run();
  }
  return json({ ok: true }, 200, {
    "Set-Cookie": sessionHeader(request, "", 0),
  });
}

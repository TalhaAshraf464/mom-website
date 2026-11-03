import { database } from "./blog";

export const sessionCookie = "sania_admin";
const encode = (bytes: ArrayBuffer | Uint8Array) =>
  Array.from(new Uint8Array(bytes))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

export async function hash(value: string) {
  return encode(
    await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value)),
  );
}

export async function passwordHash(password: string, salt: string) {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(password),
    "PBKDF2",
    false,
    ["deriveBits"],
  );
  return encode(
    await crypto.subtle.deriveBits(
      {
        name: "PBKDF2",
        salt: new TextEncoder().encode(salt),
        iterations: 100000,
        hash: "SHA-256",
      },
      key,
      256,
    ),
  );
}

export function randomToken() {
  return encode(crypto.getRandomValues(new Uint8Array(32)));
}

export function cookieToken(request: Request) {
  return request.headers
    .get("cookie")
    ?.split(";")
    .map((item) => item.trim())
    .find((item) => item.startsWith(`${sessionCookie}=`))
    ?.slice(sessionCookie.length + 1);
}

export async function authenticated(request: Request) {
  const token = cookieToken(request);
  if (!token) return false;
  const db = await database();
  return Boolean(
    await db
      .prepare(
        "SELECT tokenHash FROM blog_sessions WHERE tokenHash = ? AND expiresAt > ?",
      )
      .bind(await hash(token), Date.now())
      .first(),
  );
}

export function sessionHeader(
  request: Request,
  token: string,
  maxAge = 604800,
) {
  return `${sessionCookie}=${token}; HttpOnly; SameSite=Strict; Path=/; Max-Age=${maxAge}${new URL(request.url).protocol === "https:" ? "; Secure" : ""}`;
}

export function json(body: unknown, status = 200, headers: HeadersInit = {}) {
  return Response.json(body, {
    status,
    headers: { "Cache-Control": "no-store", ...headers },
  });
}

export function sameOrigin(request: Request) {
  return request.headers.get("origin") === new URL(request.url).origin;
}

export async function readBody(request: Request) {
  const text = await request.text();
  if (text.length > 120000)
    throw new Error(
      "This article is too long. Please keep it under 100,000 characters.",
    );
  return JSON.parse(text);
}

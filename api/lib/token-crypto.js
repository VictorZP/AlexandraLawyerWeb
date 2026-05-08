import { createHmac, timingSafeEqual } from "node:crypto";

/**
 * @param {string} secret
 * @returns {string}
 */
export function signSession(secret) {
  const exp = Date.now() + 7 * 24 * 60 * 60 * 1000;
  const body = Buffer.from(JSON.stringify({ exp }), "utf8").toString("base64url");
  const sig = createHmac("sha256", secret).update(body).digest("base64url");
  return `${body}.${sig}`;
}

/**
 * @param {string} token
 * @param {string} secret
 * @returns {boolean}
 */
export function verifySession(token, secret) {
  if (!token || typeof token !== "string") return false;
  const dot = token.lastIndexOf(".");
  if (dot <= 0) return false;
  const body = token.slice(0, dot);
  const sig = token.slice(dot + 1);
  const expected = createHmac("sha256", secret).update(body).digest("base64url");
  const bs = Buffer.from(sig, "utf8");
  const be = Buffer.from(expected, "utf8");
  if (bs.length !== be.length) return false;
  try {
    if (!timingSafeEqual(bs, be)) return false;
  } catch {
    return false;
  }
  try {
    const parsed = JSON.parse(Buffer.from(body, "base64url").toString("utf8"));
    return typeof parsed.exp === "number" && Date.now() < parsed.exp;
  } catch {
    return false;
  }
}

import { timingSafeEqual } from "node:crypto";
import { signSession } from "./lib/token-crypto.js";

function readJsonBody(req) {
  if (req.body && typeof req.body === "object" && !Buffer.isBuffer(req.body)) return req.body;
  if (typeof req.body === "string") {
    try {
      return JSON.parse(req.body);
    } catch {
      return null;
    }
  }
  return null;
}

function safeEqualString(expected, given) {
  const a = Buffer.from(expected, "utf8");
  const b = Buffer.from(given, "utf8");
  if (a.length !== b.length) return false;
  try {
    return timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

export default async function handler(req, res) {
  if (req.method === "OPTIONS") {
    res.status(204).end();
    return;
  }
  if (req.method !== "POST") {
    res.status(405).setHeader("Allow", "POST, OPTIONS").json({ ok: false, error: "method" });
    return;
  }

  const password = process.env.ADMIN_PASSWORD;
  const sessionSecret = process.env.ADMIN_SESSION_SECRET;
  if (!password || !sessionSecret) {
    res
      .status(503)
      .json({ ok: false, error: "config", message: "ADMIN_PASSWORD и ADMIN_SESSION_SECRET не заданы" });
    return;
  }

  const body = readJsonBody(req);
  const given = body && typeof body.password === "string" ? body.password : "";
  if (!safeEqualString(password, given)) {
    res.status(401).json({ ok: false, error: "auth" });
    return;
  }

  const token = signSession(sessionSecret);
  res.status(200).json({ ok: true, token });
}

import { verifySession } from "./lib/token-crypto.js";

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

export default async function handler(req, res) {
  if (req.method === "OPTIONS") {
    res.status(204).end();
    return;
  }
  if (req.method !== "POST") {
    res.status(405).setHeader("Allow", "POST, OPTIONS").json({ ok: false, error: "method" });
    return;
  }

  const sessionSecret = process.env.ADMIN_SESSION_SECRET;
  if (!sessionSecret) {
    res.status(503).json({ ok: false, error: "config" });
    return;
  }

  const body = readJsonBody(req);
  const token = body && typeof body.token === "string" ? body.token : "";
  if (!verifySession(token, sessionSecret)) {
    res.status(401).json({ ok: false, error: "auth" });
    return;
  }

  res.status(200).json({ ok: true });
}

export type LoginResult =
  | { ok: true; token: string }
  | { ok: false; error: string; status?: number };

export async function loginWithPassword(password: string): Promise<LoginResult> {
  try {
    const res = await fetch("/api/admin-login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    const data = (await res.json()) as { ok?: boolean; token?: string; error?: string };
    if (res.ok && data.ok && typeof data.token === "string") {
      return { ok: true, token: data.token };
    }
    return { ok: false, error: data.error ?? "auth", status: res.status };
  } catch {
    return { ok: false, error: "network" };
  }
}

export async function verifySessionToken(token: string): Promise<boolean> {
  try {
    const res = await fetch("/api/admin-verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    });
    if (!res.ok) return false;
    const data = (await res.json()) as { ok?: boolean };
    return Boolean(data.ok);
  } catch {
    return false;
  }
}

/** Локальная разработка без Vercel Functions: пароль из .env (не для продакшена). */
export function tryDevLocalLogin(password: string): boolean {
  if (!import.meta.env.DEV) return false;
  const bypass = import.meta.env.VITE_DEV_ADMIN_BYPASS === "1";
  const devPass = import.meta.env.VITE_DEV_ADMIN_PASSWORD;
  if (!bypass || typeof devPass !== "string" || devPass.length === 0) return false;
  return password === devPass;
}

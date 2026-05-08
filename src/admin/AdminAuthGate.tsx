import type { ReactNode } from "react";
import { useCallback, useEffect, useState } from "react";
import {
  clearAdminSession,
  DEV_LOCAL_TOKEN,
  getAdminSessionToken,
  setAdminSessionToken,
} from "./adminSession";
import { loginWithPassword, tryDevLocalLogin, verifySessionToken } from "./adminApi";

export function AdminAuthGate({ children }: { children: ReactNode }) {
  const [phase, setPhase] = useState<"loading" | "in" | "out">("loading");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const finishLogin = useCallback((token: string) => {
    setAdminSessionToken(token);
    setPhase("in");
    setError(null);
    setPassword("");
  }, []);

  useEffect(() => {
    let cancelled = false;
    const run = async () => {
      const token = getAdminSessionToken();
      if (!token) {
        if (!cancelled) setPhase("out");
        return;
      }
      if (import.meta.env.DEV && token === DEV_LOCAL_TOKEN) {
        if (!cancelled) setPhase("in");
        return;
      }
      const ok = await verifySessionToken(token);
      if (cancelled) return;
      if (ok) setPhase("in");
      else {
        clearAdminSession();
        setPhase("out");
      }
    };
    void run();
    return () => {
      cancelled = true;
    };
  }, []);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const trimmed = password.trim();
    if (tryDevLocalLogin(trimmed)) {
      finishLogin(DEV_LOCAL_TOKEN);
      return;
    }
    const result = await loginWithPassword(trimmed);
    if (result.ok) {
      finishLogin(result.token);
      return;
    }
    if (result.error === "network" && import.meta.env.DEV) {
      setError(
        "Нет ответа от /api/admin-login. Для локальной проверки задайте в .env VITE_DEV_ADMIN_BYPASS=1 и VITE_DEV_ADMIN_PASSWORD=… или запустите vercel dev.",
      );
      return;
    }
    setError("Неверный пароль или ошибка сервера.");
  };

  if (phase === "loading") {
    return (
      <div className="admin-shell">
        <p className="admin-shell__muted">Проверка сессии…</p>
      </div>
    );
  }

  if (phase === "out") {
    return (
      <div className="admin-shell">
        <div className="admin-login glass">
          <h1 className="admin-login__title">Админка контента</h1>
          <p className="admin-login__lead">
            Введите пароль проекта (переменная <code className="admin-code">ADMIN_PASSWORD</code> на Vercel).
          </p>
          <form onSubmit={onSubmit} className="admin-login__form">
            <label className="admin-label">
              Пароль
              <input
                className="admin-input"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(ev) => setPassword(ev.target.value)}
              />
            </label>
            {error ? <p className="admin-error">{error}</p> : null}
            <button type="submit" className="admin-btn admin-btn--primary">
              Войти
            </button>
          </form>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

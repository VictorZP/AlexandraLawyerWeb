/** Режим деплоя: публичный сайт или отдельная админ-сборка (тот же репозиторий). */
export type SiteMode = "public" | "admin";

export function getSiteMode(): SiteMode {
  const m = import.meta.env.VITE_SITE_MODE;
  return m === "admin" ? "admin" : "public";
}

export function isAdminSiteBuild(): boolean {
  return getSiteMode() === "admin";
}

const STORAGE_KEY = "legal-admin-session-token";

export function getAdminSessionToken(): string | null {
  if (typeof sessionStorage === "undefined") return null;
  return sessionStorage.getItem(STORAGE_KEY);
}

export function setAdminSessionToken(token: string): void {
  sessionStorage.setItem(STORAGE_KEY, token);
}

export function clearAdminSession(): void {
  sessionStorage.removeItem(STORAGE_KEY);
}

export const DEV_LOCAL_TOKEN = "dev-local-token";

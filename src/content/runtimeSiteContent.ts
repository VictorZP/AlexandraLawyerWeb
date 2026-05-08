import { defaultSiteContent } from "./defaultSiteContent";
import type { SiteContent } from "./types";
import { isValidSiteContent } from "./validateSiteContent";
import { isAdminSiteBuild } from "../lib/siteMode";

const STORAGE_KEY = "legal-site-content-v1";

const listeners = new Set<() => void>();

function readFromStorage(): unknown | null {
  if (typeof localStorage === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as unknown;
  } catch {
    return null;
  }
}

export function subscribeSiteContent(onStoreChange: () => void): () => void {
  if (!isAdminSiteBuild()) return () => {};
  listeners.add(onStoreChange);
  return () => listeners.delete(onStoreChange);
}

function notify(): void {
  listeners.forEach((fn) => fn());
}

/** Снимок контента для React (публичная сборка всегда из модуля). */
export function getSiteContentSnapshot(): SiteContent {
  if (!isAdminSiteBuild()) return defaultSiteContent;
  const parsed = readFromStorage();
  if (parsed && isValidSiteContent(parsed)) return parsed;
  return defaultSiteContent;
}

export function setSiteContentInBrowser(content: SiteContent): void {
  if (!isAdminSiteBuild()) {
    throw new Error("Сохранение в браузере доступно только в admin-сборке (VITE_SITE_MODE=admin).");
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
  notify();
}

export function resetSiteContentInBrowser(): void {
  if (!isAdminSiteBuild()) return;
  localStorage.removeItem(STORAGE_KEY);
  notify();
}

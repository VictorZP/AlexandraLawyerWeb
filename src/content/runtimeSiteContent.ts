import { defaultSiteContent } from "./defaultSiteContent";
import { siteContentFr } from "./defaultSiteContent.fr";
import type { SiteContent } from "./types";
import { isValidSiteContent } from "./validateSiteContent";
import { getStoredLocale, subscribeLocale } from "../i18n/localeStorage";
import { isAdminSiteBuild } from "../lib/siteMode";

function baseContent(): SiteContent {
  return getStoredLocale() === "fr" ? siteContentFr : defaultSiteContent;
}

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
  const unsubLocale = subscribeLocale(onStoreChange);
  if (!isAdminSiteBuild()) {
    return unsubLocale;
  }
  listeners.add(onStoreChange);
  return () => {
    unsubLocale();
    listeners.delete(onStoreChange);
  };
}

function notify(): void {
  listeners.forEach((fn) => fn());
}

/** Снимок контента для React (язык + при admin — правка из localStorage). */
export function getSiteContentSnapshot(): SiteContent {
  const base = baseContent();
  if (!isAdminSiteBuild()) return base;
  const parsed = readFromStorage();
  if (parsed && isValidSiteContent(parsed)) return parsed;
  return base;
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

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

/**
 * Для admin-сборки: useSyncExternalStore сравнивает снимки через Object.is.
 * Нельзя возвращать новый объект из JSON.parse на каждый вызов getSnapshot — иначе React
 * считает, что данные меняются каждый рендер, и падает с «Maximum update depth» (#185).
 */
let adminContentCache: { raw: string; data: SiteContent } | null = null;

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
  if (typeof localStorage === "undefined") {
    adminContentCache = null;
    return base;
  }
  let raw: string | null;
  try {
    raw = localStorage.getItem(STORAGE_KEY);
  } catch {
    adminContentCache = null;
    return base;
  }
  if (!raw) {
    adminContentCache = null;
    return base;
  }
  if (adminContentCache && adminContentCache.raw === raw) {
    return adminContentCache.data;
  }
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (parsed && isValidSiteContent(parsed)) {
      adminContentCache = { raw, data: parsed as SiteContent };
      return adminContentCache.data;
    }
  } catch {
    /* ignore */
  }
  adminContentCache = null;
  return base;
}

export function setSiteContentInBrowser(content: SiteContent): void {
  if (!isAdminSiteBuild()) {
    throw new Error("Сохранение в браузере доступно только в admin-сборке (VITE_SITE_MODE=admin).");
  }
  const raw = JSON.stringify(content);
  localStorage.setItem(STORAGE_KEY, raw);
  adminContentCache = { raw, data: content };
  notify();
}

export function resetSiteContentInBrowser(): void {
  if (!isAdminSiteBuild()) return;
  localStorage.removeItem(STORAGE_KEY);
  adminContentCache = null;
  notify();
}

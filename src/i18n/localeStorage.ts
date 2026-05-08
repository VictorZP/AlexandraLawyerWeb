export type AppLocale = "ru" | "fr";

const KEY = "site-locale";
const EVENT = "site-locale-changed";

export function getStoredLocale(): AppLocale {
  if (typeof localStorage === "undefined") return "ru";
  return localStorage.getItem(KEY) === "fr" ? "fr" : "ru";
}

export function setStoredLocale(locale: AppLocale): void {
  if (typeof localStorage !== "undefined") {
    localStorage.setItem(KEY, locale);
  }
  if (typeof document !== "undefined") {
    document.documentElement.lang = locale === "fr" ? "fr" : "ru";
  }
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(EVENT));
  }
}

export function subscribeLocale(cb: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  window.addEventListener(EVENT, cb);
  return () => window.removeEventListener(EVENT, cb);
}

export function initHtmlLangFromStorage(): void {
  if (typeof document === "undefined") return;
  document.documentElement.lang = getStoredLocale() === "fr" ? "fr" : "ru";
}

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { getStoredLocale, setStoredLocale, type AppLocale } from "./localeStorage";
import { getUiStrings, type UiStrings } from "./uiStrings";

type LocaleContextValue = {
  locale: AppLocale;
  setLocale: (l: AppLocale) => void;
  t: UiStrings;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLoc] = useState<AppLocale>(() => getStoredLocale());

  useEffect(() => {
    const onChange = () => setLoc(getStoredLocale());
    window.addEventListener("site-locale-changed", onChange);
    return () => window.removeEventListener("site-locale-changed", onChange);
  }, []);

  const setLocale = useCallback((l: AppLocale) => {
    setStoredLocale(l);
    setLoc(l);
  }, []);

  const t = useMemo(() => getUiStrings(locale), [locale]);

  const value = useMemo(() => ({ locale, setLocale, t }), [locale, setLocale, t]);

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale(): LocaleContextValue {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    throw new Error("useLocale doit être utilisé dans LocaleProvider");
  }
  return ctx;
}

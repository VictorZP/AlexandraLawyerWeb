import { useLocale } from "../i18n/LocaleProvider";

export function LanguageSwitcher() {
  const { locale, setLocale, t } = useLocale();
  return (
    <div className="site-lang" role="group" aria-label={t.langSwitcherAria}>
      <button
        type="button"
        className={"site-lang__btn" + (locale === "ru" ? " site-lang__btn--active" : "")}
        aria-pressed={locale === "ru"}
        onClick={() => setLocale("ru")}
      >
        {t.langShortRu}
      </button>
      <button
        type="button"
        className={"site-lang__btn" + (locale === "fr" ? " site-lang__btn--active" : "")}
        aria-pressed={locale === "fr"}
        onClick={() => setLocale("fr")}
      >
        {t.langShortFr}
      </button>
    </div>
  );
}

import type { ReactNode } from "react";
import { useEffect, useMemo } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useLocale } from "../i18n/LocaleProvider";
import { useSiteContent } from "../content/useSiteContent";
import { useGlobalScrollParallax } from "../hooks/useGlobalScrollParallax";
import { resolvePageBackdrop } from "../lib/resolvePageBackground";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { SiteBackground } from "./SiteBackground";

export function Layout({ children }: { children?: ReactNode }) {
  useGlobalScrollParallax();
  const { pathname } = useLocation();
  const site = useSiteContent();
  const { t } = useLocale();
  const backdrop = useMemo(() => resolvePageBackdrop(pathname, site), [pathname, site]);

  const nav = useMemo(
    () =>
      [
        { to: "/", label: t.navHome, end: true as const },
        { to: "/emigration", label: t.navEmigration, end: false as const },
        { to: "/business", label: t.navBusiness, end: false as const },
        { to: "/talent-passport", label: t.navTalent, end: false as const },
        { to: "/laws", label: t.navLaws, end: false as const },
        { to: "/associations", label: t.navAssociations, end: false as const },
        { to: "/consultation", label: t.navConsultation, end: false as const },
      ] as const,
    [t],
  );

  useEffect(() => {
    document.title = t.documentTitle;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", t.metaDescription);
  }, [t.documentTitle, t.metaDescription]);

  useEffect(() => {
    if (backdrop.videoUrl) return;
    const url = backdrop.imageUrl;
    if (!url) return;
    const id = "site-bg-preload";
    document.getElementById(id)?.remove();
    const link = document.createElement("link");
    link.id = id;
    link.rel = "preload";
    link.as = "image";
    link.href = url;
    link.setAttribute("fetchpriority", "high");
    document.head.appendChild(link);
    return () => {
      document.getElementById(id)?.remove();
    };
  }, [backdrop.imageUrl, backdrop.videoUrl]);

  return (
    <div className="site">
      <SiteBackground
        imageUrl={backdrop.imageUrl}
        videoUrl={backdrop.videoUrl}
        posterUrl={backdrop.posterUrl}
      />
      <a href="#main" className="skip-link">
        {t.skipToContent}
      </a>
      <header className="site-header glass">
        <div className="site-header__inner">
          <NavLink to="/" className="brand" end>
            <span className="brand__mark" aria-hidden>
              <span className="brand__monogram">АЛ</span>
            </span>
            <span className="brand__text">
              <span className="brand__name">Александра Лемель</span>
              <span className="brand__tag">{t.brandTag}</span>
            </span>
          </NavLink>
          <div className="site-header__tail">
            <nav className="site-nav" aria-label={t.navAria}>
              {nav.map(({ to, label, end }) => (
                <NavLink
                  key={to}
                  to={to}
                  className={({ isActive }) =>
                    "site-nav__link" + (isActive ? " site-nav__link--active" : "")
                  }
                  end={end}
                >
                  {label}
                </NavLink>
              ))}
            </nav>
            <LanguageSwitcher />
          </div>
        </div>
      </header>
      <main id="main" key={pathname} className="site-main site-main--enter">
        {children}
      </main>
      <footer className="site-footer glass">
        <p>{t.footerDisclaimer}</p>
        {import.meta.env.DEV ? (
          <details className="site-footer__admin-hint">
            <summary>{t.footerAdminSummary}</summary>
            <p className="site-footer__admin-hint-body">{site.adminMediaGuidance}</p>
          </details>
        ) : null}
        <p className="site-footer__note">© {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}

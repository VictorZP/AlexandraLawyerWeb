import type { ReactNode } from "react";
import { NavLink } from "react-router-dom";

const nav = [
  { to: "/", label: "Главная" },
  { to: "/emigration", label: "Эмиграция во Францию" },
  { to: "/business", label: "Бизнес во Франции" },
  { to: "/talent-passport", label: "Паспорт талант Франция" },
  { to: "/laws", label: "Интересные ЗАКОНЫ Франции" },
  { to: "/associations", label: "Русскоговорящие Ассоциации во Франции" },
];

export function Layout({ children }: { children?: ReactNode }) {
  return (
    <div className="site">
      <a href="#main" className="skip-link">
        К основному содержанию
      </a>
      <header className="site-header">
        <div className="site-header__inner">
          <NavLink to="/" className="brand" end>
            <span className="brand__mark" aria-hidden>
              <span className="brand__monogram">АЛ</span>
            </span>
            <span className="brand__text">
              <span className="brand__name">Александра Лемель</span>
              <span className="brand__tag">юрист во Франции</span>
            </span>
          </NavLink>
          <nav className="site-nav" aria-label="Основная навигация">
            {nav.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  "site-nav__link" + (isActive ? " site-nav__link--active" : "")
                }
                end={to === "/"}
              >
                {label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>
      <main id="main" className="site-main">
        {children}
      </main>
      <footer className="site-footer">
        <p>
          Информация на сайте не является публичной офертой. Договор оказания услуг
          заключается отдельно.
        </p>
        <p className="site-footer__note">© {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}

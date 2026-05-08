import { NavLink, Outlet } from "react-router-dom";
import { clearAdminSession } from "./adminSession";

const nav: { to: string; label: string }[] = [
  { to: "/admin", label: "Обзор" },
  { to: "/admin/settings", label: "Подсказки и резерв" },
  { to: "/admin/home", label: "Главная" },
  { to: "/admin/emigration", label: "Эмиграция" },
  { to: "/admin/business", label: "Бизнес" },
  { to: "/admin/talent-passport", label: "Паспорт талант" },
  { to: "/admin/laws", label: "Законы" },
  { to: "/admin/associations", label: "Ассоциации — страница" },
  { to: "/admin/associations/items", label: "Ассоциации — карточки" },
  { to: "/admin/associations/details", label: "Ассоциации — подробнее" },
];

export function AdminShell() {
  const logout = () => {
    clearAdminSession();
    window.location.reload();
  };

  return (
    <div className="admin-app">
      <aside className="admin-app__sidebar glass">
        <div className="admin-app__brand">
          <strong>Панель контента</strong>
          <span className="admin-app__brand-sub">разделы как на сайте</span>
        </div>
        <nav className="admin-app__nav" aria-label="Разделы админки">
          {nav.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/admin"}
              className={({ isActive }) => "admin-app__nav-link" + (isActive ? " admin-app__nav-link--active" : "")}
            >
              {label}
            </NavLink>
          ))}
        </nav>
        <button type="button" className="admin-btn admin-btn--ghost admin-app__logout" onClick={logout}>
          Выйти
        </button>
      </aside>
      <div className="admin-app__main">
        <Outlet />
      </div>
    </div>
  );
}

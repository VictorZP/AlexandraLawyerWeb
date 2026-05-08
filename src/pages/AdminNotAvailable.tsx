import { Link } from "react-router-dom";
import "../styles/admin.css";

export function AdminNotAvailable() {
  return (
    <div className="panel glass" style={{ maxWidth: "42rem" }}>
      <h1 className="page-title" style={{ fontSize: "1.65rem" }}>
        Админка недоступна
      </h1>
      <p className="page-lead" style={{ marginBottom: "1rem" }}>
        На этом деплое включён только публичный режим. Управление контентом — на отдельном проекте Vercel с переменной{" "}
        <code className="admin-code">VITE_SITE_MODE=admin</code> и маршрутом{" "}
        <code className="admin-code">/admin</code>.
      </p>
      <Link to="/" className="btn btn--primary">
        На главную
      </Link>
    </div>
  );
}

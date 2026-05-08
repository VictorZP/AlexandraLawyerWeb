import { Link } from "react-router-dom";
import { useLocale } from "../i18n/LocaleProvider";
import "../styles/admin.css";

export function AdminNotAvailable() {
  const { t } = useLocale();
  return (
    <div className="panel glass" style={{ maxWidth: "42rem" }}>
      <h1 className="page-title" style={{ fontSize: "1.65rem" }}>
        {t.adminUnavailableTitle}
      </h1>
      <p className="page-lead" style={{ marginBottom: "1rem" }}>
        {t.adminUnavailableLead}
      </p>
      <Link to="/" className="btn btn--primary">
        {t.adminUnavailableHome}
      </Link>
    </div>
  );
}

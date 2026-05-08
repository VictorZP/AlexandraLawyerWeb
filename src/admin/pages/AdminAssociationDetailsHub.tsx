import { Link } from "react-router-dom";
import { useSiteContent } from "../../content/useSiteContent";

export function AdminAssociationDetailsHub() {
  const { associations } = useSiteContent();

  return (
    <div className="admin-doc">
      <h1 className="admin-doc__title">Ассоциации — страницы «Подробнее»</h1>
      <p className="admin-doc__lead">Отдельный экран для каждой внутренней страницы каталога.</p>
      <ul className="admin-link-list">
        {associations.details.map((d) => (
          <li key={d.slug}>
            <Link to={`/admin/associations/details/${d.slug}`} className="admin-link-list__a">
              {d.title} <span className="admin-code">({d.slug})</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

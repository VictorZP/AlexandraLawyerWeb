import { Link } from "react-router-dom";
import { useSiteContent } from "../../content/useSiteContent";

export function AdminAssociationItemsHub() {
  const { associations } = useSiteContent();
  const items = [...associations.items].sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    <div className="admin-doc">
      <h1 className="admin-doc__title">Ассоциации — карточки каталога</h1>
      <p className="admin-doc__lead">Каждая карточка — отдельный экран редактирования (как отдельный блок на сайте).</p>
      <ul className="admin-link-list">
        {items.map((it) => (
          <li key={it.id}>
            <Link to={`/admin/associations/items/${it.slug}`} className="admin-link-list__a">
              {it.title} <span className="admin-code">({it.slug})</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

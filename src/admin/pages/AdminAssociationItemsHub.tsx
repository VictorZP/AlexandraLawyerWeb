import { Link, useNavigate } from "react-router-dom";
import type { AssociationDetailPageBlock, AssociationEntry, SiteContent } from "../../content/types";
import { setSiteContentInBrowser } from "../../content/runtimeSiteContent";
import { useSiteContent } from "../../content/useSiteContent";

function newOrgPair(slug: string, sortOrder: number): { item: AssociationEntry; detail: AssociationDetailPageBlock } {
  return {
    item: {
      id: `assoc-${slug}`,
      slug,
      sortOrder,
      title: "Новая организация",
      description: "Краткое описание для списка.",
      hoverIntro: "Текст на карточке при наведении.",
      specs: [
        { label: "Сфера", value: "" },
        { label: "Регион", value: "" },
        { label: "Сайт", value: "" },
      ],
      externalUrl: null,
      gallery: [{ src: null, alt: "", caption: null }],
      regionId: "national",
      categoryId: "culture",
    },
    detail: {
      slug,
      pageBackground: null,
      pageBackgroundVideo: null,
      pageBackgroundVideoPoster: null,
      title: "Новая организация",
      lead: "",
      paragraphs: [""],
      gallery: [{ src: null, alt: "", caption: null }],
      externalUrl: "",
      videoEmbedUrl: null,
    },
  };
}

export function AdminAssociationItemsHub() {
  const root = useSiteContent();
  const navigate = useNavigate();
  const items = [...root.associations.items].sort((a, b) => a.sortOrder - b.sortOrder);

  const addOrganization = () => {
    const slug = `org-${Date.now()}`;
    const sortOrder = items.reduce((m, i) => Math.max(m, i.sortOrder), 0) + 10;
    const { item, detail } = newOrgPair(slug, sortOrder);
    const next: SiteContent = {
      ...root,
      associations: {
        ...root.associations,
        items: [...root.associations.items, item],
        details: [...root.associations.details, detail],
      },
    };
    setSiteContentInBrowser(next);
    navigate(`/admin/associations/items/${slug}`);
  };

  return (
    <div className="admin-doc">
      <h1 className="admin-doc__title">Ассоциации — карточки каталога</h1>
      <p className="admin-doc__lead">
        Каждая карточка — отдельный экран редактирования. Новая организация создаётся вместе со страницей «Подробнее» с тем же
        slug.
      </p>
      <p className="admin-inline-actions">
        <button type="button" className="admin-btn admin-btn--primary" onClick={addOrganization}>
          + Добавить организацию (карточка + страница «Подробнее»)
        </button>
      </p>
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

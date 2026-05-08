import { useMemo, useState } from "react";
import { AssociationCard } from "../components/AssociationCard";
import { getSiteContent } from "../content/defaultSiteContent";

export function AssociationsPage() {
  const { associations } = getSiteContent();
  const [regionId, setRegionId] = useState("all");
  const [categoryId, setCategoryId] = useState("all");

  const items = useMemo(
    () => [...associations.items].sort((a, b) => a.sortOrder - b.sortOrder),
    [associations.items],
  );

  const filtered = useMemo(
    () =>
      items.filter((it) => {
        const okRegion = regionId === "all" || it.regionId === regionId;
        const okCat = categoryId === "all" || it.categoryId === categoryId;
        return okRegion && okCat;
      }),
    [items, regionId, categoryId],
  );

  return (
    <>
      <header className="assoc-page-header">
        <h1 className="page-title">{associations.pageTitle}</h1>
        <p className="page-lead">{associations.lead}</p>
      </header>

      <div className="assoc-filters panel">
        <div className="assoc-filters__group">
          <span className="assoc-filters__label" id="assoc-region-label">
            Регион
          </span>
          <div className="assoc-filters__tabs" role="group" aria-labelledby="assoc-region-label">
            {associations.regionTabs.map((t) => (
              <button
                key={t.id}
                type="button"
                className={"assoc-tab" + (regionId === t.id ? " assoc-tab--active" : "")}
                aria-pressed={regionId === t.id}
                onClick={() => setRegionId(t.id)}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
        <div className="assoc-filters__group">
          <span className="assoc-filters__label" id="assoc-cat-label">
            Тип
          </span>
          <div className="assoc-filters__tabs" role="group" aria-labelledby="assoc-cat-label">
            {associations.categoryTabs.map((t) => (
              <button
                key={t.id}
                type="button"
                className={"assoc-tab" + (categoryId === t.id ? " assoc-tab--active" : "")}
                aria-pressed={categoryId === t.id}
                onClick={() => setCategoryId(t.id)}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="assoc-empty">По выбранным фильтрам пока ничего нет — снимите фильтр или добавьте записи в админке.</p>
      ) : (
        <div className="assoc-grid">
          {filtered.map((item) => (
            <AssociationCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </>
  );
}

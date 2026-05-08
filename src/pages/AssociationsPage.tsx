import { useEffect, useMemo, useState } from "react";
import { AssociationCard } from "../components/AssociationCard";
import { useSiteContent } from "../content/useSiteContent";
import { useLocale } from "../i18n/LocaleProvider";

export function AssociationsPage() {
  const { t } = useLocale();
  const { associations } = useSiteContent();
  const [regionId, setRegionId] = useState("all");
  const [categoryId, setCategoryId] = useState("all");
  const [page, setPage] = useState(1);

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

  const perPage = Math.max(1, associations.itemsPerPage);
  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));

  useEffect(() => {
    setPage((p) => (p === 1 ? p : 1));
  }, [regionId, categoryId, filtered.length]);

  useEffect(() => {
    setPage((p) => (p > totalPages ? totalPages : p));
  }, [page, totalPages]);

  const pageItems = useMemo(() => {
    const start = (page - 1) * perPage;
    return filtered.slice(start, start + perPage);
  }, [filtered, page, perPage]);

  return (
    <>
      <header className="assoc-page-header glass panel">
        <h1 className="page-title">{associations.pageTitle}</h1>
        <p className="page-lead">{associations.lead}</p>
      </header>

      <div className="assoc-filters glass panel">
        <div className="assoc-filters__group">
          <span className="assoc-filters__label" id="assoc-sphere-label">
            {t.assocFilterSphere}
          </span>
          <div className="assoc-filters__tabs" role="group" aria-labelledby="assoc-sphere-label">
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
        <div className="assoc-filters__group">
          <span className="assoc-filters__label" id="assoc-region-label">
            {t.assocFilterRegion}
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

        {totalPages > 1 ? (
          <nav className="assoc-pagination" aria-label={t.assocPaginationAria}>
            <span className="assoc-pagination__label">{t.assocPaginationPage}</span>
            <div className="assoc-pagination__tabs">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                <button
                  key={n}
                  type="button"
                  className={"assoc-tab assoc-tab--page" + (page === n ? " assoc-tab--active" : "")}
                  aria-pressed={page === n}
                  aria-current={page === n ? "page" : undefined}
                  onClick={() => setPage(n)}
                >
                  {n}
                </button>
              ))}
            </div>
          </nav>
        ) : null}
      </div>

      {filtered.length === 0 ? (
        <p className="assoc-empty glass panel">{t.assocEmpty}</p>
      ) : (
        <div className="assoc-grid">
          {pageItems.map((item) => (
            <AssociationCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </>
  );
}

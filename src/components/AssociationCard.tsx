import type { AssociationEntry } from "../content/types";

type Props = {
  item: AssociationEntry;
};

export function AssociationCard({ item }: Props) {
  const hasImage = Boolean(item.cover.src);
  const meta = item.meta?.trim() || null;
  const titleId = `assoc-title-${item.id}`;
  const rootClass = ["assoc-card", !item.href ? "assoc-card--static" : "", !hasImage ? "assoc-card--nophoto" : ""]
    .filter(Boolean)
    .join(" ");

  const body = (
    <>
      <div className="assoc-card__media">
        {hasImage ? (
          <img src={item.cover.src!} alt={item.cover.alt} loading="lazy" />
        ) : null}
        <div className="assoc-card__scrim" aria-hidden />
      </div>
      <div className="assoc-card__content">
        <h2 className="assoc-card__title" id={titleId}>
          {item.title}
        </h2>
        <p className="assoc-card__desc">{item.description}</p>
        <div className="assoc-card__hover" aria-hidden="true">
          {item.href ? (
            <span className="assoc-card__btn">Подробнее</span>
          ) : (
            <span className="assoc-card__btn assoc-card__btn--muted">Ссылка появится позже</span>
          )}
          {meta ? <p className="assoc-card__meta">{meta}</p> : null}
        </div>
      </div>
    </>
  );

  if (item.href) {
    return (
      <a
        className={rootClass}
        href={item.href}
        target="_blank"
        rel="noreferrer"
        aria-labelledby={titleId}
      >
        {body}
      </a>
    );
  }

  return (
    <article className={rootClass} aria-labelledby={titleId}>
      {body}
    </article>
  );
}

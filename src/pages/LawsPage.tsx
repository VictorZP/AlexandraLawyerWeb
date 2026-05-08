import { useSiteContent } from "../content/useSiteContent";

export function LawsPage() {
  const laws = useSiteContent().laws;
  const articles = [...laws.articles].sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    <div className="topic-page laws-page">
      <header className="panel glass topic-page__header">
        <h1 className="page-title">{laws.pageTitle}</h1>
        <p className="page-lead topic-page__lead">{laws.lead}</p>
      </header>

      <div className="laws-articles" aria-label="Блоки о законах">
        {articles.map((art) => (
          <article key={art.id} className="panel glass law-block">
            <h2 className="law-block__title">{art.title}</h2>
            {art.sourceUrl.trim() ? (
              <p className="law-block__link-wrap">
                <a className="law-block__link" href={art.sourceUrl.trim()} target="_blank" rel="noreferrer">
                  {art.sourceUrl.trim()}
                </a>
              </p>
            ) : null}
            {art.facts.some((f) => f.trim()) ? (
              <ul className="law-block__facts">
                {art.facts
                  .map((f) => f.trim())
                  .filter(Boolean)
                  .map((f, i) => (
                    <li key={i}>{f}</li>
                  ))}
              </ul>
            ) : null}
          </article>
        ))}
      </div>
    </div>
  );
}

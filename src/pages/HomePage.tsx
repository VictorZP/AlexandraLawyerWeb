import { Link } from "react-router-dom";
import { MediaSlot } from "../components/MediaSlot";
import { useSiteContent } from "../content/useSiteContent";

export function HomePage() {
  const { home } = useSiteContent();
  const tiles = [...home.sectionTiles].sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    <>
      <section className="hero">
        <div className="panel glass hero-intro">
          <h1 className="hero__accent">
            {home.headlineMain}{" "}
            {home.headlineAccent ? <em>{home.headlineAccent}</em> : null}
          </h1>
          <p className="hero__text">{home.lead}</p>
          <div className="hero__actions">
            <Link className="btn btn--primary" to="/emigration">
              Эмиграция
            </Link>
            <Link className="btn btn--ghost" to="/associations">
              Ассоциации
            </Link>
          </div>
        </div>
        <div className="panel glass hero-card">
          <div className="hero-card__inner">
            <p className="hero-card__label">{home.panelTitle}</p>
            <p>{home.panelBody}</p>
          </div>
        </div>
      </section>

      <section className="home-sections" aria-labelledby="home-sections-title">
        <h2 id="home-sections-title" className="section-heading">
          Разделы сайта
        </h2>
        <ul className="section-grid">
          {tiles.map((t) => (
            <li key={t.id}>
              <Link className="section-tile glass" to={t.path}>
                <span className="section-tile__title">{t.title}</span>
                <span className="section-tile__hint">{t.hint}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {home.illustration ? (
        <div className="panel glass home-illustration decorative-illustration">
          {home.illustrationHeading ? (
            <p className="hero-card__label">{home.illustrationHeading}</p>
          ) : null}
          <MediaSlot
            media={home.illustration}
            emptyLabel="Изображение для главной — задаётся в админке (URL и подпись)."
            imgClassName=""
          />
        </div>
      ) : null}
    </>
  );
}

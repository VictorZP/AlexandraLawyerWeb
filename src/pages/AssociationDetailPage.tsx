import { Link, Navigate, useParams } from "react-router-dom";
import { MediaSlot } from "../components/MediaSlot";
import { useSiteContent } from "../content/useSiteContent";
import { useLocale } from "../i18n/LocaleProvider";

export function AssociationDetailPage() {
  const { t } = useLocale();
  const { slug } = useParams<{ slug: string }>();
  const site = useSiteContent();
  const detail = site.associations.details.find((d) => d.slug === slug);

  if (!slug || !detail) {
    return <Navigate to="/associations" replace />;
  }

  const embed = detail.videoEmbedUrl?.trim();

  return (
    <>
      <p className="assoc-detail-back">
        <Link to="/associations">{t.detailBack}</Link>
      </p>
      <header className="assoc-detail-header glass panel">
        <h1 className="page-title">{detail.title}</h1>
        <p className="page-lead">{detail.lead}</p>
        <div className="assoc-detail-header__actions">
          <a className="btn btn--primary" href={detail.externalUrl} target="_blank" rel="noreferrer">
            {t.detailSite}
          </a>
        </div>
      </header>

      <div className="panel glass topic-body">
        {detail.paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>

      {detail.gallery.filter((g) => g.src).length > 0 ? (
        <section className="assoc-detail-gallery" aria-label={t.detailPhotosAria}>
          <h2 className="section-heading">{t.detailPhotosHeading}</h2>
          <ul className="assoc-detail-gallery__grid">
            {detail.gallery
              .filter((m) => m.src)
              .map((m, i) => (
                <li key={i}>
                  <MediaSlot media={m} emptyLabel={t.detailNoImage} />
                </li>
              ))}
          </ul>
        </section>
      ) : null}

      {embed ? (
        <div className="panel glass assoc-detail-video">
          <h2 className="section-heading">{t.detailVideo}</h2>
          <div className="assoc-detail-video__frame">
            <iframe title={t.detailIframeTitle} src={embed} allowFullScreen loading="lazy" />
          </div>
        </div>
      ) : null}
    </>
  );
}

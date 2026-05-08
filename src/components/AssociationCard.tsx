import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import type { AssociationEntry } from "../content/types";
import { useLocale } from "../i18n/LocaleProvider";

type Props = {
  item: AssociationEntry;
};

export function AssociationCard({ item }: Props) {
  const { t } = useLocale();
  const animRef = useRef<HTMLDivElement>(null);
  const articleRef = useRef<HTMLElement>(null);
  const [entered, setEntered] = useState(false);
  const slides = item.gallery.filter((m) => m.src);
  const [index, setIndex] = useState(0);
  const n = slides.length;
  const indexSafe = n === 0 ? 0 : index % n;
  const current = n > 0 ? slides[indexSafe] : null;
  const titleId = `assoc-title-${item.id}`;

  const blurIfInsideCard = useCallback(() => {
    const root = articleRef.current;
    const ae = document.activeElement;
    if (root && ae instanceof HTMLElement && root.contains(ae)) {
      ae.blur();
    }
  }, []);

  const go = useCallback(
    (dir: -1 | 1) => (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (n < 2) return;
      setIndex((i) => (i + dir + n * 10) % n);
    },
    [n],
  );

  const onCarouselKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (n < 2) return;
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        setIndex((i) => (i - 1 + n * 10) % n);
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        setIndex((i) => (i + 1) % n);
      }
    },
    [n],
  );

  useEffect(() => {
    const el = animRef.current;
    if (!el) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) {
      setEntered(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setEntered(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const specs =
    item.specs.length >= 3
      ? item.specs.slice(0, 3)
      : [
          ...item.specs,
          ...Array.from({ length: 3 - item.specs.length }, () => ({ label: "—", value: "—" })),
        ];

  const rootClass = "assoc-card" + (n === 0 ? " assoc-card--nophoto" : "");

  return (
    <div
      ref={animRef}
      className={"assoc-card-anim" + (entered ? " assoc-card-anim--entered" : "")}
    >
      <article
        ref={articleRef}
        className={rootClass}
        aria-labelledby={titleId}
        onMouseLeave={blurIfInsideCard}
      >
        <div className="assoc-card__media">
          <div className="assoc-card__media-inner">
            {current?.src ? <img src={current.src} alt={current.alt} className="img-parallax" loading="lazy" /> : null}
            <div className="assoc-card__scrim" aria-hidden />
          </div>
        </div>

        <div className="assoc-card__baseline">
          <h2 className="assoc-card__title" id={titleId}>
            {item.title}
          </h2>
          <p className="assoc-card__desc">{item.description}</p>
        </div>

        <div className="assoc-card__overlay">
          <div className="assoc-card__overlay-inner">
            <p className="assoc-card__overlay-intro">{item.hoverIntro}</p>
            <div className="assoc-card__actions">
              <Link className="assoc-card__cta" to={`/associations/${item.slug}`}>
                {t.assocMore}
              </Link>
              {item.externalUrl ? (
                <a className="assoc-card__cta assoc-card__cta--external" href={item.externalUrl} target="_blank" rel="noreferrer">
                  {t.assocWebsite}
                </a>
              ) : (
                <span className="assoc-card__cta assoc-card__cta--disabled">{t.assocWebsiteAdmin}</span>
              )}
            </div>
            <div className="assoc-card__specs">
              {specs.map((s, i) => (
                <div key={i} className="assoc-card__spec">
                  <span className="assoc-card__spec-label">{s.label}</span>
                  <span className="assoc-card__spec-value">{s.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {n > 1 ? (
          <div
            className="assoc-card__carousel-ui"
            tabIndex={0}
            onKeyDown={onCarouselKeyDown}
            role="toolbar"
            aria-label={t.assocGalleryToolbar}
          >
            <button type="button" className="assoc-card__carousel-btn" aria-label={t.carouselPrev} onClick={go(-1)}>
              ‹
            </button>
            <button type="button" className="assoc-card__carousel-btn" aria-label={t.carouselNext} onClick={go(1)}>
              ›
            </button>
            <div className="assoc-card__dots" aria-hidden>
              {slides.map((_, i) => (
                <span key={i} className={"assoc-card__dot" + (i === index % n ? " assoc-card__dot--on" : "")} />
              ))}
            </div>
          </div>
        ) : null}
      </article>
    </div>
  );
}

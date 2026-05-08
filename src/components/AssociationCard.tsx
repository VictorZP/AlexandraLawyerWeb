import { useEffect, useRef, useState } from "react";
import type { AssociationEntry } from "../content/types";

type Props = {
  item: AssociationEntry;
};

export function AssociationCard({ item }: Props) {
  const animRef = useRef<HTMLDivElement>(null);
  const [entered, setEntered] = useState(false);
  const hasImage = Boolean(item.cover.src);
  const titleId = `assoc-title-${item.id}`;
  const rootClass = ["assoc-card", !item.href ? "assoc-card--static" : "", !hasImage ? "assoc-card--nophoto" : ""]
    .filter(Boolean)
    .join(" ");

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

  useEffect(() => {
    const el = animRef.current;
    if (!el) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onScroll = () => {
      if (mq.matches) {
        el.style.setProperty("--px-text", "0px");
        el.style.setProperty("--px-img", "0px");
        return;
      }
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const norm = (rect.top + rect.height / 2 - vh / 2) / vh;
      el.style.setProperty("--px-text", `${(norm * 20).toFixed(2)}px`);
      el.style.setProperty("--px-img", `${(-norm * 14).toFixed(2)}px`);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const specs =
    item.specs.length >= 3
      ? item.specs.slice(0, 3)
      : [
          ...item.specs,
          ...Array.from({ length: 3 - item.specs.length }, () => ({ label: "—", value: "—" })),
        ];

  const cardInner = (
    <>
      <div className="assoc-card__media">
        <div className="assoc-card__media-inner">
          {hasImage ? (
            <img src={item.cover.src!} alt={item.cover.alt} loading="lazy" />
          ) : null}
          <div className="assoc-card__scrim" aria-hidden />
        </div>
      </div>

      <div className="assoc-card__baseline">
        <h2 className="assoc-card__title" id={titleId}>
          {item.title}
        </h2>
        <p className="assoc-card__desc">{item.description}</p>
      </div>

      <div className="assoc-card__overlay" role="presentation">
        <p className="assoc-card__overlay-intro">{item.hoverIntro}</p>
        {item.href ? (
          <span className="assoc-card__btn">Подробнее</span>
        ) : (
          <span className="assoc-card__btn assoc-card__btn--muted">Ссылка появится позже</span>
        )}
        <div className="assoc-card__specs">
          {specs.map((s, i) => (
            <div key={i} className="assoc-card__spec">
              <span className="assoc-card__spec-label">{s.label}</span>
              <span className="assoc-card__spec-value">{s.value}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );

  return (
    <div
      ref={animRef}
      className={"assoc-card-anim" + (entered ? " assoc-card-anim--entered" : "")}
    >
      {item.href ? (
        <a
          className={rootClass}
          href={item.href}
          target="_blank"
          rel="noreferrer"
          aria-labelledby={titleId}
        >
          {cardInner}
        </a>
      ) : (
        <article className={rootClass} aria-labelledby={titleId}>
          {cardInner}
        </article>
      )}
    </div>
  );
}

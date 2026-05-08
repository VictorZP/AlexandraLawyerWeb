import type { MediaRef } from "../content/types";

type Props = {
  media: MediaRef | null;
  /** Подпись к пустому слоту */
  emptyLabel: string;
  className?: string;
  imgClassName?: string;
};

export function MediaSlot({ media, emptyLabel, className = "", imgClassName = "" }: Props) {
  if (!media?.src) {
    return (
      <div className={`media-slot media-slot--empty ${className}`.trim()} role="img" aria-label={emptyLabel}>
        <span className="media-slot__placeholder">{emptyLabel}</span>
      </div>
    );
  }

  return (
    <figure className={`media-slot ${className}`.trim()}>
      <img className={`img-parallax ${imgClassName}`.trim()} src={media.src} alt={media.alt} loading="lazy" />
      {media.caption ? <figcaption className="media-slot__caption">{media.caption}</figcaption> : null}
    </figure>
  );
}

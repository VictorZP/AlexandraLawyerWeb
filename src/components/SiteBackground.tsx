type Props = {
  imageUrl: string | null;
  videoUrl: string | null;
  posterUrl: string | null;
};

/** Полноэкранный фон за стеклянным интерфейсом: приоритет у видео, иначе фото (img + fetchPriority для ранней загрузки). */
export function SiteBackground({ imageUrl, videoUrl, posterUrl }: Props) {
  const hasVideo = Boolean(videoUrl);
  const hasImage = Boolean(imageUrl);

  return (
    <div className="site-bg" aria-hidden>
      <div className="site-bg__parallax">
        {hasVideo && videoUrl ? (
          <video
            className="site-bg__video"
            src={videoUrl}
            poster={posterUrl ?? undefined}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          />
        ) : hasImage ? (
          <img
            className="site-bg__image"
            src={imageUrl!}
            alt=""
            decoding="async"
            fetchPriority="high"
          />
        ) : (
          <div className="site-bg__fallback" />
        )}
      </div>
      <div className="site-bg__veil" />
    </div>
  );
}

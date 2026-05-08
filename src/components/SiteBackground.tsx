type Props = {
  imageUrl: string | null;
};

/** Полноэкранный фон за стеклянным интерфейсом */
export function SiteBackground({ imageUrl }: Props) {
  return (
    <div className="site-bg" aria-hidden>
      {imageUrl ? (
        <>
          <div className="site-bg__image" style={{ backgroundImage: `url(${imageUrl})` }} />
          <div className="site-bg__veil" />
        </>
      ) : (
        <div className="site-bg__fallback" />
      )}
    </div>
  );
}

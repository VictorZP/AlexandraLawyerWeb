import type { MediaRef, PageBackdropFields, SiteContent } from "../content/types";

export type ResolvedBackdrop = {
  imageUrl: string | null;
  videoUrl: string | null;
  posterUrl: string | null;
};

function mediaSrc(ref: MediaRef | null | undefined): string | null {
  const s = ref?.src?.trim();
  return s ? s : null;
}

function fromFields(fields: PageBackdropFields | null | undefined): ResolvedBackdrop {
  if (!fields) {
    return { imageUrl: null, videoUrl: null, posterUrl: null };
  }
  return {
    imageUrl: mediaSrc(fields.pageBackground),
    videoUrl: mediaSrc(fields.pageBackgroundVideo),
    posterUrl: mediaSrc(fields.pageBackgroundVideoPoster),
  };
}

/** Фон страницы по URL: фото и/или видео из контента / админки */
export function resolvePageBackdrop(pathname: string, site: SiteContent): ResolvedBackdrop {
  const detailMatch = pathname.match(/^\/associations\/([^/]+)$/);
  if (detailMatch && detailMatch[1] !== "") {
    const slug = detailMatch[1];
    const detail = site.associations.details.find((d) => d.slug === slug);
    const listFields = site.associations;
    if (detail) {
      const d = fromFields(detail);
      const l = fromFields(listFields);
      return {
        imageUrl: d.imageUrl ?? l.imageUrl,
        videoUrl: d.videoUrl,
        posterUrl: d.posterUrl,
      };
    }
    return fromFields(listFields);
  }

  switch (pathname) {
    case "/":
      return fromFields(site.home);
    case "/emigration":
      return fromFields(site.emigration);
    case "/business":
      return fromFields(site.business);
    case "/talent-passport":
      return fromFields(site.talentPassport);
    case "/laws":
      return fromFields(site.laws);
    case "/associations":
      return fromFields(site.associations);
    default:
      return fromFields(site.home);
  }
}

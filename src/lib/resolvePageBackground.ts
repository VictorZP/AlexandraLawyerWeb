import type { MediaRef, SiteContent } from "../content/types";

/** Фон страницы по URL — поля из контента / админки */
export function resolvePageBackground(pathname: string, site: SiteContent): MediaRef | null {
  const detailMatch = pathname.match(/^\/associations\/([^/]+)$/);
  if (detailMatch && detailMatch[1] !== "") {
    const slug = detailMatch[1];
    const detail = site.associations.details.find((d) => d.slug === slug);
    if (detail?.pageBackground?.src) return detail.pageBackground;
    return site.associations.pageBackground ?? null;
  }

  switch (pathname) {
    case "/":
      return site.home.pageBackground;
    case "/emigration":
      return site.emigration.pageBackground ?? null;
    case "/business":
      return site.business.pageBackground ?? null;
    case "/talent-passport":
      return site.talentPassport.pageBackground ?? null;
    case "/laws":
      return site.laws.pageBackground ?? null;
    case "/associations":
      return site.associations.pageBackground ?? null;
    default:
      return site.home.pageBackground;
  }
}

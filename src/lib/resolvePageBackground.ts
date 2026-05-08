import type { MediaRef, SiteContent } from "../content/types";

/** Фон страницы по URL — те же поля выставляются в админке для каждого раздела. */
export function resolvePageBackground(pathname: string, site: SiteContent): MediaRef | null {
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

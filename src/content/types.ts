/**
 * Контент сайта = контракт для фронта и админки (одинаковая структура сущностей).
 */

export type MediaRef = {
  src: string | null;
  alt: string;
  caption?: string | null;
};

export type HomeSectionTile = {
  id: string;
  path: string;
  title: string;
  hint: string;
  sortOrder: number;
};

export type HomeBlock = {
  pageBackground: MediaRef | null;
  headlineMain: string;
  headlineAccent: string | null;
  lead: string;
  panelTitle: string;
  panelBody: string;
  illustrationHeading: string | null;
  illustration: MediaRef | null;
  sectionTiles: HomeSectionTile[];
};

export type TopicPageBlock = {
  pageBackground: MediaRef | null;
  pageTitle: string;
  lead: string;
  paragraphs: string[];
};

export type AssociationSpec = {
  label: string;
  value: string;
};

export type AssociationFilterTab = {
  id: string;
  label: string;
};

/** Карточка в каталоге: галерея на карточке, slug внутренней страницы, внешний сайт */
export type AssociationEntry = {
  id: string;
  /** URL-часть: /associations/:slug */
  slug: string;
  sortOrder: number;
  title: string;
  description: string;
  hoverIntro: string;
  specs: AssociationSpec[];
  /** Сайт организации — кнопка «Сайт ассоциации» */
  externalUrl: string | null;
  /** 3–5 фото для карусели (админка: CRUD элементов массива) */
  gallery: MediaRef[];
  regionId: string;
  categoryId: string;
};

/** Внутренняя страница «Подробнее» — тот же slug, что у карточки */
export type AssociationDetailPageBlock = {
  slug: string;
  pageBackground: MediaRef | null;
  title: string;
  lead: string;
  paragraphs: string[];
  gallery: MediaRef[];
  externalUrl: string;
  /** Например, embed YouTube — URL для iframe */
  videoEmbedUrl?: string | null;
};

export type AssociationsPageBlock = {
  pageBackground: MediaRef | null;
  pageTitle: string;
  lead: string;
  itemsPerPage: number;
  regionTabs: AssociationFilterTab[];
  categoryTabs: AssociationFilterTab[];
  items: AssociationEntry[];
  details: AssociationDetailPageBlock[];
};

export type SiteContent = {
  home: HomeBlock;
  emigration: TopicPageBlock;
  business: TopicPageBlock;
  talentPassport: TopicPageBlock;
  laws: TopicPageBlock;
  associations: AssociationsPageBlock;
};

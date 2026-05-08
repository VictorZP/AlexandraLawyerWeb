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

/** Общие поля фона страницы: статичное фото и/или зацикленное видео без звука (приоритет у видео) */
export type PageBackdropFields = {
  pageBackground: MediaRef | null;
  /** Файл видео (URL после загрузки в админке); MP4/WebM, без звука, зацикливается */
  pageBackgroundVideo: MediaRef | null;
  /** Кадр до старта видео (рекомендуется при видео) */
  pageBackgroundVideoPoster: MediaRef | null;
};

export type HomeBlock = PageBackdropFields & {
  headlineMain: string;
  headlineAccent: string | null;
  lead: string;
  panelTitle: string;
  panelBody: string;
  illustrationHeading: string | null;
  illustration: MediaRef | null;
  sectionTiles: HomeSectionTile[];
};

export type TopicPageBlock = PageBackdropFields & {
  pageTitle: string;
  lead: string;
  paragraphs: string[];
};

/** Блок на странице «Законы»: название, ссылка на текст, тезисы */
export type LawArticleBlock = {
  id: string;
  sortOrder: number;
  title: string;
  sourceUrl: string;
  facts: string[];
};

export type LawsPageBlock = PageBackdropFields & {
  pageTitle: string;
  lead: string;
  articles: LawArticleBlock[];
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
export type AssociationDetailPageBlock = PageBackdropFields & {
  slug: string;
  title: string;
  lead: string;
  paragraphs: string[];
  gallery: MediaRef[];
  externalUrl: string;
  /** Например, embed YouTube — URL для iframe */
  videoEmbedUrl?: string | null;
};

export type AssociationsPageBlock = PageBackdropFields & {
  pageTitle: string;
  lead: string;
  itemsPerPage: number;
  regionTabs: AssociationFilterTab[];
  categoryTabs: AssociationFilterTab[];
  items: AssociationEntry[];
  details: AssociationDetailPageBlock[];
};

export type SiteContent = {
  /**
   * Текст подсказки для админки: форматы и разрешения фото/видео фона,
   * чтобы изображение оставалось чётким (не растягивать маленькие файлы).
   */
  adminMediaGuidance: string;
  home: HomeBlock;
  emigration: TopicPageBlock;
  business: TopicPageBlock;
  talentPassport: TopicPageBlock;
  laws: LawsPageBlock;
  associations: AssociationsPageBlock;
};

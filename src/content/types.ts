/**
 * Контент сайта = контракт для фронта и будущей админки (те же сущности и поля).
 */

export type MediaRef = {
  src: string | null;
  alt: string;
  caption?: string | null;
};

/** Карточка на главной — ведёт на раздел */
export type HomeSectionTile = {
  id: string;
  path: string;
  title: string;
  hint: string;
  sortOrder: number;
};

export type HomeBlock = {
  /** Полноэкранный фон за стеклянными блоками */
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

/** Три характеристики внизу оверлея (как «этажи / м² / спальни» в референсе) */
export type AssociationSpec = {
  label: string;
  value: string;
};

export type AssociationFilterTab = {
  id: string;
  label: string;
};

export type AssociationEntry = {
  id: string;
  sortOrder: number;
  title: string;
  /** Короткая строка под названием на карточке (всегда видна) */
  description: string;
  /** Развёрнутый текст в прозрачном оверлее над кнопкой «Подробнее» */
  hoverIntro: string;
  /** Ровно три поля для нижней строки оверлея */
  specs: AssociationSpec[];
  href: string | null;
  cover: MediaRef;
  regionId: string;
  categoryId: string;
};

export type AssociationsPageBlock = {
  pageBackground: MediaRef | null;
  pageTitle: string;
  lead: string;
  /** Сколько карточек на одной странице каталога */
  itemsPerPage: number;
  regionTabs: AssociationFilterTab[];
  categoryTabs: AssociationFilterTab[];
  items: AssociationEntry[];
};

export type SiteContent = {
  home: HomeBlock;
  emigration: TopicPageBlock;
  business: TopicPageBlock;
  talentPassport: TopicPageBlock;
  laws: TopicPageBlock;
  associations: AssociationsPageBlock;
};

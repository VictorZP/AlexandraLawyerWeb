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
  pageTitle: string;
  lead: string;
  paragraphs: string[];
};

export type AssociationFilterTab = {
  id: string;
  label: string;
};

export type AssociationEntry = {
  id: string;
  sortOrder: number;
  title: string;
  /** Короткая строка под названием (как подзаголовок на woodlandhouse) */
  description: string;
  /** Сайт ассоциации или страница подробнее */
  href: string | null;
  cover: MediaRef;
  regionId: string;
  categoryId: string;
  /** Метаданные внизу карточки при наведении: город, год, тип */
  meta: string | null;
};

export type AssociationsPageBlock = {
  pageTitle: string;
  lead: string;
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

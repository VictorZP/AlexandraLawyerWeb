import type { SiteContent } from "./types";

export const defaultSiteContent: SiteContent = {
  home: {
    headlineMain: "Юридическая работа во Франции —",
    headlineAccent: "спокойно и по правилам",
    lead:
      "Материалы для русскоговорящих: эмиграция, бизнес, Passeport Talent, разбор норм и каталог русскоязычных ассоциаций. Без громких обещаний — опора на закон и практику.",
    panelTitle: "Для кого сайт",
    panelBody:
      "Для тех, кто живёт во Франции или переезжает, ведёт бизнес или учится. Тон — деловой, цвета сдержанные: тёмный фон и тёплый акцент, без «инфобизнес-неона».",
    illustrationHeading: "Настроение бренда",
    illustration: {
      src: null,
      alt: "Иллюстрация или фото — из админки",
      caption: null,
    },
    sectionTiles: [
      {
        id: "tile-emigration",
        sortOrder: 10,
        path: "/emigration",
        title: "Эмиграция во Францию",
        hint: "ВНЖ, статусы, префектуры, быт процедуры",
      },
      {
        id: "tile-business",
        sortOrder: 20,
        path: "/business",
        title: "Бизнес во Франции",
        hint: "ИП, компании, налоги и администрирование",
      },
      {
        id: "tile-talent",
        sortOrder: 30,
        path: "/talent-passport",
        title: "Паспорт талант Франция",
        hint: "Passeport Talent: основания и пакет документов",
      },
      {
        id: "tile-laws",
        sortOrder: 40,
        path: "/laws",
        title: "Интересные ЗАКОНЫ Франции",
        hint: "Заметки о нормах простым языком",
      },
      {
        id: "tile-assoc",
        sortOrder: 50,
        path: "/associations",
        title: "Русскоговорящие ассоциации",
        hint: "Каталог объединений по городам и темам",
      },
    ],
  },
  emigration: {
    pageTitle: "Эмиграция во Францию",
    lead:
      "Раздел готовится к наполнению из админки: статьи, чек-листы и ответы на частые вопросы по легализации и жизни во Франции.",
    paragraphs: [
      "Здесь будет структурированный контент о видах ВНЖ, сроках, префектурах, языке и типичных ошибках при подаче.",
      "Тексты и заголовок страницы будут редактироваться в той же модели, что и на сайте (один объект «страница эмиграции»).",
    ],
  },
  business: {
    pageTitle: "Бизнес во Франции",
    lead: "Корпоративное и предпринимательское право, налоги, регистрация — материалы раздела подключатся из CMS.",
    paragraphs: [
      "Планируются обзоры форм деятельности, обязательных шагов после регистрации и ссылок на официальные источники.",
    ],
  },
  talentPassport: {
    pageTitle: "Паспорт талант Франция",
    lead: "Отдельный раздел под программу Passeport Talent и смежные статусы.",
    paragraphs: [
      "Сюда вынесем разбор категорий, требований к контракту и доказательствам квалификации, сроков и продлений.",
    ],
  },
  laws: {
    pageTitle: "Интересные ЗАКОНЫ Франции",
    lead: "Подборка норм и ситуаций, которые полезно понимать в быту и в работе.",
    paragraphs: [
      "Формат — короткие заметки с отсылкой к статьям кодексов или официальным разъяснениям, без замены индивидуальной консультации.",
    ],
  },
  associations: {
    pageTitle: "Русскоговорящие ассоциации во Франции",
    lead:
      "Каталог объединений: при наведении на карточку — кнопка «Подробнее» и строка с деталями. Фильтры и карточки полностью управляются из админки (как на сайте).",
    regionTabs: [
      { id: "all", label: "Все регионы" },
      { id: "paris", label: "Париж" },
      { id: "lyon", label: "Лион" },
      { id: "nice", label: "Ницца" },
      { id: "other", label: "Другие" },
    ],
    categoryTabs: [
      { id: "all", label: "Все типы" },
      { id: "culture", label: "Культура" },
      { id: "business", label: "Бизнес" },
      { id: "social", label: "Социальные" },
    ],
    items: [
      {
        id: "assoc-1",
        sortOrder: 10,
        title: "Русский Дом в Париже",
        description: "Культурные мероприятия и поддержка адаптации для семей.",
        href: null,
        regionId: "paris",
        categoryId: "culture",
        meta: "Париж · культура · с 2010-х",
        cover: {
          src: null,
          alt: "Фото или логотип ассоциации",
          caption: null,
        },
      },
      {
        id: "assoc-2",
        sortOrder: 20,
        title: "Деловой клуб «Правая берега»",
        description: "Нетворкинг и юридико-налоговые встречи для предпринимателей.",
        href: null,
        regionId: "paris",
        categoryId: "business",
        meta: "Париж · бизнес",
        cover: { src: null, alt: "Обложка карточки", caption: null },
      },
      {
        id: "assoc-3",
        sortOrder: 30,
        title: "Ассоциация «Новый Лион»",
        description: "Социальные проекты, языковые клубы, помощь новичкам.",
        href: null,
        regionId: "lyon",
        categoryId: "social",
        meta: "Лион · социальные проекты",
        cover: { src: null, alt: "Обложка карточки", caption: null },
      },
      {
        id: "assoc-4",
        sortOrder: 40,
        title: "Центр славянской культуры",
        description: "Концерты, школы субботы, праздники для детей и взрослых.",
        href: null,
        regionId: "nice",
        categoryId: "culture",
        meta: "Ницца · культура",
        cover: { src: null, alt: "Обложка карточки", caption: null },
      },
      {
        id: "assoc-5",
        sortOrder: 50,
        title: "Франко-российская торговая палата",
        description: "Деловые миссии, экспорт, сопровождение контрактов.",
        href: null,
        regionId: "paris",
        categoryId: "business",
        meta: "Париж · бизнес · B2B",
        cover: { src: null, alt: "Обложка карточки", caption: null },
      },
      {
        id: "assoc-6",
        sortOrder: 60,
        title: "Объединение семей «Дорога домой»",
        description: "Психологическая поддержка, правовые семинары онлайн.",
        href: null,
        regionId: "other",
        categoryId: "social",
        meta: "Онлайн + выездные встречи",
        cover: { src: null, alt: "Обложка карточки", caption: null },
      },
    ],
  },
};

export function getSiteContent(): SiteContent {
  return defaultSiteContent;
}

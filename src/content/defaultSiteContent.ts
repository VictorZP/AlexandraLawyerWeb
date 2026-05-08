import type { SiteContent } from "./types";

const u = (id: string, w = 2000) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=75`;

export const defaultSiteContent: SiteContent = {
  home: {
    pageBackground: {
      src: u("photo-1431274172761-fca41d930e6f"),
      alt: "",
      caption: null,
    },
    headlineMain: "Юридическая работа во Франции —",
    headlineAccent: "спокойно и по правилам",
    lead:
      "Материалы для русскоговорящих: эмиграция, бизнес, Passeport Talent, разбор норм и каталог русскоязычных ассоциаций. Без громких обещаний — опора на закон и практику.",
    panelTitle: "Для кого сайт",
    panelBody:
      "Для тех, кто живёт во Франции или переезжает, ведёт бизнес или учится. Спокойная подача и прозрачные блоки на фоне — без «инфобизнес-неона».",
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
    pageBackground: {
      src: u("photo-1488646959804-013271964cdf"),
      alt: "",
      caption: null,
    },
    pageTitle: "Эмиграция во Францию",
    lead:
      "Раздел готовится к наполнению из админки: статьи, чек-листы и ответы на частые вопросы по легализации и жизни во Франции.",
    paragraphs: [
      "Здесь будет структурированный контент о видах ВНЖ, сроках, префектурах, языке и типичных ошибках при подаче.",
      "Тексты и заголовок страницы будут редактироваться в той же модели, что и на сайте (один объект «страница эмиграции»).",
    ],
  },
  business: {
    pageBackground: {
      src: u("photo-1497366216548-37526070297c"),
      alt: "",
      caption: null,
    },
    pageTitle: "Бизнес во Франции",
    lead: "Корпоративное и предпринимательское право, налоги, регистрация — материалы раздела подключатся из CMS.",
    paragraphs: [
      "Планируются обзоры форм деятельности, обязательных шагов после регистрации и ссылок на официальные источники.",
    ],
  },
  talentPassport: {
    pageBackground: {
      src: u("photo-1502602898536-47ce93c7a421"),
      alt: "",
      caption: null,
    },
    pageTitle: "Паспорт талант Франция",
    lead: "Отдельный раздел под программу Passeport Talent и смежные статусы.",
    paragraphs: [
      "Сюда вынесем разбор категорий, требований к контракту и доказательствам квалификации, сроков и продлений.",
    ],
  },
  laws: {
    pageBackground: {
      src: u("photo-1481627834876-b7833e8f5570"),
      alt: "",
      caption: null,
    },
    pageTitle: "Интересные ЗАКОНЫ Франции",
    lead: "Подборка норм и ситуаций, которые полезно понимать в быту и в работе.",
    paragraphs: [
      "Формат — короткие заметки с отсылкой к статьям кодексов или официальным разъяснениям, без замены индивидуальной консультации.",
    ],
  },
  associations: {
    pageBackground: {
      src: u("photo-1529156069898-49953e39b3ac"),
      alt: "",
      caption: null,
    },
    pageTitle: "Русскоговорящие ассоциации во Франции",
    lead:
      "Каталог объединений: при наведении — прозрачный оверлей с описанием, кнопкой и тремя характеристиками. Фон страницы и карточки задаются в контенте.",
    itemsPerPage: 4,
    regionTabs: [
      { id: "all", label: "Все регионы" },
      { id: "paris", label: "Париж" },
      { id: "lyon", label: "Лион" },
      { id: "nice", label: "Ницца" },
      { id: "other", label: "Другие" },
    ],
    categoryTabs: [
      { id: "all", label: "Все сферы" },
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
        hoverIntro:
          "Некоммерческое объединение: концерты, лекции, детские программы и помощь новым резидентам в адаптации к жизни в столице.",
        specs: [
          { label: "Город", value: "Париж" },
          { label: "Формат", value: "НКО / культура" },
          { label: "Аудитория", value: "Семьи" },
        ],
        href: "https://example.org/russian-house-paris",
        regionId: "paris",
        categoryId: "culture",
        cover: {
          src: u("photo-1514525253161-7a46d19cd819", 1200),
          alt: "Культурное мероприятие",
          caption: null,
        },
      },
      {
        id: "assoc-2",
        sortOrder: 20,
        title: "Деловой клуб «Правая берега»",
        description: "Нетворкинг и юридико-налоговые встречи для предпринимателей.",
        hoverIntro:
          "Закрытые и открытые встречи с экспертами по корпоративному праву и налогообложению во Франции; нетворкинг для предпринимателей.",
        specs: [
          { label: "Город", value: "Париж" },
          { label: "Фокус", value: "B2B" },
          { label: "Встречи", value: "Ежемесячно" },
        ],
        href: null,
        regionId: "paris",
        categoryId: "business",
        cover: { src: u("photo-1556761175-5973dc0f32e7", 1200), alt: "Деловая встреча", caption: null },
      },
      {
        id: "assoc-3",
        sortOrder: 30,
        title: "Ассоциация «Новый Лион»",
        description: "Социальные проекты, языковые клубы, помощь новичкам.",
        hoverIntro:
          "Волонтёрские инициативы, языковые клубы и сопровождение на первых шагах после переезда в регион Овернь-Рона-Альпы.",
        specs: [
          { label: "Город", value: "Лион" },
          { label: "Сфера", value: "Социальное" },
          { label: "Язык", value: "RU / FR" },
        ],
        href: null,
        regionId: "lyon",
        categoryId: "social",
        cover: { src: u("photo-1517245386807-bb43f82c33c4", 1200), alt: "Люди на встрече", caption: null },
      },
      {
        id: "assoc-4",
        sortOrder: 40,
        title: "Центр славянской культуры",
        description: "Концерты, школы субботы, праздники для детей и взрослых.",
        hoverIntro:
          "Сохранение культурных традиций: школа субботы, хореография, праздники; открытые мероприятия для местной общины.",
        specs: [
          { label: "Город", value: "Ницца" },
          { label: "Сфера", value: "Культура" },
          { label: "Формат", value: "Дети + взрослые" },
        ],
        href: null,
        regionId: "nice",
        categoryId: "culture",
        cover: { src: u("photo-1503095396549-807759245b35", 1200), alt: "Концертный зал", caption: null },
      },
      {
        id: "assoc-5",
        sortOrder: 50,
        title: "Франко-российская торговая палата",
        description: "Деловые миссии, экспорт, сопровождение контрактов.",
        hoverIntro:
          "Поддержка компаний при выходе на рынок: миссии, партнёрства, экспортно-импортные консультации и нетворкинг.",
        specs: [
          { label: "Город", value: "Париж" },
          { label: "Сфера", value: "Торговля" },
          { label: "Участники", value: "Компании" },
        ],
        href: null,
        regionId: "paris",
        categoryId: "business",
        cover: { src: u("photo-1454165804606-c3d57bc86b40", 1200), alt: "Переговоры", caption: null },
      },
      {
        id: "assoc-6",
        sortOrder: 60,
        title: "Объединение семей «Дорога домой»",
        description: "Психологическая поддержка, правовые семинары онлайн.",
        hoverIntro:
          "Группы поддержки для семей в переезде, вебинары по правовым и бытовым вопросам; часть мероприятий дистанционно.",
        specs: [
          { label: "Охват", value: "Франция" },
          { label: "Сфера", value: "Социальное" },
          { label: "Формат", value: "Онлайн + офлайн" },
        ],
        href: null,
        regionId: "other",
        categoryId: "social",
        cover: { src: u("photo-1522071820081-009f0129c71c", 1200), alt: "Команда онлайн", caption: null },
      },
    ],
  },
};

export function getSiteContent(): SiteContent {
  return defaultSiteContent;
}

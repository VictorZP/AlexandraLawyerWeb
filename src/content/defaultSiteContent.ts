import type { SiteContent } from "./types";

/** Фон страницы: нейтральное демо-фото по seed (picsum); в админке — свой URL */
const bg = (seed: string) => ({
  src: `https://picsum.photos/seed/${seed}/2000/1200`,
  alt: "",
  caption: null as string | null,
});

/** Галерея карточки: те же seed-и заменяются в админке на фото организации */
const ph = (seed: string, alt: string) => ({
  src: `https://picsum.photos/seed/${seed}/960/600`,
  alt,
  caption: null as string | null,
});

export const defaultSiteContent: SiteContent = {
  home: {
    pageBackground: bg("site-home"),
    headlineMain: "Юридическая работа во Франции —",
    headlineAccent: "спокойно и по правилам",
    lead:
      "Материалы для русскоговорящих: эмиграция, бизнес, Passeport Talent, разбор норм и каталог русскоязычных ассоциаций. Без громких обещаний — опора на закон и практику.",
    panelTitle: "Для кого сайт",
    panelBody:
      "Для тех, кто живёт во Франции или переезжает, ведёт бизнес или учится. Интерфейс — прозрачные панели поверх фотографии раздела (фон задаётся в админке для каждой страницы).",
    illustrationHeading: "Настроение бренда",
    illustration: { src: null, alt: "Иллюстрация — из админки", caption: null },
    sectionTiles: [
      { id: "tile-emigration", sortOrder: 10, path: "/emigration", title: "Эмиграция во Францию", hint: "ВНЖ, статусы, префектуры" },
      { id: "tile-business", sortOrder: 20, path: "/business", title: "Бизнес во Франции", hint: "ИП, компании, налоги" },
      { id: "tile-talent", sortOrder: 30, path: "/talent-passport", title: "Паспорт талант Франция", hint: "Passeport Talent" },
      { id: "tile-laws", sortOrder: 40, path: "/laws", title: "Интересные ЗАКОНЫ Франции", hint: "Нормы простым языком" },
      { id: "tile-assoc", sortOrder: 50, path: "/associations", title: "Русскоговорящие ассоциации", hint: "Каталог объединений" },
    ],
  },
  emigration: {
    pageBackground: bg("site-emigration"),
    pageTitle: "Эмиграция во Францию",
    lead: "Раздел для материалов о легализации и жизни во Франции — тексты и фон страницы из админки.",
    paragraphs: [
      "Здесь появятся статьи о видах ВНЖ, сроках, префектурах и типичных ошибках при подаче.",
      "Структура страницы повторяет объект в базе: заголовок, лид, абзацы, фон.",
    ],
  },
  business: {
    pageBackground: bg("site-business"),
    pageTitle: "Бизнес во Франции",
    lead: "Корпоративное и предпринимательское право — контент подключается из CMS.",
    paragraphs: ["Обзоры форм деятельности, налоги и ссылки на официальные источники."],
  },
  talentPassport: {
    pageBackground: bg("site-talent"),
    pageTitle: "Паспорт талант Франция",
    lead: "Программа Passeport Talent и смежные статусы.",
    paragraphs: ["Категории, контракт, доказательства квалификации, продления."],
  },
  laws: {
    pageBackground: bg("site-laws"),
    pageTitle: "Интересные ЗАКОНЫ Франции",
    lead: "Короткие заметки о нормах с отсылками к источникам.",
    paragraphs: ["Не заменяет индивидуальную консультацию."],
  },
  associations: {
    pageBackground: bg("site-associations"),
    pageTitle: "Русскоговорящие ассоциации во Франции",
    lead:
      "Организации с проверяемыми официальными сайтами (AFR, КСОРС, AAJFR, CLCR). Демо-фото — нейтральные заглушки picsum; ссылки и изображения заменяются в админке. На карточке: карусель, «Подробнее» — наша страница, «Сайт ассоциации» — внешняя ссылка (если задана).",
    itemsPerPage: 6,
    regionTabs: [
      { id: "all", label: "Все регионы" },
      { id: "paris", label: "Париж" },
      { id: "national", label: "Франция" },
    ],
    categoryTabs: [
      { id: "all", label: "Все сферы" },
      { id: "culture", label: "Культура / язык" },
      { id: "coord", label: "Координация" },
      { id: "law", label: "Право" },
    ],
    items: [
      {
        id: "assoc-afr",
        slug: "afr",
        sortOrder: 10,
        title: "Association française des russisants (AFR)",
        description: "Русский язык и культура для франкофонов: журнал, олимпиады, мероприятия.",
        hoverIntro:
          "AFR объединяет преподавателей и любителей русского языка во Франции, издаёт Revue Russe, проводит олимпиады и культурные события.",
        specs: [
          { label: "Сфера", value: "Образование" },
          { label: "Фокус", value: "Русский язык" },
          { label: "Сайт", value: "afr-russe.fr" },
        ],
        externalUrl: "https://www.afr-russe.fr/",
        gallery: [ph("afr-g1", "Фото 1"), ph("afr-g2", "Фото 2"), ph("afr-g3", "Фото 3"), ph("afr-g4", "Фото 4")],
        regionId: "national",
        categoryId: "culture",
      },
      {
        id: "assoc-csorf",
        slug: "csorf",
        sortOrder: 20,
        title: "Координационный совет российских соотечественников",
        description: "Координация русских общественных организаций во Франции.",
        hoverIntro:
          "КСОРС связывает соотечественнические объединения, публикует новости и материалы о жизни русскоязычного сообщества.",
        specs: [
          { label: "Сфера", value: "Координация" },
          { label: "Охват", value: "Франция" },
          { label: "Сайт", value: "conseil-russes-france.org" },
        ],
        externalUrl: "https://conseil-russes-france.org/ru/",
        gallery: [ph("cso-g1", "Фото 1"), ph("cso-g2", "Фото 2"), ph("cso-g3", "Фото 3"), ph("cso-g4", "Фото 4")],
        regionId: "national",
        categoryId: "coord",
      },
      {
        id: "assoc-aajfr",
        slug: "aajfr",
        sortOrder: 30,
        title: "AAJFR — ассоциация франко-русских адвокатов и юристов",
        description: "Профессиональное объединение адвокатов и юристов двух юрисдикций.",
        hoverIntro:
          "Association des avocats et juristes franco-russes: деловые связи палаты, мероприятия для специалистов, работающих с Францией и Россией.",
        specs: [
          { label: "Сфера", value: "Право" },
          { label: "Локация", value: "Париж" },
          { label: "Сайт", value: "aajfr.org" },
        ],
        externalUrl: "https://www.aajfr.org/",
        gallery: [ph("aaj-g1", "Фото 1"), ph("aaj-g2", "Фото 2"), ph("aaj-g3", "Фото 3"), ph("aaj-g4", "Фото 4")],
        regionId: "paris",
        categoryId: "law",
      },
      {
        id: "assoc-clcr",
        slug: "clcr",
        sortOrder: 40,
        title: "Центр русского языка и культуры (CLCR)",
        description: "Обучение, культурные проекты и поддержка русскоязычной среды.",
        hoverIntro:
          "Центр CLCR (сайт clcr.ru) — программы по языку и культуре, мероприятия для детей и взрослых; уточняйте расписание на официальном сайте.",
        specs: [
          { label: "Сфера", value: "Язык / культура" },
          { label: "Формат", value: "Курсы, события" },
          { label: "Сайт", value: "clcr.ru" },
        ],
        externalUrl: "https://www.clcr.ru/",
        gallery: [ph("clc-g1", "Фото 1"), ph("clc-g2", "Фото 2"), ph("clc-g3", "Фото 3"), ph("clc-g4", "Фото 4")],
        regionId: "paris",
        categoryId: "culture",
      },
      {
        id: "assoc-urf",
        slug: "urf",
        sortOrder: 50,
        title: "Union des Russophones de France (URF)",
        description: "Союз русофонов: продвижение русского языка и интересов русскоязычных во Франции.",
        hoverIntro:
          "URF — объединение по закону 1901 года. Публичный URL сайта уточните и подставьте в админке (здесь внешняя кнопка отключена как заглушка).",
        specs: [
          { label: "Сфера", value: "Русофония" },
          { label: "Статус", value: "Ассоциация 1901" },
          { label: "Сайт", value: "заглушка" },
        ],
        externalUrl: null,
        gallery: [ph("urf-g1", "Фото 1"), ph("urf-g2", "Фото 2"), ph("urf-g3", "Фото 3"), ph("urf-g4", "Фото 4"), ph("urf-g5", "Фото 5")],
        regionId: "paris",
        categoryId: "culture",
      },
    ],
    details: [
      {
        slug: "afr",
        pageBackground: bg("detail-afr"),
        title: "Association française des russisants (AFR)",
        lead: "Французская ассоциация преподавателей и любителей русского языка и культуры.",
        paragraphs: [
          "AFR ведёт работу с аудиторией, изучающей русский во Франции: публикации, олимпиады, профессиональные встречи педагогов.",
          "Актуальные программы и контакты смотрите на официальном сайте afr-russe.fr — здесь краткая справка для каталога.",
        ],
        gallery: [ph("afr-d1", "Фото 1"), ph("afr-d2", "Фото 2"), ph("afr-d3", "Фото 3")],
        externalUrl: "https://www.afr-russe.fr/",
        videoEmbedUrl: null,
      },
      {
        slug: "csorf",
        pageBackground: bg("detail-csorf"),
        title: "Координационный совет российских соотечественников во Франции",
        lead: "Площадка координации общественных организаций и новостей соотечественников.",
        paragraphs: [
          "На сайте conseil-russes-france.org публикуются новости, материалы о жизни диаспоры и раздел об ассоциациях.",
          "Эта страница — витрина в нашем каталоге; юридические вопросы решаются напрямую с выбранной организацией.",
        ],
        gallery: [ph("cso-d1", "Фото 1"), ph("cso-d2", "Фото 2"), ph("cso-d3", "Фото 3")],
        externalUrl: "https://conseil-russes-france.org/ru/",
        videoEmbedUrl: null,
      },
      {
        slug: "aajfr",
        pageBackground: bg("detail-aajfr"),
        title: "AAJFR — ассоциация франко-русских адвокатов и юристов",
        lead: "Профессиональное объединение юристов, работающих с франко-российским правом.",
        paragraphs: [
          "Штаб-квартира указывается на сайте aajfr.org (Париж, площадка у Ordre des avocats).",
          "Для консультации по делу обращайтесь напрямую к адвокату; наш сайт не является представителем палаты.",
        ],
        gallery: [ph("aaj-d1", "Фото 1"), ph("aaj-d2", "Фото 2"), ph("aaj-d3", "Фото 3")],
        externalUrl: "https://www.aajfr.org/",
        videoEmbedUrl: null,
      },
      {
        slug: "clcr",
        pageBackground: bg("detail-clcr"),
        title: "Центр русского языка и культуры (CLCR)",
        lead: "Образовательные и культурные программы для русскоязычной аудитории.",
        paragraphs: [
          "Информация о курсах и событиях размещается на clcr.ru.",
          "Перед записью уточняйте расписание и условия на официальном ресурсе организации.",
        ],
        gallery: [ph("clc-d1", "Фото 1"), ph("clc-d2", "Фото 2"), ph("clc-d3", "Фото 3"), ph("clc-d4", "Фото 4")],
        externalUrl: "https://www.clcr.ru/",
        videoEmbedUrl: null,
      },
      {
        slug: "urf",
        pageBackground: bg("detail-urf"),
        title: "Union des Russophones de France",
        lead: "Союз русофонов Франции — продвижение языка и интересов русскоязычных.",
        paragraphs: [
          "URF действует как ассоциация по закону 1901 года. Официальный сайт укажите в админке — сейчас внешняя ссылка намеренно не задана.",
          "Тексты и галерея редактируются в той же модели, что и карточка каталога.",
        ],
        gallery: [ph("urf-d1", "Фото 1"), ph("urf-d2", "Фото 2"), ph("urf-d3", "Фото 3")],
        externalUrl: "https://fr.wikipedia.org/wiki/Union_des_russophones_de_France",
        videoEmbedUrl: null,
      },
    ],
  },
};

export function getSiteContent(): SiteContent {
  return defaultSiteContent;
}

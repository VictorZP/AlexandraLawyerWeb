import type { SiteContent } from "./types";

const u = (id: string, w = 2000) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=75`;

/** Демо-иллюстрации (Unsplash); в админке заменяются на фото организаций / Storage */
const g = {
  books: (alt: string) => ({ src: u("photo-1481627834876-b7833e8f5570", 1400), alt, caption: null }),
  meet: (alt: string) => ({ src: u("photo-1522071820081-009f0129c71c", 1400), alt, caption: null }),
  paris: (alt: string) => ({ src: u("photo-1502602898536-47ce93c7a421", 1400), alt, caption: null }),
  stage: (alt: string) => ({ src: u("photo-1503095396549-807759245b35", 1400), alt, caption: null }),
  lecture: (alt: string) => ({ src: u("photo-1544531586-23383578a2f3", 1400), alt, caption: null }),
  flags: (alt: string) => ({ src: u("photo-1529107386315-c1ea45865684", 1400), alt, caption: null }),
  office: (alt: string) => ({ src: u("photo-1497366216548-37526070297c", 1400), alt, caption: null }),
  court: (alt: string) => ({ src: u("photo-1589829545856-d10d557cf95f", 1400), alt, caption: null }),
  school: (alt: string) => ({ src: u("photo-1503676260728-1c00da094a0b", 1400), alt, caption: null }),
  globe: (alt: string) => ({ src: u("photo-1451187580459-43490279c0fa", 1400), alt, caption: null }),
};

export const defaultSiteContent: SiteContent = {
  home: {
    pageBackground: { src: u("photo-1431274172761-fca41d930e6f"), alt: "", caption: null },
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
    pageBackground: { src: u("photo-1488646959804-013271964cdf"), alt: "", caption: null },
    pageTitle: "Эмиграция во Францию",
    lead: "Раздел для материалов о легализации и жизни во Франции — тексты и фон страницы из админки.",
    paragraphs: [
      "Здесь появятся статьи о видах ВНЖ, сроках, префектурах и типичных ошибках при подаче.",
      "Структура страницы повторяет объект в базе: заголовок, лид, абзацы, фон.",
    ],
  },
  business: {
    pageBackground: { src: u("photo-1497366216548-37526070297c"), alt: "", caption: null },
    pageTitle: "Бизнес во Франции",
    lead: "Корпоративное и предпринимательское право — контент подключается из CMS.",
    paragraphs: ["Обзоры форм деятельности, налоги и ссылки на официальные источники."],
  },
  talentPassport: {
    pageBackground: { src: u("photo-1502602898536-47ce93c7a421"), alt: "", caption: null },
    pageTitle: "Паспорт талант Франция",
    lead: "Программа Passeport Talent и смежные статусы.",
    paragraphs: ["Категории, контракт, доказательства квалификации, продления."],
  },
  laws: {
    pageBackground: { src: u("photo-1481627834876-b7833e8f5570"), alt: "", caption: null },
    pageTitle: "Интересные ЗАКОНЫ Франции",
    lead: "Короткие заметки о нормах с отсылками к источникам.",
    paragraphs: ["Не заменяет индивидуальную консультацию."],
  },
  associations: {
    pageBackground: { src: u("photo-1529156069898-49953e39b3ac"), alt: "", caption: null },
    pageTitle: "Русскоговорящие ассоциации во Франции",
    lead:
      "Ниже — реальные организации с публичными сайтами (проверьте актуальность ссылок перед запуском). На карточке: карусель фото, «Подробнее» — наша страница, «Сайт ассоциации» — внешняя ссылка. Все поля дублируются в админке.",
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
        gallery: [g.books("Зал"), g.lecture("Лекция"), g.stage("Сцена"), g.paris("Париж")],
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
        gallery: [g.meet("Встреча"), g.flags("Сообщество"), g.globe("Связь"), g.paris("Париж")],
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
        gallery: [g.court("Правосудие"), g.office("Офис"), g.meet("Переговоры"), g.books("Кодексы")],
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
        gallery: [g.school("Учёба"), g.stage("Концерт"), g.books("Библиотека"), g.lecture("Урок")],
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
          "URF — объединение по закону 1901 года; цели включают поддержку русского языка и культурного разнообразия. Контакты и документы — на официальном сайте.",
        specs: [
          { label: "Сфера", value: "Русофония" },
          { label: "Статус", value: "Ассоциация 1901" },
          { label: "Сайт", value: "russophonie.org" },
        ],
        externalUrl: "https://www.russophonie.org/",
        gallery: [g.flags("Языки"), g.meet("Встреча"), g.paris("Париж"), g.globe("Сеть"), g.stage("Форум")],
        regionId: "paris",
        categoryId: "culture",
      },
    ],
    details: [
      {
        slug: "afr",
        pageBackground: { src: u("photo-1544531586-23383578a2f3", 2000), alt: "", caption: null },
        title: "Association française des russisants (AFR)",
        lead: "Французская ассоциация преподавателей и любителей русского языка и культуры.",
        paragraphs: [
          "AFR ведёт работу с аудиторией, изучающей русский во Франции: публикации, олимпиады, профессиональные встречи педагогов.",
          "Актуальные программы и контакты смотрите на официальном сайте afr-russe.fr — здесь краткая справка для каталога.",
        ],
        gallery: [g.books("Журнал и книги"), g.lecture("Лекция"), g.stage("Мероприятие")],
        externalUrl: "https://www.afr-russe.fr/",
        videoEmbedUrl: null,
      },
      {
        slug: "csorf",
        pageBackground: { src: u("photo-1529107386315-c1ea45865684", 2000), alt: "", caption: null },
        title: "Координационный совет российских соотечественников во Франции",
        lead: "Площадка координации общественных организаций и новостей соотечественников.",
        paragraphs: [
          "На сайте conseil-russes-france.org публикуются новости, материалы о жизни диаспоры и раздел об ассоциациях.",
          "Эта страница — витрина в нашем каталоге; юридические вопросы решаются напрямую с выбранной организацией.",
        ],
        gallery: [g.meet("Совещание"), g.globe("Связь"), g.flags("Диаспора")],
        externalUrl: "https://conseil-russes-france.org/ru/",
        videoEmbedUrl: null,
      },
      {
        slug: "aajfr",
        pageBackground: { src: u("photo-1589829545856-d10d557cf95f", 2000), alt: "", caption: null },
        title: "AAJFR — ассоциация франко-русских адвокатов и юристов",
        lead: "Профессиональное объединение юристов, работающих с франко-российским правом.",
        paragraphs: [
          "Штаб-квартира указывается на сайте aajfr.org (Париж, площадка у Ordre des avocats).",
          "Для консультации по делу обращайтесь напрямую к адвокату; наш сайт не является представителем палаты.",
        ],
        gallery: [g.court("Суд"), g.office("Юристы"), g.meet("Встреча")],
        externalUrl: "https://www.aajfr.org/",
        videoEmbedUrl: null,
      },
      {
        slug: "clcr",
        pageBackground: { src: u("photo-1503676260728-1c00da094a0b", 2000), alt: "", caption: null },
        title: "Центр русского языка и культуры (CLCR)",
        lead: "Образовательные и культурные программы для русскоязычной аудитории.",
        paragraphs: [
          "Информация о курсах и событиях размещается на clcr.ru.",
          "Перед записью уточняйте расписание и условия на официальном ресурсе организации.",
        ],
        gallery: [g.school("Урок"), g.stage("Концерт"), g.books("Чтение"), g.lecture("Лекторий")],
        externalUrl: "https://www.clcr.ru/",
        videoEmbedUrl: null,
      },
      {
        slug: "urf",
        pageBackground: { src: u("photo-1451187580459-43490279c0fa", 2000), alt: "", caption: null },
        title: "Union des Russophones de France",
        lead: "Союз русофонов Франции — продвижение языка и интересов русскоязычных.",
        paragraphs: [
          "URF действует как ассоциация по закону 1901 года; устав и коммуникации доступны на russophonie.org.",
          "Мы не проверяли работоспособность всех внешних страниц в момент сборки демо — при ошибке 404 замените URL в админке.",
        ],
        gallery: [g.flags("Русофония"), g.paris("Париж"), g.meet("Общение")],
        externalUrl: "https://www.russophonie.org/",
        videoEmbedUrl: null,
      },
    ],
  },
};

export function getSiteContent(): SiteContent {
  return defaultSiteContent;
}

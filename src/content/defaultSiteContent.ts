import type { SiteContent } from "./types";

const BG_W = "2560";

/**
 * Фон страницы: стабильные URL Pexels (офис, договоры, суд, документы).
 * Ранее часть ссылок Unsplash отдавала 404 — фон пропадал. В админке — свой файл/URL.
 */
function legalStock(photoId: number, alt: string) {
  return {
    src: `https://images.pexels.com/photos/${photoId}/pexels-photo-${photoId}.jpeg?auto=compress&cs=tinysrgb&w=${BG_W}`,
    alt,
    caption: null as string | null,
  };
}

const V = { pageBackgroundVideo: null, pageBackgroundVideoPoster: null } as const;

/** Галерея карточки: те же seed-и заменяются в админке на фото организации */
const ph = (seed: string, alt: string) => ({
  src: `https://picsum.photos/seed/${seed}/960/600`,
  alt,
  caption: null as string | null,
});

export const defaultSiteContent: SiteContent = {
  adminMediaGuidance:
    "Фон страницы заполняется в админке: либо фото, либо видео (видео имеет приоритет; звук не воспроизводится). " +
    "Чтобы картинка оставалась чёткой и не «мылилась», загружайте исходник достаточного размера: для полноэкранного cover ориентируйтесь на ширину не меньше 1920–2560 px, соотношение 16:9 или 3:2; форматы JPEG или WebP с качеством примерно 80–90%. " +
    "Видео для фона: MP4 (кодек H.264) или WebM (VP9); разрешение от 1920×1080 и выше; без аудиодорожки или с немым звуком; короткий зацикленный ролик (например 5–30 с); умеренный битрейт (ориентир 4–10 Мбит/с). " +
    "Поле «постер» — статичный кадр того же размера, что и фото, показывается до загрузки видео и на слабых устройствах.",
  home: {
    pageBackground: legalStock(5669619, "Юридический кабинет, рабочий стол"),
    ...V,
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
      { id: "tile-consult", sortOrder: 45, path: "/consultation", title: "Запись на консультацию", hint: "Календарь и оплата (демо)" },
      { id: "tile-assoc", sortOrder: 50, path: "/associations", title: "Русскоговорящие ассоциации", hint: "Каталог объединений" },
    ],
  },
  emigration: {
    pageBackground: legalStock(6373310, "Документы и официальные бумаги"),
    ...V,
    pageTitle: "Эмиграция во Францию",
    lead: "Раздел для материалов о легализации и жизни во Франции — тексты и фон страницы из админки.",
    paragraphs: [
      "Здесь появятся статьи о видах ВНЖ, сроках, префектурах и типичных ошибках при подаче.",
      "Структура страницы повторяет объект в базе: заголовок, лид, абзацы, фон.",
    ],
  },
  business: {
    pageBackground: legalStock(3760067, "Подписание договора в офисе"),
    ...V,
    pageTitle: "Бизнес во Франции",
    lead: "Корпоративное и предпринимательское право — контент подключается из CMS.",
    paragraphs: ["Обзоры форм деятельности, налоги и ссылки на официальные источники."],
  },
  talentPassport: {
    pageBackground: legalStock(4427616, "Деловой офис, рабочее место"),
    ...V,
    pageTitle: "Паспорт талант Франция",
    lead: "Программа Passeport Talent и смежные статусы.",
    paragraphs: ["Категории, контракт, доказательства квалификации, продления."],
  },
  laws: {
    pageBackground: legalStock(5439449, "Работа с договором и документами"),
    ...V,
    pageTitle: "Интересные ЗАКОНЫ Франции",
    lead: "Короткие заметки о нормах с отсылками к источникам. Ниже — отдельные блоки: название закона, ссылка на официальный текст и тезисы.",
    articles: [
      {
        id: "law-1",
        sortOrder: 10,
        title: "Legifrance — портал официальных текстов",
        sourceUrl: "https://www.legifrance.gouv.fr/",
        facts: [
          "Актуальные версии кодексов и законов публикуются на Legifrance.",
          "Перед решением по делу проверяйте дату последней редакции статьи.",
        ],
      },
      {
        id: "law-2",
        sortOrder: 20,
        title: "Напоминание о консультации",
        sourceUrl: "",
        facts: [
          "Материалы на сайте носят информационный характер.",
          "Не заменяет индивидуальную консультацию адвоката по вашей ситуации.",
        ],
      },
    ],
  },
  associations: {
    pageBackground: legalStock(7681090, "Фасад официального здания"),
    ...V,
    pageTitle: "Русскоговорящие ассоциации во Франции",
    lead:
      "Организации с проверяемыми официальными сайтами (AFR, КСОРС, AAJFR, CLCR). Фото карточек и фоны страниц задаются в админке. На карточке: карусель, «Подробнее» — наша страница, «Сайт ассоциации» — внешняя ссылка (если задана).",
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
        pageBackground: legalStock(8190818, "Книги и учёба, образовательная среда"),
        ...V,
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
        pageBackground: legalStock(6149107, "Деловая встреча и координация"),
        ...V,
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
        pageBackground: legalStock(5669618, "Профессиональная юридическая среда"),
        ...V,
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
        pageBackground: legalStock(7688497, "Учебные материалы и работа за столом"),
        ...V,
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
        pageBackground: legalStock(6149109, "Официальное деловое общение"),
        ...V,
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

import type { AppLocale } from "./localeStorage";

export type UiStrings = {
  documentTitle: string;
  metaDescription: string;
  skipToContent: string;
  navAria: string;
  navHome: string;
  navEmigration: string;
  navBusiness: string;
  navTalent: string;
  navLaws: string;
  navAssociations: string;
  brandTag: string;
  langShortRu: string;
  langShortFr: string;
  langSwitcherAria: string;
  footerDisclaimer: string;
  footerAdminSummary: string;
  homeSectionTitle: string;
  homeHeroEmigration: string;
  homeHeroAssociations: string;
  homeIllustrationEmpty: string;
  assocFilterSphere: string;
  assocFilterRegion: string;
  assocPaginationAria: string;
  assocPaginationPage: string;
  assocEmpty: string;
  assocMore: string;
  assocWebsite: string;
  assocWebsiteAdmin: string;
  assocGalleryToolbar: string;
  carouselPrev: string;
  carouselNext: string;
  detailBack: string;
  detailSite: string;
  detailPhotosAria: string;
  detailPhotosHeading: string;
  detailNoImage: string;
  detailVideo: string;
  detailIframeTitle: string;
  adminUnavailableTitle: string;
  adminUnavailableLead: string;
  adminUnavailableHome: string;
};

const ru: UiStrings = {
  documentTitle: "Александра Лемель — юрист во Франции",
  metaDescription: "Юридические консультации во Франции для русскоговорящих клиентов.",
  skipToContent: "К основному содержанию",
  navAria: "Основная навигация",
  navHome: "Главная",
  navEmigration: "Эмиграция во Францию",
  navBusiness: "Бизнес во Франции",
  navTalent: "Паспорт талант Франция",
  navLaws: "Интересные ЗАКОНЫ Франции",
  navAssociations: "Русскоговорящие Ассоциации во Франции",
  brandTag: "юрист во Франции",
  langShortRu: "RU",
  langShortFr: "FR",
  langSwitcherAria: "Язык сайта",
  footerDisclaimer:
    "Информация на сайте не является публичной офертой. Договор оказания услуг заключается отдельно.",
  footerAdminSummary: "Требования к фото и видео фона (для админки)",
  homeSectionTitle: "Разделы сайта",
  homeHeroEmigration: "Эмиграция",
  homeHeroAssociations: "Ассоциации",
  homeIllustrationEmpty: "Изображение для главной — задаётся в админке (URL и подпись).",
  assocFilterSphere: "Сфера деятельности",
  assocFilterRegion: "Регион",
  assocPaginationAria: "Страницы каталога",
  assocPaginationPage: "Страница",
  assocEmpty: "По выбранным фильтрам пока ничего нет.",
  assocMore: "Подробнее",
  assocWebsite: "Сайт ассоциации",
  assocWebsiteAdmin: "Сайт — в админке",
  assocGalleryToolbar: "Фотографии объединения",
  carouselPrev: "Предыдущее фото",
  carouselNext: "Следующее фото",
  detailBack: "← Каталог ассоциаций",
  detailSite: "Сайт ассоциации",
  detailPhotosAria: "Фотографии",
  detailPhotosHeading: "Фотографии",
  detailNoImage: "Нет изображения",
  detailVideo: "Видео",
  detailIframeTitle: "Видео об ассоциации",
  adminUnavailableTitle: "Админка недоступна",
  adminUnavailableLead:
    "На этом деплое включён только публичный режим. Управление контентом — на отдельном проекте Vercel с переменной VITE_SITE_MODE=admin и маршрутом /admin.",
  adminUnavailableHome: "На главную",
};

const fr: UiStrings = {
  documentTitle: "Alexandra Lemesle — avocate en France",
  metaDescription:
    "Conseils juridiques en France pour un public russophone : immigration, entreprises, associations.",
  skipToContent: "Aller au contenu principal",
  navAria: "Navigation principale",
  navHome: "Accueil",
  navEmigration: "Immigration en France",
  navBusiness: "Entreprises en France",
  navTalent: "Passeport talent — France",
  navLaws: "Lois françaises à connaître",
  navAssociations: "Associations russophones en France",
  brandTag: "avocate en France",
  langShortRu: "RU",
  langShortFr: "FR",
  langSwitcherAria: "Langue du site",
  footerDisclaimer:
    "Les informations sur ce site ne constituent pas une offre publique. Un contrat de prestation est conclu séparément.",
  footerAdminSummary: "Exigences pour les médias de fond (administration)",
  homeSectionTitle: "Rubriques du site",
  homeHeroEmigration: "Immigration",
  homeHeroAssociations: "Associations",
  homeIllustrationEmpty: "Image d’accueil — à définir dans l’administration (URL et légende).",
  assocFilterSphere: "Domaine d’activité",
  assocFilterRegion: "Région",
  assocPaginationAria: "Pages du catalogue",
  assocPaginationPage: "Page",
  assocEmpty: "Aucun résultat pour les filtres choisis.",
  assocMore: "En savoir plus",
  assocWebsite: "Site de l’association",
  assocWebsiteAdmin: "Site — à définir dans l’administration",
  assocGalleryToolbar: "Photos de l’association",
  carouselPrev: "Photo précédente",
  carouselNext: "Photo suivante",
  detailBack: "← Catalogue des associations",
  detailSite: "Site de l’association",
  detailPhotosAria: "Photos",
  detailPhotosHeading: "Photos",
  detailNoImage: "Pas d’image",
  detailVideo: "Vidéo",
  detailIframeTitle: "Vidéo sur l’association",
  adminUnavailableTitle: "Administration indisponible",
  adminUnavailableLead:
    "Ce déploiement est en mode public uniquement. La gestion du contenu se fait sur un autre projet Vercel avec la variable VITE_SITE_MODE=admin et l’URL /admin.",
  adminUnavailableHome: "Accueil",
};

export function getUiStrings(locale: AppLocale): UiStrings {
  return locale === "fr" ? fr : ru;
}

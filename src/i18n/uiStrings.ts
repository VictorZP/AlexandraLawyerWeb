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
  navConsultation: string;
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
  consultationBrowserTitle: string;
  consultationPageTitle: string;
  consultationLead: string;
  consultationDemoBanner: string;
  consultationBookTitle: string;
  consultationBookIntro: string;
  consultationPayDeadlineHint: string;
  consultationMonthPrev: string;
  consultationMonthNext: string;
  consultationCalendarAria: string;
  consultationLegendFree: string;
  consultationLegendFull: string;
  consultationLegendWeekend: string;
  consultationLegendPast: string;
  consultationPickTime: string;
  consultationSlotTaken: string;
  consultationFormTitle: string;
  consultationFormName: string;
  consultationFormPhone: string;
  consultationFormEmail: string;
  consultationFormTopic: string;
  consultationSubmit: string;
  consultationReset: string;
  consultationErrorNeedSlot: string;
  consultationErrorFill: string;
  consultationErrorEmail: string;
  consultationErrorSlotTaken: string;
  consultationErrorGeneric: string;
  consultationSuccessToast: string;
  consultationPayTitle: string;
  consultationPayIntro: string;
  consultationPayDateLabel: string;
  consultationPayPhoneLabel: string;
  consultationPayFind: string;
  consultationPayNotFound: string;
  consultationPayStatusLabel: string;
  consultationPayStatusUnpaid: string;
  consultationPayPayBtn: string;
  consultationPayClose: string;
  consultationPaidToast: string;
  consultationStripeDemoTitle: string;
  consultationStripeDemoHint: string;
  consultationStripeCardLabel: string;
  consultationStripePayTest: string;
  consultationToastClose: string;
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
  navConsultation: "Запись на консультацию",
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
  consultationBrowserTitle: "Запись на консультацию — Александра Лемель",
  consultationPageTitle: "Консультация",
  consultationLead:
    "Выберите дату и время встречи (45 минут), заполните контакты и кратко опишите вопрос. Ниже — оплата уже забронированной консультации.",
  consultationDemoBanner:
    "Демонстрационный режим: данные хранятся только в этом браузере, оплата имитация. Для рабочей версии подключим Supabase и Stripe.",
  consultationBookTitle: "Запись на консультацию",
  consultationBookIntro: "Календарь: выходные и полностью занятые дни недоступны. Занятые интервалы отмечены в списке времени.",
  consultationPayDeadlineHint:
    "Оплату нужно внести не позднее чем за час до начала консультации. В демо-режиме напоминание только текстом на странице.",
  consultationMonthPrev: "← Месяц",
  consultationMonthNext: "Месяц →",
  consultationCalendarAria: "Календарь свободных дней",
  consultationLegendFree: "Можно выбрать",
  consultationLegendFull: "Нет свободных слотов",
  consultationLegendWeekend: "Выходной",
  consultationLegendPast: "Прошедшие даты",
  consultationPickTime: "Свободное время",
  consultationSlotTaken: "занято",
  consultationFormTitle: "Ваши данные",
  consultationFormName: "Имя",
  consultationFormPhone: "Телефон",
  consultationFormEmail: "Электронная почта",
  consultationFormTopic: "Кратко опишите вопрос",
  consultationSubmit: "Записаться",
  consultationReset: "Сбросить выбор",
  consultationErrorNeedSlot: "Сначала выберите дату и свободное время.",
  consultationErrorFill: "Заполните все поля формы.",
  consultationErrorEmail: "Укажите корректный адрес почты.",
  consultationErrorSlotTaken: "Это время только что заняли. Выберите другой слот.",
  consultationErrorGeneric: "Не удалось сохранить запись. Попробуйте ещё раз.",
  consultationSuccessToast: "Вы записаны. Номер записи: {{code}}. Сохраните его. Оплату можно внести в блоке ниже.",
  consultationPayTitle: "Оплатить консультацию",
  consultationPayIntro:
    "Укажите дату визита и телефон, который вы вводили при записи. Откроется ваша неоплаченная запись — затем демо-оплата (без списания средств).",
  consultationPayDateLabel: "Дата консультации",
  consultationPayPhoneLabel: "Телефон при записи",
  consultationPayFind: "Найти запись",
  consultationPayNotFound: "Неоплаченных записей на эту дату и телефон не найдено.",
  consultationPayStatusLabel: "Статус",
  consultationPayStatusUnpaid: "Не оплачено",
  consultationPayPayBtn: "Оплатить",
  consultationPayClose: "Свернуть",
  consultationPaidToast: "В демо-режиме оплата засчитана. В рабочей версии здесь будет Stripe.",
  consultationStripeDemoTitle: "Оплата (демо)",
  consultationStripeDemoHint: "Платёжная форма Stripe будет подключена на проде. Сейчас — имитация без запросов к серверу.",
  consultationStripeCardLabel: "Карта (неактивно)",
  consultationStripePayTest: "Оплатить тестом",
  consultationToastClose: "Закрыть уведомление",
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
  navConsultation: "Prendre rendez-vous",
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
  consultationBrowserTitle: "Rendez-vous — Alexandra Lemesle",
  consultationPageTitle: "Consultation",
  consultationLead:
    "Choisissez la date et le créneau (45 minutes), puis vos coordonnées et un court descriptif. Ci-dessous : paiement d’un rendez-vous déjà réservé.",
  consultationDemoBanner:
    "Mode démo : les données restent dans ce navigateur, le paiement est simulé. Version finale : Supabase et Stripe.",
  consultationBookTitle: "Prendre rendez-vous",
  consultationBookIntro:
    "Calendrier : week-ends et jours complets indisponibles. Les créneaux pris apparaissent dans la liste des horaires.",
  consultationPayDeadlineHint:
    "Le paiement devra être effectué au plus tard une heure avant la consultation. En démo, rappel uniquement par ce texte.",
  consultationMonthPrev: "← Mois",
  consultationMonthNext: "Mois →",
  consultationCalendarAria: "Calendrier des jours disponibles",
  consultationLegendFree: "Disponible",
  consultationLegendFull: "Complet",
  consultationLegendWeekend: "Week-end",
  consultationLegendPast: "Dates passées",
  consultationPickTime: "Horaires libres",
  consultationSlotTaken: "pris",
  consultationFormTitle: "Vos informations",
  consultationFormName: "Nom",
  consultationFormPhone: "Téléphone",
  consultationFormEmail: "E-mail",
  consultationFormTopic: "Décrivez brièvement votre demande",
  consultationSubmit: "Confirmer le rendez-vous",
  consultationReset: "Effacer le choix",
  consultationErrorNeedSlot: "Choisissez d’abord une date et un horaire libre.",
  consultationErrorFill: "Remplissez tous les champs.",
  consultationErrorEmail: "Indiquez une adresse e-mail valide.",
  consultationErrorSlotTaken: "Ce créneau vient d’être pris. Choisissez un autre horaire.",
  consultationErrorGeneric: "Enregistrement impossible. Réessayez.",
  consultationSuccessToast:
    "Rendez-vous enregistré. Numéro de dossier : {{code}}. Conservez-le. Le paiement se fait dans le bloc ci-dessous.",
  consultationPayTitle: "Payer la consultation",
  consultationPayIntro:
    "Indiquez la date du rendez-vous et le téléphone saisi à la réservation. Votre dossier non payé s’affichera, puis un paiement de démonstration (sans débit).",
  consultationPayDateLabel: "Date du rendez-vous",
  consultationPayPhoneLabel: "Téléphone utilisé à la réservation",
  consultationPayFind: "Rechercher",
  consultationPayNotFound: "Aucun dossier non payé pour cette date et ce numéro.",
  consultationPayStatusLabel: "Statut",
  consultationPayStatusUnpaid: "Non payé",
  consultationPayPayBtn: "Payer",
  consultationPayClose: "Fermer",
  consultationPaidToast: "En démo, le paiement est enregistré. En production, Stripe sera utilisé ici.",
  consultationStripeDemoTitle: "Paiement (démo)",
  consultationStripeDemoHint:
    "Le formulaire Stripe sera branché en production. Ici : simulation sans appel serveur.",
  consultationStripeCardLabel: "Carte (inactive)",
  consultationStripePayTest: "Payer en test",
  consultationToastClose: "Fermer la notification",
};

export function getUiStrings(locale: AppLocale): UiStrings {
  return locale === "fr" ? fr : ru;
}

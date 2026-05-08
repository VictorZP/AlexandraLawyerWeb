import type { SiteContent } from "./types";

const BG_W = "2560";

function legalStock(photoId: number, alt: string) {
  return {
    src: `https://images.pexels.com/photos/${photoId}/pexels-photo-${photoId}.jpeg?auto=compress&cs=tinysrgb&w=${BG_W}`,
    alt,
    caption: null as string | null,
  };
}

const V = { pageBackgroundVideo: null, pageBackgroundVideoPoster: null } as const;

const ph = (seed: string, alt: string) => ({
  src: `https://picsum.photos/seed/${seed}/960/600`,
  alt,
  caption: null as string | null,
});

/** Contenu français (même structure que le site russe). */
export const siteContentFr: SiteContent = {
  adminMediaGuidance:
    "L’arrière-plan de page se configure dans l’administration : image ou vidéo (la vidéo est prioritaire ; pas de son). " +
    "Pour une image nette, fournissez un fichier suffisamment grand : largeur d’au moins 1920–2560 px, ratio 16:9 ou 3:2 ; JPEG ou WebP, qualité environ 80–90 %. " +
    "Vidéo d’arrière-plan : MP4 (H.264) ou WebM (VP9) ; résolution à partir de 1920×1080 ; sans piste audio ou muette ; boucle courte (par ex. 5–30 s) ; débit modéré (4–10 Mbit/s). " +
    "Le champ « poster » est une image statique de même taille que la photo, affichée avant le chargement de la vidéo.",
  home: {
    pageBackground: legalStock(5669619, "Cabinet juridique, bureau"),
    ...V,
    headlineMain: "Le droit en France —",
    headlineAccent: "avec calme et dans les règles",
    lead:
      "Contenus pour le public russophone : immigration, entreprises, Passeport talent, lois expliquées et annuaire d’associations russophones. Sans promesses excessives — droit et pratique.",
    panelTitle: "À qui s’adresse ce site",
    panelBody:
      "Aux personnes qui vivent en France ou s’y installent, qui y exercent une activité économique ou y étudient. L’interface repose sur des panneaux transparents au-dessus de la photo de chaque rubrique (réglable dans l’administration).",
    illustrationHeading: "Ambiance de la marque",
    illustration: { src: null, alt: "Illustration — depuis l’administration", caption: null },
    sectionTiles: [
      { id: "tile-emigration", sortOrder: 10, path: "/emigration", title: "Immigration en France", hint: "Titres de séjour, préfectures" },
      { id: "tile-business", sortOrder: 20, path: "/business", title: "Entreprises en France", hint: "Auto-entrepreneur, sociétés, fiscalité" },
      { id: "tile-talent", sortOrder: 30, path: "/talent-passport", title: "Passeport talent — France", hint: "Passeport Talent" },
      { id: "tile-laws", sortOrder: 40, path: "/laws", title: "Lois françaises à connaître", hint: "Normes expliquées simplement" },
      { id: "tile-consult", sortOrder: 45, path: "/consultation", title: "Prendre rendez-vous", hint: "Calendrier et paiement (démo)" },
      { id: "tile-assoc", sortOrder: 50, path: "/associations", title: "Associations russophones", hint: "Annuaire" },
    ],
  },
  emigration: {
    pageBackground: legalStock(6373310, "Documents administratifs"),
    ...V,
    pageTitle: "Immigration en France",
    lead: "Rubrique dédiée à la régularisation et à la vie en France — textes et image de fond gérés dans l’administration.",
    paragraphs: [
      "Vous y trouverez des articles sur les titres de séjour, les délais, les préfectures et les erreurs fréquentes dans les dossiers.",
      "La structure reprend le modèle de données : titre, chapô, paragraphes, arrière-plan.",
    ],
  },
  business: {
    pageBackground: legalStock(3760067, "Signature d’un contrat au bureau"),
    ...V,
    pageTitle: "Entreprises en France",
    lead: "Droit des sociétés et de l’entreprise — contenu connecté depuis le CMS.",
    paragraphs: ["Formes d’activité, fiscalité et liens vers les sources officielles."],
  },
  talentPassport: {
    pageBackground: legalStock(4427616, "Bureau professionnel"),
    ...V,
    pageTitle: "Passeport talent — France",
    lead: "Le dispositif Passeport talent et les statuts proches.",
    paragraphs: ["Catégories, contrat, preuves de qualification, renouvellements."],
  },
  laws: {
    pageBackground: legalStock(5439449, "Analyse de contrats et documents"),
    ...V,
    pageTitle: "Lois françaises à connaître",
    lead: "Brèves notes avec renvois aux sources. Chaque bloc : intitulé, lien vers le texte, points clés.",
    articles: [
      {
        id: "law-1",
        sortOrder: 10,
        title: "Legifrance — textes officiels",
        sourceUrl: "https://www.legifrance.gouv.fr/",
        facts: [
          "Les versions à jour des codes et lois figurent sur Legifrance.",
          "Vérifiez la date de dernière modification de l’article avant toute décision.",
        ],
      },
      {
        id: "law-2",
        sortOrder: 20,
        title: "Rappel sur le conseil juridique",
        sourceUrl: "",
        facts: [
          "Les contenus du site sont informatifs.",
          "Ils ne remplacent pas un conseil individualisé d’avocat.",
        ],
      },
    ],
  },
  associations: {
    pageBackground: legalStock(7681090, "Façade d’un bâtiment institutionnel"),
    ...V,
    pageTitle: "Associations russophones en France",
    lead:
      "Organisations disposant de sites officiels vérifiables (AFR, CSORF, AAJFR, CLCR). Photos des fiches et arrière-plans sont gérés dans l’administration. Sur la fiche : carrousel, « En savoir plus » — notre page, « Site de l’association » — lien externe (si renseigné).",
    itemsPerPage: 6,
    regionTabs: [
      { id: "all", label: "Toutes les régions" },
      { id: "paris", label: "Paris" },
      { id: "national", label: "France" },
    ],
    categoryTabs: [
      { id: "all", label: "Tous les domaines" },
      { id: "culture", label: "Culture / langue" },
      { id: "coord", label: "Coordination" },
      { id: "law", label: "Droit" },
    ],
    items: [
      {
        id: "assoc-afr",
        slug: "afr",
        sortOrder: 10,
        title: "Association française des russisants (AFR)",
        description: "Langue et culture russes pour le public francophone : revue, olympiades, événements.",
        hoverIntro:
          "L’AFR regroupe enseignants et passionnés de russe en France, publie la Revue Russe, organise olympiades et manifestations culturelles.",
        specs: [
          { label: "Domaine", value: "Éducation" },
          { label: "Thème", value: "Langue russe" },
          { label: "Site", value: "afr-russe.fr" },
        ],
        externalUrl: "https://www.afr-russe.fr/",
        gallery: [ph("afr-g1", "Photo 1"), ph("afr-g2", "Photo 2"), ph("afr-g3", "Photo 3"), ph("afr-g4", "Photo 4")],
        regionId: "national",
        categoryId: "culture",
      },
      {
        id: "assoc-csorf",
        slug: "csorf",
        sortOrder: 20,
        title: "Conseil de coordination des compatriotes russes en France",
        description: "Coordination des associations russes en France.",
        hoverIntro:
          "Le CSORF relie les associations, publie des actualités et des contenus sur la vie de la communauté russophone.",
        specs: [
          { label: "Domaine", value: "Coordination" },
          { label: "Portée", value: "France" },
          { label: "Site", value: "conseil-russes-france.org" },
        ],
        externalUrl: "https://conseil-russes-france.org/ru/",
        gallery: [ph("cso-g1", "Photo 1"), ph("cso-g2", "Photo 2"), ph("cso-g3", "Photo 3"), ph("cso-g4", "Photo 4")],
        regionId: "national",
        categoryId: "coord",
      },
      {
        id: "assoc-aajfr",
        slug: "aajfr",
        sortOrder: 30,
        title: "AAJFR — association des avocats et juristes franco-russes",
        description: "Réseau professionnel d’avocats et juristes des deux ordres.",
        hoverIntro:
          "Association des avocats et juristes franco-russes : liens avec le barreau, événements pour les praticiens France–Russie.",
        specs: [
          { label: "Domaine", value: "Droit" },
          { label: "Lieu", value: "Paris" },
          { label: "Site", value: "aajfr.org" },
        ],
        externalUrl: "https://www.aajfr.org/",
        gallery: [ph("aaj-g1", "Photo 1"), ph("aaj-g2", "Photo 2"), ph("aaj-g3", "Photo 3"), ph("aaj-g4", "Photo 4")],
        regionId: "paris",
        categoryId: "law",
      },
      {
        id: "assoc-clcr",
        slug: "clcr",
        sortOrder: 40,
        title: "Centre de langue et de culture russes (CLCR)",
        description: "Cours, projets culturels et soutien à l’environnement russophone.",
        hoverIntro:
          "Le centre CLCR (site clcr.ru) propose des programmes langue et culture, des activités pour adultes et enfants ; voir le calendrier sur le site officiel.",
        specs: [
          { label: "Domaine", value: "Langue / culture" },
          { label: "Format", value: "Cours, événements" },
          { label: "Site", value: "clcr.ru" },
        ],
        externalUrl: "https://www.clcr.ru/",
        gallery: [ph("clc-g1", "Photo 1"), ph("clc-g2", "Photo 2"), ph("clc-g3", "Photo 3"), ph("clc-g4", "Photo 4")],
        regionId: "paris",
        categoryId: "culture",
      },
      {
        id: "assoc-urf",
        slug: "urf",
        sortOrder: 50,
        title: "Union des Russophones de France (URF)",
        description: "Promotion de la langue russe et des intérêts des russophones en France.",
        hoverIntro:
          "L’URF est une association loi 1901. L’URL publique du site est à renseigner dans l’administration (ici le bouton externe est désactivé).",
        specs: [
          { label: "Domaine", value: "Russophonie" },
          { label: "Statut", value: "Association loi 1901" },
          { label: "Site", value: "à définir" },
        ],
        externalUrl: null,
        gallery: [ph("urf-g1", "Photo 1"), ph("urf-g2", "Photo 2"), ph("urf-g3", "Photo 3"), ph("urf-g4", "Photo 4"), ph("urf-g5", "Photo 5")],
        regionId: "paris",
        categoryId: "culture",
      },
    ],
    details: [
      {
        slug: "afr",
        pageBackground: legalStock(8190818, "Livres et apprentissage"),
        ...V,
        title: "Association française des russisants (AFR)",
        lead: "Association française des enseignants et passionnés de langue et de culture russes.",
        paragraphs: [
          "L’AFR accompagne le public qui apprend le russe en France : publications, olympiades, rencontres professionnelles des enseignants.",
          "Programmes et contacts à jour sur le site officiel afr-russe.fr — ici une fiche résumée pour l’annuaire.",
        ],
        gallery: [ph("afr-d1", "Photo 1"), ph("afr-d2", "Photo 2"), ph("afr-d3", "Photo 3")],
        externalUrl: "https://www.afr-russe.fr/",
        videoEmbedUrl: null,
      },
      {
        slug: "csorf",
        pageBackground: legalStock(6149107, "Réunion de coordination"),
        ...V,
        title: "Conseil de coordination des compatriotes russes en France",
        lead: "Coordination des associations et actualités des compatriotes.",
        paragraphs: [
          "Le site conseil-russes-france.org publie des actualités, des contenus sur la vie de la diaspora et une rubrique sur les associations.",
          "Cette page présente l’organisation dans notre annuaire ; les questions juridiques se traitent directement avec l’association choisie.",
        ],
        gallery: [ph("cso-d1", "Photo 1"), ph("cso-d2", "Photo 2"), ph("cso-d3", "Photo 3")],
        externalUrl: "https://conseil-russes-france.org/ru/",
        videoEmbedUrl: null,
      },
      {
        slug: "aajfr",
        pageBackground: legalStock(5669618, "Environnement juridique professionnel"),
        ...V,
        title: "AAJFR — association des avocats et juristes franco-russes",
        lead: "Réseau professionnel de juristes travaillant sur le droit franco-russe.",
        paragraphs: [
          "Le siège et les activités sont présentés sur aajfr.org (Paris, autour de l’Ordre des avocats).",
          "Pour un dossier, adressez-vous directement à un avocat ; ce site n’est pas le représentant du barreau.",
        ],
        gallery: [ph("aaj-d1", "Photo 1"), ph("aaj-d2", "Photo 2"), ph("aaj-d3", "Photo 3")],
        externalUrl: "https://www.aajfr.org/",
        videoEmbedUrl: null,
      },
      {
        slug: "clcr",
        pageBackground: legalStock(7688497, "Supports de cours et bureau"),
        ...V,
        title: "Centre de langue et de culture russes (CLCR)",
        lead: "Programmes éducatifs et culturels pour un public russophone.",
        paragraphs: [
          "Les informations sur cours et événements figurent sur clcr.ru.",
          "Avant toute inscription, vérifiez calendrier et conditions sur le site de l’organisation.",
        ],
        gallery: [ph("clc-d1", "Photo 1"), ph("clc-d2", "Photo 2"), ph("clc-d3", "Photo 3"), ph("clc-d4", "Photo 4")],
        externalUrl: "https://www.clcr.ru/",
        videoEmbedUrl: null,
      },
      {
        slug: "urf",
        pageBackground: legalStock(6149109, "Échanges professionnels"),
        ...V,
        title: "Union des Russophones de France",
        lead: "Union des russophones de France — promotion de la langue et des intérêts des russophones.",
        paragraphs: [
          "L’URF est une association loi 1901. Indiquez le site officiel dans l’administration — ici le lien externe est volontairement laissé vide.",
          "Les textes et la galerie suivent le même modèle que la fiche de l’annuaire.",
        ],
        gallery: [ph("urf-d1", "Photo 1"), ph("urf-d2", "Photo 2"), ph("urf-d3", "Photo 3")],
        externalUrl: "https://fr.wikipedia.org/wiki/Union_des_russophones_de_France",
        videoEmbedUrl: null,
      },
    ],
  },
};

import { createContext, useContext, useEffect, useMemo } from "react";

export const supportedLocales = ["fr", "en"] as const;

export type Locale = (typeof supportedLocales)[number];
export type AppStatus = "live" | "beta" | "soon" | "boilerplate";

type AppCopy = {
  id: string;
  name: string;
  tagline: string;
  users: string;
  status: AppStatus;
};

const dictionaries = {
  fr: {
    languageLabel: "FR",
    languageName: "Français",
    localeSwitcherLabel: "Langue",
    nav: {
      overview: "Vue d'ensemble",
      apps: "Nos apps",
      explore: "Explorer",
      stack: "Stack",
      contact: "Contact",
    },
    header: {
      dashboard: "Dashboard",
      searchPlaceholder: "Chercher une app, un projet, ou un indicateur...",
      notifications: "Notifications",
    },
    sidebar: {
      studioLocation: "Studio · France",
      suiteLabel: "Suite",
      visitorName: "Visiteur curieux",
      visitorAccess: "accès invité",
    },
    common: {
      users: "utilisateurs",
      openDemo: "Ouvrir la démo",
      statuses: {
        live: "Live",
        beta: "Beta",
        soon: "Bientôt",
        boilerplate: "Boilerplate",
      },
    },
    home: {
      metaTitle: "CroissantLabs — Studio de produits numériques",
      metaDescription:
        "CroissantLabs conçoit des apps et sites web pour des équipes ambitieuses. Découvrez la suite dans un tableau de bord vivant.",
      ogDescription: "Un studio, plusieurs produits. Entrez dans le dashboard de CroissantLabs.",
      liveStatus: "7 produits & boilerplates · mise à jour il y a 3 min",
      titleStart: "Un studio produit qui conçoit",
      titleAccent: "des apps qu'on aime ouvrir.",
      intro:
        "CroissantLabs conçoit et fait vivre une suite de produits web et mobile pour des équipes modernes. Vous êtes dans le vrai dashboard interne — servez-vous.",
      primaryCta: "Explorer la suite",
      secondaryCta: "Parler à l'équipe",
      stats: [
        {
          key: "active-users",
          value: "97k",
          label: "utilisateurs actifs",
          color: "var(--mediterranean)",
        },
        { key: "products", value: "7", label: "produits & templates", color: "var(--terracotta)" },
        { key: "team", value: "18", label: "artisans du code", color: "var(--olive)" },
        { key: "rating", value: "4.9", label: "★ sur les stores", color: "var(--ochre)" },
      ],
      appsTitle: "Nos apps",
      appsSubtitle: "Cliquez pour prévisualiser — impossible de casser quoi que ce soit.",
      seeAll: "Tout voir",
      focusLabel: "Focus produit",
      playerLabel: "En direct · Radio Cigale",
      playerTitle: "Les cigales de 14h",
      playerSubtitle: "Podcast · saison 3",
      recentTitle: "Activité récente",
      activity: [
        {
          team: "croissant-electron",
          message: "commit sur main : template Electron + React & TanStack",
          ago: "25 min",
          url: "https://github.com/croissantsam/croissant-electron",
        },
        {
          team: "llama.scriptc",
          message: "commit sur main : moteur LLM Transformer natif ScriptC",
          ago: "45 min",
          url: "https://github.com/croissantsam/llama.scriptc",
        },
        { team: "Safran", message: "a publié le filtre « Fin de sieste »", ago: "12 min" },
        { team: "Olivier", message: "3 nouveaux ateliers connectés", ago: "1 h" },
        { team: "PastryVital", message: "note transcrite → tâche « rappeler Léa »", ago: "2 h" },
      ],
      jobsLabel: "On recrute",
      jobsTitle: "Envie de construire des produits utiles ?",
      jobsBody:
        "On cherche un·e designer produit et deux devs full-stack pour rejoindre l'équipe produit.",
      jobsCta: "Voir les postes",
      footer: "© CroissantLabs — conçu et développé en France",
    },
    appsPage: {
      metaTitle: "CroissantLabs — Apps",
      metaDescription: "Parcourez la suite produit de CroissantLabs en français.",
      eyebrow: "Catalogue produit",
      title: "Toute la suite, d'un coup d'oeil.",
      intro:
        "Chaque produit garde la même exigence : utile, chaleureux et soigné. Voici la version condensée de notre portefeuille.",
      highlights: [
        { key: "ship", value: "3", label: "lancements ce trimestre" },
        { key: "active", value: "97k", label: "personnes actives chaque mois" },
        { key: "nps", value: "68", label: "NPS moyen sur la suite" },
      ],
      sectionTitle: "Produits vedettes",
      sectionBody: "Une sélection des apps les plus visitées du studio.",
    },
    explorePage: {
      metaTitle: "CroissantLabs — Explore",
      metaDescription: "Explorez les expériences et thèmes produits de CroissantLabs.",
      eyebrow: "Terrain de jeu",
      title: "Explorer les idées qui alimentent le studio.",
      intro:
        "On navigue entre audio, créativité, collaboration et outils métiers. Cette page sert de carte rapide pour comprendre où l'on investit notre énergie.",
      cards: [
        {
          key: "audio",
          title: "Audio ambiant",
          body: "Des produits qui transforment voix, musique et moments capturés en expériences simples à partager.",
        },
        {
          key: "craft",
          title: "Outils pour créateurs",
          body: "Des workflows pensés pour les petites équipes, les artisans, et les studios qui veulent aller vite sans perdre leur ton.",
        },
        {
          key: "travel",
          title: "Récits de voyage",
          body: "Des espaces collaboratifs où les souvenirs, cartes et photos deviennent une histoire vivante.",
        },
      ],
    },
    contactPage: {
      metaTitle: "CroissantLabs — Contact",
      metaDescription: "Contacter CroissantLabs depuis la version française du site.",
      eyebrow: "Parlons produit",
      title: "On répond vite, surtout quand l'idée est précise.",
      intro:
        "Vous cherchez une équipe produit, un partenaire design, ou un studio pour lancer quelque chose de neuf ? Voilà les canaux qu'on ouvre le plus souvent.",
      channels: [
        {
          key: "email",
          title: "Email direct",
          value: "samuel@croissantlabs.com",
          body: "Pour une première prise de contact, un brief, ou une question simple.",
        },
        {
          key: "studio",
          title: "Studio",
          value: "France / Remote",
          body: "On travaille à distance, avec des temps de collaboration réguliers.",
        },
        {
          key: "response",
          title: "Délai moyen",
          value: "< 1 jour ouvré",
          body: "Quand le sujet est cadré, on répond généralement dans la journée.",
        },
      ],
      cta: "Écrire à l'équipe",
    },
    stackPage: {
      metaTitle: "CroissantLabs — Stack technique",
      metaDescription: "Découvrez la stack technique utilisée pour construire CroissantLabs.",
      title: "Comment on construit CroissantLabs",
      framework: {
        title: "Framework",
        description:
          "CroissantLabs est construit sur TanStack Start, un framework full-stack React moderne qui combine le meilleur du client et du serveur.",
      },
      styling: {
        title: "Styling & UI",
        description:
          "Une approche utility-first avec Tailwind CSS v4, complétée par des composants accessibles de shadcn/ui et Base UI.",
      },
      i18n: {
        title: "Internationalisation",
        description:
          "Support bilingue FR/EN avec un système de locales personnalisé intégré au routeur.",
      },
    },
    apps: [
      {
        id: "pastryvital",
        name: "PastryVital",
        tagline: "Suivi santé rénale au quotidien",
        users: "48k",
        status: "live",
      },
      {
        id: "llama.scriptc",
        name: "llama.scriptc",
        tagline: "Moteur d'inférence LLM natif TypeScript & ScriptC",
        users: "GitHub",
        status: "boilerplate",
      },
      {
        id: "croissant-electron",
        name: "croissant-electron",
        tagline: "Boilerplate Electron, React, TS & TanStack Router",
        users: "GitHub",
        status: "boilerplate",
      },
      {
        id: "olivier",
        name: "Olivier",
        tagline: "CRM pour artisans & créateurs",
        users: "6.2k",
        status: "beta",
      },
      {
        id: "safran",
        name: "Safran",
        tagline: "Éditeur photo IA pour équipes créatives",
        users: "22k",
        status: "live",
      },
      {
        id: "cigale",
        name: "Cigale",
        tagline: "Radio & podcasts locaux",
        users: "9.4k",
        status: "live",
      },
      {
        id: "provence",
        name: "Provence Studio",
        tagline: "Design system open source",
        users: "—",
        status: "soon",
      },
    ],
  },
  en: {
    languageLabel: "EN",
    languageName: "English",
    localeSwitcherLabel: "Language",
    nav: {
      overview: "Overview",
      apps: "Apps",
      explore: "Explore",
      stack: "Stack",
      contact: "Contact",
    },
    header: {
      dashboard: "Dashboard",
      searchPlaceholder: "Search an app, project, or metric...",
      notifications: "Notifications",
    },
    sidebar: {
      studioLocation: "Studio · France",
      suiteLabel: "Suite",
      visitorName: "Curious visitor",
      visitorAccess: "guest access",
    },
    common: {
      users: "users",
      openDemo: "Open demo",
      statuses: {
        live: "Live",
        beta: "Beta",
        soon: "Soon",
        boilerplate: "Boilerplate",
      },
    },
    home: {
      metaTitle: "CroissantLabs — Digital product studio",
      metaDescription:
        "CroissantLabs designs apps and websites for ambitious teams. Explore the product suite inside a lively dashboard.",
      ogDescription: "One studio, several products. Step into the CroissantLabs dashboard.",
      liveStatus: "7 products & templates live · updated 3 min ago",
      titleStart: "A product studio building",
      titleAccent: "apps people love opening.",
      intro:
        "CroissantLabs designs and grows a suite of web and mobile products for modern teams. You are inside the real internal dashboard — have a look around.",
      primaryCta: "Explore the suite",
      secondaryCta: "Talk to the team",
      stats: [
        { key: "active-users", value: "97k", label: "active users", color: "var(--mediterranean)" },
        {
          key: "products",
          value: "7",
          label: "products & templates",
          color: "var(--terracotta)",
        },
        { key: "team", value: "18", label: "craft-minded builders", color: "var(--olive)" },
        { key: "rating", value: "4.9", label: "★ store rating", color: "var(--ochre)" },
      ],
      appsTitle: "Featured apps",
      appsSubtitle: "Click any card for a quick preview — this view is safe to explore.",
      seeAll: "View all",
      focusLabel: "Product focus",
      playerLabel: "Live · Radio Cigale",
      playerTitle: "The 2pm cicadas",
      playerSubtitle: "Podcast · season 3",
      recentTitle: "Recent activity",
      activity: [
        {
          team: "croissant-electron",
          message: "commit on main: Electron + React & TanStack template",
          ago: "25m ago",
          url: "https://github.com/croissantsam/croissant-electron",
        },
        {
          team: "llama.scriptc",
          message: "commit on main: native ScriptC Transformer LLM engine",
          ago: "45m ago",
          url: "https://github.com/croissantsam/llama.scriptc",
        },
        { team: "Safran", message: "published the “End of nap” filter", ago: "12 min" },
        { team: "Olivier", message: "connected 3 new workshops", ago: "1 h" },
        { team: "PastryVital", message: "transcribed note → task “call Lea back”", ago: "2 h" },
      ],
      jobsLabel: "We're hiring",
      jobsTitle: "Want to build useful products?",
      jobsBody:
        "We're looking for a product designer and two full-stack developers to join the product team.",
      jobsCta: "See open roles",
      footer: "© CroissantLabs — designed and built in France",
    },
    appsPage: {
      metaTitle: "CroissantLabs — Apps",
      metaDescription: "Browse the CroissantLabs product suite in English.",
      eyebrow: "Product catalog",
      title: "The whole suite at a glance.",
      intro:
        "Every product shares the same point of view: useful, approachable, and well crafted. Here is the compact view of the portfolio.",
      highlights: [
        { key: "ship", value: "3", label: "launches this quarter" },
        { key: "active", value: "97k", label: "people active every month" },
        { key: "nps", value: "68", label: "average suite NPS" },
      ],
      sectionTitle: "Flagship products",
      sectionBody: "A selection of the most visited products in the studio.",
    },
    explorePage: {
      metaTitle: "CroissantLabs — Explore",
      metaDescription: "Explore the product themes and experiments behind CroissantLabs.",
      eyebrow: "Playground",
      title: "Explore the ideas powering the studio.",
      intro:
        "We move across audio, creativity, collaboration, and business tools. This page acts as a quick map of where we invest our energy.",
      cards: [
        {
          key: "audio",
          title: "Ambient audio",
          body: "Products that turn voice, music, and captured moments into simple experiences people want to share.",
        },
        {
          key: "craft",
          title: "Tools for makers",
          body: "Workflows built for small teams, craftspeople, and studios that want to move fast without losing their tone.",
        },
        {
          key: "travel",
          title: "Travel stories",
          body: "Collaborative spaces where memories, maps, and photos turn into a living story.",
        },
      ],
    },
    contactPage: {
      metaTitle: "CroissantLabs — Contact",
      metaDescription: "Reach out to CroissantLabs from the English version of the site.",
      eyebrow: "Let's talk product",
      title: "We answer quickly, especially when the idea is clear.",
      intro:
        "Need a product team, a design partner, or a studio to launch something new? These are the channels we open most often.",
      channels: [
        {
          key: "email",
          title: "Direct email",
          value: "samuel@croissantlabs.com",
          body: "Best for a first note, a brief, or a focused question.",
        },
        {
          key: "studio",
          title: "Studio",
          value: "France / Remote",
          body: "We work remotely, with regular in-person collaboration.",
        },
        {
          key: "response",
          title: "Typical reply time",
          value: "< 1 business day",
          body: "If the scope is clear, we usually get back the same day.",
        },
      ],
      cta: "Email the team",
    },
    stackPage: {
      metaTitle: "CroissantLabs — Tech Stack",
      metaDescription: "Discover the technology stack used to build CroissantLabs.",
      title: "How we build CroissantLabs",
      framework: {
        title: "Framework",
        description:
          "CroissantLabs is built on TanStack Start, a modern full-stack React framework that combines the best of client and server.",
      },
      styling: {
        title: "Styling & UI",
        description:
          "A utility-first approach with Tailwind CSS v4, complemented by accessible components from shadcn/ui and Base UI.",
      },
      i18n: {
        title: "Internationalization",
        description:
          "Bilingual FR/EN support with a custom locale system integrated into the router.",
      },
    },
    apps: [
      {
        id: "pastryvital",
        name: "PastryVital",
        tagline: "Daily kidney health tracking",
        users: "48k",
        status: "live",
      },
      {
        id: "llama.scriptc",
        name: "llama.scriptc",
        tagline: "Native Transformer LLM engine in TypeScript & ScriptC",
        users: "GitHub",
        status: "boilerplate",
      },
      {
        id: "croissant-electron",
        name: "croissant-electron",
        tagline: "Modern boilerplate for Electron, React, TS & TanStack Router",
        users: "GitHub",
        status: "boilerplate",
      },
      {
        id: "olivier",
        name: "Olivier",
        tagline: "CRM for makers and creative teams",
        users: "6.2k",
        status: "beta",
      },
      {
        id: "safran",
        name: "Safran",
        tagline: "AI photo editor for creative teams",
        users: "22k",
        status: "live",
      },
      {
        id: "cigale",
        name: "Cigale",
        tagline: "Local radio and podcasts",
        users: "9.4k",
        status: "live",
      },
      {
        id: "provence",
        name: "Provence Studio",
        tagline: "Open source design system",
        users: "—",
        status: "soon",
      },
    ],
  },
} as const;

type Messages = (typeof dictionaries)[Locale];

type I18nContextValue = {
  locale: Locale;
  messages: Messages;
};

const I18nContext = createContext<I18nContextValue | null>(null);

const defaultLocale: Locale = "fr";

function resolveLocaleFromString(locale?: string): Locale | undefined {
  if (!locale) return undefined;

  const normalized = locale.toLowerCase();

  if (supportedLocales.includes(normalized as Locale)) {
    return normalized as Locale;
  }

  const baseLocale = normalized.split("-")[0];

  if (supportedLocales.includes(baseLocale as Locale)) {
    return baseLocale as Locale;
  }

  return undefined;
}

export function getPreferredLocale(): Locale {
  if (typeof navigator === "undefined") {
    return defaultLocale;
  }

  const candidates = [...(navigator.languages ?? []), navigator.language]
    .filter(Boolean)
    .map((locale) => locale.toLowerCase());

  for (const candidate of candidates) {
    const resolved = resolveLocaleFromString(candidate);
    if (resolved) {
      return resolved;
    }
  }

  return defaultLocale;
}

export function resolveLocale(locale?: string): Locale {
  return resolveLocaleFromString(locale) ?? defaultLocale;
}

export function getMessages(locale?: string) {
  return dictionaries[resolveLocale(locale)];
}

export function getAppItems(locale?: string): AppCopy[] {
  return getMessages(locale).apps.map((app) => ({ ...app }));
}

export function replaceLocaleInPathname(pathname: string, locale: Locale) {
  const segments = pathname.split("/").filter(Boolean);
  const first = segments[0];

  if (first && supportedLocales.includes(first as Locale)) {
    segments[0] = locale;
    return `/${segments.join("/")}`;
  }

  return pathname === "/" ? `/${locale}` : `/${locale}${pathname}`;
}

export function I18nProvider({
  locale,
  children,
}: {
  locale: string | undefined;
  children: React.ReactNode;
}) {
  const resolvedLocale = resolveLocale(locale);
  const messages = useMemo(() => getMessages(resolvedLocale), [resolvedLocale]);

  useEffect(() => {
    document.documentElement.lang = resolvedLocale;
  }, [resolvedLocale]);

  return (
    <I18nContext.Provider value={{ locale: resolvedLocale, messages }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const value = useContext(I18nContext);

  if (!value) {
    throw new Error("useI18n must be used inside I18nProvider.");
  }

  return value;
}

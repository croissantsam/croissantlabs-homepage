import { createContext, useContext, useEffect, useMemo } from "react";

export const supportedLocales = ["fr", "en"] as const;

export type Locale = (typeof supportedLocales)[number];
export type AppStatus = "live" | "beta" | "soon" | "boilerplate";

type AppFeature = { title: string; body: string };

type AppDetails = {
  intro: readonly string[];
  features: readonly AppFeature[];
  stack: readonly string[];
};

type AppCopy = {
  id: string;
  name: string;
  tagline: string;
  kind: string;
  status: AppStatus;
  details: AppDetails;
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
      links: {
        repo: "GitHub",
        npm: "npm",
        demo: "Ouvrir la démo",
      },
      detail: {
        discover: "Découvrir le projet",
        backToApps: "Tous les projets",
        featuresLabel: "Points clés",
        stackLabel: "Stack technique",
        externalLinksLabel: "Liens du projet",
        othersLabel: "Autres projets du studio",
        recentCommitsLabel: "Commits récents",
        viewAllCommits: "Tous les commits",
        noCommits: "Aucun commit récent pour l'instant.",
      },
    },
    home: {
      metaTitle: "CroissantLabs — Studio de produits numériques",
      metaDescription:
        "CroissantLabs conçoit des apps et sites web pour des équipes ambitieuses. Découvrez la suite dans un tableau de bord vivant.",
      ogDescription: "Un studio, plusieurs produits. Entrez dans le dashboard de CroissantLabs.",
      liveStatusPrefix: "8 projets & outils · mis à jour",
      titleStart: "Un studio produit qui conçoit",
      titleAccent: "des apps qu'on aime ouvrir.",
      intro:
        "CroissantLabs conçoit et fait vivre une suite de produits web et mobile pour des équipes modernes. Vous êtes dans le vrai dashboard interne — servez-vous.",
      primaryCta: "Explorer la suite",
      secondaryCta: "Parler à l'équipe",
      stats: [
        {
          key: "products",
          value: "8",
          label: "projets développés",
          color: "var(--terracotta)",
        },
        {
          key: "platforms",
          value: "Multi",
          label: "Web, Mobile & Desktop",
          color: "var(--mediterranean)",
        },
        {
          key: "craft",
          value: "100%",
          label: "sur-mesure & craft",
          color: "var(--olive)",
        },
        {
          key: "delivery",
          value: "Full",
          label: "du concept à la prod",
          color: "var(--ochre)",
        },
      ],
      appsTitle: "Nos apps",
      appsSubtitle: "Cliquez pour prévisualiser — chaque projet a sa page dédiée.",
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
          team: "logimons",
          message: "release : catalogue DVF 295k cartes & boosters PRO",
          ago: "45 min",
          url: "https://github.com/croissantsam/logimons",
        },
        {
          team: "openworldcar",
          message: "commit sur main : streaming OSM & NPC traffic",
          ago: "1 h",
          url: "https://github.com/croissantsam/openworldcar",
        },
        {
          team: "scriptc",
          message: "commit sur main : cross-compilation & modules WASI",
          ago: "2 h",
          url: "https://github.com/croissantsam/scriptc",
        },
        {
          team: "pastryvital",
          message: "dossier médical numérique : analyses, ordonnances & files",
          ago: "3 h",
          url: "https://pastryvital.vercel.app",
        },
      ],
      servicesLabel: "Services & Studio",
      servicesTitle: "Vous avez un projet d'application ?",
      servicesBody:
        "CroissantLabs conçoit et développe des applications web, mobile et desktop sur-mesure pour des équipes exigeantes. Parlons de votre idée.",
      servicesCta: "Démarrer un projet",
      footer: "© CroissantLabs — conçu et développé en France",
    },
    appsPage: {
      metaTitle: "CroissantLabs — Apps",
      metaDescription: "Parcourez la suite produit de CroissantLabs en français.",
      eyebrow: "Catalogue produit",
      title: "Huit projets, une même exigence.",
      intro:
        "Chaque produit développé au studio a sa page dédiée : ce qu'il fait, la stack utilisée et les liens pour aller plus loin. Voici la version condensée du portefeuille.",
      highlights: [
        { key: "ship", value: "8", label: "projets développés en interne" },
        { key: "platforms", value: "Multi", label: "Web, Desktop & natif" },
        { key: "craft", value: "100%", label: "design soigné & code propre" },
      ],
      sectionTitle: "Une page par projet",
      sectionBody:
        "Cliquez sur une carte pour découvrir le projet en détail : fonctionnement, stack technique et liens (démo, GitHub, npm).",
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
        kind: "App santé · PWA",
        tagline: "Journal de suivi pour patients atteints de maladie rénale, 100 % local-first",
        status: "live",
        details: {
          intro: [
            "PastryVital (Kidney Care Companion) accompagne les patients en dialyse, en greffe ou en insuffisance rénale chronique. L'app se limite volontairement à stocker, afficher, rappeler et faciliter le contact : jamais d'interprétation clinique, jamais de diagnostic, jamais de dose calculée.",
            "Tout est stocké sur l'appareil (IndexedDB) : les données de santé ne transitent jamais par le serveur. La synchronisation multi-appareils reste une option payante et distincte, pilotée par tRPC + Stripe — le journal de santé personnel reste gratuit et hors ligne.",
          ],
          features: [
            {
              title: "Mesures & tendances",
              body: "Poids, tension, hydratation et constantes, avec historique et graphiques d'évolution (Recharts).",
            },
            {
              title: "Dossier médical numérique",
              body: "Analyses, ordonnances, comptes-rendus, imagerie et courriers : métadonnées filtrables, fichiers joints (PDF, photo, scan) et tri chronologique façon dossier médical.",
            },
            {
              title: "Médicaments & rappels",
              body: "Traitements actifs (nom, dose, horaire) avec notifications locales de prise, reliées au calendrier sans double saisie.",
            },
            {
              title: "Bouton urgence",
              body: "Contacts configurés par le patient (néphrologue, service, urgences) avec appel et SMS pré-rempli en un geste.",
            },
            {
              title: "Calendrier & export .ics",
              body: "Vue mois/semaine centralisant rendez-vous, prises et documents, exportable vers le calendrier du téléphone.",
            },
            {
              title: "Portabilité totale",
              body: "Export/import JSON complet : les données appartiennent au patient et restent exportables à tout moment.",
            },
          ],
          stack: [
            "TanStack Start",
            "tRPC v11",
            "Dexie.js (IndexedDB)",
            "shadcn/ui",
            "Recharts",
            "Stripe (sync)",
          ],
        },
      },
      {
        id: "logimons",
        name: "Logimons",
        kind: "Jeu · TCG",
        tagline: "Cartes à collectionner inspirées des ventes immobilières françaises réelles",
        status: "live",
        details: {
          intro: [
            "Logimons transforme les transactions immobilières françaises — source publique DVF (explore.data.gouv.fr), Licence Ouverte 2.0 — en cartes à collectionner numériques. Chaque carte porte une transaction réelle, datée et localisée : prix d'origine, surface, commune. Jamais une annonce, jamais une estimation, jamais un conseil financier.",
            "Le catalogue compte 295 000 cartes en production, générées depuis les données DVF avec une rareté calibrée sur six niveaux et des stats POW/PRE relatives au marché local. Boosters, duels en trois manches et album de progression forment la boucle de jeu.",
          ],
          features: [
            {
              title: "Catalogue DVF",
              body: "295 k cartes issues des données publiques, collections par département et type de bien, illustrations servies en cache immutable.",
            },
            {
              title: "Boosters serveur",
              body: "Tirage idempotent en transaction SQL : le client anime, le serveur décide et persiste avant révélation. Stock régénéré, achat de lots via Stripe.",
            },
            {
              title: "Duels & album",
              body: "Trois manches, une stat tirée par manche ; la rareté n'entre jamais dans l'issue. Historique d'ouvertures et progression d'album persistés.",
            },
            {
              title: "Carte objet 3D",
              body: "Maquette Three.js (épaisseur, relief suivant le pointeur, reflet) chargée après le premier rendu, avec réglage joueur et prefers-reduced-motion.",
            },
            {
              title: "Performance",
              body: "Recherche par commune passée de 25 s à 0,01 s (dénormalisation + index), SSR du catalogue à 0,12 s, polices auto-hébergées.",
            },
            {
              title: "Sécurité & SEO",
              body: "better-auth, CSRF sur les routes mutantes, pages de jeu en noindex pour respecter les conditions de la source DVF.",
            },
          ],
          stack: [
            "TanStack Start",
            "PostgreSQL + PostGIS",
            "Drizzle ORM",
            "better-auth",
            "Stripe",
            "Three.js",
            "Playwright",
          ],
        },
      },
      {
        id: "openworldcar",
        name: "Odyssee",
        kind: "Jeu · Monde ouvert",
        tagline: "Conduite libre dans un monde ouvert streamé depuis OpenStreetMap",
        status: "beta",
        details: {
          intro: [
            "Odyssee (repo openworldcar) construit une conduite libre dans un monde généré en continu à partir des données réelles d'OpenStreetMap : routes, bâtiments et décor se chargent autour du joueur, partout sur Terre, sans packs pré-générés.",
            "Le principe fondateur : architecture et performance avant les graphismes. Chunks streamés, multijoueur autoritaire en WebSocket, physique Rapier3D côté serveur, et une boucle de rendu qui ne bloque jamais.",
          ],
          features: [
            {
              title: "Streaming de chunks",
              body: "Le monde est découpé en chunks (x, z, niveau) : le joueur charge le bloc courant, ses voisins et une anticipation dans le sens du déplacement.",
            },
            {
              title: "Pipeline OSM uniforme",
              body: "Position GPS → fetch à la demande avec cache disque serveur → parsing en worker → génération de chunks. Le même chemin fonctionne partout sur la planète.",
            },
            {
              title: "Multijoueur autoritaire",
              body: "Le client envoie ses inputs, le serveur fait tourner la physique (fixed timestep 1/60 s) et diffuse des snapshots interpolés localement. WebSocket sur la même origine, sans port séparé.",
            },
            {
              title: "Physique & trafic",
              body: "Rapier3D pour le véhicule, graphe routier pour la navigation NPC, la recherche de chemin et la simulation de trafic.",
            },
            {
              title: "Outils debug intégrés",
              body: "Touche D en jeu : FPS, draw calls, mémoire, latence réseau, chunks chargés, coordonnées GPS du joueur.",
            },
            {
              title: "App fullstack",
              body: "React 19 + Three.js côté client, serveur Nitro multi-joueur colocalisé, PostgreSQL + better-auth pour comptes et feature flags.",
            },
          ],
          stack: [
            "React 19",
            "Three.js",
            "Rapier3D",
            "TanStack Start",
            "Node.js (crossws)",
            "PostgreSQL + Drizzle",
            "pnpm monorepo",
          ],
        },
      },
      {
        id: "kitron",
        name: "Kitron",
        kind: "Framework · Desktop",
        tagline: "Applications desktop en TypeScript sans Chromium — Rust natif + Node.js",
        status: "soon",
        details: {
          intro: [
            "Kitron construit des applications desktop en TypeScript sur une infrastructure native : Rust possède les fenêtres, menus, tray, dialogs, raccourcis et updater (winit → AppKit / Win32). Pas de Chromium, pas de renderer web embarqué, pas de React Native.",
            "L'UI reste du React réel, rendu par un reconciler maison avec une API compatible react-native, et Node.js fournit filesystem, réseau et crypto. Mesuré face à Electron 35 (hello-world, Apple M4) : environ 18× plus petit (13 Mo vs 246 Mo), démarrage ~15× plus rapide (25 ms vs 380 ms), ~30× moins de RAM au repos.",
          ],
          features: [
            {
              title: "Runtime natif Rust",
              body: "kitron-runtime : fenêtres OS réelles, dispatch IPC, sidecar Node auto-démarré pour le filesystem et le réseau.",
            },
            {
              title: "API TypeScript-first",
              body: "Packages @kitron/* : window, dialog, clipboard, notification, tray, menu, shortcut, updater — derrière une facade unique.",
            },
            {
              title: "React sans Chromium",
              body: "Un reconciler maison route le React vers le renderer natif, avec une API compatible react-native.",
            },
            {
              title: "Benchmarks honnêtes",
              body: "Méthodologie et mesures publiées : taille du runtime, cold start, RAM idle — comparées à Electron 35 sur Apple M4.",
            },
            {
              title: "CLI complète",
              body: "kitron create / dev / build / package / run / doctor, avec template de projet prêt à l'emploi.",
            },
          ],
          stack: ["TypeScript", "React (reconciler maison)", "Rust (winit)", "Node.js sidecar"],
        },
      },
      {
        id: "scriptc",
        name: "scriptc",
        kind: "Compilateur · natif & WASM",
        tagline: "Compile TypeScript et JavaScript en exécutables natifs et WebAssembly",
        status: "beta",
        details: {
          intro: [
            "scriptc compile TypeScript et JavaScript vers des exécutables natifs et des modules WebAssembly. Le compilateur s'appuie sur les types vérifiés par le compilateur TypeScript pour générer du code machine : l'exécutable tourne sans Node.js installé.",
            "Les packages npm importés sont compilés avec le programme — plus de node_modules à lire au runtime. Le code que scriptc ne sait pas compiler est signalé au build avec un diagnostic et, quand c'est possible, un indice de réécriture. Projet expérimental : un sous-ensemble des API JS/TS/Node est couvert.",
          ],
          features: [
            {
              title: "build & run",
              body: "scriptc build écrit un exécutable, scriptc run compile et exécute directement — un hello world devient un binaire natif.",
            },
            {
              title: "APIs Node compilées",
              body: "Les API Node supportées compilent vers le runtime natif : un serveur HTTP complet, sans Node installé sur la machine cible.",
            },
            {
              title: "Dépendances npm incluses",
              body: "Les packages supportés sont compilés avec votre code dans l'exécutable final.",
            },
            {
              title: "Rapport de coverage",
              body: "scriptc coverage mesure, fichier par fichier, la part compilable d'une codebase existante avant migration.",
            },
            {
              title: "Cross-compilation & WASM",
              body: "Ciblage multi-plateforme, modules WASI embarquables et FFI C ABI pour les programmes natifs.",
            },
          ],
          stack: [
            "TypeScript (types tsc)",
            "Exécutables natifs",
            "WebAssembly / WASI",
            "FFI C ABI",
            "Node.js 24+",
          ],
        },
      },
      {
        id: "croissant-electron",
        name: "croissant-electron",
        kind: "Boilerplate · Desktop",
        tagline:
          "Boilerplate & CLI Electron : React 19, TanStack Router, Tailwind v4, Rust tooling",
        status: "boilerplate",
        details: {
          intro: [
            "Boilerplate open source et générateur de projets (npx croissant-electron init) qui élimine la fatigue Electron : Vite 8 + Electron 44, React 19 en strict mode, TanStack Router 100 % type-safe, Tailwind v4 + shadcn/ui avec dark mode intégré.",
            "La sécurité est pensée dès le départ — contextBridge uniquement, IPC strictement typée, zéro fuite Node dans le renderer — et le packaging est pris en charge : DMG universal, NSIS, AppImage, deb, plus un auto-updater différentiel et une compilation en bytecode V8 pour protéger le code source.",
          ],
          features: [
            {
              title: "CLI zéro config",
              body: "npx croissant-electron init my-app : un projet complet et opérationnel en quelques secondes.",
            },
            {
              title: "HMR quasi instantané",
              body: "electron-vite gère main, preload et renderer ; React 19 et ses features concurrentes.",
            },
            {
              title: "Routing type-safe",
              body: "TanStack Router file-based : une route = un fichier, search params et loaders validés à la compile.",
            },
            {
              title: "Outillage écrit en Rust",
              body: "Oxlint + Oxfmt : lint et format en sous-seconde, sans la chaîne de plugins ESLint/Prettier.",
            },
            {
              title: "Packaging & auto-update",
              body: "electron-builder pour macOS, Windows et Linux, electron-updater pour les mises à jour différentielles.",
            },
            {
              title: "CI/CD incluse",
              body: "Workflows GitHub Actions : typecheck, builds multi-plateformes et releases npm automatisées.",
            },
          ],
          stack: [
            "Electron 44+",
            "React 19",
            "TanStack Router",
            "Tailwind v4 + shadcn/ui",
            "Oxlint + Oxfmt",
            "electron-builder",
          ],
        },
      },
      {
        id: "kim-these",
        name: "kim-these",
        kind: "Site · Événement",
        tagline: "Invitation interactive à une soutenance de thèse (Amiens, 2026)",
        status: "live",
        details: {
          intro: [
            "Une soutenance de thèse mérite sa propre page : ce site accompagne la soutenance de Kim sur les anomalies phénotypiques des érythroblastes dans le diagnostic des syndromes myélodysplasiques.",
            "Le format est volontairement minimal : une carte à retourner en 3D CSS — le recto porte l'invitation avec son fond cytologique, le verso déroule le programme de la journée, de la soutenance au pot qui suit sur les rives de la Somme.",
          ],
          features: [
            {
              title: "Carte flip 3D",
              body: "Recto et verso animés en CSS pur, sans bibliothèque lourde ; un clic retourne la carte.",
            },
            {
              title: "Design sur-mesure",
              body: "Images de microscopie (cellules sanguines) en fond de carte, typographie calme et lisibilité d'abord.",
            },
            {
              title: "Programme complet",
              body: "Horaires et lieux des deux temps forts : campus du Thil (salle E006) puis Les Rives, Amiens.",
            },
            {
              title: "Empreinte minimale",
              body: "Deux routes, des images optimisées, un build TanStack Start + Vite déployable partout.",
            },
          ],
          stack: ["TanStack Start", "React", "CSS 3D", "Vite"],
        },
      },
      {
        id: "puerto",
        name: "Puerto",
        kind: "Barre de menus · macOS",
        tagline: "Voir et fermer vos ports TCP ouverts depuis la barre de menus macOS",
        status: "live",
        details: {
          intro: [
            "Puerto est une app de barre de menus macOS qui affiche vos ports TCP en écoute et permet de les fermer d'un clic. Une icône monochrome en forme de prise indique le nombre de ports ouverts et s'adapte automatiquement au thème clair ou sombre de la barre.",
            "Puerto ne touche qu'à vos propres processus : il filtre les daemons système Apple, n'interagit jamais avec les ports appartenant à d'autres utilisateurs, et ferme proprement via SIGTERM avant d'escalader en SIGKILL si le processus tient toujours le port.",
          ],
          features: [
            {
              title: "Icône de barre de menus",
              body: "Une icône template monochrome avec le nombre de ports ouverts, qui bascule entre noir et blanc selon la barre.",
            },
            {
              title: "Fermeture en un clic",
              body: "Chaque port s'affiche en sous-menu avec une action ✕ Close pour libérer le port immédiatement.",
            },
            {
              title: "Auto-rafraîchissement",
              body: "Le menu se met à jour à chaque ouverture ; un minuteur en arrière-plan actualise le compteur toutes les 2 s.",
            },
            {
              title: "Fermeture sûre",
              body: "SIGTERM, attente de 2 s pour un arrêt propre, puis SIGKILL si le même processus possède toujours le port.",
            },
            {
              title: "Lancement au démarrage",
              body: "Bascule menu-bar pour enregistrer Puerto comme élément de connexion (macOS 13+).",
            },
            {
              title: "Mises à jour intégrées",
              body: "Vérifie GitHub au lancement et demande avant d'installer : rien n'est téléchargé sans votre accord.",
            },
          ],
          stack: ["Swift", "SwiftUI/AppKit", "lsof", "SMAppService", "macOS 12+"],
        },
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
      links: {
        repo: "GitHub",
        npm: "npm",
        demo: "Open demo",
      },
      detail: {
        discover: "Explore the project",
        backToApps: "All projects",
        featuresLabel: "Key points",
        stackLabel: "Tech stack",
        externalLinksLabel: "Project links",
        othersLabel: "Other studio projects",
        recentCommitsLabel: "Recent commits",
        viewAllCommits: "All commits",
        noCommits: "No recent commits yet.",
      },
    },
    home: {
      metaTitle: "CroissantLabs — Digital product studio",
      metaDescription:
        "CroissantLabs designs apps and websites for ambitious teams. Explore the product suite inside a lively dashboard.",
      ogDescription: "One studio, several products. Step into the CroissantLabs dashboard.",
      liveStatusPrefix: "8 projects & tools · updated",
      titleStart: "A product studio building",
      titleAccent: "apps people love opening.",
      intro:
        "CroissantLabs designs and grows a suite of web and mobile products for modern teams. You are inside the real internal dashboard — have a look around.",
      primaryCta: "Explore the suite",
      secondaryCta: "Talk to the team",
      stats: [
        {
          key: "products",
          value: "8",
          label: "in-house projects",
          color: "var(--terracotta)",
        },
        {
          key: "platforms",
          value: "Multi",
          label: "Web, Mobile & Desktop",
          color: "var(--mediterranean)",
        },
        {
          key: "craft",
          value: "100%",
          label: "bespoke craft & UX",
          color: "var(--olive)",
        },
        {
          key: "delivery",
          value: "Full",
          label: "concept to production",
          color: "var(--ochre)",
        },
      ],
      appsTitle: "Featured apps",
      appsSubtitle: "Click any card for a quick preview — every project has its own page.",
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
          team: "logimons",
          message: "release: 295k DVF card catalog & PRO boosters",
          ago: "45m ago",
          url: "https://github.com/croissantsam/logimons",
        },
        {
          team: "openworldcar",
          message: "commit on main: OSM streaming & NPC traffic",
          ago: "1h ago",
          url: "https://github.com/croissantsam/openworldcar",
        },
        {
          team: "scriptc",
          message: "commit on main: cross-compilation & WASI modules",
          ago: "2h ago",
          url: "https://github.com/croissantsam/scriptc",
        },
        {
          team: "pastryvital",
          message: "medical records: lab tests, prescriptions & files",
          ago: "3h ago",
          url: "https://pastryvital.vercel.app",
        },
      ],
      servicesLabel: "Services & Engineering",
      servicesTitle: "Looking to build a custom application?",
      servicesBody:
        "CroissantLabs designs and engineers tailored web, mobile, and desktop applications for ambitious teams. Let's discuss your project.",
      servicesCta: "Start a project",
      footer: "© CroissantLabs — designed and built in France",
    },
    appsPage: {
      metaTitle: "CroissantLabs — Apps",
      metaDescription: "Browse the CroissantLabs product suite in English.",
      eyebrow: "Product catalog",
      title: "Eight projects, one standard.",
      intro:
        "Every product built at the studio has its own page: what it does, the stack behind it, and links to learn more. Here is the compact view of the portfolio.",
      highlights: [
        { key: "ship", value: "8", label: "in-house projects" },
        { key: "platforms", value: "Multi", label: "Web, Desktop & native" },
        { key: "craft", value: "100%", label: "bespoke design & clean code" },
      ],
      sectionTitle: "One page per project",
      sectionBody:
        "Click a card to open the project page: how it works, the tech stack, and links (demo, GitHub, npm).",
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
        kind: "Health app · PWA",
        tagline:
          "Kidney-care tracking journal for dialysis & transplant patients, fully local-first",
        status: "live",
        details: {
          intro: [
            "PastryVital (Kidney Care Companion) supports patients undergoing dialysis, transplant, or living with chronic kidney disease. The app deliberately limits itself to storing, displaying, reminding, and facilitating contact: no clinical interpretation, no diagnosis, no dose calculation.",
            "Everything is stored on the device (IndexedDB): health data never transits the server. Multi-device synchronization stays a separate, paid option powered by tRPC + Stripe — the personal health journal remains free and offline.",
          ],
          features: [
            {
              title: "Measurements & trends",
              body: "Weight, blood pressure, hydration, and other constants, with history and trend charts (Recharts).",
            },
            {
              title: "Digital medical records",
              body: "Lab results, prescriptions, consultation and hospital reports, imaging, and letters: filterable metadata, attached files (PDF, photo, scan), and a chronological medical-file style timeline.",
            },
            {
              title: "Medications & reminders",
              body: "Active treatments (name, dose, schedule) with local intake notifications, linked to the calendar without duplicate entry.",
            },
            {
              title: "Emergency button",
              body: "Contacts configured by the patient (nephrologist, unit, ER) with one-gesture call and prefilled SMS.",
            },
            {
              title: "Calendar & .ics export",
              body: "Month/week views centralizing appointments, intakes, and documents, exportable to the phone's native calendar.",
            },
            {
              title: "Full portability",
              body: "Complete JSON export/import: the data belongs to the patient and can leave at any time.",
            },
          ],
          stack: [
            "TanStack Start",
            "tRPC v11",
            "Dexie.js (IndexedDB)",
            "shadcn/ui",
            "Recharts",
            "Stripe (sync)",
          ],
        },
      },
      {
        id: "logimons",
        name: "Logimons",
        kind: "Game · TCG",
        tagline: "Collectible cards inspired by real French real-estate transactions (DVF)",
        status: "live",
        details: {
          intro: [
            "Logimons turns French real-estate transactions — public DVF data (explore.data.gouv.fr), Licence Ouverte 2.0 — into digital collectible cards. Each card carries a real, dated, located transaction: original price, surface, commune. Never a listing, never an estimate, never financial advice.",
            "The production catalog holds 295,000 cards generated from DVF data, with a rarity calibrated across six tiers and POW/PRE stats relative to the local market. Boosters, three-round duels, and album progression form the game loop.",
          ],
          features: [
            {
              title: "DVF catalog",
              body: "295k cards from public data, collections per department and property type, artwork served from an immutable cache.",
            },
            {
              title: "Server-side boosters",
              body: "Idempotent draws inside a SQL transaction: the client animates, the server decides and persists before reveal. Regenerating stock, pack purchases via Stripe.",
            },
            {
              title: "Duels & album",
              body: "Three rounds, one stat drawn per round; rarity never influences the outcome. Opening history and album progression are persisted.",
            },
            {
              title: "3D card object",
              body: "Three.js model (thickness, pointer-following relief, reflection) loaded after first render, with a player setting and prefers-reduced-motion support.",
            },
            {
              title: "Performance",
              body: "Commune search cut from 25 s to 0.01 s (denormalization + index), catalog SSR at 0.12 s, self-hosted fonts.",
            },
            {
              title: "Security & SEO",
              body: "better-auth, CSRF on mutating routes, game pages noindexed to respect the DVF source terms.",
            },
          ],
          stack: [
            "TanStack Start",
            "PostgreSQL + PostGIS",
            "Drizzle ORM",
            "better-auth",
            "Stripe",
            "Three.js",
            "Playwright",
          ],
        },
      },
      {
        id: "openworldcar",
        name: "Odyssee",
        kind: "Game · Open world",
        tagline: "Free driving in an open world streamed from OpenStreetMap",
        status: "beta",
        details: {
          intro: [
            "Odyssee (repo openworldcar) builds free driving in a world generated continuously from real OpenStreetMap data: roads, buildings, and scenery load around the player — anywhere on Earth, with no pre-generated packs.",
            "The founding principle: architecture and performance over graphics. Streamed chunks, authoritative WebSocket multiplayer, server-side Rapier3D physics, and a render loop that never blocks.",
          ],
          features: [
            {
              title: "Chunk streaming",
              body: "The world is divided into chunks (x, z, level): the player loads the current block, its neighbors, and a lookahead in the movement direction.",
            },
            {
              title: "Uniform OSM pipeline",
              body: "GPS position → on-demand fetch with server disk cache → parsing in a worker → chunk generation. The same path works everywhere on the planet.",
            },
            {
              title: "Authoritative multiplayer",
              body: "Clients send inputs, the server runs physics (fixed 1/60 s timestep) and broadcasts locally-interpolated snapshots. Same-origin WebSocket, no separate port.",
            },
            {
              title: "Physics & traffic",
              body: "Rapier3D for the vehicle, a road graph for NPC navigation, pathfinding, and traffic simulation.",
            },
            {
              title: "Built-in debug tools",
              body: "Press D in-game: FPS, draw calls, memory, network latency, loaded chunks, player GPS coordinates.",
            },
            {
              title: "Fullstack app",
              body: "React 19 + Three.js on the client, colocated Nitro multiplayer server, PostgreSQL + better-auth for accounts and feature flags.",
            },
          ],
          stack: [
            "React 19",
            "Three.js",
            "Rapier3D",
            "TanStack Start",
            "Node.js (crossws)",
            "PostgreSQL + Drizzle",
            "pnpm monorepo",
          ],
        },
      },
      {
        id: "kitron",
        name: "Kitron",
        kind: "Framework · Desktop",
        tagline: "TypeScript desktop apps without Chromium — native Rust + Node.js",
        status: "soon",
        details: {
          intro: [
            "Kitron builds desktop applications in TypeScript on native infrastructure: Rust owns windows, menus, tray, dialogs, shortcuts, and the updater (winit → AppKit / Win32). No Chromium, no embedded web renderer, no React Native.",
            "The UI stays real React, rendered through an in-house reconciler with a react-native-compatible API, while Node.js provides filesystem, network, and crypto. Benchmarked against Electron 35 (hello-world, Apple M4): ~18× smaller (13 MB vs 246 MB), ~15× faster cold start (25 ms vs 380 ms), ~30× less idle memory.",
          ],
          features: [
            {
              title: "Native Rust runtime",
              body: "kitron-runtime: real OS windows, IPC dispatch, auto-started Node sidecar for filesystem and network.",
            },
            {
              title: "TypeScript-first API",
              body: "@kitron/* packages: window, dialog, clipboard, notification, tray, menu, shortcut, updater — behind one facade.",
            },
            {
              title: "React without Chromium",
              body: "An in-house reconciler routes React to the native renderer, with a react-native-compatible API.",
            },
            {
              title: "Honest benchmarks",
              body: "Published methodology and measurements: runtime size, cold start, idle RAM — compared against Electron 35 on Apple M4.",
            },
            {
              title: "Complete CLI",
              body: "kitron create / dev / build / package / run / doctor, with a ready-to-use project template.",
            },
          ],
          stack: ["TypeScript", "React (own reconciler)", "Rust (winit)", "Node.js sidecar"],
        },
      },
      {
        id: "scriptc",
        name: "scriptc",
        kind: "Compiler · native & WASM",
        tagline: "Compiles TypeScript and JavaScript to native executables and WebAssembly",
        status: "beta",
        details: {
          intro: [
            "scriptc compiles TypeScript and JavaScript to native executables and WebAssembly modules. The compiler relies on the types checked by the TypeScript compiler to generate machine code: the output runs without Node.js installed.",
            "Packages your program imports compile along with it — no node_modules read at runtime. Code scriptc cannot compile is reported at build time with a diagnostic and, where available, a rewrite hint. Experimental project: a subset of the JS/TS/Node surface is covered.",
          ],
          features: [
            {
              title: "build & run",
              body: "scriptc build writes an executable, scriptc run compiles and executes directly — a hello world becomes a native binary.",
            },
            {
              title: "Node APIs compiled",
              body: "Supported Node APIs compile to the native runtime: a full HTTP server, without Node installed on the target machine.",
            },
            {
              title: "npm deps bundled in",
              body: "Supported packages are compiled together with your code into the final executable.",
            },
            {
              title: "Coverage report",
              body: "scriptc coverage measures, file by file, how much of an existing codebase compiles before migrating.",
            },
            {
              title: "Cross-compilation & WASM",
              body: "Multi-platform targeting, embeddable WASI modules, and C ABI FFI for native programs.",
            },
          ],
          stack: [
            "TypeScript (tsc types)",
            "Native executables",
            "WebAssembly / WASI",
            "C ABI FFI",
            "Node.js 24+",
          ],
        },
      },
      {
        id: "croissant-electron",
        name: "croissant-electron",
        kind: "Boilerplate · Desktop",
        tagline: "Electron boilerplate & CLI: React 19, TanStack Router, Tailwind v4, Rust tooling",
        status: "boilerplate",
        details: {
          intro: [
            "An open-source boilerplate and project generator (npx croissant-electron init) that eliminates Electron fatigue: Vite 8 + Electron 44, React 19 in strict mode, 100% type-safe TanStack Router, Tailwind v4 + shadcn/ui with built-in dark mode.",
            "Security is designed in from day one — contextBridge only, strictly typed IPC, zero Node leaks in the renderer — and packaging is handled: universal DMG, NSIS, AppImage, deb, plus a differential auto-updater and V8 bytecode compilation to protect your source.",
          ],
          features: [
            {
              title: "Zero-config CLI",
              body: "npx croissant-electron init my-app: a complete, working project in seconds.",
            },
            {
              title: "Near-instant HMR",
              body: "electron-vite drives main, preload, and renderer; React 19 with concurrent features.",
            },
            {
              title: "Type-safe routing",
              body: "File-based TanStack Router: one route = one file, search params and loaders validated at compile time.",
            },
            {
              title: "Rust-powered tooling",
              body: "Oxlint + Oxfmt: sub-second lint and format, without the ESLint/Prettier plugin chain.",
            },
            {
              title: "Packaging & auto-update",
              body: "electron-builder for macOS, Windows, and Linux, electron-updater for differential updates.",
            },
            {
              title: "Batteries-included CI/CD",
              body: "GitHub Actions workflows: typecheck, multi-platform builds, and automated npm releases.",
            },
          ],
          stack: [
            "Electron 44+",
            "React 19",
            "TanStack Router",
            "Tailwind v4 + shadcn/ui",
            "Oxlint + Oxfmt",
            "electron-builder",
          ],
        },
      },
      {
        id: "kim-these",
        name: "kim-these",
        kind: "Site · Event",
        tagline: "Interactive invitation for a PhD thesis defense (Amiens, 2026)",
        status: "live",
        details: {
          intro: [
            "A thesis defense deserves its own page: this site accompanies Kim's defense on phenotypic anomalies of erythroblasts in diagnosing myelodysplastic syndromes.",
            "The format is intentionally minimal: a card that flips in CSS 3D — the front carries the invitation with its cytological background, the back unwraps the day's schedule, from the defense to the celebration on the banks of the Somme.",
          ],
          features: [
            {
              title: "3D flip card",
              body: "Front and back animated in pure CSS, no heavy library; a single click turns the card.",
            },
            {
              title: "Bespoke design",
              body: "Microscopy imagery (blood cells) as the card background, calm typography, readability first.",
            },
            {
              title: "Complete schedule",
              body: "Times and venues for the two highlights: campus du Thil (room E006), then Les Rives, Amiens.",
            },
            {
              title: "Minimal footprint",
              body: "Two routes, optimized images, a TanStack Start + Vite build deployable anywhere.",
            },
          ],
          stack: ["TanStack Start", "React", "CSS 3D", "Vite"],
        },
      },
      {
        id: "puerto",
        name: "Puerto",
        kind: "Menu bar · macOS",
        tagline: "See and close your open TCP ports right from the macOS menu bar",
        status: "live",
        details: {
          intro: [
            "Puerto is a macOS menu bar app that shows your listening TCP ports and lets you close them with a click. A monochrome plug glyph shows the count of open ports and automatically flips between black and white to match the menu bar.",
            "Puerto only ever touches your own processes: it filters Apple system daemons, never interacts with ports owned by other users, and closes cleanly via SIGTERM before escalating to SIGKILL if the process still holds the port.",
          ],
          features: [
            {
              title: "Menu bar icon",
              body: "A monochrome template glyph with the open-port count that flips between black and white to match the menu bar.",
            },
            {
              title: "One-click close",
              body: "Each port shows as a submenu with a ✕ Close action to free the port immediately.",
            },
            {
              title: "Auto-refresh",
              body: "The menu updates every time you open it; a background timer refreshes the count every 2s.",
            },
            {
              title: "Safe close",
              body: "SIGTERM, a 2s wait for a clean shutdown, then SIGKILL if the same process still owns the port.",
            },
            {
              title: "Launch at Login",
              body: "Menu-bar toggle that registers Puerto as a login item (macOS 13+).",
            },
            {
              title: "In-app updates",
              body: "Checks GitHub at launch and asks before installing: nothing is downloaded without your say-so.",
            },
          ],
          stack: ["Swift", "SwiftUI/AppKit", "lsof", "SMAppService", "macOS 12+"],
        },
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

export type AppId = (typeof dictionaries.fr.apps)[number]["id"];

export function getAppItems(locale?: string): AppCopy[] {
  return getMessages(locale).apps.map((app) => ({ ...app }));
}

export function getAppById(locale: string | undefined, appId: AppId): AppCopy {
  const apps = getAppItems(locale);
  return apps.find((app) => app.id === appId) ?? apps[0];
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

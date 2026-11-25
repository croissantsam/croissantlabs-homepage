import {
  AppWindow,
  Binary,
  Building2,
  Car,
  GraduationCap,
  Heart,
  Laptop,
  Plug,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

export type AppLinkKind = "demo" | "repo" | "npm";

export type AppLink = {
  kind: AppLinkKind;
  href: string;
};

export type App = {
  id: string;
  icon: LucideIcon;
  tint: string;
  links: AppLink[];
  /** GitHub repo ("owner/name") backed by this app, if any. */
  repo: string;
};

export const apps: App[] = [
  {
    id: "pastryvital",
    icon: Heart,
    tint: "oklch(0.65 0.13 220)",
    repo: "croissantsam/croissantcare",
    links: [
      { kind: "demo", href: "https://pastryvital.vercel.app" },
      { kind: "repo", href: "https://github.com/croissantsam/croissantcare" },
    ],
  },
  {
    id: "logimons",
    icon: Building2,
    tint: "oklch(0.62 0.13 150)",
    repo: "croissantsam/logimons",
    links: [
      { kind: "demo", href: "https://logimons.vercel.app" },
      { kind: "repo", href: "https://github.com/croissantsam/logimons" },
    ],
  },
  {
    id: "openworldcar",
    icon: Car,
    tint: "oklch(0.68 0.14 25)",
    repo: "croissantsam/openworldcar",
    links: [{ kind: "repo", href: "https://github.com/croissantsam/openworldcar" }],
  },
  {
    id: "kitron",
    icon: Laptop,
    tint: "oklch(0.6 0.12 165)",
    repo: "croissantsam/kitron",
    links: [{ kind: "repo", href: "https://github.com/croissantsam/kitron" }],
  },
  {
    id: "scriptc",
    icon: Binary,
    tint: "oklch(0.62 0.13 200)",
    repo: "croissantsam/scriptc",
    links: [{ kind: "repo", href: "https://github.com/croissantsam/scriptc" }],
  },
  {
    id: "croissant-electron",
    icon: AppWindow,
    tint: "oklch(0.65 0.16 235)",
    repo: "croissantsam/croissant-electron",
    links: [
      { kind: "repo", href: "https://github.com/croissantsam/croissant-electron" },
      { kind: "npm", href: "https://www.npmjs.com/package/croissant-electron" },
    ],
  },
  {
    id: "kim-these",
    icon: GraduationCap,
    tint: "oklch(0.68 0.14 300)",
    repo: "croissantsam/kim-these",
    links: [{ kind: "repo", href: "https://github.com/croissantsam/kim-these" }],
  },
  {
    id: "puerto",
    icon: Plug,
    tint: "oklch(0.62 0.13 195)",
    repo: "croissantsam/puerto",
    links: [{ kind: "repo", href: "https://github.com/croissantsam/puerto" }],
  },
];

export function getApp(id: string): App | undefined {
  return apps.find((app) => app.id === id);
}

export function getAppIcon(id: string): LucideIcon {
  return getApp(id)?.icon ?? Sparkles;
}

export function getAppTint(id: string): string {
  return getApp(id)?.tint ?? "var(--terracotta)";
}

export function getAppLinks(id: string): AppLink[] {
  return getApp(id)?.links ?? [];
}

export function getAppLink(id: string): string {
  return getApp(id)?.links[0]?.href ?? "#";
}

export function getAppRepo(id: string): string | undefined {
  return getApp(id)?.repo;
}

export function getSortedAppIds(): string[] {
  return apps.map((app) => app.id);
}

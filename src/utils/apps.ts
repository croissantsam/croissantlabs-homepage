import {
  AppWindow,
  Camera,
  Heart,
  Music4,
  Palette,
  Sparkles,
  TreePalm,
  Waves,
  type LucideIcon,
} from "lucide-react";

export const appIcons: Record<string, LucideIcon> = {
  pastryvital: Heart,
  "llama.scriptc": Waves,
  "llama.script": Waves,
  calanque: Waves,
  "croissant-electron": AppWindow,
  olivier: TreePalm,
  safran: Camera,
  cigale: Music4,
  provence: Palette,
};

export const appTints: Record<string, string> = {
  pastryvital: "oklch(0.65 0.13 220)",
  "llama.scriptc": "oklch(0.62 0.13 200)",
  "llama.script": "oklch(0.62 0.13 200)",
  calanque: "oklch(0.62 0.13 200)",
  "croissant-electron": "oklch(0.65 0.16 235)",
  olivier: "oklch(0.58 0.10 130)",
  safran: "oklch(0.72 0.16 60)",
  cigale: "oklch(0.68 0.14 300)",
  provence: "oklch(0.65 0.16 40)",
};

export const appLinks: Record<string, string> = {
  pastryvital: "https://pastryvital.vercel.app",
  "llama.scriptc": "https://github.com/croissantsam/llama.scriptc",
  "llama.script": "https://github.com/croissantsam/llama.scriptc",
  calanque: "https://github.com/croissantsam/llama.scriptc",
  "croissant-electron": "https://github.com/croissantsam/croissant-electron",
  olivier: "https://olivier.vercel.app",
  safran: "https://safran.vercel.app",
  cigale: "https://cigale.vercel.app",
  provence: "https://provence.vercel.app",
};

export function getAppIcon(id: string): LucideIcon {
  return appIcons[id] ?? Sparkles;
}

export function getAppTint(id: string): string {
  return appTints[id] ?? "var(--terracotta)";
}

export function getAppLink(id: string): string {
  return appLinks[id] ?? "#";
}

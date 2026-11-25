import type { AppId } from "@/utils/i18n";

const appDetailPaths = {
  pastryvital: "/{-$locale}/apps/pastryvital",
  logimons: "/{-$locale}/apps/logimons",
  openworldcar: "/{-$locale}/apps/openworldcar",
  "croissant-electron": "/{-$locale}/apps/croissant-electron",
  "kim-these": "/{-$locale}/apps/kim-these",
  puerto: "/{-$locale}/apps/puerto",
  "llama-ts": "/{-$locale}/apps/llama-ts",
} as const;

export type AppDetailPath = (typeof appDetailPaths)[AppId];

export function getAppDetailPath(id: string): AppDetailPath {
  return appDetailPaths[id as AppId];
}

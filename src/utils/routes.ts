import {
  Compass,
  LayoutDashboard,
  Layers,
  MessagesSquare,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import type { FileRoutesByTo } from "@/routeTree.gen";
import { getMessages, type Locale } from "@/utils/i18n";

type AppRouteTo = keyof FileRoutesByTo;

export type NavItem = {
  id: string;
  label: string;
  icon: LucideIcon;
  to: AppRouteTo;
  exact?: boolean;
};

export function getNavItems(locale: Locale): NavItem[] {
  const { nav } = getMessages(locale);

  return [
    {
      id: "overview",
      label: nav.overview,
      icon: LayoutDashboard,
      to: "/{-$locale}",
      exact: true,
    },
    { id: "apps", label: nav.apps, icon: Sparkles, to: "/{-$locale}/apps", exact: false },
    { id: "explore", label: nav.explore, icon: Compass, to: "/{-$locale}/explore", exact: false },
    { id: "stack", label: nav.stack, icon: Layers, to: "/{-$locale}/stack", exact: false },
    {
      id: "contact",
      label: nav.contact,
      icon: MessagesSquare,
      to: "/{-$locale}/contact",
      exact: false,
    },
  ];
}

export function normalizeNavPath(path: string, locale?: string) {
  return path.replace("/{-$locale}", locale ? `/${locale}` : "");
}

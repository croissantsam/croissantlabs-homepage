import { Link, useLocation, useMatches } from "@tanstack/react-router";
import { Bell, Command, Croissant, Languages } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/ui/components/breadcrumb";
import { SidebarTrigger } from "@/ui/components/sidebar";
import { ModeToggle } from "./mode-toggle";
import { replaceLocaleInPathname, supportedLocales, useI18n } from "@/utils/i18n";

export const Header = () => {
  const location = useLocation();
  const { locale, messages } = useI18n();
  const nextLocale = locale.startsWith("fr") ? "en" : "fr";
  const crumbs = useMatches()
    .filter((match) => Boolean(match.staticData?.breadcrumb))
    .map((match) => ({
      key: match.staticData!.breadcrumb!,
      to: match.pathname,
    }));

  const currentCrumb = crumbs[crumbs.length - 1];

  return (
    <header className="glass flex w-full items-center gap-3 rounded-3xl p-3 pl-5">
      <div className="flex items-center gap-2 text-sm">
        <SidebarTrigger />
        <Breadcrumb className="hidden md:block">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink render={<Link to="/{-$locale}" params={{ locale }} />}>
                {messages.header.dashboard}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink render={<Link to={currentCrumb.to} />}>
                {messages.nav[currentCrumb.key]}
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="flex min-w-0 items-center gap-2.5 md:hidden">
        <div
          className="text-primary-foreground flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl shadow-lg"
          style={{
            background: "linear-gradient(135deg, var(--terracotta), var(--sunset))",
          }}
        >
          <Croissant className="h-5 w-5" />
        </div>
        <div className="flex min-w-0 flex-col justify-center leading-tight">
          <div className="text-lg font-semibold text-foreground truncate ">
            CroissantLabs
          </div>
          <div className="text-muted-foreground truncate text-[10px]">
            {messages.sidebar.studioLocation}
          </div>
        </div>
      </div>

      <div className="ml-auto hidden max-w-md flex-1 items-center gap-2 md:flex" />

      <div className="items-center gap-1 rounded-xl p-1">
        <a
          href={replaceLocaleInPathname(location.pathname, nextLocale)}
          aria-label={`${messages.localeSwitcherLabel}: ${nextLocale.toUpperCase()}`}
          className="glass-tint flex h-10 shrink-0 items-center gap-1.5 rounded-xl px-3 text-xs font-medium transition hover:scale-105"
        >
          <Languages className="h-4 w-4" />
          <span className="uppercase">{locale.startsWith("fr") ? "FR" : "EN"}</span>
        </a>
      </div>
    </header>
  );
};

import { getAppItems, useI18n } from "@/utils/i18n";
import { getNavItems } from "@/utils/routes";
import { Link } from "@tanstack/react-router";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/ui/components/sidebar";
import {
  Camera,
  ChevronRight,
  Croissant,
  Heart,
  Music4,
  Palette,
  Sparkles,
  TreePalm,
  Waves,
} from "lucide-react";

const appIcons = {
  pastryvital: Heart,
  "llama.script": Waves,
  olivier: TreePalm,
  safran: Camera,
  cigale: Music4,
  provence: Palette,
} as const;

const appTints = {
  pastryvital: "oklch(0.65 0.13 220)",
  "llama.script": "oklch(0.62 0.13 200)",
  olivier: "oklch(0.58 0.10 130)",
  safran: "oklch(0.72 0.16 60)",
  cigale: "oklch(0.68 0.14 300)",
  provence: "oklch(0.65 0.16 40)",
} as const;

const appLinks: Record<string, string> = {
  pastryvital: "https://pastryvital.vercel.app",
  "llama.script": "https://llamascript.vercel.app",
  olivier: "https://olivier.vercel.app",
  safran: "https://safran.vercel.app",
  cigale: "https://cigale.vercel.app",
  provence: "https://provence.vercel.app",
};

export function AppSidebar() {
  const { locale, messages } = useI18n();
  const navItems = getNavItems(locale);
  const apps = getAppItems(locale);

  return (
    <Sidebar className="h-full border-r-0 border-none p-4">
      <aside className="h-full overflow-auto">
        <div className="glass flex-col rounded-3xl p-2 md:flex md:h-full">
          <SidebarHeader className="flex items-center gap-2.5">
            <div
              className="text-primary-foreground flex h-10 w-10 items-center justify-center rounded-2xl shadow-lg"
              style={{
                background: "linear-gradient(135deg, var(--terracotta), var(--sunset))",
              }}
            >
              <Croissant className="h-5 w-5" />
            </div>
            <div>
              <div className="font-display text-lg leading-none">CroissantLabs</div>
              <div className="text-muted-foreground mt-0.5 text-[11px]">
                {messages.sidebar.studioLocation}
              </div>
            </div>
          </SidebarHeader>

          <SidebarContent>
            <SidebarMenu className="mt-8 flex flex-col gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;

                return (
                  <SidebarMenuItem key={item.id}>
                    <Link
                      to={item.to}
                      params={{ locale }}
                      activeOptions={{ exact: !!item.exact }}
                      className="cursor-pointer"
                    >
                      {({ isActive }) => (
                        <SidebarMenuButton
                          className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-all ${
                            isActive
                              ? "text-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]"
                              : "text-muted-foreground hover:text-foreground hover:bg-white/30"
                          }`}
                          style={
                            isActive
                              ? {
                                  background:
                                    "linear-gradient(135deg, oklch(1 0 0 / 0.7), oklch(1 0 0 / 0.35))",
                                }
                              : undefined
                          }
                        >
                          <Icon className="h-4 w-4" />
                          <span>{item.label}</span>
                          {isActive ? (
                            <ChevronRight className="ml-auto h-3.5 w-3.5 opacity-60" />
                          ) : null}
                        </SidebarMenuButton>
                      )}
                    </Link>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>

            <SidebarGroup>
              <div className="mt-6">
                <div className="text-muted-foreground mb-2 px-3 text-[10px] tracking-widest uppercase">
                  {messages.sidebar.suiteLabel}
                </div>
                <div className="flex flex-col gap-1">
                  {apps.slice(0, 4).map((app) => {
                    const Icon = appIcons[app.id as keyof typeof appIcons] ?? Sparkles;
                    const tint = appTints[app.id as keyof typeof appTints] ?? "var(--terracotta)";
                    const href = appLinks[app.id] ?? "#";

                    return (
                      <a
                        key={app.id}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-foreground flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition hover:bg-white/30"
                      >
                        <span
                          className="flex h-6 w-6 items-center justify-center rounded-md text-white/95"
                          style={{ background: tint }}
                        >
                          <Icon className="h-3.5 w-3.5" />
                        </span>
                        {app.name}
                      </a>
                    );
                  })}
                </div>
              </div>
            </SidebarGroup>
          </SidebarContent>

          <div className="glass-tint mt-auto rounded-2xl p-3 text-xs">
            <div className="flex items-center gap-2">
              <div
                className="h-8 w-8 rounded-full"
                style={{
                  background: "linear-gradient(135deg, var(--lavender), var(--mediterranean))",
                }}
              />
              <div>
                <div className="font-medium">{messages.sidebar.visitorName}</div>
                <div className="text-muted-foreground">{messages.sidebar.visitorAccess}</div>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </Sidebar>
  );
}

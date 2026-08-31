import { getAppIcon, getAppLink, getAppTint } from "@/utils/apps";
import { getAppItems, getMessages, useI18n } from "@/utils/i18n";
import { createFileRoute } from "@tanstack/react-router";
import { ExternalLink } from "lucide-react";

export const Route = createFileRoute("/{-$locale}/(home)/apps")({
  head: ({ params }) => {
    const messages = getMessages(params.locale);

    return {
      meta: [
        { title: messages.appsPage.metaTitle },
        { name: "description", content: messages.appsPage.metaDescription },
      ],
    };
  },
  staticData: {
    breadcrumb: "apps",
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { locale, messages } = useI18n();
  const apps = getAppItems(locale);

  return (
    <section className="glass rounded-3xl p-6 md:p-8">
      <div className="text-muted-foreground text-[11px] tracking-widest uppercase">
        {messages.appsPage.eyebrow}
      </div>
      <h1 className="font-display mt-2 text-3xl md:text-5xl">{messages.appsPage.title}</h1>
      <p className="text-muted-foreground mt-3 max-w-2xl">{messages.appsPage.intro}</p>

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        {messages.appsPage.highlights.map((item) => (
          <div key={item.key} className="glass-tint rounded-2xl p-4">
            <div className="font-display text-2xl">{item.value}</div>
            <div className="text-muted-foreground mt-1 text-xs">{item.label}</div>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <h2 className="font-display text-xl">{messages.appsPage.sectionTitle}</h2>
        <p className="text-muted-foreground mt-1 text-sm">{messages.appsPage.sectionBody}</p>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        {apps.map((app) => {
          const Icon = getAppIcon(app.id);
          const tint = getAppTint(app.id);
          const href = getAppLink(app.id);

          return (
            <a
              key={app.id}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-tint group flex flex-col justify-between rounded-2xl p-5 transition hover:scale-[1.01]"
              style={{
                ["--app-tint" as string]: tint,
              }}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-white shadow-md"
                    style={{ background: tint }}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg transition-colors">{app.name}</h3>
                    <p className="text-muted-foreground text-sm">{app.tagline}</p>
                  </div>
                </div>
                <span
                  className="shrink-0 rounded-full px-2 py-0.5 text-[11px]"
                  style={{
                    background:
                      app.status === "live"
                        ? "oklch(0.85 0.1 130 / 0.5)"
                        : app.status === "beta"
                          ? "oklch(0.85 0.12 75 / 0.5)"
                          : app.status === "boilerplate"
                            ? "oklch(0.85 0.12 235 / 0.5)"
                            : "oklch(0.85 0.05 300 / 0.5)",
                  }}
                >
                  {messages.common.statuses[app.status]}
                </span>
              </div>
              <div className="text-muted-foreground mt-4 flex items-center justify-between text-xs">
                <span>
                  {app.status === "boilerplate"
                    ? "GitHub Starter"
                    : `${app.users} ${messages.common.users}`}
                </span>
                <span className="flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                  {app.status === "boilerplate"
                    ? locale === "fr"
                      ? "Voir sur GitHub"
                      : "View on GitHub"
                    : messages.common.openDemo}
                  <ExternalLink className="h-3 w-3" />
                </span>
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
}

import { getAppItems, getMessages, useI18n } from "@/utils/i18n";
import { createFileRoute } from "@tanstack/react-router";

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
        {apps.map((app) => (
          <article key={app.id} className="glass-tint rounded-2xl p-5">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h3 className="font-display text-lg">{app.name}</h3>
                <p className="text-muted-foreground mt-1 text-sm">{app.tagline}</p>
              </div>
              <span className="rounded-full bg-white/70 px-2 py-1 text-[11px]">
                {messages.common.statuses[app.status]}
              </span>
            </div>
            <div className="text-muted-foreground mt-4 text-xs">
              {app.users} {messages.common.users}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

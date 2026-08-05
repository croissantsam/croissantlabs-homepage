import { getMessages, useI18n } from "@/utils/i18n";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/{-$locale}/(home)/contact")({
  head: ({ params }) => {
    const messages = getMessages(params.locale);

    return {
      meta: [
        { title: messages.contactPage.metaTitle },
        { name: "description", content: messages.contactPage.metaDescription },
      ],
    };
  },
  staticData: {
    breadcrumb: "contact",
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { messages } = useI18n();

  return (
    <section className="glass rounded-3xl p-6 md:p-8">
      <div className="text-muted-foreground text-[11px] tracking-widest uppercase">
        {messages.contactPage.eyebrow}
      </div>
      <h1 className="font-display mt-2 text-3xl md:text-5xl">{messages.contactPage.title}</h1>
      <p className="text-muted-foreground mt-3 max-w-2xl">{messages.contactPage.intro}</p>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {messages.contactPage.channels.map((channel) => (
          <article key={channel.key} className="glass-tint rounded-2xl p-5">
            <div className="text-muted-foreground text-xs uppercase">{channel.title}</div>
            <div className="font-display mt-2 text-xl">{channel.value}</div>
            <p className="text-muted-foreground mt-2 text-sm leading-6">{channel.body}</p>
          </article>
        ))}
      </div>

      <a
        href={`mailto:${messages.contactPage.channels[0]?.value ?? "hello@croissantlabs.dev"}`}
        className="mt-6 inline-flex rounded-xl px-5 py-2.5 text-sm font-medium text-white shadow-lg transition hover:scale-[1.02]"
        style={{
          background: "linear-gradient(135deg, var(--terracotta), var(--sunset))",
        }}
      >
        {messages.contactPage.cta}
      </a>
    </section>
  );
}

import { getMessages, useI18n } from "@/utils/i18n";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/{-$locale}/(home)/explore")({
  head: ({ params }) => {
    const messages = getMessages(params.locale);

    return {
      meta: [
        { title: messages.explorePage.metaTitle },
        { name: "description", content: messages.explorePage.metaDescription },
      ],
    };
  },
  staticData: {
    breadcrumb: "explore",
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { messages } = useI18n();

  return (
    <section className="glass rounded-3xl p-6 md:p-8">
      <div className="text-muted-foreground text-[11px] tracking-widest uppercase">
        {messages.explorePage.eyebrow}
      </div>
      <h1 className="font-display mt-2 text-3xl md:text-5xl">{messages.explorePage.title}</h1>
      <p className="text-muted-foreground mt-3 max-w-2xl">{messages.explorePage.intro}</p>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {messages.explorePage.cards.map((card) => (
          <article key={card.key} className="glass-tint rounded-2xl p-5">
            <h2 className="font-display text-lg">{card.title}</h2>
            <p className="text-muted-foreground mt-2 text-sm leading-6">{card.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

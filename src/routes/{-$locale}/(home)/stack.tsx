import { getMessages, useI18n } from "@/utils/i18n";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/{-$locale}/(home)/stack")({
  head: ({ params }) => {
    const messages = getMessages(params.locale);

    return {
      meta: [
        { title: messages.stackPage.metaTitle },
        { name: "description", content: messages.stackPage.metaDescription },
      ],
    };
  },
  staticData: {
    breadcrumb: "stack",
  },
  component: StackPage,
});

function StackPage() {
  const { messages } = useI18n();

  return (
    <section className="mx-auto max-w-4xl p-6">
      <h1 className="font-display mb-8 text-3xl md:text-4xl">{messages.stackPage.title}</h1>

      <div className="space-y-6">
        {/* Framework */}
        <div>
          <h2 className="font-display mb-3 text-xl">{messages.stackPage.framework.title}</h2>
          <p className="text-muted-foreground mb-4">{messages.stackPage.framework.description}</p>
          <ul className="list-inside list-disc space-y-2 text-sm">
            <li>
              <strong>TanStack Start</strong> - Full-stack React framework with server functions,
              streaming, and deployment to any hosting provider
            </li>
            <li>
              <strong>TanStack Router</strong> - Type-safe routing with file-based routing and
              automatic code splitting
            </li>
          </ul>
        </div>

        {/* Styling */}
        <div>
          <h2 className="font-display mb-3 text-xl">{messages.stackPage.styling.title}</h2>
          <p className="text-muted-foreground mb-4">{messages.stackPage.styling.description}</p>
          <ul className="list-inside list-disc space-y-2 text-sm">
            <li>
              <strong>Tailwind CSS v4</strong> - Utility-first CSS framework for rapid UI
              development
            </li>
            <li>
              <strong>shadcn/ui</strong> - Accessible component library built on Radix UI primitives
            </li>
            <li>
              <strong>Base UI</strong> - Pre-built React components for common patterns (dialog,
              input, button, etc.)
            </li>
          </ul>
        </div>

        {/* Internationalization */}
        <div>
          <h2 className="font-display mb-3 text-xl">{messages.stackPage.i18n.title}</h2>
          <p className="text-muted-foreground mb-4">{messages.stackPage.i18n.description}</p>
          <ul className="list-inside list-disc space-y-2 text-sm">
            <li>
              <strong>Custom locale system</strong> - FR/EN bilingual support with dynamic route
              parameters ({"{-$locale}"})
            </li>
            <li>
              <strong>Message dictionaries</strong> - Centralized translations in src/utils/i18n.tsx
              with nested structures for navigation, headers, home page, apps, contact, and explore
              pages
            </li>
          </ul>
        </div>
      </div>

      {/* Stack visual */}
      <div className="border-border/50 bg-card/80 mt-8 rounded-3xl border p-6">
        <h2 className="font-display mb-4 text-xl">Technology Stack Overview</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="font-display mb-2 text-sm">Client</h3>
            <ul className="list-inside list-disc space-y-1 text-sm">
              <li>React 19</li>
              <li>React DOM 19</li>
              <li>Lucide React icons</li>
            </ul>
          </div>
          <div>
            <h3 className="font-display mb-2 text-sm">Server</h3>
            <ul className="list-inside list-disc space-y-1 text-sm">
              <li>TanStack Start server runtime</li>
              <li>Nitro adapter</li>
              <li>Server functions</li>
            </ul>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-4">
          <div>
            <h3 className="font-display mb-2 text-sm">Build & Tooling</h3>
            <ul className="list-inside list-disc space-y-1 text-sm">
              <li>Vite</li>
              <li>TanStack Devtools</li>
              <li>oxc formatter & linter</li>
            </ul>
          </div>
          <div>
            <h3 className="font-display mb-2 text-sm">Data & API</h3>
            <ul className="list-inside list-disc space-y-1 text-sm">
              <li>TanStack Router data loading</li>
              <li>Server functions for API</li>
              <li>Static data with breadcrumbs</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

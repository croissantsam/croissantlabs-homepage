import { getAppIcon, getAppLink, getAppTint } from "@/utils/apps";
import { getAppItems, getMessages, useI18n } from "@/utils/i18n";
import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ChevronRight, Heart, Music4, Pause, Play, Plus, Star } from "lucide-react";

export const Route = createFileRoute("/{-$locale}/(home)/")({
  head: ({ params }) => {
    const messages = getMessages(params.locale);

    return {
      meta: [
        { title: messages.home.metaTitle },
        {
          name: "description",
          content: messages.home.metaDescription,
        },
        { property: "og:title", content: messages.home.metaTitle },
        {
          property: "og:description",
          content: messages.home.ogDescription,
        },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  staticData: {
    breadcrumb: "overview",
  },
  component: Landing,
});

function Landing() {
  const { locale, messages } = useI18n();
  const apps = getAppItems(locale);
  const [selectedApp, setSelectedApp] = useState<string>("pastryvital");
  const [liked, setLiked] = useState<Set<string>>(new Set(["safran"]));
  const [playing, setPlaying] = useState(false);

  const app = useMemo(
    () => apps.find((item) => item.id === selectedApp) ?? apps[0],
    [apps, selectedApp],
  );

  const toggleLike = (id: string) => {
    setLiked((prev) => {
      const next = new Set(prev);

      if (next.has(id)) next.delete(id);
      else next.add(id);

      return next;
    });
  };

  return (
    <>
      <section className="glass hero-panel relative overflow-hidden rounded-3xl p-8 md:p-10">
        <div className="flex items-center gap-2 text-xs">
          <span
            className="h-2 w-2 animate-pulse rounded-full"
            style={{ background: "var(--olive)" }}
          />
          <span className="text-muted-foreground">{messages.home.liveStatus}</span>
        </div>

        <h1 className="font-display mt-4 max-w-3xl text-4xl leading-[1.02] md:text-6xl">
          {messages.home.titleStart}{" "}
          <span
            style={{
              background: "linear-gradient(90deg, var(--terracotta), var(--sunset), var(--ochre))",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            {messages.home.titleAccent}
          </span>
        </h1>

        <p className="text-muted-foreground mt-4 max-w-xl">{messages.home.intro}</p>

        <div className="mt-6 flex flex-wrap gap-2">
          <button
            className="text-primary-foreground rounded-xl px-5 py-2.5 text-sm font-medium shadow-lg transition hover:scale-[1.02]"
            style={{
              background: "linear-gradient(135deg, var(--terracotta), var(--sunset))",
            }}
          >
            {messages.home.primaryCta}
          </button>
          <button className="glass-tint rounded-xl px-5 py-2.5 text-sm font-medium transition hover:scale-[1.02]">
            {messages.home.secondaryCta}
          </button>
        </div>

        <div className="mt-8 grid max-w-3xl grid-cols-2 gap-3 md:grid-cols-4">
          {messages.home.stats.map((stat) => (
            <div
              key={stat.key}
              className="glass-tint rounded-2xl p-4"
              style={{ ["--tw-glass-tint" as string]: stat.color }}
            >
              <div className="font-display text-2xl">{stat.value}</div>
              <div className="text-muted-foreground mt-1 text-xs">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <div className="glass rounded-3xl p-5 lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="font-display text-lg">{messages.home.appsTitle}</h2>
              <p className="text-muted-foreground text-xs">{messages.home.appsSubtitle}</p>
            </div>
            <button className="text-muted-foreground hover:text-foreground flex items-center gap-1 text-xs">
              {messages.home.seeAll} <ChevronRight className="h-3 w-3" />
            </button>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {apps.map((item) => {
              const Icon = getAppIcon(item.id);
              const isSelected = item.id === selectedApp;
              const isLiked = liked.has(item.id);
              const tint = getAppTint(item.id);

              return (
                <button
                  key={item.id}
                  onClick={() => setSelectedApp(item.id)}
                  className={`app-card relative overflow-hidden rounded-2xl p-4 text-left transition-all ${
                    isSelected
                      ? "scale-[1.01] ring-2 ring-offset-2 ring-offset-transparent"
                      : "hover:scale-[1.01]"
                  }`}
                  style={{
                    ["--app-tint" as string]: tint,
                    boxShadow: isSelected ? `0 10px 30px -10px ${tint}` : undefined,
                    ["--tw-ring-color" as string]: tint,
                  }}
                >
                  <div className="flex items-start justify-between">
                    <div
                      className="flex h-11 w-11 items-center justify-center rounded-xl text-white shadow-md"
                      style={{ background: tint }}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <div
                      onClick={(event) => {
                        event.stopPropagation();
                        toggleLike(item.id);
                      }}
                      className="glass-tint flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg transition hover:scale-110"
                    >
                      <Heart
                        className={`h-3.5 w-3.5 transition ${isLiked ? "fill-current" : ""}`}
                        style={{ color: isLiked ? "var(--terracotta)" : undefined }}
                      />
                    </div>
                  </div>

                  <div className="mt-3">
                    <div className="flex items-center gap-2">
                      <div className="font-display text-base">{item.name}</div>
                      <span
                        className="rounded-full px-1.5 py-0.5 text-[10px]"
                        style={{
                          background:
                            item.status === "live"
                              ? "oklch(0.85 0.1 130 / 0.5)"
                              : item.status === "beta"
                                ? "oklch(0.85 0.12 75 / 0.5)"
                                : item.status === "boilerplate"
                                  ? "oklch(0.85 0.12 235 / 0.5)"
                                  : "oklch(0.85 0.05 300 / 0.5)",
                        }}
                      >
                        {messages.common.statuses[item.status]}
                      </span>
                    </div>
                    <div className="text-muted-foreground mt-1 text-xs">{item.tagline}</div>
                    <div className="text-muted-foreground mt-3 text-[11px]">
                      {item.status === "boilerplate"
                        ? "GitHub Starter"
                        : `${item.users} ${messages.common.users}`}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <div
            className="app-focus relative overflow-hidden rounded-3xl p-5"
            style={{
              ["--app-tint" as string]: getAppTint(app.id),
              boxShadow: `0 20px 60px -20px ${getAppTint(app.id)}`,
            }}
          >
            <div className="text-muted-foreground text-[10px] tracking-widest uppercase">
              {messages.home.focusLabel}
            </div>
            <div className="mt-2 flex items-center gap-3">
              <div
                className="flex h-12 w-12 items-center justify-center rounded-2xl text-white shadow-lg"
                style={{
                  background: getAppTint(app.id),
                }}
              >
                {(() => {
                  const Icon = getAppIcon(app.id);

                  return <Icon className="h-6 w-6" />;
                })()}
              </div>
              <div>
                <div className="font-display text-xl">{app.name}</div>
                <div className="text-muted-foreground text-xs">{app.tagline}</div>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-2 text-center">
              {app.status === "boilerplate"
                ? [
                    { key: "repo", label: "Repo", value: "GitHub" },
                    {
                      key: "type",
                      label: "Type",
                      value: app.id === "llama.scriptc" ? "Engine" : "Starter",
                    },
                    {
                      key: "version",
                      label: "Stack",
                      value: app.id === "llama.scriptc" ? "ScriptC" : "Electron",
                    },
                  ].map((stat) => (
                    <div key={stat.key} className="glass-tint rounded-xl py-2">
                      <div className="font-display text-sm">{stat.value}</div>
                      <div className="text-muted-foreground text-[10px]">{stat.label}</div>
                    </div>
                  ))
                : [
                    { key: "mau", label: "MAU", value: app.users },
                    { key: "rating", label: "Rating", value: "4.9" },
                    { key: "version", label: "v", value: "2.4" },
                  ].map((stat) => (
                    <div key={stat.key} className="glass-tint rounded-xl py-2">
                      <div className="font-display">{stat.value}</div>
                      <div className="text-muted-foreground text-[10px]">{stat.label}</div>
                    </div>
                  ))}
            </div>

            <a
              href={getAppLink(app.id)}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-tint mt-4 flex w-full items-center justify-center gap-1.5 rounded-xl py-2 text-sm font-medium transition hover:scale-[1.01]"
            >
              {app.status === "boilerplate"
                ? locale === "fr"
                  ? "Voir sur GitHub"
                  : "View on GitHub"
                : messages.common.openDemo}{" "}
              <ChevronRight className="h-3.5 w-3.5" />
            </a>
          </div>

          <div className="glass rounded-3xl p-5">
            <div className="flex items-center justify-between">
              <div className="text-muted-foreground text-[10px] tracking-widest uppercase">
                {messages.home.playerLabel}
              </div>
              <span
                className="h-2 w-2 animate-pulse rounded-full"
                style={{ background: "var(--terracotta)" }}
              />
            </div>
            <div className="mt-3 flex items-center gap-3">
              <div
                className="flex h-14 w-14 items-center justify-center rounded-2xl shadow-lg"
                style={{
                  background: "linear-gradient(135deg, var(--lavender), var(--mediterranean))",
                }}
              >
                <Music4 className="h-6 w-6 text-white" />
              </div>
              <div className="min-w-0">
                <div className="truncate font-medium">{messages.home.playerTitle}</div>
                <div className="text-muted-foreground truncate text-xs">
                  {messages.home.playerSubtitle}
                </div>
              </div>
              <button
                onClick={() => setPlaying((value) => !value)}
                className="ml-auto flex h-11 w-11 items-center justify-center rounded-full text-white shadow-lg transition hover:scale-105"
                style={{
                  background: "linear-gradient(135deg, var(--terracotta), var(--sunset))",
                }}
              >
                {playing ? <Pause className="h-4 w-4" /> : <Play className="ml-0.5 h-4 w-4" />}
              </button>
            </div>
            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/50">
              <div
                className="h-full transition-all"
                style={{
                  width: playing ? "62%" : "18%",
                  background: "linear-gradient(90deg, var(--terracotta), var(--sunset))",
                }}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-5 md:grid-cols-3">
        <div className="glass rounded-3xl p-5 md:col-span-2">
          <div className="flex items-center gap-2">
            <div
              className="flex h-8 w-8 items-center justify-center rounded-lg text-white"
              style={{
                background: "linear-gradient(135deg, var(--olive), var(--mediterranean))",
              }}
            >
              <Star className="h-4 w-4" />
            </div>
            <h3 className="font-display text-lg">{messages.home.recentTitle}</h3>
          </div>
          <ul className="mt-4 flex flex-col gap-2">
            {messages.home.activity.map((row) => (
              <li
                key={row.team + row.message}
                className="glass-tint flex cursor-pointer items-center gap-3 rounded-xl px-4 py-3 text-sm transition hover:scale-[1.005]"
              >
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ background: "var(--terracotta)" }}
                />
                <span className="font-medium">{row.team}</span>
                <span className="text-muted-foreground truncate">{row.message}</span>
                <span className="text-muted-foreground ml-auto shrink-0 text-xs">{row.ago}</span>
              </li>
            ))}
          </ul>
        </div>

        <div
          className="relative flex flex-col justify-between overflow-hidden rounded-3xl p-5"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.35 0.08 40 / 0.85), oklch(0.28 0.06 25 / 0.75))",
            backdropFilter: "blur(24px) saturate(160%)",
            border: "1px solid oklch(1 0 0 / 0.2)",
            color: "oklch(0.98 0.02 85)",
          }}
        >
          <div
            className="absolute -top-16 -right-16 h-48 w-48 rounded-full"
            style={{
              background: "radial-gradient(circle, var(--sunset), transparent 70%)",
            }}
          />
          <div className="relative">
            <div className="text-[10px] tracking-widest uppercase opacity-70">
              {messages.home.jobsLabel}
            </div>
            <h3 className="font-display mt-2 text-2xl leading-tight">{messages.home.jobsTitle}</h3>
            <p className="mt-2 text-sm opacity-80">{messages.home.jobsBody}</p>
          </div>
          <button
            className="relative mt-4 flex w-full items-center justify-center gap-1.5 rounded-xl py-2.5 text-sm font-medium transition hover:scale-[1.01]"
            style={{
              background: "oklch(1 0 0 / 0.15)",
              border: "1px solid oklch(1 0 0 / 0.25)",
              backdropFilter: "blur(10px)",
            }}
          >
            <Plus className="h-4 w-4" /> {messages.home.jobsCta}
          </button>
        </div>
      </section>

      <footer className="text-muted-foreground py-4 text-center text-xs">
        {messages.home.footer}
      </footer>
    </>
  );
}

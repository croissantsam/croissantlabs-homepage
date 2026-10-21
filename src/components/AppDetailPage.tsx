import type { AppCommit } from "@/utils/github-activity";
import { formatTimeAgo } from "@/utils/github-activity";
import type { AppId } from "@/utils/i18n";
import { getAppDetailPath } from "@/utils/app-routes";
import type { AppLinkKind } from "@/utils/apps";
import { getAppIcon, getAppLinks, getAppTint } from "@/utils/apps";
import { getAppById, getAppItems, useI18n } from "@/utils/i18n";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, ExternalLink, GitBranch, History, Package } from "lucide-react";

function AppDetailPage({ appId, commits }: { appId: AppId; commits?: AppCommit[] }) {
  const { locale, messages } = useI18n();
  const app = getAppById(locale, appId);
  const Icon = getAppIcon(app.id);
  const tint = getAppTint(app.id);
  const links = getAppLinks(app.id);
  const repoLink = links.find((link) => link.kind === "repo");
  const allApps = getAppItems(locale);
  const otherApps = allApps.filter((item) => item.id !== app.id);

  const { detail, links: linkLabels, statuses } = messages.common;

  const statusStyle =
    app.status === "live"
      ? "oklch(0.85 0.1 130 / 0.5)"
      : app.status === "beta"
        ? "oklch(0.85 0.12 75 / 0.5)"
        : app.status === "boilerplate"
          ? "oklch(0.85 0.12 235 / 0.5)"
          : "oklch(0.85 0.05 300 / 0.5)";

  const linkIcon: Record<AppLinkKind, typeof GitBranch> = {
    demo: ExternalLink,
    repo: GitBranch,
    npm: Package,
  };

  return (
    <section className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <Link
          to="/{-$locale}/apps"
          params={{ locale }}
          className="text-muted-foreground hover:text-foreground flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-medium transition"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          {detail.backToApps}
        </Link>
        <span className="rounded-full px-2.5 py-1 text-[11px]" style={{ background: statusStyle }}>
          {statuses[app.status]}
        </span>
      </div>

      <header className="glass relative flex flex-col gap-4 overflow-hidden rounded-3xl p-6 md:p-8">
        <div
          className="pointer-events-none absolute -top-24 -right-16 h-56 w-56 rounded-full opacity-40"
          style={{
            background: `radial-gradient(circle, ${tint}, transparent 70%)`,
          }}
        />
        <div className="flex items-start gap-4">
          <div
            className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-white shadow-lg"
            style={{ background: tint }}
          >
            <Icon className="h-7 w-7" />
          </div>
          <div className="min-w-0">
            <div className="text-muted-foreground text-[10px] tracking-widest uppercase">
              {app.kind}
            </div>
            <h1 className="font-display mt-1 text-3xl md:text-4xl">{app.name}</h1>
            <p className="text-muted-foreground mt-1 text-sm">{app.tagline}</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="text-muted-foreground text-xs">{detail.externalLinksLabel}</div>
          {links.map((link) => {
            const LinkIcon = linkIcon[link.kind];

            return (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-tint flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-medium transition hover:scale-[1.03]"
              >
                <LinkIcon className="h-3.5 w-3.5" />
                {linkLabels[link.kind]}
                <ExternalLink className="h-3 w-3 opacity-60" />
              </a>
            );
          })}
        </div>
      </header>

      {repoLink ? (
        <div className="glass rounded-3xl p-6 md:p-8">
          <div className="flex items-center justify-between gap-3">
            <h2 className="font-display flex items-center gap-2 text-xl">
              <History className="h-5 w-5" style={{ color: tint }} />
              {detail.recentCommitsLabel}
            </h2>
            <a
              href={`${repoLink.href}/commits`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground flex shrink-0 items-center gap-1 text-xs transition"
            >
              {detail.viewAllCommits} <ExternalLink className="h-3 w-3" />
            </a>
          </div>
          <ul className="mt-4 flex flex-col gap-2">
            {(() => {
              const recentCommits = commits ?? [];

              if (recentCommits.length === 0) {
                return (
                  <li className="glass-tint text-muted-foreground rounded-xl px-3.5 py-2.5 text-xs sm:text-sm">
                    {detail.noCommits}
                  </li>
                );
              }

              return recentCommits.map((commit) => (
                <li key={commit.sha}>
                  <a
                    href={commit.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass-tint group flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-xs transition hover:scale-[1.01] sm:text-sm"
                  >
                    <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: tint }} />
                    <span className="shrink-0 font-mono text-[11px] opacity-70">{commit.sha}</span>
                    <span className="text-muted-foreground truncate">{commit.message}</span>
                    <span className="text-muted-foreground ml-auto flex shrink-0 items-center gap-1 text-[11px]">
                      {formatTimeAgo(commit.date, locale)}
                      <ExternalLink className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-70" />
                    </span>
                  </a>
                </li>
              ));
            })()}
          </ul>
        </div>
      ) : null}

      <div className="glass rounded-3xl p-6 md:p-8">
        {app.details.intro.map((paragraph) => (
          <p
            key={paragraph}
            className="text-muted-foreground mt-3 max-w-3xl text-sm leading-relaxed first:mt-0"
          >
            {paragraph}
          </p>
        ))}
      </div>

      <div className="glass rounded-3xl p-6 md:p-8">
        <h2 className="font-display text-xl">{detail.featuresLabel}</h2>
        <div className="mt-4 grid gap-3 lg:grid-cols-2">
          {app.details.features.map((feature) => (
            <div key={feature.title} className="glass-tint rounded-2xl p-4">
              <h3 className="font-display text-base">{feature.title}</h3>
              <p className="text-muted-foreground mt-1.5 text-xs leading-relaxed">{feature.body}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="glass rounded-3xl p-6 md:p-8">
        <h2 className="font-display text-xl">{detail.stackLabel}</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {app.details.stack.map((tech) => (
            <span key={tech} className="glass-tint rounded-full px-3 py-1 text-xs">
              {tech}
            </span>
          ))}
        </div>
      </div>

      <div className="glass rounded-3xl p-6 md:p-8">
        <h2 className="font-display text-xl">{detail.othersLabel}</h2>
        <div className="mt-4 grid gap-3 lg:grid-cols-2">
          {otherApps.map((other) => {
            const OtherIcon = getAppIcon(other.id);
            const otherTint = getAppTint(other.id);

            return (
              <Link
                key={other.id}
                to={getAppDetailPath(other.id)}
                params={{ locale }}
                className="glass-tint group flex items-center gap-3 rounded-2xl p-4 transition hover:scale-[1.01]"
              >
                <div
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-white shadow-md"
                  style={{ background: otherTint }}
                >
                  <OtherIcon className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <div className="font-display text-sm">{other.name}</div>
                  <div className="text-muted-foreground truncate text-xs">{other.kind}</div>
                </div>
                <ArrowRight className="text-muted-foreground ml-auto h-4 w-4 shrink-0 opacity-0 transition-opacity group-hover:opacity-100" />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export { AppDetailPage };

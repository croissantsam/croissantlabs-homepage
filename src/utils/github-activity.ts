import { queryOptions, useQuery } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";

export type GitHubActivityItem = {
  repo: string;
  team: string;
  message: string;
  date: string;
  url: string;
  type: "release" | "commit" | "event";
};

export type AppCommit = {
  sha: string;
  message: string;
  date: string;
  url: string;
};

function githubHeaders(): Record<string, string> {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github.v3+json",
    "User-Agent": "CroissantLabs-Web",
  };

  const token =
    typeof process !== "undefined"
      ? process.env?.GITHUB_TOKEN || process.env?.VITE_GITHUB_TOKEN
      : undefined;

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
}

export const TRACKED_REPOS: { repo: string; team: string }[] = [
  { repo: "croissantsam/croissant-electron", team: "croissant-electron" },
  { repo: "croissantsam/logimons", team: "logimons" },
  { repo: "croissantsam/openworldcar", team: "openworldcar" },
];

export function formatTimeAgo(dateString: string, locale: "fr" | "en" = "fr"): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = Math.max(0, now.getTime() - date.getTime());
  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffMinutes < 1) {
    return locale === "fr" ? "à l'instant" : "just now";
  }
  if (diffMinutes < 60) {
    return locale === "fr" ? `${diffMinutes} min` : `${diffMinutes}m ago`;
  }
  if (diffHours < 24) {
    return locale === "fr" ? `${diffHours} h` : `${diffHours}h ago`;
  }
  if (diffDays === 1) {
    return locale === "fr" ? "hier" : "yesterday";
  }
  if (diffDays < 30) {
    return locale === "fr" ? `${diffDays} j` : `${diffDays}d ago`;
  }
  const diffMonths = Math.floor(diffDays / 30);
  return locale === "fr" ? `${diffMonths} mois` : `${diffMonths}mo ago`;
}

// In-memory cache on the server to prevent GitHub rate-limiting
let cachedActivities: { timestamp: number; items: GitHubActivityItem[] } | null = null;
const CACHE_TTL_MS = 1000 * 60 * 10; // 10 minutes

async function fetchRepoActivity(
  repo: string,
  team: string,
  headers: Record<string, string>,
): Promise<GitHubActivityItem | null> {
  const candidates: GitHubActivityItem[] = [];

  try {
    // 1. Fetch latest commits on default branch
    const commitsRes = await fetch(`https://api.github.com/repos/${repo}/commits?per_page=1`, {
      headers,
    });

    if (commitsRes.ok) {
      const commits = await commitsRes.json();
      if (Array.isArray(commits) && commits.length > 0) {
        const first = commits[0];
        const rawMessage = first.commit?.message || "Commit";
        const message = rawMessage.split("\n")[0].trim();
        const date =
          first.commit?.committer?.date || first.commit?.author?.date || new Date().toISOString();

        candidates.push({
          repo,
          team,
          message,
          date,
          url: first.html_url || `https://github.com/${repo}`,
          type: "commit",
        });
      }
    }
  } catch {
    // Gracefully ignore network / rate-limiting errors
  }

  try {
    // 2. Check latest release
    const releaseRes = await fetch(`https://api.github.com/repos/${repo}/releases/latest`, {
      headers,
    });

    if (releaseRes.ok) {
      const release = await releaseRes.json();
      if (release && release.published_at) {
        candidates.push({
          repo,
          team,
          message: release.name || release.tag_name || "Release",
          date: release.published_at,
          url: release.html_url || `https://github.com/${repo}/releases`,
          type: "release",
        });
      }
    }
  } catch {
    // Gracefully ignore release errors
  }

  try {
    // 3. Try public repo events
    const eventsRes = await fetch(`https://api.github.com/repos/${repo}/events?per_page=5`, {
      headers,
    });

    if (eventsRes.ok) {
      const events = await eventsRes.json();
      if (Array.isArray(events) && events.length > 0) {
        const latestEvent = events[0];
        const eventDate = latestEvent.created_at;

        if (latestEvent.type === "PushEvent" && latestEvent.payload?.commits?.length > 0) {
          const lastCommit = latestEvent.payload.commits[latestEvent.payload.commits.length - 1];
          candidates.push({
            repo,
            team,
            message: (lastCommit.message || "Commit").split("\n")[0].trim(),
            date: eventDate,
            url: `https://github.com/${repo}/commit/${lastCommit.sha}`,
            type: "commit",
          });
        } else if (latestEvent.type === "ReleaseEvent" && latestEvent.payload?.release) {
          const release = latestEvent.payload.release;
          candidates.push({
            repo,
            team,
            message: release.name || release.tag_name || "New release",
            date: eventDate,
            url: release.html_url || `https://github.com/${repo}/releases`,
            type: "release",
          });
        }
      }
    }
  } catch {
    // Gracefully ignore events error
  }

  if (candidates.length === 0) {
    return null;
  }

  // Sort candidates by most recent date descending and pick the latest
  candidates.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  return candidates[0];
}

export const getLatestGitHubActivities = createServerFn({
  method: "GET",
}).handler(async (): Promise<GitHubActivityItem[]> => {
  if (cachedActivities && Date.now() - cachedActivities.timestamp < CACHE_TTL_MS) {
    return cachedActivities.items;
  }

  const token =
    typeof process !== "undefined"
      ? process.env?.GITHUB_TOKEN || process.env?.VITE_GITHUB_TOKEN
      : undefined;

  const headers: Record<string, string> = {
    Accept: "application/vnd.github.v3+json",
    "User-Agent": "CroissantLabs-Web",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  try {
    const results = await Promise.all(
      TRACKED_REPOS.map(({ repo, team }) => fetchRepoActivity(repo, team, headers)),
    );
    const items = results.filter((item): item is GitHubActivityItem => Boolean(item));

    if (items.length > 0) {
      cachedActivities = { timestamp: Date.now(), items };
      return items;
    }

    // If fetch returned empty due to rate limit, return previous cache if available
    return cachedActivities?.items ?? [];
  } catch {
    return cachedActivities?.items ?? [];
  }
});

const recentCommitsCache = new Map<string, { timestamp: number; items: AppCommit[] }>();

export const getLatestAppCommits = createServerFn({ method: "GET" })
  .validator((repo: string) => repo)
  .handler(async ({ data: repo }): Promise<AppCommit[]> => {
    const cached = recentCommitsCache.get(repo);

    if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
      return cached.items;
    }

    try {
      const response = await fetch(`https://api.github.com/repos/${repo}/commits?per_page=5`, {
        headers: githubHeaders(),
      });

      if (response.ok) {
        const raw = await response.json();
        const items: AppCommit[] = Array.isArray(raw)
          ? raw
              .filter((entry) => entry?.sha && entry?.commit?.message)
              .map((entry) => ({
                sha: String(entry.sha).slice(0, 7),
                message: String(entry.commit.message).split("\n")[0].trim(),
                date: entry.commit?.committer?.date || entry.commit?.author?.date,
                url: entry.html_url || `https://github.com/${repo}/commit/${entry.sha}`,
              }))
              .filter((commit): commit is AppCommit => Boolean(commit.date))
          : [];

        recentCommitsCache.set(repo, { timestamp: Date.now(), items });

        return items;
      }

      // If fetch failed (rate limit, etc.), return previous cache if available
      return recentCommitsCache.get(repo)?.items ?? [];
    } catch {
      return recentCommitsCache.get(repo)?.items ?? [];
    }
  });

export const githubActivitiesQueryOptions = () =>
  queryOptions({
    queryKey: ["github-activities"],
    queryFn: () => getLatestGitHubActivities(),
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchInterval: 1000 * 60 * 5, // 5 minutes
  });

export function useGitHubActivities(initialData?: GitHubActivityItem[]) {
  return useQuery({
    ...githubActivitiesQueryOptions(),
    initialData: initialData && initialData.length > 0 ? initialData : undefined,
  });
}

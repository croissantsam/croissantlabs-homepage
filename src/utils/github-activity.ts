export type GitHubActivityItem = {
  repo: string;
  team: string;
  message: string;
  date: string;
  url: string;
  type: "release" | "commit";
};

type CacheData = {
  timestamp: number;
  items: GitHubActivityItem[];
};

const CACHE_KEY = "croissantlabs_github_activity_cache";
const ONE_DAY_MS = 24 * 60 * 60 * 1000;

export const TRACKED_REPOS: { repo: string; team: string }[] = [
  { repo: "croissantsam/croissant-electron", team: "croissant-electron" },
  { repo: "croissantsam/llama.scriptc", team: "llama.scriptc" },
];

export function formatTimeAgo(dateString: string, locale: "fr" | "en" = "fr"): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
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

async function fetchRepoActivity(repo: string, team: string): Promise<GitHubActivityItem | null> {
  try {
    // 1. Try to fetch latest release
    const releaseRes = await fetch(`https://api.github.com/repos/${repo}/releases/latest`, {
      headers: { Accept: "application/vnd.github.v3+json" },
    });

    if (releaseRes.ok) {
      const release = await releaseRes.json();
      if (release && release.published_at) {
        return {
          repo,
          team,
          message: `Release ${release.name || release.tag_name}`,
          date: release.published_at,
          url: release.html_url || `https://github.com/${repo}/releases`,
          type: "release",
        };
      }
    }

    // 2. Fallback to latest commit on main/master
    const commitsRes = await fetch(`https://api.github.com/repos/${repo}/commits?per_page=1`, {
      headers: { Accept: "application/vnd.github.v3+json" },
    });

    if (commitsRes.ok) {
      const commits = await commitsRes.json();
      if (Array.isArray(commits) && commits.length > 0) {
        const first = commits[0];
        const rawMessage = first.commit?.message || "Latest commit";
        const message = rawMessage.split("\n")[0].trim();
        const date = first.commit?.committer?.date || first.commit?.author?.date || new Date().toISOString();
        return {
          repo,
          team,
          message,
          date,
          url: first.html_url || `https://github.com/${repo}`,
          type: "commit",
        };
      }
    }
  } catch (error) {
    console.warn(`[GitHub Activity] Failed to fetch activity for ${repo}:`, error);
  }

  return null;
}

export async function getDailyGitHubActivities(): Promise<GitHubActivityItem[]> {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const rawCache = localStorage.getItem(CACHE_KEY);
    if (rawCache) {
      const parsed: CacheData = JSON.parse(rawCache);
      const isFresh = Date.now() - parsed.timestamp < ONE_DAY_MS;
      if (isFresh && Array.isArray(parsed.items) && parsed.items.length > 0) {
        return parsed.items;
      }
    }
  } catch {
    // ignore localStorage read error
  }

  // Daily fetch
  const results = await Promise.all(
    TRACKED_REPOS.map(({ repo, team }) => fetchRepoActivity(repo, team))
  );

  const items = results.filter((item): item is GitHubActivityItem => Boolean(item));

  if (items.length > 0) {
    try {
      const cachePayload: CacheData = {
        timestamp: Date.now(),
        items,
      };
      localStorage.setItem(CACHE_KEY, JSON.stringify(cachePayload));
    } catch {
      // ignore localStorage write error
    }
  }

  return items;
}

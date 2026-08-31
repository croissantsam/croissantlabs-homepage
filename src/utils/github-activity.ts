import { queryOptions, useQuery } from "@tanstack/react-query";

export type GitHubActivityItem = {
  repo: string;
  team: string;
  message: string;
  date: string;
  url: string;
  type: "release" | "commit" | "event";
};

export const TRACKED_REPOS: { repo: string; team: string }[] = [
  { repo: "croissantsam/croissant-electron", team: "croissant-electron" },
  { repo: "croissantsam/llama.scriptc", team: "llama.scriptc" },
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

const GITHUB_HEADERS: HeadersInit = {
  Accept: "application/vnd.github.v3+json",
  "User-Agent": "CroissantLabs-Web",
};

async function fetchRepoActivity(repo: string, team: string): Promise<GitHubActivityItem | null> {
  const candidates: GitHubActivityItem[] = [];

  try {
    // 1. Fetch latest commits on default branch
    const commitsRes = await fetch(`https://api.github.com/repos/${repo}/commits?per_page=1`, {
      headers: GITHUB_HEADERS,
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
  } catch (error) {
    console.warn(`[GitHub Activity] Failed to fetch commits for ${repo}:`, error);
  }

  try {
    // 2. Check latest release
    const releaseRes = await fetch(`https://api.github.com/repos/${repo}/releases/latest`, {
      headers: GITHUB_HEADERS,
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
    // ignore release errors
  }

  try {
    // 3. Try public repo events
    const eventsRes = await fetch(`https://api.github.com/repos/${repo}/events?per_page=5`, {
      headers: GITHUB_HEADERS,
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
    // ignore events error
  }

  if (candidates.length === 0) {
    return null;
  }

  // Sort candidates by most recent date descending and pick the latest
  candidates.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  return candidates[0];
}

export async function getLatestGitHubActivities(): Promise<GitHubActivityItem[]> {
  try {
    const results = await Promise.all(
      TRACKED_REPOS.map(({ repo, team }) => fetchRepoActivity(repo, team)),
    );
    return results.filter((item): item is GitHubActivityItem => Boolean(item));
  } catch (error) {
    console.warn("[GitHub Activity] Error fetching activities:", error);
    return [];
  }
}

export const githubActivitiesQueryOptions = () =>
  queryOptions({
    queryKey: ["github-activities"],
    queryFn: getLatestGitHubActivities,
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchInterval: 1000 * 60 * 5, // 5 minutes
  });

export function useGitHubActivities(initialData?: GitHubActivityItem[]) {
  return useQuery({
    ...githubActivitiesQueryOptions(),
    initialData: initialData && initialData.length > 0 ? initialData : undefined,
  });
}

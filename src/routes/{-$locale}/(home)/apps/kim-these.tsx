import { AppDetailPage } from "@/components/AppDetailPage";
import { getAppRepo } from "@/utils/apps";
import { getLatestAppCommits } from "@/utils/github-activity";
import { getAppById } from "@/utils/i18n";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/{-$locale}/(home)/apps/kim-these")({
  loader: async () => {
    const repo = getAppRepo("kim-these");

    return { commits: repo ? await getLatestAppCommits({ data: repo }) : [] };
  },
  head: ({ params }) => {
    const app = getAppById(params.locale, "kim-these");

    return {
      meta: [
        { title: `${app.name} — CroissantLabs` },
        { name: "description", content: app.tagline },
      ],
    };
  },
  staticData: {
    breadcrumb: "kim-these",
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { commits } = Route.useLoaderData();

  return <AppDetailPage appId="kim-these" commits={commits} />;
}

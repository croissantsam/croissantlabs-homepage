import { createFileRoute } from "@tanstack/react-router";

interface SitemapPage {
  path: string;
  changefreq: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority: number;
}

const PAGES: SitemapPage[] = [
  { path: "", changefreq: "daily", priority: 1.0 },
  { path: "/apps", changefreq: "weekly", priority: 0.9 },
  { path: "/stack", changefreq: "weekly", priority: 0.9 },
  { path: "/explore", changefreq: "weekly", priority: 0.8 },
  { path: "/contact", changefreq: "monthly", priority: 0.8 },
];

const LOCALES = ["fr", "en"] as const;

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const baseUrl =
          (typeof process !== "undefined"
            ? process.env?.SITE_URL || process.env?.VITE_SITE_URL
            : undefined) || "https://croissantlabs.com";

        const today = new Date().toISOString().split("T")[0];

        const entries: string[] = [];

        // Root entry
        entries.push(`  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
    <xhtml:link rel="alternate" hreflang="fr" href="${baseUrl}/fr" />
    <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}/en" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${baseUrl}/fr" />
  </url>`);

        // Localized page entries
        for (const page of PAGES) {
          for (const locale of LOCALES) {
            const loc = `${baseUrl}/${locale}${page.path}`;
            const frAlt = `${baseUrl}/fr${page.path}`;
            const enAlt = `${baseUrl}/en${page.path}`;

            entries.push(`  <url>
    <loc>${loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
    <xhtml:link rel="alternate" hreflang="fr" href="${frAlt}" />
    <xhtml:link rel="alternate" hreflang="en" href="${enAlt}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${frAlt}" />
  </url>`);
          }
        }

        const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries.join("\n")}
</urlset>`;

        return new Response(sitemap.trim(), {
          headers: {
            "Content-Type": "application/xml; charset=utf-8",
            "Cache-Control": "public, max-age=86400, s-maxage=86400",
          },
        });
      },
    },
  },
});

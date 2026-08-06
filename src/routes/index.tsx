import { createFileRoute, Navigate } from "@tanstack/react-router";
import { getPreferredLocale } from "@/utils/i18n";

export const Route = createFileRoute("/")({
  component: RedirectToPreferredLocale,
});

function RedirectToPreferredLocale() {
  const locale = getPreferredLocale();

  return <Navigate to={`/${locale}`} replace />;
}

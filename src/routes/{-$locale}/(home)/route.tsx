import { AppSidebar } from "@/components/AppSidebar";
import { Header } from "@/components/Header";
import { I18nProvider } from "@/utils/i18n";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { SidebarProvider } from "@/ui/components/sidebar";

export const Route = createFileRoute("/{-$locale}/(home)")({
  component: RouteComponent,
});

function RouteComponent() {
  const { locale } = Route.useParams();

  return (
    <I18nProvider locale={locale}>
      <SidebarProvider>
        <AppSidebar />
        <main className="flex min-h-screen flex-col gap-5 p-3 md:p-5">
          <Header />
          <Outlet />
        </main>
      </SidebarProvider>
    </I18nProvider>
  );
}

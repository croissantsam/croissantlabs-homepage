import { Moon, Sun } from "lucide-react";

import { useTheme } from "@/components/theme-provider";

export function ModeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="glass-tint flex h-10 w-10 items-center justify-center rounded-xl transition hover:scale-105"
      title={theme === "light" ? "Passer en thème sombre" : "Passer en thème clair"}
      aria-label={theme === "light" ? "Passer en thème sombre" : "Passer en thème clair"}
    >
      {theme === "light" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
}

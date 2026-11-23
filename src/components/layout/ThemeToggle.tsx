"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { usePreferences } from "@/lib/preferences-context";

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const { t } = usePreferences();
  const [mounted, setMounted] = useState(false);

  // Patrón estándar para evitar hidratación mismatch con next-themes
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) {
    // Evitar hidratación mismatch
    return (
      <Button variant="ghost" size="icon" disabled className="h-9 w-9">
        <Sun className="h-4 w-4" />
      </Button>
    );
  }

  const isDark = (resolvedTheme ?? theme) === "dark";

  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9"
            onClick={() => setTheme(isDark ? "light" : "dark")}
            aria-label={isDark ? t("themeLight") : t("themeDark")}
          >
            {isDark ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          {isDark ? t("themeLight") : t("themeDark")}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

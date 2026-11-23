"use client";

import { CloudSun } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageToggle } from "./LanguageToggle";
import { usePreferences } from "@/lib/preferences-context";

export function Header() {
  const { t } = usePreferences();

  return (
    <header className="sticky top-0 z-30 w-full border-b border-border/40 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <div className="flex items-center gap-2 min-w-0">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground shrink-0">
            <CloudSun className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <h1 className="truncate text-base font-semibold sm:text-lg">
              {t("appName")}
            </h1>
            <p className="hidden sm:block text-xs text-muted-foreground">
              {t("appTagline")}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1 shrink-0">
          <LanguageToggle />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

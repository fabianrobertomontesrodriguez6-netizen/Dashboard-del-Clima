"use client";

import { Globe } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePreferences } from "@/lib/preferences-context";
import { LANGUAGES, type Language } from "@/lib/i18n";

export function LanguageToggle() {
  const { lang, setLang } = usePreferences();
  const [mounted, setMounted] = useState(false);
  // Patrón estándar para evitar hidratación mismatch
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-9 gap-2 px-2"
          aria-label="Language"
        >
          <Globe className="h-4 w-4" />
          {mounted ? lang.toUpperCase() : "ES"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {LANGUAGES.map((l) => (
          <DropdownMenuItem
            key={l.code}
            onClick={() => setLang(l.code as Language)}
            className={lang === l.code ? "bg-accent" : ""}
          >
            <span className="flex items-center gap-2">
              <span className="text-xs font-mono opacity-70">{l.flag}</span>
              <span>{l.label}</span>
            </span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

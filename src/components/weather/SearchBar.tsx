"use client";

import { useEffect, useRef, useState } from "react";
import { Search, Loader2, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { usePreferences } from "@/lib/preferences-context";
import { searchCities } from "@/lib/weather-api";
import type { City } from "@/lib/types";

interface SearchBarProps {
  onPickCity: (city: City) => void;
  onUseMyLocation: () => void;
  locating?: boolean;
}

export function SearchBar({
  onPickCity,
  onUseMyLocation,
  locating = false,
}: SearchBarProps) {
  const { lang, t } = usePreferences();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [results, setResults] = useState<City[]>([]);
  const [loading, setLoading] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (query.trim().length < 2) {
      setResults([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    debounceRef.current = setTimeout(async () => {
      try {
        const cities = await searchCities(query, lang);
        setResults(cities);
        setOpen(true);
      } catch {
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 350);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query, lang]);

  const handlePick = (city: City) => {
    onPickCity(city);
    setQuery("");
    setResults([]);
    setOpen(false);
  };

  return (
    <div className="flex w-full items-center gap-2">
      <Popover open={open && (results.length > 0 || loading)} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t("searchPlaceholder")}
              className="pl-9 h-11"
              aria-label={t("searchPlaceholder")}
              onKeyDown={(e) => {
                if (e.key === "Enter" && results.length > 0) {
                  e.preventDefault();
                  handlePick(results[0]);
                }
                if (e.key === "Escape") setOpen(false);
              }}
              onFocus={() => {
                if (results.length > 0) setOpen(true);
              }}
            />
            {loading && (
              <Loader2 className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 animate-spin text-muted-foreground" />
            )}
          </div>
        </PopoverTrigger>
        <PopoverContent
          className="p-0 w-[var(--radix-popover-trigger-width)] min-w-[280px]"
          align="start"
        >
          <Command shouldFilter={false}>
            <CommandList>
              <CommandEmpty>{t("noResults")}</CommandEmpty>
              <CommandGroup>
                {results.map((c) => (
                  <CommandItem
                    key={`${c.id}-${c.latitude}-${c.longitude}`}
                    value={`${c.name}-${c.country}-${c.id}`}
                    onSelect={() => handlePick(c)}
                    className="flex flex-col items-start gap-0.5"
                  >
                    <span className="font-medium">{c.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {[c.admin1, c.country].filter(Boolean).join(", ")}
                    </span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      <Button
        variant="outline"
        size="icon"
        onClick={onUseMyLocation}
        disabled={locating}
        aria-label={t("useMyLocation")}
        title={t("useMyLocation")}
        className="h-11 w-11 shrink-0"
      >
        {locating ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <MapPin className="h-4 w-4" />
        )}
      </Button>
    </div>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { Search, Loader2, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverAnchor,
  PopoverContent,
} from "@/components/ui/popover";
import { usePreferences } from "@/lib/preferences-context";
import { searchCities } from "@/lib/weather-api";
import type { City } from "@/lib/types";

interface SearchBarProps {
  onPickCity: (city: City) => void;
  onUseMyLocation: () => void;
  locating?: boolean;
}

const MIN_QUERY_LENGTH = 2;
const DEBOUNCE_MS = 350;

function itemValue(c: City) {
  return `${c.id}-${c.latitude}-${c.longitude}`;
}

export function SearchBar({
  onPickCity,
  onUseMyLocation,
  locating = false,
}: SearchBarProps) {
  const { lang, t } = usePreferences();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  // Última respuesta recibida, asociada a la búsqueda (idioma + texto) que la originó.
  const [response, setResponse] = useState<{
    key: string;
    cities: City[];
    error: boolean;
  } | null>(null);
  const [highlighted, setHighlighted] = useState("");
  const anchorRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const trimmed = query.trim();
  const active = trimmed.length >= MIN_QUERY_LENGTH;
  const searchKey = `${lang}:${trimmed}`;
  const done = active && response?.key === searchKey;
  const loading = active && !done;
  // Mientras se carga una búsqueda nueva se siguen mostrando los resultados previos
  const results = active ? (response?.cities ?? []) : [];
  const error = done && response.error;

  useEffect(() => {
    if (!active) return;

    // Cada búsqueda cancela la anterior: evita que respuestas lentas
    // sobrescriban resultados más recientes y que queden peticiones colgadas.
    const controller = new AbortController();
    const timer = setTimeout(async () => {
      try {
        const cities = await searchCities(trimmed, lang, controller.signal);
        if (controller.signal.aborted) return;
        setResponse({ key: searchKey, cities, error: false });
        setHighlighted(cities[0] ? itemValue(cities[0]) : "");
      } catch {
        if (controller.signal.aborted) return;
        setResponse({ key: searchKey, cities: [], error: true });
        setHighlighted("");
      }
    }, DEBOUNCE_MS);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [active, trimmed, lang, searchKey]);

  const handlePick = (city: City) => {
    onPickCity(city);
    setQuery("");
    setResponse(null);
    setHighlighted("");
    setOpen(false);
    inputRef.current?.blur();
  };

  const moveHighlight = (delta: number) => {
    if (results.length === 0) return;
    const idx = results.findIndex((c) => itemValue(c) === highlighted);
    const next = (idx + delta + results.length) % results.length;
    setHighlighted(itemValue(results[next]));
    setOpen(true);
  };

  const showPanel = open && active;

  return (
    <div className="flex w-full items-center gap-2">
      <Popover open={showPanel} onOpenChange={setOpen}>
        <PopoverAnchor asChild>
          <div ref={anchorRef} className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              ref={inputRef}
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setOpen(true);
              }}
              placeholder={t("searchPlaceholder")}
              className="pl-9 pr-9 h-11"
              aria-label={t("searchPlaceholder")}
              aria-autocomplete="list"
              aria-expanded={showPanel}
              role="combobox"
              autoComplete="off"
              onKeyDown={(e) => {
                if (e.key === "ArrowDown") {
                  e.preventDefault();
                  moveHighlight(1);
                } else if (e.key === "ArrowUp") {
                  e.preventDefault();
                  moveHighlight(-1);
                } else if (e.key === "Enter" && done && results.length > 0) {
                  e.preventDefault();
                  const city =
                    results.find((c) => itemValue(c) === highlighted) ??
                    results[0];
                  handlePick(city);
                } else if (e.key === "Escape") {
                  setOpen(false);
                }
              }}
              onFocus={() => setOpen(true)}
            />
            {loading && (
              <Loader2 className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 animate-spin text-muted-foreground" />
            )}
          </div>
        </PopoverAnchor>
        <PopoverContent
          className="p-0 w-[var(--radix-popover-trigger-width)] min-w-[280px]"
          align="start"
          // Mantener el foco en el campo de texto: si el popover se lleva el
          // foco, el usuario no puede seguir escribiendo (búsqueda "bloqueada").
          onOpenAutoFocus={(e) => e.preventDefault()}
          onCloseAutoFocus={(e) => e.preventDefault()}
          onInteractOutside={(e) => {
            const target = e.target as Node | null;
            if (target && anchorRef.current?.contains(target)) {
              e.preventDefault();
            }
          }}
        >
          <Command
            shouldFilter={false}
            value={highlighted}
            onValueChange={setHighlighted}
          >
            <CommandList>
              {results.length === 0 && (
                <div className="py-6 text-center text-sm text-muted-foreground">
                  {loading
                    ? t("searching")
                    : error
                      ? t("errorNetwork")
                      : t("noResults")}
                </div>
              )}
              {results.length > 0 && (
                <CommandGroup>
                  {results.map((c) => (
                    <CommandItem
                      key={itemValue(c)}
                      value={itemValue(c)}
                      onSelect={() => handlePick(c)}
                      onMouseDown={(e) => e.preventDefault()}
                      className="flex flex-col items-start gap-0.5"
                    >
                      <span className="font-medium">{c.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {[c.admin1, c.country].filter(Boolean).join(", ")}
                      </span>
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}
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

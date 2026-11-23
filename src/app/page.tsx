"use client";

import { useCallback, useState } from "react";
import { Header } from "@/components/layout/Header";
import { SearchBar } from "@/components/weather/SearchBar";
import { CurrentWeather } from "@/components/weather/CurrentWeather";
import { HourlyForecast } from "@/components/weather/HourlyForecast";
import { DailyForecast } from "@/components/weather/DailyForecast";
import { LoadingState } from "@/components/weather/LoadingState";
import { ErrorState } from "@/components/weather/ErrorState";
import { useWeather } from "@/hooks/useWeather";
import { usePreferences } from "@/lib/preferences-context";
import type { City } from "@/lib/types";
import { toast } from "sonner";

export default function Home() {
  const { state, loadCity, retry } = useWeather();
  const { t } = usePreferences();
  const [locating, setLocating] = useState(false);

  const handlePickCity = useCallback(
    (city: City) => {
      loadCity(city);
    },
    [loadCity]
  );

  const handleUseMyLocation = useCallback(() => {
    if (!("geolocation" in navigator)) {
      toast.error(t("errorGeolocation"));
      return;
    }
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        // Reverse geocoding mediante la búsqueda de coordenadas en texto
        try {
          const res = await fetch(
            `/api/geocode?q=${latitude.toFixed(4)},${longitude.toFixed(
              4
            )}&lang=es`
          );
          const data = await res.json();
          if (data.results && data.results.length > 0) {
            const r = data.results[0];
            loadCity({
              id: r.id,
              name: r.name,
              latitude: r.latitude,
              longitude: r.longitude,
              country: r.country,
              countryCode: r.country_code,
              admin1: r.admin1,
            });
          } else {
            // Sin resultado de reverse geocoding: usar las coordenadas tal cual
            loadCity({
              id: Date.now(),
              name: t("useMyLocation"),
              latitude,
              longitude,
              country: "",
              countryCode: "",
            });
          }
        } catch {
          loadCity({
            id: Date.now(),
            name: t("useMyLocation"),
            latitude,
            longitude,
            country: "",
            countryCode: "",
          });
        } finally {
          setLocating(false);
        }
      },
      (err) => {
        setLocating(false);
        if (err.code === err.PERMISSION_DENIED) {
          toast.error(t("errorGeolocation"));
        } else {
          toast.error(t("errorGeolocation"));
        }
      },
      { enableHighAccuracy: false, timeout: 8000, maximumAge: 60000 }
    );
  }, [loadCity, t]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 mx-auto w-full max-w-6xl px-4 py-4 sm:px-6 sm:py-6 space-y-4">
        {/* Buscador */}
        <div className="max-w-2xl mx-auto w-full">
          <SearchBar
            onPickCity={handlePickCity}
            onUseMyLocation={handleUseMyLocation}
            locating={locating}
          />
        </div>

        {/* Contenido principal según estado */}
        <div className="space-y-4">
          {state.status === "loading" && <LoadingState />}

          {state.status === "error" && (
            <ErrorState error={state.error} onRetry={retry} />
          )}

          {state.status === "success" && (
            <div className="space-y-4">
              <CurrentWeather city={state.city} data={state.data} />
              <div className="grid gap-4 lg:grid-cols-2">
                <HourlyForecast data={state.data} />
                <DailyForecast data={state.data} />
              </div>
            </div>
          )}

          {state.status === "idle" && <LoadingState />}
        </div>
      </main>

      <footer className="mt-auto border-t border-border/40 py-4">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 text-center text-xs text-muted-foreground">
          {t("poweredBy")} ·{" "}
          <a
            href="https://open-meteo.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-foreground"
          >
            Open-Meteo
          </a>
        </div>
      </footer>
    </div>
  );
}

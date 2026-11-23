"use client";

/**
 * Hook que gestiona el estado del pronóstico del clima.
 * Estados: idle | loading | error | success.
 *
 * Carga automáticamente la ciudad por defecto al montar.
 */

import { useEffect, useState, useCallback } from "react";
import { fetchWeather } from "@/lib/weather-api";
import type { City, ForecastResponse } from "@/lib/types";

type State =
  | { status: "idle" }
  | { status: "loading"; city: City }
  | { status: "success"; city: City; data: ForecastResponse }
  | { status: "error"; city: City; error: string };

const DEFAULT_CITY: City = {
  id: 3128760,
  name: "Madrid",
  latitude: 40.416775,
  longitude: -3.70379,
  country: "Spain",
  countryCode: "ES",
  admin1: "Madrid",
};

const LAST_CITY_KEY = "weather-app:last-city";

export function useWeather() {
  const [state, setState] = useState<State>({ status: "idle" });

  const loadCity = useCallback(async (city: City) => {
    setState({ status: "loading", city });
    try {
      const data = await fetchWeather(city.latitude, city.longitude);
      setState({ status: "success", city, data });
      // Persistir última ciudad
      try {
        localStorage.setItem(LAST_CITY_KEY, JSON.stringify(city));
      } catch {}
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "unknown_error";
      setState({ status: "error", city, error: message });
    }
  }, []);

  // Cargar ciudad por defecto o última usada al montar.
  // El eslint-disable es intencional: este patrón de "cargar dato inicial
  // desde localStorage y disparar fetch" es el correcto en React 19 con SSR.
  useEffect(() => {
    let initial: City = DEFAULT_CITY;
    try {
      const saved = localStorage.getItem(LAST_CITY_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as City;
        if (
          parsed &&
          typeof parsed.latitude === "number" &&
          typeof parsed.longitude === "number"
        ) {
          initial = parsed;
        }
      }
    } catch {}
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadCity(initial);
  }, [loadCity]);

  return {
    state,
    loadCity,
    retry: () => {
      if (state.status === "error") {
        loadCity(state.city);
      }
    },
  };
}

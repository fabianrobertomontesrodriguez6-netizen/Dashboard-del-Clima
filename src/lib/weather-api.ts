/**
 * Funciones de cliente para las rutas API internas (proxy a Open-Meteo).
 * Siempre relativas, nunca http://localhost.
 */

import type { City, ForecastResponse, GeocodingResponse, GeoResult } from "./types";

/**
 * Convierte un GeoResult de la API de Geocoding en una City simplificada.
 */
function geoResultToCity(r: GeoResult): City {
  return {
    id: r.id,
    name: r.name,
    latitude: r.latitude,
    longitude: r.longitude,
    country: r.country,
    countryCode: r.country_code,
    admin1: r.admin1,
  };
}

/**
 * Busca ciudades por nombre. Llama a /api/geocode.
 */
export async function searchCities(
  query: string,
  lang: "es" | "en" = "es",
  signal?: AbortSignal
): Promise<City[]> {
  if (!query.trim()) return [];
  const url = `/api/geocode?q=${encodeURIComponent(query)}&lang=${lang}`;
  const res = await fetch(url, { signal });
  if (!res.ok) {
    throw new Error(`geocode_failed_${res.status}`);
  }
  const data: GeocodingResponse = await res.json();
  return (data.results ?? []).map(geoResultToCity);
}

/**
 * Obtiene el pronóstico completo (current + hourly + daily) para una coordenada.
 * Llama a /api/weather.
 */
export async function fetchWeather(
  latitude: number,
  longitude: number
): Promise<ForecastResponse> {
  const url = `/api/weather?lat=${latitude}&lon=${longitude}`;
  const res = await fetch(url);
  if (!res.ok) {
    let message = `weather_failed_${res.status}`;
    try {
      const body = await res.json();
      if (body?.error) message = body.error;
    } catch {}
    throw new Error(message);
  }
  return res.json();
}

// ---------- Conversión de unidades (para mostrar) ----------
export function convertTemp(celsius: number, units: "metric" | "imperial"): number {
  return units === "imperial" ? (celsius * 9) / 5 + 32 : celsius;
}

export function convertWind(
  kmh: number,
  units: "metric" | "imperial"
): number {
  return units === "imperial" ? kmh * 0.621371 : kmh;
}

export function convertVisibility(
  meters: number,
  units: "metric" | "imperial"
): number {
  return units === "imperial" ? meters / 1609.34 : meters / 1000;
}

export function tempUnit(units: "metric" | "imperial"): string {
  return units === "imperial" ? "°F" : "°C";
}

export function windUnit(units: "metric" | "imperial"): string {
  return units === "imperial" ? "mph" : "km/h";
}

export function visibilityUnit(units: "metric" | "imperial"): string {
  return units === "imperial" ? "mi" : "km";
}

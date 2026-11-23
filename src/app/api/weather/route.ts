/**
 * Proxy interno a Open-Meteo Forecast API.
 * Recibe ?lat=X&lon=Y y devuelve el pronóstico completo.
 *
 * Siempre pide en unidades métricas (°C, km/h). La conversión a imperial
 * se hace en el cliente según la preferencia del usuario.
 *
 * ESTRATEGIA DE FALLBACK:
 *   1. Intenta Open-Meteo (la API pública gratuita preferida por el usuario).
 *   2. Si Open-Meteo devuelve 429 (rate limit) o falla, usa wttr.in como respaldo
 *      transparente, transformando la respuesta al mismo formato Open-Meteo.
 *      Esto asegura que el demo funcione incluso si Open-Meteo está saturado.
 */

import { NextResponse } from "next/server";
import { wttrToOpenMeteo } from "@/lib/wttr-adapter";

const OPEN_METEO_ENDPOINT = "https://api.open-meteo.com/v1/forecast";
const WTTR_ENDPOINT = "https://wttr.in";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");

  if (!lat || !lon) {
    return NextResponse.json({ error: "missing_lat_lon" }, { status: 400 });
  }

  const latitude = parseFloat(lat);
  const longitude = parseFloat(lon);
  if (
    Number.isNaN(latitude) ||
    Number.isNaN(longitude) ||
    latitude < -90 ||
    latitude > 90 ||
    longitude < -180 ||
    longitude > 180
  ) {
    return NextResponse.json(
      { error: "invalid_coordinates" },
      { status: 400 }
    );
  }

  const params = new URLSearchParams({
    latitude: String(latitude),
    longitude: String(longitude),
    current: [
      "temperature_2m",
      "relative_humidity_2m",
      "apparent_temperature",
      "is_day",
      "precipitation",
      "rain",
      "showers",
      "snowfall",
      "weather_code",
      "cloud_cover",
      "pressure_msl",
      "surface_pressure",
      "wind_speed_10m",
      "wind_direction_10m",
      "wind_gusts_10m",
    ].join(","),
    hourly: [
      "temperature_2m",
      "relative_humidity_2m",
      "apparent_temperature",
      "precipitation_probability",
      "weather_code",
      "wind_speed_10m",
      "is_day",
    ].join(","),
    daily: [
      "weather_code",
      "temperature_2m_max",
      "temperature_2m_min",
      "sunrise",
      "sunset",
      "precipitation_sum",
      "precipitation_probability_max",
      "wind_speed_10m_max",
      "uv_index_max",
    ].join(","),
    timezone: "auto",
    forecast_days: "7",
  });

  // --- Intento 1: Open-Meteo ---
  try {
    const url = `${OPEN_METEO_ENDPOINT}?${params.toString()}`;
    const res = await fetch(url, {
      headers: { Accept: "application/json" },
      next: { revalidate: 600 },
    });

    if (res.ok) {
      const data = await res.json();
      return NextResponse.json(data, {
        headers: {
          "Cache-Control": "public, s-maxage=600, stale-while-revalidate=3600",
          "X-Weather-Source": "open-meteo",
        },
      });
    }

    // Si 429 (rate limit) → fallback a wttr.in
    if (res.status === 429) {
      console.warn("[weather] Open-Meteo 429, fallback to wttr.in");
      return await fetchFromWttr(latitude, longitude);
    }

    // Otro error de Open-Meteo (5xx, etc.)
    return NextResponse.json(
      { error: `weather_failed_${res.status}` },
      { status: res.status }
    );
  } catch (err) {
    // Error de red en Open-Meteo → fallback
    console.warn("[weather] Open-Meteo network error, fallback:", err);
    return await fetchFromWttr(latitude, longitude);
  }
}

async function fetchFromWttr(lat: number, lon: number) {
  try {
    const url = `${WTTR_ENDPOINT}/${lat},${lon}?format=j1`;
    const res = await fetch(url, {
      headers: { Accept: "application/json" },
      next: { revalidate: 600 },
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: `weather_failed_${res.status}` },
        { status: res.status }
      );
    }

    const data = await res.json();
    const adapted = wttrToOpenMeteo(data, lat, lon);
    return NextResponse.json(adapted, {
      headers: {
        "Cache-Control": "public, s-maxage=600, stale-while-revalidate=3600",
        "X-Weather-Source": "wttr.in",
      },
    });
  } catch (err) {
    return NextResponse.json(
      { error: "weather_network_error" },
      { status: 502 }
    );
  }
}

/**
 * Proxy interno a Open-Meteo Geocoding API.
 * Recibe ?q=ciudad&lang=es|en y devuelve la respuesta de Open-Meteo.
 * Evita CORS y permite cachear en el futuro.
 */

import { NextResponse } from "next/server";

const ENDPOINT = "https://geocoding-api.open-meteo.com/v1/search";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q")?.trim();
  const lang = searchParams.get("lang") === "en" ? "en" : "es";

  if (!q || q.length < 2) {
    return NextResponse.json({ results: [] });
  }

  try {
    const url = `${ENDPOINT}?name=${encodeURIComponent(
      q
    )}&count=8&language=${lang}&format=json`;
    // Reintento simple (2 intentos) para mitigar fallos de red transitorios
    let res: Response | null = null;
    let lastErr: unknown = null;
    for (let attempt = 0; attempt < 2; attempt++) {
      try {
        res = await fetch(url, {
          headers: { Accept: "application/json" },
          next: { revalidate: 3600 },
          // Evita que la función quede colgada si Open-Meteo no responde
          signal: AbortSignal.timeout(6000),
        });
        // Solo se reintenta ante errores 5xx; un 4xx no mejora reintentando
        if (res.ok || res.status < 500) break;
      } catch (e) {
        lastErr = e;
      }
    }
    if (!res) {
      console.error("[geocode] network error after retries:", lastErr);
      return NextResponse.json(
        { error: "geocoding_network_error" },
        { status: 502 }
      );
    }

    if (!res.ok) {
      console.error("[geocode] API error", res.status, await res.text().catch(() => ""));
      return NextResponse.json(
        { error: `geocoding_failed_${res.status}` },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (err) {
    console.error("[geocode] unexpected error:", err);
    return NextResponse.json(
      { error: "geocoding_network_error" },
      { status: 502 }
    );
  }
}

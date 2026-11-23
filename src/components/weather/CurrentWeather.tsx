"use client";

import {
  Droplets,
  Wind,
  Gauge,
  Cloud,
  Eye,
  Sunrise,
  Sunset,
  Navigation,
  CloudRain,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { WeatherIcon, weatherGradient } from "./WeatherIcon";
import { usePreferences } from "@/lib/preferences-context";
import {
  convertTemp,
  convertWind,
  tempUnit,
  windUnit,
} from "@/lib/weather-api";
import type { City, ForecastResponse } from "@/lib/types";

interface CurrentWeatherProps {
  city: City;
  data: ForecastResponse;
}

export function CurrentWeather({ city, data }: CurrentWeatherProps) {
  const { lang, units, t, weatherDesc } = usePreferences();
  const c = data.current;
  const isDay = c.is_day === 1;
  const temp = convertTemp(c.temperature_2m, units);
  const feels = convertTemp(c.apparent_temperature, units);
  const wind = convertWind(c.wind_speed_10m, units);
  const sunrise = data.daily.sunrise?.[0];
  const sunset = data.daily.sunset?.[0];

  return (
    <Card
      className={`relative overflow-hidden border-0 bg-gradient-to-br ${
        isDay
          ? weatherGradient(c.weather_code, true)
          : "from-slate-900 via-slate-800 to-slate-900"
      } text-white shadow-xl`}
    >
      <CardContent className="p-6 sm:p-8">
        {/* Capa decorativa */}
        <div className="pointer-events-none absolute inset-0 opacity-20">
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
          <div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
        </div>

        <div className="relative space-y-6">
          {/* Cabecera de ciudad */}
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                {city.name}
              </h2>
              {city.countryCode && (
                <Badge
                  variant="secondary"
                  className="bg-white/20 text-white border-0"
                >
                  {city.countryCode}
                </Badge>
              )}
            </div>
            <p className="text-sm text-white/80">
              {[city.admin1, city.country].filter(Boolean).join(", ")}
            </p>
          </div>

          {/* Bloque temperatura */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div className="flex items-center gap-4">
              <WeatherIcon
                code={c.weather_code}
                isDay={isDay}
                className="h-16 w-16 sm:h-20 sm:w-20 drop-shadow-md"
              />
              <div>
                <div className="text-5xl sm:text-6xl font-bold tracking-tighter">
                  {Math.round(temp)}
                  {tempUnit(units)}
                </div>
                <div className="text-sm text-white/80 mt-1">
                  {weatherDesc(c.weather_code)}
                </div>
                <div className="text-xs text-white/70 mt-0.5">
                  {t("feelsLike")} {Math.round(feels)}
                  {tempUnit(units)}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-4 text-sm sm:max-w-md sm:flex-1">
              <Metric
                icon={<Droplets className="h-4 w-4" />}
                label={t("humidity")}
                value={`${c.relative_humidity_2m}%`}
              />
              <Metric
                icon={<Wind className="h-4 w-4" />}
                label={t("wind")}
                value={`${Math.round(wind)} ${windUnit(units)}`}
              />
              <Metric
                icon={<Gauge className="h-4 w-4" />}
                label={t("pressure")}
                value={`${Math.round(c.pressure_msl)} ${t("hPa")}`}
              />
              <Metric
                icon={<Cloud className="h-4 w-4" />}
                label={t("cloudCover")}
                value={`${c.cloud_cover}%`}
              />
              <Metric
                icon={<CloudRain className="h-4 w-4" />}
                label={t("precipitation")}
                value={`${c.precipitation.toFixed(1)} ${t("mm")}`}
              />
              <Metric
                icon={<Navigation className="h-4 w-4" />}
                label={t("windDirection")}
                value={`${c.wind_direction_10m}°`}
              />
            </div>
          </div>

          {/* Amanecer / Atardecer */}
          <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/20">
            <div className="flex items-center gap-2 text-sm">
              <Sunrise className="h-4 w-4 text-amber-200" />
              <span className="text-white/70">{t("sunrise")}</span>
              <span className="font-medium ml-auto">
                {formatTime(sunrise, data.timezone)}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Sunset className="h-4 w-4 text-orange-200" />
              <span className="text-white/70">{t("sunset")}</span>
              <span className="font-medium ml-auto">
                {formatTime(sunset, data.timezone)}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function Metric({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <div className="text-white/70 shrink-0">{icon}</div>
      <div className="min-w-0">
        <div className="text-xs text-white/70 truncate">{label}</div>
        <div className="font-medium text-sm">{value}</div>
      </div>
    </div>
  );
}

function formatTime(iso: string | undefined, timezone: string): string {
  if (!iso) return "—";
  try {
    // Si la zona horaria no es válida (ej: "auto" del fallback wttr.in),
    // usar la zona horaria del sistema del navegador.
    let tz: string | undefined = timezone;
    if (!timezone || timezone === "auto") {
      tz = undefined;
    }
    return new Intl.DateTimeFormat("default", {
      hour: "2-digit",
      minute: "2-digit",
      ...(tz ? { timeZone: tz } : {}),
    }).format(new Date(iso));
  } catch {
    return "—";
  }
}

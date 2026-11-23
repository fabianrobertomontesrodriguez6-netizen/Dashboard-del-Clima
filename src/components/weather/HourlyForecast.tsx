"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { WeatherIcon } from "./WeatherIcon";
import { usePreferences } from "@/lib/preferences-context";
import {
  convertTemp,
  convertWind,
  tempUnit,
  windUnit,
} from "@/lib/weather-api";
import type { ForecastResponse } from "@/lib/types";
import { Clock } from "lucide-react";

interface HourlyForecastProps {
  data: ForecastResponse;
}

export function HourlyForecast({ data }: HourlyForecastProps) {
  const { lang, units, t, weatherDesc } = usePreferences();
  const now = new Date();

  // Tomar las próximas 24 horas a partir de la hora actual
  const hourly = data.hourly;
  const startIndex = findStartIndex(hourly.time, now, data.timezone);
  const endIndex = Math.min(startIndex + 24, hourly.time.length);

  const items: {
    time: string;
    temp: number;
    weatherCode: number;
    isDay: boolean;
    precipProb: number;
    wind: number;
  }[] = [];
  for (let i = startIndex; i < endIndex; i++) {
    items.push({
      time: hourly.time[i],
      temp: hourly.temperature_2m[i],
      weatherCode: hourly.weather_code[i],
      isDay: hourly.is_day[i] === 1,
      precipProb: hourly.precipitation_probability[i] ?? 0,
      wind: hourly.wind_speed_10m[i],
    });
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <Clock className="h-4 w-4 text-muted-foreground" />
          {t("hourlyForecast")}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="w-full whitespace-nowrap">
          <div className="flex gap-2 p-4 pt-0">
            {items.map((item, idx) => (
              <div
                key={item.time}
                className="flex w-[88px] shrink-0 flex-col items-center gap-1.5 rounded-lg border border-border/50 bg-muted/30 p-3 hover:bg-muted/60 transition-colors"
              >
                <span className="text-xs font-medium text-muted-foreground">
                  {idx === 0
                    ? t("today")
                    : formatHour(item.time, data.timezone, lang)}
                </span>
                <WeatherIcon
                  code={item.weatherCode}
                  isDay={item.isDay}
                  className="h-7 w-7"
                />
                <span className="text-sm font-semibold">
                  {Math.round(convertTemp(item.temp, units))}
                  {tempUnit(units)}
                </span>
                <span className="text-[10px] text-sky-500 dark:text-sky-400">
                  {item.precipProb}%
                </span>
              </div>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </CardContent>
    </Card>
  );
}

function findStartIndex(times: string[], now: Date, timezone: string): number {
  // Encontrar la primera hora >= now
  const nowMs = now.getTime();
  for (let i = 0; i < times.length; i++) {
    if (new Date(times[i]).getTime() >= nowMs - 60 * 60 * 1000) {
      return i;
    }
  }
  return 0;
}

function formatHour(iso: string, timezone: string, lang: string): string {
  try {
    // Si la zona horaria no es válida (ej: "auto" del fallback wttr.in),
    // usar la zona horaria del sistema del navegador.
    let tz: string | undefined = timezone;
    if (!timezone || timezone === "auto") {
      tz = undefined; // deja que Intl use la timezone del runtime
    }
    return new Intl.DateTimeFormat(lang === "es" ? "es-ES" : "en-US", {
      hour: "2-digit",
      hour12: lang !== "es",
      ...(tz ? { timeZone: tz } : {}),
    }).format(new Date(iso));
  } catch {
    return "—";
  }
}

"use client";

import { CalendarDays } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { WeatherIcon } from "./WeatherIcon";
import { usePreferences } from "@/lib/preferences-context";
import { convertTemp, tempUnit } from "@/lib/weather-api";
import type { ForecastResponse } from "@/lib/types";

interface DailyForecastProps {
  data: ForecastResponse;
}

export function DailyForecast({ data }: DailyForecastProps) {
  const { lang, units, t, weatherDesc } = usePreferences();
  const daily = data.daily;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <CalendarDays className="h-4 w-4 text-muted-foreground" />
          {t("dailyForecast")}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-1.5 p-4 pt-0">
        {daily.time.map((iso, i) => {
          const date = new Date(iso);
          const dow = date.getDay();
          const isToday = date.toDateString() === new Date().toDateString();
          const tomorrow = new Date();
          tomorrow.setDate(tomorrow.getDate() + 1);
          const isTomorrow = date.toDateString() === tomorrow.toDateString();

          let label: string;
          if (isToday) label = t("today");
          else if (isTomorrow) label = t("tomorrow");
          else label = lang === "es" ? t(`days.${dow}`) : t(`days.${dow}`);

          const max = convertTemp(daily.temperature_2m_max[i], units);
          const min = convertTemp(daily.temperature_2m_min[i], units);
          const code = daily.weather_code[i];
          const range = max - min;
          const precipProb = daily.precipitation_probability_max?.[i] ?? 0;

          return (
            <div
              key={iso}
              className="flex items-center gap-3 rounded-lg p-2 hover:bg-muted/50 transition-colors"
            >
              <div className="w-20 sm:w-24 text-sm font-medium shrink-0">
                {label}
              </div>

              <WeatherIcon
                code={code}
                isDay={true}
                className="h-7 w-7 shrink-0 text-muted-foreground"
              />

              <div className="flex-1 min-w-0 hidden sm:block">
                <span className="text-xs text-muted-foreground truncate">
                  {weatherDesc(code)}
                </span>
              </div>

              <div className="w-10 sm:w-16 text-right text-xs text-sky-500 dark:text-sky-400 shrink-0">
                {precipProb}%
              </div>

              {/* Barra de rango de temperatura */}
              <div className="hidden sm:flex flex-1 items-center min-w-[80px] max-w-[180px]">
                <TemperatureBar max={max} min={min} range={range} units={units} />
              </div>

              <div className="flex items-center gap-1.5 text-sm shrink-0 ml-auto">
                <span className="font-semibold w-10 text-right">
                  {Math.round(max)}
                  {tempUnit(units)}
                </span>
                <span className="text-muted-foreground w-10 text-right">
                  {Math.round(min)}
                  {tempUnit(units)}
                </span>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}

function TemperatureBar({
  max,
  min,
  range,
  units,
}: {
  max: number;
  min: number;
  range: number;
  units: "metric" | "imperial";
}) {
  // Normalizar posición entre 0 y 100% dentro del rango visible
  // Asumimos que el rango global del pronóstico ya está representado
  const widthPct = Math.min(100, Math.max(15, range * 5));
  const offsetPct = 25; // offset por defecto dentro del track

  return (
    <div className="relative h-1.5 w-full rounded-full bg-muted overflow-hidden">
      <div
        className="absolute h-full rounded-full bg-gradient-to-r from-sky-400 via-amber-400 to-orange-500"
        style={{
          width: `${widthPct}%`,
          left: `${offsetPct}%`,
        }}
      />
    </div>
  );
}

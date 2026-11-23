"use client";

/**
 * Mapea códigos WMO de Open-Meteo a iconos de lucide-react.
 * Soporta modo día/noche (is_day) para sol/luna.
 *
 * Códigos WMO: https://open-meteo.com/en/docs ( Weather interpretation codes (WMO) )
 */

import {
  Sun,
  Moon,
  Cloud,
  CloudSun,
  CloudMoon,
  CloudFog,
  CloudDrizzle,
  CloudRain,
  CloudRainWind,
  CloudSnow,
  CloudLightning,
  Snowflake,
  Cloudy,
} from "lucide-react";
import { createElement, ComponentProps, memo } from "react";

type IconProps = ComponentProps<typeof Sun> & {
  code: number;
  isDay?: boolean;
};

function pickIcon(code: number, isDay: boolean) {
  switch (code) {
    case 0: // Despejado
      return isDay ? Sun : Moon;
    case 1: // Mayormente despejado
      return isDay ? CloudSun : CloudMoon;
    case 2: // Parcialmente nublado
      return isDay ? CloudSun : CloudMoon;
    case 3: // Nublado
      return Cloudy;
    case 45:
    case 48: // Niebla
      return CloudFog;
    case 51:
    case 53:
    case 55:
    case 56:
    case 57: // Llovizna
      return CloudDrizzle;
    case 61:
    case 63:
    case 65:
    case 66:
    case 67: // Lluvia
      return CloudRain;
    case 80:
    case 81:
    case 82: // Aguaceros
      return CloudRainWind;
    case 71:
    case 73:
    case 75:
    case 77: // Nieve
      return CloudSnow;
    case 85:
    case 86: // Aguaceros de nieve
      return Snowflake;
    case 95:
    case 96:
    case 99: // Tormenta
      return CloudLightning;
    default:
      return Cloud;
  }
}

export const WeatherIcon = memo(function WeatherIcon({
  code,
  isDay = true,
  ...props
}: IconProps) {
  // Usar createElement evita que el linter de React 19 marque el componente
  // como "creado durante el render".
  return createElement(pickIcon(code, isDay), props);
});

/**
 * Devuelve un color de gradiente (Tailwind classes) según el código y el modo día/noche.
 * Útil para fondos de la card principal.
 */
export function weatherGradient(code: number, isDay: boolean): string {
  if (!isDay) {
    return "from-slate-900 via-slate-800 to-slate-900";
  }
  switch (code) {
    case 0:
    case 1:
      return "from-amber-400 via-orange-400 to-amber-500";
    case 2:
      return "from-sky-400 via-sky-500 to-slate-500";
    case 3:
      return "from-slate-400 via-slate-500 to-slate-600";
    case 45:
    case 48:
      return "from-slate-300 via-slate-400 to-slate-500";
    case 51:
    case 53:
    case 55:
    case 56:
    case 57:
    case 61:
    case 63:
    case 65:
    case 66:
    case 67:
    case 80:
    case 81:
    case 82:
      return "from-sky-500 via-blue-500 to-slate-600";
    case 71:
    case 73:
    case 75:
    case 77:
    case 85:
    case 86:
      return "from-slate-200 via-slate-300 to-slate-500";
    case 95:
    case 96:
    case 99:
      return "from-slate-700 via-slate-900 to-slate-950";
    default:
      return "from-sky-400 via-sky-500 to-slate-500";
  }
}

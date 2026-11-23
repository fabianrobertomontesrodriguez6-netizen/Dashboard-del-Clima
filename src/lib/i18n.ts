/**
 * Sistema de internacionalización ligero (Español / Inglés)
 *
 * No usa next-intl para mantener el bundle pequeño. Usa un Context de React + localStorage.
 * Para añadir un nuevo idioma:
 *   1. Añadir la clave a `Language` (es | en | <nueva>)
 *   2. Añadir el diccionario a `translations`
 *   3. Añadir el código al array `LANGUAGES`
 */

export type Language = "es" | "en";

export const LANGUAGES: { code: Language; label: string; flag: string }[] = [
  { code: "es", label: "Español", flag: "ES" },
  { code: "en", label: "English", flag: "EN" },
];

export const DEFAULT_LANGUAGE: Language = "es";

type Dictionary = typeof translations["es"];

export const translations = {
  es: {
    // App
    appName: "Dashboard del Clima",
    appTagline: "Pronóstico preciso para cualquier ciudad del mundo",
    poweredBy: "Datos proporcionados por Open-Meteo",

    // Header
    searchPlaceholder: "Buscar ciudad...",
    useMyLocation: "Usar mi ubicación",
    spanish: "Español",
    english: "Inglés",
    themeLight: "Tema claro",
    themeDark: "Tema oscuro",

    // States
    loading: "Cargando...",
    searching: "Buscando ciudades...",
    errorTitle: "Algo salió mal",
    errorNotFound: "No se encontró la ciudad. Verifica el nombre e inténtalo de nuevo.",
    errorNetwork: "Error de red. Revisa tu conexión a internet.",
    errorGeolocation: "No se pudo obtener tu ubicación. Activa los permisos del navegador.",
    retry: "Reintentar",

    // Search
    noResults: "Sin resultados",
    searchingFor: "Buscando",

    // Current weather
    currentWeather: "Clima actual",
    feelsLike: "Sensación",
    humidity: "Humedad",
    wind: "Viento",
    pressure: "Presión",
    cloudCover: "Nubosidad",
    visibility: "Visibilidad",
    uvIndex: "Índice UV",
    precipitation: "Precipitación",
    windDirection: "Dirección del viento",
    sunrise: "Amanecer",
    sunset: "Atardecer",
    lastUpdate: "Última actualización",

    // Forecast
    hourlyForecast: "Pronóstico por horas",
    dailyForecast: "Pronóstico de 7 días",
    today: "Hoy",
    tomorrow: "Mañana",
    max: "Máx",
    min: "Mín",

    // Units
    celsius: "°C",
    fahrenheit: "°F",
    kmh: "km/h",
    mph: "mph",
    mm: "mm",
    km: "km",
    hPa: "hPa",
    units: "Unidades",
    metric: "Métrico",
    imperial: "Imperial",

    // Days of week
    days: {
      0: "Domingo",
      1: "Lunes",
      2: "Martes",
      3: "Miércoles",
      4: "Jueves",
      5: "Viernes",
      6: "Sábado",
    },
    daysShort: {
      0: "Dom",
      1: "Lun",
      2: "Mar",
      3: "Mié",
      4: "Jue",
      5: "Vie",
      6: "Sáb",
    },

    // Weather descriptions (WMO codes)
    weather: {
      0: "Despejado",
      1: "Mayormente despejado",
      2: "Parcialmente nublado",
      3: "Nublado",
      45: "Niebla",
      48: "Niebla con escarcha",
      51: "Llovizna ligera",
      53: "Llovizna moderada",
      55: "Llovizna densa",
      56: "Llovizna helada ligera",
      57: "Llovizna helada densa",
      61: "Lluvia ligera",
      63: "Lluvia moderada",
      65: "Lluvia fuerte",
      66: "Lluvia helada ligera",
      67: "Lluvia helada fuerte",
      71: "Nieve ligera",
      73: "Nieve moderada",
      75: "Nieve fuerte",
      77: "Granos de nieve",
      80: "Aguaceros ligeros",
      81: "Aguaceros moderados",
      82: "Aguaceros violentos",
      85: "Aguaceros de nieve ligeros",
      86: "Aguaceros de nieve fuertes",
      95: "Tormenta",
      96: "Tormenta con granizo ligero",
      99: "Tormenta con granizo fuerte",
    },
  },
  en: {
    appName: "Weather Dashboard",
    appTagline: "Accurate forecast for any city in the world",
    poweredBy: "Data provided by Open-Meteo",

    searchPlaceholder: "Search city...",
    useMyLocation: "Use my location",
    spanish: "Spanish",
    english: "English",
    themeLight: "Light theme",
    themeDark: "Dark theme",

    loading: "Loading...",
    searching: "Searching cities...",
    errorTitle: "Something went wrong",
    errorNotFound: "City not found. Check the name and try again.",
    errorNetwork: "Network error. Check your internet connection.",
    errorGeolocation: "Could not get your location. Enable browser permissions.",
    retry: "Retry",

    noResults: "No results",
    searchingFor: "Searching for",

    currentWeather: "Current weather",
    feelsLike: "Feels like",
    humidity: "Humidity",
    wind: "Wind",
    pressure: "Pressure",
    cloudCover: "Cloud cover",
    visibility: "Visibility",
    uvIndex: "UV index",
    precipitation: "Precipitation",
    windDirection: "Wind direction",
    sunrise: "Sunrise",
    sunset: "Sunset",
    lastUpdate: "Last update",

    hourlyForecast: "Hourly forecast",
    dailyForecast: "7-day forecast",
    today: "Today",
    tomorrow: "Tomorrow",
    max: "Max",
    min: "Min",

    celsius: "°C",
    fahrenheit: "°F",
    kmh: "km/h",
    mph: "mph",
    mm: "mm",
    km: "km",
    hPa: "hPa",
    units: "Units",
    metric: "Metric",
    imperial: "Imperial",

    days: {
      0: "Sunday",
      1: "Monday",
      2: "Tuesday",
      3: "Wednesday",
      4: "Thursday",
      5: "Friday",
      6: "Saturday",
    },
    daysShort: {
      0: "Sun",
      1: "Mon",
      2: "Tue",
      3: "Wed",
      4: "Thu",
      5: "Fri",
      6: "Sat",
    },

    weather: {
      0: "Clear sky",
      1: "Mostly clear",
      2: "Partly cloudy",
      3: "Overcast",
      45: "Fog",
      48: "Rime fog",
      51: "Light drizzle",
      53: "Moderate drizzle",
      55: "Dense drizzle",
      56: "Light freezing drizzle",
      57: "Dense freezing drizzle",
      61: "Light rain",
      63: "Moderate rain",
      65: "Heavy rain",
      66: "Light freezing rain",
      67: "Heavy freezing rain",
      71: "Light snow",
      73: "Moderate snow",
      75: "Heavy snow",
      77: "Snow grains",
      80: "Light showers",
      81: "Moderate showers",
      82: "Violent showers",
      85: "Light snow showers",
      86: "Heavy snow showers",
      95: "Thunderstorm",
      96: "Thunderstorm with light hail",
      99: "Thunderstorm with heavy hail",
    },
  },
} as const;

export type TranslationKey = keyof Dictionary;

/**
 * Devuelve el texto traducido para la clave dada.
 * Soporta claves anidadas (p.ej. "weather.0") mediante notación por puntos.
 */
export function t(lang: Language, key: string): string {
  const parts = key.split(".");
  let current: unknown = translations[lang];
  for (const p of parts) {
    if (current && typeof current === "object" && p in current) {
      current = (current as Record<string, unknown>)[p];
    } else {
      return key; // fallback: devuelve la clave si no existe
    }
  }
  return typeof current === "string" ? current : key;
}

export function getWeatherDescription(lang: Language, code: number): string {
  const dict = translations[lang] as unknown as { weather: Record<string, string> };
  return dict.weather[String(code)] ?? (lang === "es" ? "Desconocido" : "Unknown");
}

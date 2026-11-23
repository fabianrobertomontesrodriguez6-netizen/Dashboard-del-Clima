"use client";

/**
 * Contexto de preferencias de la app: idioma (es/en) y unidades (métrico/imperial).
 * Persiste en localStorage. Sincroniza el atributo `lang` del <html>.
 */

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
} from "react";
import {
  Language,
  DEFAULT_LANGUAGE,
  translations,
  getWeatherDescription,
} from "@/lib/i18n";

export type Units = "metric" | "imperial";

interface PreferencesContextValue {
  lang: Language;
  setLang: (l: Language) => void;
  units: Units;
  setUnits: (u: Units) => void;
  t: (key: string) => string;
  weatherDesc: (code: number) => string;
}

const PreferencesContext = createContext<PreferencesContextValue | null>(null);

const LANG_KEY = "weather-app:lang";
const UNITS_KEY = "weather-app:units";

export function PreferencesProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>(DEFAULT_LANGUAGE);
  const [units, setUnitsState] = useState<Units>("metric");

  // Cargar preferencias desde localStorage al montar.
  // El eslint-disable es intencional: patrón estándar para hidratar
  // preferencias de usuario almacenadas en localStorage con SSR.
  useEffect(() => {
    try {
      const savedLang = localStorage.getItem(LANG_KEY) as Language | null;
      const savedUnits = localStorage.getItem(UNITS_KEY) as Units | null;
      if (savedLang && (savedLang === "es" || savedLang === "en")) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setLangState(savedLang);
      } else {
        // Detectar idioma del navegador
        const nav = navigator.language.toLowerCase();
        if (nav.startsWith("es")) {
          setLangState("es");
        } else if (nav.startsWith("en")) {
          setLangState("en");
        }
      }
      if (savedUnits === "metric" || savedUnits === "imperial") {
        setUnitsState(savedUnits);
      }
    } catch {
      // localStorage no disponible (SSR o privado): ignorar
    }
  }, []);

  // Sincronizar <html lang="...">
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang;
    }
  }, [lang]);

  const setLang = (l: Language) => {
    setLangState(l);
    try {
      localStorage.setItem(LANG_KEY, l);
    } catch {}
  };

  const setUnits = (u: Units) => {
    setUnitsState(u);
    try {
      localStorage.setItem(UNITS_KEY, u);
    } catch {}
  };

  const value = useMemo<PreferencesContextValue>(
    () => ({
      lang,
      setLang,
      units,
      setUnits,
      t: (key: string) => {
        const parts = key.split(".");
        let current: unknown = translations[lang];
        for (const p of parts) {
          if (current && typeof current === "object" && p in current) {
            current = (current as Record<string, unknown>)[p];
          } else {
            return key;
          }
        }
        return typeof current === "string" ? current : key;
      },
      weatherDesc: (code: number) => getWeatherDescription(lang, code),
    }),
    [lang, units]
  );

  return (
    <PreferencesContext.Provider value={value}>
      {children}
    </PreferencesContext.Provider>
  );
}

export function usePreferences() {
  const ctx = useContext(PreferencesContext);
  if (!ctx) {
    throw new Error("usePreferences must be used within PreferencesProvider");
  }
  return ctx;
}

# Dashboard del Clima — Weather App

> Aplicación web que consume la API pública [Open-Meteo](https://open-meteo.com/) para mostrar el clima actual y el pronóstico de cualquier ciudad del mundo. Incluye manejo de estados de carga y error, diseño responsive, soporte bilingüe (Español / Inglés) y tema claro/oscuro.

---

## Características

- **Búsqueda de ciudad** por nombre, con sugerencias en tiempo real (Open-Meteo Geocoding API).
- **Clima actual**: temperatura, sensación térmica, humedad, viento, presión, nubosidad, precipitación, dirección del viento, amanecer y atardecer. Card con gradiente dinámico según el estado del cielo.
- **Pronóstico por horas** (24 h) con scroll horizontal.
- **Pronóstico de 7 días** (o 3 días cuando el fallback wttr.in está activo) con barra de rango de temperatura y probabilidad de precipitación.
- **Estados de carga** con skeletons animados.
- **Estados de error** claros con botón de reintento y código de error visible.
- **Geolocalización** opcional ("usar mi ubicación") con reverse-geocoding.
- **Tema claro / oscuro** con persistencia (next-themes).
- **Bilingüe Español / Inglés** con persistencia y autodetección inicial por idioma del navegador.
- **Diseño responsive** mobile-first (probado en 375px y 1280px).
- **Footer sticky** que respeta el alto del viewport.

---

## Stack Tecnológico

| Capa | Tecnología |
|------|-----------|
| Framework | Next.js 16 (App Router, Turbopack) |
| Lenguaje | TypeScript 5 |
| UI | React 19 |
| Estilos | Tailwind CSS 4 |
| Componentes | shadcn/ui (New York style) |
| Iconos | lucide-react |
| Tema | next-themes |
| API del clima (primaria) | Open-Meteo (gratuita, sin API key) |
| API del clima (fallback) | wttr.in (activa solo si Open-Meteo está saturado) |
| Animaciones | framer-motion (disponible) |
| Notificaciones | sonner |

---

## Instalación y uso

### Requisitos
- Node.js 20+ o Bun
- Navegador moderno con geolocalización (opcional)

### Pasos

```bash
# 1. Instalar dependencias
bun install

# 2. Iniciar en modo desarrollo
bun run dev
# → http://localhost:3000

# 3. Lint
bun run lint
```

> No se requiere `.env` ni API key: Open-Meteo es pública y gratuita.

### Vista previa
El proyecto se sirve desde un sandbox con preview público. Usa el botón **"Open in New Tab"** del panel de preview para abrirlo en una pestaña nueva.

---

## Estructura del proyecto

```
src/
├── app/
│   ├── page.tsx                         # Dashboard principal
│   ├── layout.tsx                        # Layout + ThemeProvider + PreferencesProvider
│   └── api/
│       ├── weather/route.ts              # Proxy a Open-Meteo (forecast) con fallback wttr.in
│       └── geocode/route.ts              # Proxy a Open-Meteo (geocoding) con retry
├── components/
│   ├── providers/
│   │   └── theme-provider.tsx           # Wrapper de next-themes
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── ThemeToggle.tsx
│   │   └── LanguageToggle.tsx
│   └── weather/
│       ├── SearchBar.tsx
│       ├── CurrentWeather.tsx
│       ├── HourlyForecast.tsx
│       ├── DailyForecast.tsx
│       ├── WeatherIcon.tsx
│       ├── LoadingState.tsx
│       └── ErrorState.tsx
├── lib/
│   ├── i18n.ts                           # Diccionarios es/en + helpers
│   ├── preferences-context.tsx          # Context React para lang + units
│   ├── types.ts                          # Interfaces TS de Open-Meteo
│   ├── weather-api.ts                    # Funciones fetch del cliente
│   └── wttr-adapter.ts                   # Transformador wttr.in → Open-Meteo
└── hooks/
    └── useWeather.ts                     # Estado loading/error/data + persistencia
```

### Documentación complementaria
- **`Guia.md`** — Bitácora viva del desarrollo: decisiones, pasos ejecutados y cambios solicitados.

---

## APIs usadas

### Open-Meteo Forecast (primaria)
- Endpoint: `https://api.open-meteo.com/v1/forecast`
- Parámetros clave: `latitude`, `longitude`, `current`, `hourly`, `daily`, `timezone`
- Documentación: https://open-meteo.com/en/docs
- Proxy interno: `/api/weather?lat=X&lon=Y`

### Open-Meteo Geocoding
- Endpoint: `https://geocoding-api.open-meteo.com/v1/search`
- Parámetros clave: `name` (texto a buscar), `count`, `language`
- Documentación: https://open-meteo.com/en/docs/geocoding-api
- Proxy interno: `/api/geocode?q=ciudad&lang=es|en`

### wttr.in (fallback)
- Endpoint: `https://wttr.in/{lat},{lon}?format=j1`
- Documentación: https://github.com/chubin/wttr.in
- Solo se usa si Open-Meteo devuelve 429 (rate limit) o falla la red.
- Limita el pronóstico a 3 días (vs. 7 de Open-Meteo).

### Estrategia de fallback
1. `/api/weather` intenta Open-Meteo primero.
2. Si Open-Meteo responde 429 o hay error de red, llama a wttr.in.
3. La respuesta de wttr.in se transforma al formato Open-Meteo mediante `lib/wttr-adapter.ts`, de modo que toda la UI funciona sin cambios.
4. Cada respuesta incluye el header HTTP `X-Weather-Source: open-meteo` o `wttr.in` para inspección.

---

## Códigos WMO (Weather Interpretation)

Open-Meteo usa los códigos WMO estándar para describir el estado del cielo. La app los mapea a iconos (lucide-react) y a textos localizados (es/en).

| Código | Estado |
|--------|--------|
| 0 | Despejado |
| 1-3 | Mayormente despejado / parcialmente nublado / nublado |
| 45,48 | Niebla |
| 51-57 | Llovizna |
| 61-67 | Lluvia |
| 71-77 | Nieve |
| 80-82 | Aguaceros |
| 85-86 | Aguaceros de nieve |
| 95-99 | Tormenta |

El adaptador de wttr.in mapea los códigos WorldWeatherOnline a estos códigos WMO.

---

## Uso de la aplicación

1. **Buscar ciudad**: escribe en la barra superior y selecciona una sugerencia, o presiona Enter.
2. **Usar mi ubicación**: botón con icono de localización; pide permiso al navegador.
3. **Cambiar idioma**: botón ES/EN en el header (es dropdown).
4. **Cambiar tema**: botón sol/luna en el header.
5. **Ver pronóstico**: las cards se actualizan automáticamente al cambiar de ciudad.

---

## Mantenimiento

Este README se actualiza cada vez que se agrega, modifica o elimina una funcionalidad visible. Ver `Guia.md` para el historial completo de cambios (entradas `[G01]`, `[G02]`, ...).

# Instalación del Dashboard del Clima

> Sigue estos pasos tras descargar y descomprimir el paquete.

## Requisitos previos

- **Node.js 20+** o **Bun 1.1+** (recomendado: Bun, más rápido)
- Navegador moderno con soporte de geolocalización (opcional, solo para la función "Usar mi ubicación")
- Conexión a internet (las llamadas a Open-Meteo y wttr.in se hacen en tiempo real)

## Pasos

```bash
# 1. Descomprimir el paquete
unzip dashboard-del-clima-20261123.zip
# o
tar xzf dashboard-del-clima-20261123.tar.gz

cd dashboard-del-clima

# 2. Instalar dependencias
bun install
# o, si prefieres npm:
# npm install

# 3. Iniciar en modo desarrollo
bun run dev
# o
# npm run dev

# 4. Abrir http://localhost:3000 en el navegador
```

## Verificar que funciona

1. La página carga con el clima de Madrid por defecto.
2. Escribe una ciudad (ej: "Barcelona") y selecciona una sugerencia.
3. Pulsa el botón de sol/luna para alternar tema.
4. Pulsa el botón ES/EN para cambiar idioma.

## Sin API key

No necesitas ninguna API key. Open-Meteo es pública y gratuita. Si Open-Meteo está saturado, la app usa wttr.in como fallback automático y transparente.

## Scripts disponibles

| Comando | Qué hace |
|---------|----------|
| `bun run dev` | Inicia el dev server en `http://localhost:3000` |
| `bun run lint` | Ejecuta ESLint |
| `bun run build` | Genera build de producción en `.next/` |
| `bun run start` | Levanta el servidor de producción (tras `build`) |

## Estructura del paquete

```
dashboard-del-clima/
├── README.md              # Documentación principal del proyecto
├── INSTALL.md             # Este archivo
├── Guia.md                # Bitácora de desarrollo (decisiones y cambios)
├── package.json           # Dependencias y scripts
├── bun.lock               # Lockfile (Bun)
├── next.config.ts         # Config de Next.js
├── tsconfig.json          # Config de TypeScript
├── tailwind.config.ts     # Config de Tailwind
├── components.json        # Config de shadcn/ui
├── eslint.config.mjs      # Config de ESLint
├── postcss.config.mjs     # Config de PostCSS
├── Caddyfile              # Gateway (solo sandbox, puedes borrarlo)
├── prisma/schema.prisma   # Schema Prisma (no usado en este proyecto)
├── public/                # Assets estáticos (logo, robots.txt)
└── src/
    ├── app/               # Rutas Next.js (App Router)
    │   ├── page.tsx       # Dashboard principal
    │   ├── layout.tsx     # Layout con providers
    │   ├── globals.css    # Estilos globales + tema
    │   └── api/
    │       ├── weather/route.ts
    │       └── geocode/route.ts
    ├── components/
    │   ├── layout/        # Header, ThemeToggle, LanguageToggle
    │   ├── providers/     # theme-provider
    │   ├── weather/       # SearchBar, CurrentWeather, HourlyForecast, DailyForecast, WeatherIcon, LoadingState, ErrorState
    │   └── ui/            # Componentes shadcn/ui
    ├── hooks/
    │   └── useWeather.ts
    └── lib/
        ├── i18n.ts
        ├── preferences-context.tsx
        ├── types.ts
        ├── weather-api.ts
        └── wttr-adapter.ts
```

## Despliegue en producción

El proyecto es un Next.js 16 estándar y se puede desplegar en cualquier plataforma compatible:

- **Vercel**: importar el repo, no requiere configuración extra
- **Netlify**: usar el adapter de Next.js
- **Docker**: hay ejemplos en la documentación de Next.js 16
- **Bun standalone**: `bun run build && bun .next/standalone/server.js`

## Problemas comunes

| Problema | Solución |
|----------|---------|
| `Module not found` tras instalar | Borrar `node_modules` y `.next`, reinstalar |
| Las horas salen como "—" | Es normal si la API no devuelve timezone; la app usa la del navegador |
| No aparece el clima de mi ciudad | Verifica que el nombre esté bien escrito; prueba variantes (ej: "Nueva York" o "New York") |
| El botón "Usar mi ubicación" no hace nada | Revisa permisos de geolocalización del navegador |

## Soporte

Para entender las decisiones técnicas, lee `Guia.md`. Para una visión general, lee `README.md`.

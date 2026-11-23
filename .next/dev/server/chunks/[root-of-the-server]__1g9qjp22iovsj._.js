module.exports = [
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/runtime-reacts.external.js [external] (next/dist/server/runtime-reacts.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/runtime-reacts.external.js", () => require("next/dist/server/runtime-reacts.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/node:stream [external] (node:stream, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("node:stream", () => require("node:stream"));

module.exports = mod;
}),
"[externals]/path [external] (path, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}),
"[project]/src/app/api/weather/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET
]);
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
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$wttr$2d$adapter$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/wttr-adapter.ts [app-route] (ecmascript)");
;
;
const OPEN_METEO_ENDPOINT = "https://api.open-meteo.com/v1/forecast";
const WTTR_ENDPOINT = "https://wttr.in";
async function GET(request) {
    const { searchParams } = new URL(request.url);
    const lat = searchParams.get("lat");
    const lon = searchParams.get("lon");
    if (!lat || !lon) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "missing_lat_lon"
        }, {
            status: 400
        });
    }
    const latitude = parseFloat(lat);
    const longitude = parseFloat(lon);
    if (Number.isNaN(latitude) || Number.isNaN(longitude) || latitude < -90 || latitude > 90 || longitude < -180 || longitude > 180) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "invalid_coordinates"
        }, {
            status: 400
        });
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
            "wind_gusts_10m"
        ].join(","),
        hourly: [
            "temperature_2m",
            "relative_humidity_2m",
            "apparent_temperature",
            "precipitation_probability",
            "weather_code",
            "wind_speed_10m",
            "is_day"
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
            "uv_index_max"
        ].join(","),
        timezone: "auto",
        forecast_days: "7"
    });
    // --- Intento 1: Open-Meteo ---
    try {
        const url = `${OPEN_METEO_ENDPOINT}?${params.toString()}`;
        const res = await fetch(url, {
            headers: {
                Accept: "application/json"
            },
            next: {
                revalidate: 600
            }
        });
        if (res.ok) {
            const data = await res.json();
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(data, {
                headers: {
                    "Cache-Control": "public, s-maxage=600, stale-while-revalidate=3600",
                    "X-Weather-Source": "open-meteo"
                }
            });
        }
        // Si 429 (rate limit) → fallback a wttr.in
        if (res.status === 429) {
            console.warn("[weather] Open-Meteo 429, fallback to wttr.in");
            return await fetchFromWttr(latitude, longitude);
        }
        // Otro error de Open-Meteo (5xx, etc.)
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: `weather_failed_${res.status}`
        }, {
            status: res.status
        });
    } catch (err) {
        // Error de red en Open-Meteo → fallback
        console.warn("[weather] Open-Meteo network error, fallback:", err);
        return await fetchFromWttr(latitude, longitude);
    }
}
async function fetchFromWttr(lat, lon) {
    try {
        const url = `${WTTR_ENDPOINT}/${lat},${lon}?format=j1`;
        const res = await fetch(url, {
            headers: {
                Accept: "application/json"
            },
            next: {
                revalidate: 600
            }
        });
        if (!res.ok) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: `weather_failed_${res.status}`
            }, {
                status: res.status
            });
        }
        const data = await res.json();
        const adapted = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$wttr$2d$adapter$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["wttrToOpenMeteo"])(data, lat, lon);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(adapted, {
            headers: {
                "Cache-Control": "public, s-maxage=600, stale-while-revalidate=3600",
                "X-Weather-Source": "wttr.in"
            }
        });
    } catch (err) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "weather_network_error"
        }, {
            status: 502
        });
    }
}
}),
"[project]/src/lib/wttr-adapter.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Adaptador de wttr.in al formato ForecastResponse de Open-Meteo.
 * Se usa como FALLBACK cuando Open-Meteo devuelve 429 (rate limit) o error.
 *
 * wttr.in limita el forecast a 3 días en su tier gratuito, suficiente para el demo.
 * Documentación: https://github.com/chubin/wttr.in
 */ __turbopack_context__.s([
    "wttrToOpenMeteo",
    ()=>wttrToOpenMeteo
]);
/**
 * Mapea el weatherCode de wttr.in (WorldWeatherOnline) al weather_code WMO de Open-Meteo.
 * Códigos wttr.in: https://wttr.in/:help
 */ function mapWttrCode(code) {
    if (code === 113) return 0; // Clear/Sunny → Despejado
    if (code === 116) return 2; // Partly cloudy
    if (code === 119) return 3; // Cloudy
    if (code === 122) return 3; // Overcast
    if (code === 143) return 45; // Mist
    if (code === 248 || code === 260) return 45; // Fog
    if (code === 176) return 51; // Patchy rain possible → light drizzle
    if (code === 263 || code === 266) return 51; // Light drizzle
    if (code === 281 || code === 284) return 56; // Freezing drizzle
    if (code === 293 || code === 296) return 61; // Light rain
    if (code === 299 || code === 302) return 63; // Moderate rain
    if (code === 305 || code === 308) return 65; // Heavy rain
    if (code === 179) return 71; // Patchy snow possible
    if (code === 182 || code === 185) return 66; // Patchy sleet
    if (code === 227 || code === 230) return 73; // Blowing snow / Blizzard
    if (code === 320 || code === 323) return 75; // Patchy/heavy snow
    if (code === 326 || code === 329 || code === 332 || code === 335 || code === 338 || code === 350 || code === 353 || code === 356 || code === 359 || code === 362 || code === 365 || code === 368 || code === 371 || code === 374 || code === 377) return 71;
    if (code === 200) return 95; // Thundery outbreaks possible
    if (code === 386 || code === 389) return 95; // Patchy/moderate thunder
    if (code === 392 || code === 395) return 96; // Patchy thunder with snow
    return 3;
}
/**
 * Convierte "HH:MM AM/PM" o "HH:MM" a minutos desde medianoche para construir un ISO.
 */ function parseTimeOfDay(dateStr, timeStr) {
    // timeStr ej: "08:10 AM", "05:52 PM"
    const m = timeStr.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)?$/i);
    if (!m) return `${dateStr}T00:00`;
    let h = parseInt(m[1], 10);
    const min = parseInt(m[2], 10);
    const ap = (m[3] ?? "").toUpperCase();
    if (ap === "PM" && h < 12) h += 12;
    if (ap === "AM" && h === 12) h = 0;
    return `${dateStr}T${String(h).padStart(2, "0")}:${String(min).padStart(2, "0")}`;
}
function wttrToOpenMeteo(wttr, lat, lon) {
    const current = wttr.current_condition[0];
    const weather = wttr.weather ?? [];
    const days = weather.length;
    // ---- Hourly (24h a partir de ahora, con intervalos de 3h) ----
    const hourlyTimes = [];
    const hourlyTemp = [];
    const hourlyHumidity = [];
    const hourlyApparent = [];
    const hourlyPrecipProb = [];
    const hourlyWeatherCode = [];
    const hourlyWind = [];
    const hourlyIsDay = [];
    for(let d = 0; d < days && hourlyTimes.length < 24; d++){
        const day = weather[d];
        for (const h of day.hourly){
            const hour = parseInt(h.time, 10) / 100; // "0".."21" → 0..21
            const iso = `${day.date}T${String(hour).padStart(2, "0")}:00`;
            // Determinar si es de día (06-19)
            const isDay = hour >= 7 && hour < 19 ? 1 : 0;
            hourlyTimes.push(iso);
            hourlyTemp.push(parseFloat(h.tempC));
            hourlyHumidity.push(parseFloat(h.humidity));
            hourlyApparent.push(parseFloat(h.FeelsLikeC));
            hourlyPrecipProb.push(parseInt(h.chanceofrain, 10) || 0);
            hourlyWeatherCode.push(mapWttrCode(parseInt(h.weatherCode, 10)));
            hourlyWind.push(parseFloat(h.windspeedKmph));
            hourlyIsDay.push(isDay);
            if (hourlyTimes.length >= 24) break;
        }
    }
    // ---- Daily ----
    const dailyTimes = [];
    const dailyWeatherCodes = [];
    const dailyTMax = [];
    const dailyTMin = [];
    const dailySunrise = [];
    const dailySunset = [];
    const dailyPrecipSum = [];
    const dailyPrecipProbMax = [];
    const dailyWindMax = [];
    const dailyUvMax = [];
    for (const day of weather){
        dailyTimes.push(day.date);
        // Tomar weatherCode a mediodía (hour 12 → index 4)
        const noonHour = day.hourly.find((h)=>h.time === "1200") ?? day.hourly[0];
        dailyWeatherCodes.push(mapWttrCode(parseInt(noonHour?.weatherCode ?? "113", 10)));
        dailyTMax.push(parseFloat(day.maxtempC));
        dailyTMin.push(parseFloat(day.mintempC));
        const astro = day.astronomy?.[0];
        dailySunrise.push(parseTimeOfDay(day.date, astro?.sunrise ?? "06:00"));
        dailySunset.push(parseTimeOfDay(day.date, astro?.sunset ?? "18:00"));
        dailyPrecipSum.push(parseFloat(day.hourly?.[0]?.precipMM ?? "0"));
        dailyPrecipProbMax.push(Math.max(...day.hourly.map((h)=>parseInt(h.chanceofrain, 10) || 0)));
        dailyWindMax.push(Math.max(...day.hourly.map((h)=>parseFloat(h.windspeedKmph) || 0)));
        dailyUvMax.push(parseInt(day.uvIndex, 10) || 0);
    }
    const wttrWeatherCode = parseInt(current.weatherCode, 10);
    const currentIsDay = current.is_day !== undefined ? parseInt(current.is_day, 10) : (()=>{
        const now = new Date();
        const h = now.getHours();
        return h >= 7 && h < 19 ? 1 : 0;
    })();
    return {
        latitude: lat,
        longitude: lon,
        generationtime_ms: 0,
        utc_offset_seconds: 0,
        timezone: "auto",
        timezone_abbreviation: "GMT",
        elevation: 0,
        current_units: {
            temperature_2m: "°C",
            relative_humidity_2m: "%",
            apparent_temperature: "°C",
            precipitation: "mm",
            weather_code: "wmo code",
            cloud_cover: "%",
            pressure_msl: "hPa",
            surface_pressure: "hPa",
            wind_speed_10m: "km/h",
            wind_direction_10m: "°",
            wind_gusts_10m: "km/h"
        },
        current: {
            time: new Date().toISOString(),
            interval: 0,
            temperature_2m: parseFloat(current.temp_C),
            relative_humidity_2m: parseInt(current.humidity, 10),
            apparent_temperature: parseFloat(current.FeelsLikeC),
            is_day: currentIsDay,
            precipitation: parseFloat(current.precipMM),
            rain: parseFloat(current.precipMM),
            showers: 0,
            snowfall: 0,
            weather_code: mapWttrCode(wttrWeatherCode),
            cloud_cover: parseInt(current.cloudcover, 10),
            pressure_msl: parseInt(current.pressure, 10),
            surface_pressure: parseInt(current.pressure, 10),
            wind_speed_10m: parseFloat(current.windspeedKmph),
            wind_direction_10m: parseInt(current.winddirDegree, 10),
            wind_gusts_10m: parseFloat(current.WindGustKmph ?? current.windspeedKmph)
        },
        hourly_units: {
            temperature_2m: "°C",
            relative_humidity_2m: "%",
            apparent_temperature: "°C",
            precipitation_probability: "%",
            weather_code: "wmo code",
            wind_speed_10m: "km/h",
            is_day: ""
        },
        hourly: {
            time: hourlyTimes,
            temperature_2m: hourlyTemp,
            relative_humidity_2m: hourlyHumidity,
            apparent_temperature: hourlyApparent,
            precipitation_probability: hourlyPrecipProb,
            weather_code: hourlyWeatherCode,
            wind_speed_10m: hourlyWind,
            is_day: hourlyIsDay
        },
        daily_units: {
            weather_code: "wmo code",
            temperature_2m_max: "°C",
            temperature_2m_min: "°C",
            sunrise: "iso8601",
            sunset: "iso8601",
            precipitation_sum: "mm",
            precipitation_probability_max: "%",
            wind_speed_10m_max: "km/h",
            uv_index_max: ""
        },
        daily: {
            time: dailyTimes,
            weather_code: dailyWeatherCodes,
            temperature_2m_max: dailyTMax,
            temperature_2m_min: dailyTMin,
            sunrise: dailySunrise,
            sunset: dailySunset,
            precipitation_sum: dailyPrecipSum,
            precipitation_probability_max: dailyPrecipProbMax,
            wind_speed_10m_max: dailyWindMax,
            uv_index_max: dailyUvMax
        }
    };
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__1g9qjp22iovsj._.js.map
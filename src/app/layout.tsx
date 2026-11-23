import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { PreferencesProvider } from "@/lib/preferences-context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dashboard del Clima | Weather Dashboard",
  description:
    "Pronóstico del clima para cualquier ciudad del mundo. Consumo de Open-Meteo API, estados de carga y error, diseño responsive, bilingüe (Español/Inglés), tema claro/oscuro.",
  keywords: [
    "clima",
    "weather",
    "dashboard",
    "pronóstico",
    "forecast",
    "Open-Meteo",
    "Next.js",
    "TypeScript",
  ],
  authors: [{ name: "Weather Dashboard" }],
  icons: {
    icon: "https://z-cdn.chatglm.cn/z-ai/static/logo.svg",
  },
  openGraph: {
    title: "Dashboard del Clima",
    description: "Pronóstico preciso para cualquier ciudad del mundo",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground min-h-screen`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <PreferencesProvider>
            {children}
            <Toaster />
          </PreferencesProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

"use client";

/**
 * Wrapper de next-themes para evitar problemas de hidratación con SSR.
 */

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ComponentProps } from "react";

export function ThemeProvider({
  children,
  ...props
}: ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}

"use client";

import { AlertTriangle, RefreshCw } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { usePreferences } from "@/lib/preferences-context";

interface ErrorStateProps {
  error: string;
  onRetry: () => void;
}

const errorMap: Record<string, { key: string; default: string }> = {
  weather_failed_400: { key: "errorNotFound", default: "City not found" },
  weather_failed_404: { key: "errorNotFound", default: "City not found" },
  weather_failed_500: { key: "errorNetwork", default: "Network error" },
  weather_network_error: { key: "errorNetwork", default: "Network error" },
  geocoding_network_error: { key: "errorNetwork", default: "Network error" },
  geolocation_denied: { key: "errorGeolocation", default: "Geolocation denied" },
  unknown_error: { key: "errorNetwork", default: "Unknown error" },
};

export function ErrorState({ error, onRetry }: ErrorStateProps) {
  const { t } = usePreferences();
  const mapping = errorMap[error] ?? errorMap.unknown_error;
  const message = t(mapping.key);

  return (
    <Card className="border-destructive/40 bg-destructive/5">
      <CardContent className="p-8 flex flex-col items-center text-center gap-4">
        <div className="rounded-full bg-destructive/10 p-4">
          <AlertTriangle className="h-8 w-8 text-destructive" />
        </div>
        <div className="space-y-1">
          <h3 className="font-semibold text-lg">{t("errorTitle")}</h3>
          <p className="text-sm text-muted-foreground max-w-md">
            {message}
          </p>
          {error && (
            <code className="text-xs text-muted-foreground/70 inline-block mt-2 px-2 py-1 rounded bg-muted">
              {error}
            </code>
          )}
        </div>
        <Button onClick={onRetry} variant="default" className="gap-2">
          <RefreshCw className="h-4 w-4" />
          {t("retry")}
        </Button>
      </CardContent>
    </Card>
  );
}

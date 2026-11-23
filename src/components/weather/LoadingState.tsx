"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export function LoadingState() {
  return (
    <div className="space-y-4">
      {/* Skeleton CurrentWeather */}
      <Card className="overflow-hidden">
        <CardContent className="p-6 sm:p-8">
          <div className="space-y-6">
            <div className="space-y-2">
              <Skeleton className="h-8 w-40" />
              <Skeleton className="h-4 w-60" />
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-6">
              <div className="flex items-center gap-4">
                <Skeleton className="h-20 w-20 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-12 w-32" />
                  <Skeleton className="h-4 w-40" />
                  <Skeleton className="h-3 w-28" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 sm:flex-1">
                {Array.from({ length: 6 }).map((_, i) => (
                  <Skeleton key={i} className="h-12 w-full" />
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Skeleton Hourly */}
      <Card>
        <CardContent className="p-4">
          <Skeleton className="h-6 w-32 mb-4" />
          <div className="flex gap-2 overflow-hidden">
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} className="h-28 w-20 shrink-0" />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Skeleton Daily */}
      <Card>
        <CardContent className="p-4 space-y-2">
          <Skeleton className="h-6 w-32 mb-2" />
          {Array.from({ length: 7 }).map((_, i) => (
            <Skeleton key={i} className="h-12 w-full" />
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

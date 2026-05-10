"use client";

import { useEffect } from "react";
import { initScrollTracking } from "@/lib/analytics";
import { captureUTMParams } from "@/lib/utm";

/**
 * Client-side analytics initialization.
 * GA4 script is loaded in the layout (server-side).
 * This component only handles scroll tracking and UTM capture.
 */
export function AnalyticsInit() {
  useEffect(() => {
    const cleanup = initScrollTracking();
    captureUTMParams();
    return cleanup;
  }, []);

  return null;
}

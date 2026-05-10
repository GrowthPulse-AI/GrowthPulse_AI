"use client";

/**
 * UTM Parameter Handler
 * Captures UTM values from URL and stores them in sessionStorage + cookies
 * for later association with lead form submissions.
 */

export type UTMParams = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
};

const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
] as const;

const STORAGE_KEY = "gp_utm_params";

/**
 * Capture UTM params from URL and store them
 */
export function captureUTMParams(): UTMParams {
  if (typeof window === "undefined") return {};

  const params = new URLSearchParams(window.location.search);
  const utmParams: UTMParams = {};
  let hasUTM = false;

  UTM_KEYS.forEach((key) => {
    const value = params.get(key);
    if (value) {
      utmParams[key] = value;
      hasUTM = true;
    }
  });

  // Only store if we found UTM params (don't overwrite existing)
  if (hasUTM) {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(utmParams));
      // Also set a cookie for server-side access
      document.cookie = `${STORAGE_KEY}=${encodeURIComponent(
        JSON.stringify(utmParams)
      )}; path=/; max-age=${60 * 60 * 24 * 30}; SameSite=Lax`;
    } catch {
      // Storage might be unavailable
    }
  }

  return utmParams;
}

/**
 * Retrieve stored UTM params
 */
export function getStoredUTMParams(): UTMParams {
  if (typeof window === "undefined") return {};

  try {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch {
    // Fallback to cookie
    try {
      const cookies = document.cookie.split(";");
      const utmCookie = cookies.find((c) => c.trim().startsWith(`${STORAGE_KEY}=`));
      if (utmCookie) {
        const value = utmCookie.split("=")[1];
        return JSON.parse(decodeURIComponent(value));
      }
    } catch {
      // Storage unavailable
    }
  }

  return {};
}

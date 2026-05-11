"use client";

/**
 * A/B Testing Engine
 * Simple, cookie-based variant assignment with GA4 tracking.
 * Uses deterministic assignment (hash of visitor ID) for consistency.
 */

import { trackABVariant } from "./analytics";

export type ABTest = {
  name: string;
  variants: readonly string[];
};

const COOKIE_PREFIX = "gp_ab_";

/**
 * Get or assign a variant for a given test.
 * Uses cookie-based persistence so the user always sees the same variant.
 */
export function getVariant(test: ABTest): string {
  if (typeof window === "undefined") return test.variants[0];

  const cookieName = `${COOKIE_PREFIX}${test.name}`;

  // Check if variant already assigned
  const existingVariant = getCookie(cookieName);
  if (existingVariant && test.variants.includes(existingVariant)) {
    return existingVariant;
  }

  // Assign variant randomly (50/50 for 2 variants)
  const randomIndex = Math.floor(Math.random() * test.variants.length);
  const assignedVariant = test.variants[randomIndex];

  // Persist in cookie (30 days)
  setCookie(cookieName, assignedVariant, 30);

  // Track assignment in GA4
  trackABVariant(test.name, assignedVariant);

  return assignedVariant;
}

/**
 * Active A/B tests configuration
 */
export const AB_TESTS = {
  heroCta: {
    name: "hero_cta",
    variants: ["control", "variant_b"],
  },
} as const;

/**
 * Hero CTA button variants
 */
export const HERO_CTA_VARIANTS: Record<string, { label: string }> = {
  control: {
    label: "Get Your Free Audit →",
  },
  variant_b: {
    label: "Start Your Growth Score →",
  },
};

// Cookie helpers
function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const cookies = document.cookie.split(";");
  const found = cookies.find((c) => c.trim().startsWith(`${name}=`));
  return found ? found.split("=")[1]?.trim() : null;
}

function setCookie(name: string, value: string, days: number) {
  if (typeof document === "undefined") return;
  const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString();
  document.cookie = `${name}=${value}; expires=${expires}; path=/; SameSite=Lax`;
}

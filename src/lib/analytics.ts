"use client";

/**
 * Analytics utility for GA4 custom event tracking.
 * Tracks: CTA clicks, form interactions, scroll depth, and A/B test variants.
 */

// Extend window for gtag
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

type EventParams = Record<string, string | number | boolean>;

/**
 * Send a custom event to GA4
 */
export function trackEvent(eventName: string, params?: EventParams) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventName, params);
  }
}

/**
 * Track CTA button clicks
 */
export function trackCTAClick(ctaId: string, ctaText: string, section: string) {
  trackEvent("cta_click", {
    cta_id: ctaId,
    cta_text: ctaText,
    section,
  });
}

/**
 * Track form interactions
 */
export function trackFormStart(formId: string) {
  trackEvent("form_start", {
    form_id: formId,
  });
}

export function trackFormSubmit(formId: string) {
  trackEvent("form_submit", {
    form_id: formId,
  });
}

/**
 * Track scroll depth milestones
 */
export function initScrollTracking() {
  if (typeof window === "undefined") return;

  const milestones = [25, 50, 75, 100];
  const tracked = new Set<number>();

  const handleScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = Math.round((window.scrollY / scrollHeight) * 100);

    milestones.forEach((milestone) => {
      if (scrollPercent >= milestone && !tracked.has(milestone)) {
        tracked.add(milestone);
        trackEvent("scroll_depth", {
          depth_percent: milestone,
        });
      }
    });
  };

  window.addEventListener("scroll", handleScroll, { passive: true });
  return () => window.removeEventListener("scroll", handleScroll);
}

/**
 * Track section visibility
 */
export function trackSectionView(sectionId: string) {
  trackEvent("section_view", {
    section_id: sectionId,
  });
}

/**
 * Track A/B test variant assignment
 */
export function trackABVariant(testName: string, variant: string) {
  trackEvent("ab_test_assignment", {
    test_name: testName,
    variant,
  });
}

"use client";

import Script from "next/script";
import { useEffect } from "react";
import { initScrollTracking } from "@/lib/analytics";
import { captureUTMParams } from "@/lib/utm";

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export function Analytics() {
  useEffect(() => {
    // Initialize scroll depth tracking
    const cleanup = initScrollTracking();

    // Capture UTM params on page load
    captureUTMParams();

    return cleanup;
  }, []);

  if (!GA_ID) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}', {
            page_title: document.title,
            page_location: window.location.href,
          });
        `}
      </Script>
    </>
  );
}

"use client";

import { useState, useEffect } from "react";
import { getVariant, AB_TESTS, HERO_CTA_VARIANTS } from "@/lib/ab-testing";
import { trackCTAClick } from "@/lib/analytics";
import { InteractiveHero } from "./InteractiveHero";

export function Hero() {
  const [variant, setVariant] = useState<string>("control");

  useEffect(() => {
    const assignedVariant = getVariant(AB_TESTS.heroCta);
    setVariant(assignedVariant);
  }, []);

  const cta = HERO_CTA_VARIANTS[variant] || HERO_CTA_VARIANTS.control;

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden pt-20"
      data-ab-test="hero_cta"
      data-ab-variant={variant}
    >
      {/* Background effects */}
      <div className="absolute inset-0 grid-bg opacity-50" />
      <div className="radial-glow w-[600px] h-[600px] bg-gp-cyan/10 -top-40 -right-40 absolute" />
      <div className="radial-glow w-[400px] h-[400px] bg-gp-green/10 bottom-20 -left-20 absolute" />

      <div className="section-container relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-4 items-center">
          {/* Left column — Copy */}
          <div className="space-y-8 animate-fade-in-up">
            <div className="section-badge">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="3" fill="currentColor" className="animate-pulse" />
                <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
              </svg>
              500+ Companies Audited
            </div>

            {/* Fixed canonical tagline — per product brief section 2.1 */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.1] tracking-tight text-gp-gray-900">
              Your marketing stack,{" "}
              <span className="gradient-text">diagnosed in minutes.</span>
            </h1>

            {/* ICP-targeted subheadline */}
            <p className="text-lg sm:text-xl text-gp-gray-500 max-w-lg leading-relaxed">
              For B2B SaaS teams who know something&apos;s off — but can&apos;t pinpoint where.{" "}
              Get a{" "}
              <strong className="text-gp-gray-700">7-dimension growth score</strong>{" "}
              with AI-powered recommendations.{" "}
              <strong className="text-gp-gray-700">No agency. No retainer. Just your numbers.</strong>
            </p>

            {/* CTA buttons — primary is A/B tested */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#get-started"
                id="hero-cta-primary"
                className="btn-primary text-lg !py-4 !px-8 animate-pulse-glow"
                onClick={() =>
                  trackCTAClick("hero-cta-primary", cta.label, "hero")
                }
              >
                <span>{cta.label}</span>
              </a>
              <a
                href="#features"
                id="hero-cta-secondary"
                className="btn-secondary text-lg !py-4 !px-8"
                onClick={() =>
                  trackCTAClick("hero-cta-secondary", "See How It Works", "hero")
                }
              >
                See How It Works
              </a>
            </div>

            <div className="flex items-center gap-6 text-sm text-gp-gray-400 pt-2">
              <div className="flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M13.5 4.5L6.5 11.5L2.5 7.5" />
                </svg>
                No credit card required
              </div>
              <div className="flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M13.5 4.5L6.5 11.5L2.5 7.5" />
                </svg>
                5-minute setup
              </div>
            </div>

            {/* A/B test evaluation indicator */}
            <div className="mt-4 px-4 py-3 rounded-xl bg-gp-gray-50 border border-gp-gray-100">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-mono font-semibold text-gp-cyan-dark">🧪 A/B Test Active</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-gp-cyan/10 text-gp-cyan-dark font-semibold">LIVE</span>
              </div>
              <p className="text-[11px] text-gp-gray-400 font-mono leading-relaxed">
                Test: <span className="text-gp-gray-600">hero_cta</span> → Variant: <span className="text-gp-gray-600">{variant}</span>
              </p>
              <p className="text-[10px] text-gp-gray-300 mt-1 italic">
                Evaluation indicator only — hidden in production via environment flag.
              </p>
            </div>
          </div>

          {/* Right column — Desktop: Interactive SVG orbital */}
          <div className="hidden lg:block relative animate-fade-in delay-300">
            <InteractiveHero />
          </div>

          {/* Right column — Mobile/Tablet: Static logo grid */}
          <div className="lg:hidden flex flex-col items-center gap-6 py-4 animate-fade-in delay-300">
            {/* Central brand logo */}
            <div className="flex flex-col items-center gap-2">
              <img src="/logos/GrowthPulse.svg" alt="GrowthPulse AI" width={100} height={100} style={{ objectFit: "contain" }} />
              <p className="text-xs text-gp-gray-400 font-medium tracking-wide">30+ tools. One growth score.</p>
            </div>

            {/* 3×3 tool logo grid */}
            <div className="grid grid-cols-3 gap-4 w-full max-w-xs">
              {[
                { name: "HubSpot",          logo: "/logos/hubspot.svg",          color: "#ff7a59" },
                { name: "Salesforce",        logo: "/logos/salesforce.svg",       color: "#00a1e0" },
                { name: "Google Analytics",  logo: "/logos/google-analytics.svg", color: "#e37400" },
                { name: "Meta Ads",          logo: "/logos/meta.svg",             color: "#0081fb" },
                { name: "Shopify",           logo: "/logos/shopify.svg",          color: "#7ab55c" },
                { name: "Google Ads",        logo: "/logos/google-ads.svg",       color: "#4285f4" },
                { name: "TikTok Ads",        logo: "/logos/tiktok.svg",           color: "#010101" },
                { name: "LinkedIn Ads",      logo: "/logos/linkedin.svg",         color: "#0a66c2" },
                { name: "ActiveCampaign",    logo: "/logos/activecampaign.svg",   color: "#356ae6" },
              ].map((tool) => (
                <div key={tool.name} className="flex flex-col items-center gap-1.5">
                  <div className="w-16 h-16 rounded-2xl bg-white shadow-md border border-gp-gray-100 flex items-center justify-center p-3"
                    style={{ boxShadow: `0 2px 12px ${tool.color}22` }}>
                    <img src={tool.logo} alt={tool.name} width={36} height={36} style={{ objectFit: "contain" }} />
                  </div>
                  <span className="text-[9px] text-gp-gray-400 text-center leading-tight font-medium">{tool.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

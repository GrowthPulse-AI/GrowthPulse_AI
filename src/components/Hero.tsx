"use client";

import { useState, useEffect } from "react";
import { getVariant, AB_TESTS, HERO_HEADLINES } from "@/lib/ab-testing";
import { trackCTAClick } from "@/lib/analytics";
import { InteractiveHero } from "./InteractiveHero";

export function Hero() {
  const [variant, setVariant] = useState<string>("control");

  useEffect(() => {
    const assignedVariant = getVariant(AB_TESTS.heroHeadline);
    setVariant(assignedVariant);
  }, []);

  const headline = HERO_HEADLINES[variant] || HERO_HEADLINES.control;

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden pt-20"
      data-ab-test="hero_headline"
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

            {/* A/B tested headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.1] tracking-tight text-gp-gray-900">
              {headline.title}
              <span className="gradient-text">{headline.highlight}</span>
            </h1>

            <p className="text-lg sm:text-xl text-gp-gray-500 max-w-lg leading-relaxed">
              Connect your tools. Get a{" "}
              <strong className="text-gp-gray-700">7-dimension growth score</strong>{" "}
              with AI-powered recommendations — before you commit to anything.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#get-started"
                id="hero-cta-primary"
                className="btn-primary text-lg !py-4 !px-8 animate-pulse-glow"
                onClick={() =>
                  trackCTAClick("hero-cta-primary", "Get Your Free Audit", "hero")
                }
              >
                <span>Get Your Free Audit →</span>
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
                Test: <span className="text-gp-gray-600">hero_headline</span> → Variant: <span className="text-gp-gray-600">{variant}</span>
              </p>
              <p className="text-[10px] text-gp-gray-300 mt-1 italic">
                Evaluation indicator only — hidden in production via environment flag.
              </p>
            </div>
          </div>

          {/* Right column — Interactive visual */}
          <div className="relative animate-fade-in delay-300">
            <InteractiveHero />
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { getVariant, AB_TESTS, HERO_HEADLINES } from "@/lib/ab-testing";
import { trackCTAClick } from "@/lib/analytics";

export function Hero() {
  const [showAnimation, setShowAnimation] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);
  const [variant, setVariant] = useState<string>("control");
  const animationRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    // A/B test: assign hero headline variant
    const assignedVariant = getVariant(AB_TESTS.heroHeadline);
    setVariant(assignedVariant);

    // Show static image first for 2 seconds, then animation, then static again
    const startTimer = setTimeout(() => {
      setShowAnimation(true);
    }, 2000);

    // After animation finishes, switch back to static
    const endTimer = setTimeout(() => {
      setAnimationComplete(true);
    }, 12000);

    return () => {
      clearTimeout(startTimer);
      clearTimeout(endTimer);
    };
  }, []);

  const headline = HERO_HEADLINES[variant] || HERO_HEADLINES.control;

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden pt-20"
    >
      {/* Background effects */}
      <div className="absolute inset-0 grid-bg opacity-50" />
      <div className="radial-glow w-[600px] h-[600px] bg-gp-cyan/10 -top-40 -right-40 absolute" />
      <div className="radial-glow w-[400px] h-[400px] bg-gp-green/10 bottom-20 -left-20 absolute" />

      <div className="section-container relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
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

            {/* A/B test indicator (visible for demo) */}
            <div className="text-xs text-gp-gray-300 font-mono">
              A/B Test: hero_headline → variant: {variant}
            </div>
          </div>

          {/* Right column — Hero visual */}
          <div className="relative animate-fade-in delay-300 flex justify-center">
            <div className="relative w-full max-w-[600px]">
              {/* Glow behind image */}
              <div className="absolute inset-0 bg-gradient-to-br from-gp-cyan/20 via-transparent to-gp-green/20 rounded-2xl blur-3xl scale-110" />

              {/* Static image (shown before and after animation) */}
              <Image
                src="/GrowthPulse_AI-webp.webp"
                alt="GrowthPulse AI — Marketing stack integration dashboard showing connected tools like HubSpot, Google Analytics, Meta Ads, Salesforce, and more"
                width={1200}
                height={800}
                priority
                className={`relative rounded-2xl shadow-2xl transition-opacity duration-700 ${
                  showAnimation && !animationComplete ? "opacity-0 absolute inset-0" : "opacity-100"
                }`}
              />

              {/* Animation (shown during animation phase) */}
              {showAnimation && !animationComplete && (
                <img
                  ref={animationRef}
                  src="/GrowthPulse_AI.webp"
                  alt="GrowthPulse AI animated integration demo"
                  className="relative rounded-2xl shadow-2xl w-full animate-fade-in"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

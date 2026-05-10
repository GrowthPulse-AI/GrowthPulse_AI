"use client";

import { useEffect, useRef, useState } from "react";

const features = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="14" cy="14" r="11" />
        <path d="M14 7v7l4 4" />
        <path d="M7 14h2M19 14h2M14 7v2M14 19v2" opacity="0.5" />
      </svg>
    ),
    title: "One-Click Stack Integration",
    description:
      "Connects to HubSpot, Google Analytics, Meta Ads, Klaviyo, Salesforce, and 30+ tools via API in under 5 minutes.",
    highlight: "30+ integrations",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M4 21l4-6 4 3 4-8 4 4 4-7" />
        <rect x="3" y="3" width="22" height="22" rx="3" />
      </svg>
    ),
    title: "7-Dimension Growth Score",
    description:
      "Proprietary scoring algorithm rates each growth dimension on a 0–100 scale with benchmarks against industry peers.",
    highlight: "0–100 scoring",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M14 3l3 6h6l-5 4 2 6-6-4-6 4 2-6-5-4h6z" />
      </svg>
    ),
    title: "AI-Generated Action Plan",
    description:
      "Produces a prioritized 90-day roadmap with specific recommendations ranked by expected impact and effort.",
    highlight: "90-day roadmap",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="4" y="3" width="20" height="22" rx="2" />
        <path d="M9 8h10M9 12h10M9 16h6" />
        <path d="M18 16l2 2 3-4" opacity="0.6" />
      </svg>
    ),
    title: "Executive Summary Report",
    description:
      "Auto-generates a board-ready PDF with key findings, visualized scores, and strategic recommendations.",
    highlight: "Board-ready PDF",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="5" width="22" height="16" rx="2" />
        <path d="M8 13h3M13 10v6M17 11h3" />
        <circle cx="18.5" cy="14" r="1" fill="currentColor" />
      </svg>
    ),
    title: "Live Dashboard",
    description:
      "Real-time monitoring of all 7 dimensions with alerts when performance dips below benchmarks.",
    highlight: "Real-time alerts",
  },
];

function FeatureCard({
  feature,
  index,
}: {
  feature: (typeof features)[0];
  index: number;
}) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`glass-card p-8 group transition-all duration-700 ${
        visible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-gp-cyan/15 to-gp-green/15 flex items-center justify-center text-gp-cyan-dark mb-5 group-hover:scale-110 group-hover:shadow-md transition-all duration-300">
        {feature.icon}
      </div>

      <h3 className="text-xl font-bold text-gp-gray-800 mb-3">
        {feature.title}
      </h3>

      <p className="text-gp-gray-500 text-sm leading-relaxed mb-4">
        {feature.description}
      </p>

      <span className="inline-block px-3 py-1 text-xs font-semibold text-gp-cyan-dark bg-gp-cyan/10 rounded-full">
        {feature.highlight}
      </span>
    </div>
  );
}

export function Features() {
  return (
    <section id="features" className="relative py-20 sm:py-28 overflow-hidden">
      {/* Background accents */}
      <div className="radial-glow w-[500px] h-[500px] bg-gp-cyan/5 top-0 left-1/2 -translate-x-1/2 absolute" />

      <div className="section-container relative z-10 !py-0">
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="section-badge mx-auto mb-6">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            Platform Features
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gp-gray-900 mb-4 tracking-tight">
            Everything you need to{" "}
            <span className="gradient-text">diagnose growth</span>
          </h2>
          <p className="text-lg text-gp-gray-400">
            From integration to insight — GrowthPulse AI covers every dimension
            of your marketing performance.
          </p>
        </div>

        {/* Feature grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <FeatureCard key={feature.title} feature={feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

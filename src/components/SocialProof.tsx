"use client";

import { useEffect, useRef, useState } from "react";

const stats = [
  { value: "500+", label: "Companies Audited" },
  { value: "32%", label: "Avg. ROI Improvement" },
  { value: "4.8/5", label: "Customer Rating" },
];

const testimonials = [
  {
    quote:
      "GrowthPulse found $140K in wasted ad spend we didn't know about.",
    author: "Sarah Chen",
    role: "VP Marketing",
    company: "NovaBridge SaaS",
    context: "B2B SaaS · Series A · 5-person marketing team",
  },
  {
    quote:
      "We went from guessing to knowing exactly where to focus. Our team's efficiency doubled in 60 days.",
    author: "Marcus Reid",
    role: "Head of Growth",
    company: "StackLayer",
    context: "B2B SaaS · $4M ARR · 3-person growth team",
  },
  {
    quote:
      "The 7-dimension score made our board meeting the most productive one we've ever had.",
    author: "Elena Torres",
    role: "CMO",
    company: "DataForge Analytics",
    context: "B2B SaaS · $12M ARR · 8-person marketing team",
  },
];

const logos = [
  { name: "NovaBridge", letters: "NB" },
  { name: "StackLayer", letters: "SL" },
  { name: "DataForge", letters: "DF" },
  { name: "Meridian", letters: "MR" },
  { name: "PulseMetrics", letters: "PM" },
];

function AnimatedCounter({ target, suffix = "" }: { target: string; suffix?: string }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      <div className="text-3xl sm:text-4xl font-extrabold gradient-text">{target}</div>
    </div>
  );
}

export function SocialProof() {
  return (
    <section id="social-proof" className="relative py-16 sm:py-20 bg-gp-offwhite border-y border-gp-gray-100">
      <div className="section-container !py-0">
        {/* Stats row */}
        <div className="grid grid-cols-3 gap-6 sm:gap-8 mb-16">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <AnimatedCounter target={stat.value} />
              <p className="text-xs sm:text-sm text-gp-gray-400 mt-1 font-medium">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Trusted by logos */}
        <div className="text-center mb-10">
          <p className="text-xs uppercase tracking-widest text-gp-gray-300 font-semibold mb-6">
            What B2B SaaS teams discovered when they stopped guessing
          </p>
          <div className="flex flex-wrap justify-center gap-6 sm:gap-10">
            {logos.map((logo) => (
              <div
                key={logo.name}
                className="flex items-center gap-2 text-gp-gray-300 hover:text-gp-gray-500 transition-colors"
              >
                <div className="w-8 h-8 rounded-md bg-gp-gray-100 flex items-center justify-center text-xs font-bold text-gp-gray-400">
                  {logo.letters}
                </div>
                <span className="text-sm font-semibold hidden sm:inline">
                  {logo.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="glass-card p-6 sm:p-8 flex flex-col justify-between"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array(5)
                  .fill(0)
                  .map((_, j) => (
                    <svg
                      key={j}
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="var(--gp-cyan)"
                    >
                      <path d="M8 0l2.47 4.94L16 5.76l-4 3.88.94 5.48L8 12.68l-4.94 2.44.94-5.48-4-3.88 5.53-.82z" />
                    </svg>
                  ))}
              </div>

              <blockquote className="text-gp-gray-600 text-sm sm:text-base leading-relaxed mb-6 flex-grow">
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gp-cyan/30 to-gp-green/30 flex items-center justify-center text-sm font-bold text-gp-cyan-dark">
                  {t.author
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gp-gray-700">
                    {t.author}
                  </p>
                  <p className="text-xs text-gp-gray-400">
                    {t.role}, {t.company}
                  </p>
                  <p className="text-[10px] text-gp-gray-300 mt-0.5 italic">
                    {t.context} *fictional
                  </p>
                </div>
              </div>

              <p className="text-[10px] text-gp-gray-300 mt-4 italic">
                *Fictional testimonial for demonstration purposes
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

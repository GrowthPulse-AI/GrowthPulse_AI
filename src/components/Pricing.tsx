"use client";

import { useState } from "react";

const plans = [
  {
    name: "Starter",
    price: "$499",
    period: "/mo",
    description: "For teams getting started with data-driven marketing.",
    features: [
      { text: "Up to 5 integrations", included: true },
      { text: "Monthly diagnostic report", included: true },
      { text: "Quarterly action plans", included: true },
      { text: "2 team seats", included: true },
      { text: "Email support", included: true },
      { text: "Live dashboard", included: false },
      { text: "Dedicated success manager", included: false },
    ],
    cta: "Start with Starter",
    popular: false,
  },
  {
    name: "Growth",
    price: "$1,299",
    period: "/mo",
    description: "For scaling teams that need deeper insights, faster.",
    features: [
      { text: "Up to 15 integrations", included: true },
      { text: "Weekly diagnostic report", included: true },
      { text: "Monthly action plans", included: true },
      { text: "5 team seats", included: true },
      { text: "Priority email + chat support", included: true },
      { text: "Live dashboard", included: false },
      { text: "Dedicated success manager", included: false },
    ],
    cta: "Start with Growth",
    popular: true,
  },
  {
    name: "Scale",
    price: "$2,999",
    period: "/mo",
    description: "For high-growth teams that demand full visibility.",
    features: [
      { text: "Unlimited integrations", included: true },
      { text: "Daily diagnostics + alerts", included: true },
      { text: "Monthly + live dashboard", included: true },
      { text: "Unlimited team seats", included: true },
      { text: "Dedicated success manager", included: true },
      { text: "Custom reporting", included: true },
      { text: "Priority onboarding", included: true },
    ],
    cta: "Start with Scale",
    popular: false,
  },
];

export function Pricing() {
  return (
    <section
      id="pricing"
      className="relative py-20 sm:py-28 bg-gp-offwhite border-y border-gp-gray-100 overflow-hidden"
    >
      <div className="radial-glow w-[600px] h-[600px] bg-gp-cyan/5 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 absolute" />

      <div className="section-container relative z-10 !py-0">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="section-badge mx-auto mb-6">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 1v5M4 3.5h6M5 7v4c0 1.1.9 2 2 2s2-.9 2-2V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            Simple Pricing
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gp-gray-900 mb-4 tracking-tight">
            Invest in{" "}
            <span className="gradient-text">clarity, not guesswork</span>
          </h2>
          <p className="text-lg text-gp-gray-400">
            Choose the plan that fits your team. All plans include a full
            7-dimension growth audit.
          </p>
        </div>

        {/* Pricing cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl p-8 transition-all duration-300 hover:-translate-y-2 ${
                plan.popular
                  ? "bg-gradient-to-b from-gp-gray-800 to-gp-gray-900 text-white shadow-2xl scale-[1.02] lg:scale-105 border border-gp-cyan/30"
                  : "bg-white border border-gp-gray-100 shadow-lg hover:shadow-xl"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-gradient-to-r from-gp-cyan to-gp-green text-gp-gray-900 text-xs font-bold rounded-full shadow-lg">
                  Most Popular
                </div>
              )}

              <div className="mb-6">
                <h3
                  className={`text-lg font-bold mb-2 ${
                    plan.popular ? "text-white" : "text-gp-gray-800"
                  }`}
                >
                  {plan.name}
                </h3>
                <p
                  className={`text-sm ${
                    plan.popular ? "text-gray-400" : "text-gp-gray-400"
                  }`}
                >
                  {plan.description}
                </p>
              </div>

              <div className="mb-8">
                <span
                  className={`text-4xl sm:text-5xl font-extrabold ${
                    plan.popular ? "text-white" : "text-gp-gray-900"
                  }`}
                >
                  {plan.price}
                </span>
                <span
                  className={`text-sm ${
                    plan.popular ? "text-gray-400" : "text-gp-gray-400"
                  }`}
                >
                  {plan.period}
                </span>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li
                    key={feature.text}
                    className="flex items-start gap-3 text-sm"
                  >
                    {feature.included ? (
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        className="flex-shrink-0 mt-0.5"
                      >
                        <circle
                          cx="9"
                          cy="9"
                          r="8"
                          fill={plan.popular ? "rgb(34 211 238 / 0.2)" : "rgb(34 211 238 / 0.15)"}
                        />
                        <path
                          d="M5.5 9l2.5 2.5 4.5-5"
                          stroke={plan.popular ? "#22d3ee" : "#06b6d4"}
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    ) : (
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        className="flex-shrink-0 mt-0.5 opacity-30"
                      >
                        <circle cx="9" cy="9" r="8" stroke="currentColor" strokeWidth="1" />
                        <path d="M6 9h6" stroke="currentColor" strokeWidth="1.5" />
                      </svg>
                    )}
                    <span
                      className={
                        feature.included
                          ? plan.popular
                            ? "text-gray-200"
                            : "text-gp-gray-600"
                          : plan.popular
                          ? "text-gray-500"
                          : "text-gp-gray-300"
                      }
                    >
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>

              <a
                href="#get-started"
                id={`pricing-cta-${plan.name.toLowerCase()}`}
                className={`block text-center py-3.5 px-6 rounded-xl font-bold text-sm transition-all duration-300 ${
                  plan.popular
                    ? "bg-gradient-to-r from-gp-cyan to-gp-green text-gp-gray-900 hover:shadow-lg hover:shadow-gp-cyan/30"
                    : "bg-gp-gray-50 text-gp-gray-700 hover:bg-gp-gray-100 border border-gp-gray-200"
                }`}
              >
                {plan.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

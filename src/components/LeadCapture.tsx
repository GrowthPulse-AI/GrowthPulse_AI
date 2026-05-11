"use client";

import { useActionState, useEffect, useRef } from "react";
import { submitLead } from "@/app/actions/leads";
import { trackFormStart, trackFormSubmit, trackCTAClick } from "@/lib/analytics";
import { getStoredUTMParams } from "@/lib/utm";

const monthlyBudgets = [
  "Under $5K/mo",
  "$5K–$20K/mo",
  "$20K–$50K/mo",
  "$50K+/mo",
];

export function LeadCapture() {
  const [state, formAction, pending] = useActionState(submitLead, {
    success: false,
    message: "",
  });

  const formStarted = useRef(false);

  // Track form start on first interaction
  const handleFormFocus = () => {
    if (!formStarted.current) {
      formStarted.current = true;
      trackFormStart("lead-capture-form");
    }
  };

  // Track successful submission
  useEffect(() => {
    if (state.success) {
      trackFormSubmit("lead-capture-form");
    }
  }, [state.success]);

  if (state.success) {
    return (
      <section id="get-started" className="relative py-20 sm:py-28 overflow-hidden">
        <div className="radial-glow w-[600px] h-[600px] bg-gp-green/10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 absolute" />
        <div className="section-container relative z-10 !py-0">
          <div className="max-w-lg mx-auto text-center glass-card p-12 animate-fade-in-up">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gp-cyan to-gp-green flex items-center justify-center mx-auto mb-6">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round">
                <path d="M8 16l6 6 10-12" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gp-gray-800 mb-3">
              You&apos;re in! 🎉
            </h3>
            <p className="text-gp-gray-500">
              We&apos;ll send your personalized growth audit to your inbox within 24 hours.
              Keep an eye out for actionable insights.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="get-started" className="relative py-20 sm:py-28 overflow-hidden">
      <div className="radial-glow w-[500px] h-[500px] bg-gp-cyan/5 -top-20 right-0 absolute" />
      <div className="radial-glow w-[400px] h-[400px] bg-gp-green/5 bottom-0 left-0 absolute" />

      <div className="section-container relative z-10 !py-0">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-5xl mx-auto">
          {/* Left — Copy */}
          <div className="space-y-6">
            <div className="section-badge">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M7 1l2 4h4l-3 3 1 4-4-2-4 2 1-4-3-3h4z" fill="currentColor" />
              </svg>
              Get Started Free
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gp-gray-900 tracking-tight">
              Stop guessing.{" "}
              <span className="gradient-text">Start knowing.</span>
            </h2>

            <p className="text-lg text-gp-gray-500 leading-relaxed">
              Get a free 7-dimension growth audit for your marketing stack.
              No credit card. No commitment. Just clarity.
            </p>

            <div className="space-y-3 text-sm text-gp-gray-500">
              {[
                "Full diagnostic across 7 growth dimensions",
                "AI-powered recommendations within 24 hours",
                "Compare your scores against industry benchmarks",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <circle cx="9" cy="9" r="8" fill="rgb(34 211 238 / 0.1)" />
                    <path d="M5.5 9l2.5 2.5 4.5-5" stroke="var(--gp-cyan-dark)" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Right — Form */}
          <div className="glass-card p-8 sm:p-10">
            <form action={formAction} className="space-y-5" id="lead-capture-form" onFocus={handleFormFocus}>
              {/* Hidden UTM fields */}
              <UTMHiddenFields />

              <div>
                <label
                  htmlFor="lead-name"
                  className="block text-sm font-semibold text-gp-gray-700 mb-2"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="lead-name"
                  name="name"
                  required
                  placeholder="Jane Smith"
                  className="w-full px-4 py-3 rounded-xl border border-gp-gray-200 bg-white text-gp-gray-800 placeholder:text-gp-gray-300 focus:outline-none focus:ring-2 focus:ring-gp-cyan/40 focus:border-gp-cyan transition-all text-sm"
                />
              </div>

              <div>
                <label
                  htmlFor="lead-email"
                  className="block text-sm font-semibold text-gp-gray-700 mb-2"
                >
                  Work Email
                </label>
                <input
                  type="email"
                  id="lead-email"
                  name="email"
                  required
                  placeholder="jane@company.com"
                  className="w-full px-4 py-3 rounded-xl border border-gp-gray-200 bg-white text-gp-gray-800 placeholder:text-gp-gray-300 focus:outline-none focus:ring-2 focus:ring-gp-cyan/40 focus:border-gp-cyan transition-all text-sm"
                />
              </div>

              <div>
                <label
                  htmlFor="lead-monthly-budget"
                  className="block text-sm font-semibold text-gp-gray-700 mb-2"
                >
                  Monthly Marketing Budget
                </label>
                <select
                  id="lead-monthly-budget"
                  name="monthlyBudget"
                  required
                  defaultValue=""
                  className="w-full px-4 py-3 rounded-xl border border-gp-gray-200 bg-white text-gp-gray-800 focus:outline-none focus:ring-2 focus:ring-gp-cyan/40 focus:border-gp-cyan transition-all text-sm appearance-none"
                >
                  <option value="" disabled>
                    Select your budget range
                  </option>
                  {monthlyBudgets.map((budget) => (
                    <option key={budget} value={budget}>
                      {budget}
                    </option>
                  ))}
                </select>
              </div>

              {state.message && !state.success && (
                <p className="text-red-500 text-sm" aria-live="polite">
                  {state.message}
                </p>
              )}

              <button
                type="submit"
                id="lead-submit-btn"
                disabled={pending}
                className="btn-primary w-full text-lg !py-4 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() =>
                  trackCTAClick("lead-submit-btn", "Get My Free Growth Audit", "lead-capture")
                }
              >
                <span>
                  {pending ? "Submitting..." : "Get My Free Growth Audit →"}
                </span>
              </button>

              <p className="text-xs text-gp-gray-300 text-center">
                No spam. No credit card. Unsubscribe anytime.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Hidden fields that inject stored UTM params into the form submission
 */
function UTMHiddenFields() {
  const utmParams = typeof window !== "undefined" ? getStoredUTMParams() : {};

  return (
    <>
      {Object.entries(utmParams).map(([key, value]) => (
        <input key={key} type="hidden" name={key} value={value as string} />
      ))}
    </>
  );
}

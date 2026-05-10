"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#features", label: "Features" },
    { href: "#pricing", label: "Pricing" },
    { href: "#get-started", label: "Get Started" },
  ];

  return (
    <header
      id="navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 backdrop-blur-xl shadow-md border-b border-gp-gray-100"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 group" id="nav-logo">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-gp-cyan to-gp-green flex items-center justify-center font-bold text-white text-sm shadow-md">
            GP
          </div>
          <span className="text-lg font-bold text-gp-gray-800 group-hover:text-gp-cyan-dark transition-colors">
            GrowthPulse
            <span className="gradient-text"> AI</span>
          </span>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-gp-gray-500 hover:text-gp-cyan-dark transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a href="#get-started" className="btn-primary text-sm !py-2.5 !px-5">
            <span>Start Free Audit</span>
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          id="mobile-menu-toggle"
          className="md:hidden p-2 text-gp-gray-500 hover:text-gp-gray-700"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
            {mobileOpen ? (
              <path d="M6 6l12 12M6 18L18 6" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl border-t border-gp-gray-100 px-6 py-4 space-y-3 animate-fade-in">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="block text-sm font-medium text-gp-gray-600 hover:text-gp-cyan-dark py-2"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#get-started"
            className="btn-primary w-full text-sm !py-2.5"
            onClick={() => setMobileOpen(false)}
          >
            <span>Start Free Audit</span>
          </a>
        </div>
      )}
    </header>
  );
}

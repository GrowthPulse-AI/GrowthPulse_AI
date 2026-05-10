export function Footer() {
  return (
    <footer className="bg-gp-gray-900 text-gray-400 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <img src="/logos/GP.svg" alt="GrowthPulse AI" width={32} height={32} style={{ objectFit: "contain" }} />
            <span className="text-sm font-semibold text-gray-300">
              GrowthPulse AI
            </span>
          </div>

          {/* Links */}
          <nav className="flex items-center gap-6 text-sm">
            <a
              href="#features"
              className="hover:text-gp-cyan transition-colors"
            >
              Features
            </a>
            <a
              href="#pricing"
              className="hover:text-gp-cyan transition-colors"
            >
              Pricing
            </a>
            <a
              href="#get-started"
              className="hover:text-gp-cyan transition-colors"
            >
              Get Started
            </a>
          </nav>

          {/* Copyright */}
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} GrowthPulse AI. All rights reserved.
          </p>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-800 text-center">
          <p className="text-xs text-gray-600">
            This is a fictional product created for demonstration purposes as
            part of the Azarian Growth Agency technical assessment.
          </p>
        </div>
      </div>
    </footer>
  );
}

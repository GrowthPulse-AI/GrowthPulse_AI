import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GrowthPulse AI — Your Marketing Stack, Diagnosed in Minutes",
  description:
    "GrowthPulse AI connects to your existing marketing tools and generates an automated diagnostic report scoring performance across 7 growth dimensions. 500+ companies audited, 32% average ROI improvement.",
  keywords: [
    "marketing diagnostics",
    "growth score",
    "marketing ROI",
    "SaaS analytics",
    "marketing stack audit",
    "AI marketing",
    "growth dimensions",
  ],
  openGraph: {
    title: "GrowthPulse AI — Your Marketing Stack, Diagnosed in Minutes",
    description:
      "Connect your marketing tools. Get a 7-dimension growth score with AI-powered recommendations in minutes.",
    type: "website",
    locale: "en_US",
    siteName: "GrowthPulse AI",
  },
  twitter: {
    card: "summary_large_image",
    title: "GrowthPulse AI — Your Marketing Stack, Diagnosed in Minutes",
    description:
      "Connect your marketing tools. Get a 7-dimension growth score with AI-powered recommendations in minutes.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

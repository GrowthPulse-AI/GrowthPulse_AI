"use client";

import { useEffect, useRef, useState, useCallback } from "react";

const TOOLS = [
  { name: "HubSpot", color: "#ff7a59", dataType: "CRM & Pipeline", angle: -45, logo: "/logos/hubspot.svg" },
  { name: "Salesforce", color: "#00a1e0", dataType: "Deal Flow & Revenue", angle: 270, logo: "/logos/salesforce.svg" },
  { name: "Google Analytics", color: "#e37400", dataType: "Traffic & Behavior", angle: 0, logo: "/logos/google-analytics.svg" },
  { name: "Meta Ads", color: "#0081fb", dataType: "Ad Spend & ROAS", angle: 45, logo: "/logos/meta.svg" },
  { name: "Shopify", color: "#7ab55c", dataType: "Revenue & Conversions", angle: 90, logo: "/logos/shopify.svg" },
  { name: "Google Ads", color: "#4285f4", dataType: "Campaign & Keywords", angle: 160, logo: "/logos/google-ads.svg" },
  { name: "TikTok Ads", color: "#010101", dataType: "Video Ad Performance", angle: 200, logo: "/logos/tiktok.svg" },
  { name: "LinkedIn Ads", color: "#0a66c2", dataType: "B2B Lead Data", angle: 235, logo: "/logos/linkedin.svg" },
  { name: "ActiveCampaign", color: "#356ae6", dataType: "Automation & Email", angle: 125, logo: "/logos/activecampaign.svg" },
];

const HEX_POINTS = "50,2 95,25 95,75 50,98 5,75 5,25";
const HEX_SIDE = "50,98 95,75 95,87 50,110 5,87 5,75";

function circuitPath(x1: number, y1: number, x2: number, y2: number, alt: boolean): string {
  return alt
    ? `M ${x1} ${y1} L ${x2} ${y1} L ${x2} ${y2}`
    : `M ${x1} ${y1} L ${x1} ${y2} L ${x2} ${y2}`;
}

function circuitPoint(x1: number, y1: number, x2: number, y2: number, p: number, alt: boolean) {
  if (alt) {
    const l1 = Math.abs(x2 - x1), l2 = Math.abs(y2 - y1), total = l1 + l2, d = p * total;
    if (d <= l1) { const t = l1 ? d / l1 : 0; return { x: x1 + (x2 - x1) * t, y: y1 }; }
    const t = l2 ? (d - l1) / l2 : 0; return { x: x2, y: y1 + (y2 - y1) * t };
  } else {
    const l1 = Math.abs(y2 - y1), l2 = Math.abs(x2 - x1), total = l1 + l2, d = p * total;
    if (d <= l1) { const t = l1 ? d / l1 : 0; return { x: x1, y: y1 + (y2 - y1) * t }; }
    const t = l2 ? (d - l1) / l2 : 0; return { x: x1 + (x2 - x1) * t, y: y2 };
  }
}

type Pulse = { id: number; toolIndex: number; progress: number };

export function InteractiveHero() {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState<number | null>(null);
  const [pulses, setPulses] = useState<Pulse[]>([]);
  const [conn, setConn] = useState<Set<number>>(new Set());
  const [score, setScore] = useState(0);
  const [dim, setDim] = useState({ w: 720, h: 620 });
  const pid = useRef(0);

  useEffect(() => {
    const up = () => {
      if (ref.current) {
        const w = ref.current.offsetWidth;
        setDim({ w, h: Math.max(w * 0.92, 540) });
      }
    };
    up();
    window.addEventListener("resize", up);
    return () => window.removeEventListener("resize", up);
  }, []);

  useEffect(() => {
    TOOLS.forEach((_, i) => {
      setTimeout(() => setConn(p => new Set(p).add(i)), 500 + i * 220);
    });
  }, []);

  useEffect(() => {
    const t = setTimeout(() => {
      const iv = setInterval(() => setScore(p => {
        if (p >= 82) { clearInterval(iv); return 82; }
        return p + 1;
      }), 30);
    }, 500 + TOOLS.length * 220 + 400);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const iv = setInterval(() => {
      const ti = Math.floor(Math.random() * TOOLS.length);
      if (conn.has(ti)) setPulses(p => [...p, { id: pid.current++, toolIndex: ti, progress: 0 }]);
    }, 850);
    return () => clearInterval(iv);
  }, [conn]);

  useEffect(() => {
    const f = setInterval(() => {
      setPulses(p => p.map(x => ({ ...x, progress: x.progress + 0.016 })).filter(x => x.progress <= 1));
    }, 16);
    return () => clearInterval(f);
  }, []);

  const bump = useCallback(() => setScore(p => Math.min(p + 1, 99)), []);
  useEffect(() => {
    pulses.forEach(p => { if (p.progress >= 0.96 && p.progress < 0.98) bump(); });
  }, [pulses, bump]);

  const cx = dim.w * 0.55, cy = dim.h * 0.47;
  const rx = Math.min(dim.w * 0.48, 330), ry = Math.min(dim.h * 0.45, 260);
  const pos = (a: number) => ({ x: cx + Math.cos(a * Math.PI / 180) * rx, y: cy + Math.sin(a * Math.PI / 180) * ry });
  const sc = score >= 75 ? "#34d399" : score >= 50 ? "#f9ab00" : "#94a3b8";

  return (
    <div ref={ref} className="relative w-full select-none overflow-visible" style={{ height: dim.h, marginTop: "-3.5rem" }}>
      <svg width={dim.w} height={dim.h} viewBox={`0 0 ${dim.w} ${dim.h}`} className="absolute inset-0">
        <defs>
          <linearGradient id="lg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity=".4" />
            <stop offset="100%" stopColor="#34d399" stopOpacity=".25" />
          </linearGradient>
          <filter id="pg"><feGaussianBlur stdDeviation="5" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
          <filter id="sg"><feGaussianBlur stdDeviation="3" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
          <radialGradient id="hubGlow" cx="50%" cy="40%" r="50%">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity=".15" />
            <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="platTop" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#e0f7fa" />
            <stop offset="100%" stopColor="#f0fdfa" />
          </linearGradient>
          <linearGradient id="platSide" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#b2ebf2" />
            <stop offset="100%" stopColor="#80deea" />
          </linearGradient>
        </defs>

        {/* Background circuit traces */}
        <g opacity=".05" stroke="#22d3ee" strokeWidth="1" fill="none">
          <path d={`M 0 ${dim.h * .3} L ${dim.w * .12} ${dim.h * .3} L ${dim.w * .12} ${dim.h * .6}`} />
          <path d={`M ${dim.w} ${dim.h * .2} L ${dim.w * .88} ${dim.h * .2} L ${dim.w * .88} ${dim.h * .55}`} />
          <path d={`M ${dim.w * .3} ${dim.h} L ${dim.w * .3} ${dim.h * .88} L ${dim.w * .55} ${dim.h * .88}`} />
        </g>

        {/* Circuit connections */}
        {TOOLS.map((t, i) => {
          const p = pos(t.angle), ic = conn.has(i), ih = hovered === i, alt = i === 8 ? false : i % 2 === 0;
          const d = circuitPath(p.x, p.y, cx, cy, alt);
          return (
            <g key={`c-${i}`}>
              <path d={d} fill="none" stroke={ih ? t.color : "url(#lg)"} strokeWidth={ih ? 2.5 : 1}
                opacity={ic ? (ih ? .7 : .18) : 0} strokeLinejoin="round"
                style={{ transition: "all .5s ease" }} />
              {ih && ic && <path d={d} fill="none" stroke={t.color} strokeWidth={4} opacity={.12}
                strokeLinejoin="round" filter="url(#sg)" />}
              {ic && <circle cx={alt ? cx : p.x} cy={alt ? p.y : cy} r={ih ? 3 : 1.5}
                fill={ih ? t.color : "#22d3ee"} opacity={ih ? .5 : .12}
                style={{ transition: "all .3s" }} />}
            </g>
          );
        })}

        {/* Data pulses */}
        {pulses.map(pulse => {
          const t = TOOLS[pulse.toolIndex], p = pos(t.angle), alt = pulse.toolIndex === 8 ? false : pulse.toolIndex % 2 === 0;
          const pt = circuitPoint(p.x, p.y, cx, cy, pulse.progress, alt);
          const op = pulse.progress < .08 ? pulse.progress * 12 : 1 - pulse.progress * .5;
          return (
            <g key={pulse.id}>
              <circle cx={pt.x} cy={pt.y} r={6} fill={t.color} opacity={op * .1} />
              <circle cx={pt.x} cy={pt.y} r={3.5} fill={t.color} filter="url(#pg)" opacity={op * .8} />
              <circle cx={pt.x} cy={pt.y} r={1.5} fill="white" opacity={op} />
            </g>
          );
        })}

        {/* Center platform */}
        <g>
          <ellipse cx={cx} cy={cy} rx={85} ry={85} fill="url(#hubGlow)" />
          <ellipse cx={cx} cy={cy + 14} rx={66} ry={20} fill="url(#platSide)" opacity=".6" />
          <ellipse cx={cx} cy={cy} rx={66} ry={20} fill="url(#platTop)" stroke="#b2ebf2" strokeWidth=".5" />
          <ellipse cx={cx} cy={cy - 2} rx={50} ry={15} fill="none" stroke="#22d3ee" strokeWidth=".5" opacity=".3" strokeDasharray="3 3" />
          <ellipse cx={cx} cy={cy - 4} rx={36} ry={11} fill="none" stroke="#34d399" strokeWidth=".5" opacity=".2" strokeDasharray="2 4" />
        </g>
      </svg>

      {/* Center hub HTML overlay */}
      <div className="absolute flex flex-col items-center justify-center z-10"
        style={{ left: cx - 80, top: cy - 94, width: 160 }}>
        <img src="/logos/GrowthPulse.svg" alt="GrowthPulse AI" width={120} height={120}
          style={{ objectFit: "contain", marginBottom: 4 }} />
        {score > 0 && (
          <>
            <span className="text-2xl font-black transition-colors duration-300" style={{ color: sc }}>{score}</span>
            <span className="text-[7px] font-bold text-gp-gray-400 uppercase tracking-widest -mt-0.5">Growth Score</span>
          </>
        )}
      </div>

      {/* Hexagonal tool nodes */}
      {TOOLS.map((tool, i) => {
        const p = pos(tool.angle), ic = conn.has(i), ih = hovered === i;
        const sz = 108;
        // Right-side tools (angle between -90 and 90) get tooltip to the right
        const isRightSide = tool.angle > -90 && tool.angle < 90;
        return (
          <div key={tool.name} className="absolute"
            style={{
              left: p.x - sz / 2, top: p.y - sz / 2, width: sz, height: sz + 14,
              opacity: ic ? 1 : 0,
              transform: `scale(${ic ? (ih ? 1.08 : 1) : .5})`,
              transition: "opacity .5s ease, transform .3s ease",
            }}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
          >
            <svg viewBox="0 0 100 110" width={sz} height={sz + 14}
              className="cursor-pointer"
              style={{ filter: ih ? `drop-shadow(0 6px 16px ${tool.color}50)` : "drop-shadow(0 2px 6px rgba(0,0,0,0.08))" }}>
              <polygon points={HEX_SIDE} fill={tool.color} opacity={ih ? .4 : .18}
                style={{ transition: "opacity .3s" }} />
              <polygon points={HEX_POINTS} fill="white"
                stroke={ih ? tool.color : "#e2e8f0"}
                strokeWidth={ih ? 2.5 : 1}
                style={{ transition: "stroke .3s, stroke-width .3s" }} />
              <polyline points="50,2 95,25 95,75" fill="none"
                stroke={tool.color} strokeWidth={ih ? 2.5 : 1.5}
                opacity={ih ? .7 : .3}
                style={{ transition: "all .3s" }} />
              <line x1="5" y1="25" x2="50" y2="2" stroke={tool.color}
                strokeWidth={ih ? 2.5 : 1.5} opacity={ih ? .7 : .3}
                style={{ transition: "all .3s" }} />
            </svg>
            {/* Logo + name label */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
              style={{ height: sz, paddingTop: "2px" }}>
              <img
                src={tool.logo}
                alt={tool.name}
                width={36}
                height={36}
                style={{ objectFit: "contain", maxWidth: 36, maxHeight: 36, marginBottom: 3 }}
              />
              <span
                className="text-[7.5px] font-bold text-center leading-tight px-1.5 transition-colors"
                style={{ color: ih ? tool.color : "#475569" }}
              >
                {tool.name}
              </span>
            </div>
            {/* Connection dot */}
            <div className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full border-2 border-white shadow-sm"
              style={{
                backgroundColor: ic ? "#34d399" : "#cbd5e1",
                transform: ic ? "scale(1)" : "scale(0)",
                transition: "all .5s",
              }}>
              {ic && (
                <svg viewBox="0 0 12 12" width="10" height="10" className="absolute inset-0 m-auto">
                  <path d="M3 6l2 2 4-4" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                </svg>
              )}
            </div>
            {/* Tooltip — always above the hex */}
            {ih && (
              <div className="absolute left-1/2 -translate-x-1/2 z-20 animate-fade-in"
                style={{ bottom: sz + 14, width: 80 }}>
                <div className="px-2.5 py-1.5 rounded-lg text-[10px] font-semibold text-white shadow-lg text-center leading-snug"
                  style={{ backgroundColor: tool.color }}>
                  {tool.dataType}
                </div>
                <div className="w-2 h-2 rotate-45 absolute -bottom-1 left-1/2 -translate-x-1/2"
                  style={{ backgroundColor: tool.color }} />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

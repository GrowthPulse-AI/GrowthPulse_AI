"use client";

import { useEffect, useRef, useState, useCallback } from "react";

/* ── Tool definitions ─────────────────────────────────────── */
const TOOLS = [
  { name: "HubSpot", color: "#ff7a59", dataType: "CRM & Pipeline", angle: -30,
    icon: <svg viewBox="0 0 24 24" width="20" height="20" fill="#ff7a59"><path d="M17.5 8.2V5.7a2 2 0 001.2-1.8 2 2 0 00-4 0c0 .8.5 1.5 1.2 1.8v2.5a5.5 5.5 0 00-3.3 1.7l-8-6.2a2.2 2.2 0 00.1-.6 2.1 2.1 0 10-2.1 2.1c.4 0 .8-.1 1.1-.3l7.8 6.1a5.5 5.5 0 00-.1 1.2 5.5 5.5 0 005.5 5.5 5.5 5.5 0 005.5-5.5 5.5 5.5 0 00-4.9-5.5zm-1.6 8.8a3.2 3.2 0 110-6.4 3.2 3.2 0 010 6.4z"/></svg> },
  { name: "Salesforce", color: "#00a1e0", dataType: "Deal Flow & Revenue", angle: -65,
    icon: <svg viewBox="0 0 24 24" width="20" height="20" fill="#00a1e0"><path d="M10.05 4.95a5.07 5.07 0 017.08.36 6.09 6.09 0 014.64 1.15A5.08 5.08 0 0124 10.73a5.1 5.1 0 01-2.32 4.28 5.08 5.08 0 01-3.88 5.33 5.08 5.08 0 01-5.72-.82 6.1 6.1 0 01-2.88.72 6.08 6.08 0 01-5.44-3.37A5.08 5.08 0 010 12.39a5.1 5.1 0 012.71-4.5 5.07 5.07 0 017.34-2.94z"/></svg> },
  { name: "Google Analytics", color: "#f9ab00", dataType: "Traffic & Behavior", angle: 5,
    icon: <svg viewBox="0 0 24 24" width="20" height="20" fill="#f9ab00"><path d="M20 3h-3v18h3a1 1 0 001-1V4a1 1 0 00-1-1zm-8 6h-3v12h3a1 1 0 001-1v-10a1 1 0 00-1-1zm-8 6H1v6h3a1 1 0 001-1v-4a1 1 0 00-1-1z"/></svg> },
  { name: "Meta Ads", color: "#0081fb", dataType: "Ad Spend & ROAS", angle: 45,
    icon: <svg viewBox="0 0 24 24" width="20" height="20" fill="#0081fb"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z"/></svg> },
  { name: "Shopify", color: "#96bf48", dataType: "Revenue & Conversions", angle: 85,
    icon: <svg viewBox="0 0 24 24" width="20" height="20" fill="#96bf48"><path d="M15.34 2.61a.46.46 0 00-.42-.06c-.02 0-2.1.6-2.1.6a3.73 3.73 0 00-.26-.65C12.08 1.58 11.38 1 10.53 1h-.14c-.2-.25-.44-.38-.66-.38C7.39.62 6.26 3.4 5.9 4.87l-2.18.67s-.66.2-.68.21a.94.94 0 00-.65.86L.58 19.65 11.84 22l6.11-1.52S15.37 2.85 15.34 2.61z"/></svg> },

  { name: "Google Ads", color: "#4285f4", dataType: "Campaign & Keywords", angle: 165,
    icon: <svg viewBox="0 0 24 24" width="20" height="20"><circle cx="6" cy="18" r="4" fill="#34a853"/><path d="M18.6 2L10.2 16l3.4 6L22 6z" fill="#4285f4"/><path d="M5.4 2l8.2 14-3.4 6L2 6z" fill="#fbbc05"/></svg> },
  { name: "TikTok Ads", color: "#010101", dataType: "Video Ad Performance", angle: 205,
    icon: <svg viewBox="0 0 24 24" width="18" height="18" fill="#010101"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.88 2.89 2.89 0 012.89-2.89c.28 0 .56.04.82.1v-3.5a6.37 6.37 0 00-.82-.05A6.35 6.35 0 003.14 15.2a6.35 6.35 0 0011.77 3.29V11.6a8.16 8.16 0 004.68 1.47V9.62a4.84 4.84 0 01-2-.93l2-2z"/></svg> },
  { name: "LinkedIn Ads", color: "#0a66c2", dataType: "B2B Lead Data", angle: 245,
    icon: <svg viewBox="0 0 24 24" width="18" height="18" fill="#0a66c2"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg> },
  { name: "ActiveCampaign", color: "#356ae6", dataType: "Automation Data", angle: 125,
    icon: <svg viewBox="0 0 24 24" width="18" height="18" fill="#356ae6"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg> },
];

/* ── Hexagon helpers ──────────────────────────────────────── */
const HEX_POINTS = "50,2 95,25 95,75 50,98 5,75 5,25";
const HEX_SIDE = "50,98 95,75 95,85 50,108 5,85 5,75";

/* ── Circuit path helpers ─────────────────────────────────── */
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

/* ── Main component ───────────────────────────────────────── */
export function InteractiveHero() {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState<number | null>(null);
  const [pulses, setPulses] = useState<Pulse[]>([]);
  const [conn, setConn] = useState<Set<number>>(new Set());
  const [score, setScore] = useState(0);
  const [dim, setDim] = useState({ w: 720, h: 620 });
  const pid = useRef(0);

  useEffect(() => {
    const up = () => { if (ref.current) { const w = ref.current.offsetWidth; setDim({ w, h: Math.max(w * 0.92, 540) }); } };
    up(); window.addEventListener("resize", up); return () => window.removeEventListener("resize", up);
  }, []);

  useEffect(() => { TOOLS.forEach((_, i) => { setTimeout(() => setConn(p => new Set(p).add(i)), 500 + i * 220); }); }, []);

  useEffect(() => {
    const t = setTimeout(() => {
      const iv = setInterval(() => setScore(p => { if (p >= 82) { clearInterval(iv); return 82; } return p + 1; }), 30);
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
    const f = setInterval(() => setPulses(p => p.map(x => ({ ...x, progress: x.progress + 0.016 })).filter(x => x.progress <= 1)), 16);
    return () => clearInterval(f);
  }, []);

  const bump = useCallback(() => setScore(p => Math.min(p + 1, 99)), []);
  useEffect(() => { pulses.forEach(p => { if (p.progress >= 0.96 && p.progress < 0.98) bump(); }); }, [pulses, bump]);

  const cx = dim.w * 0.55, cy = dim.h * 0.47;
  const rx = Math.min(dim.w * 0.48, 330), ry = Math.min(dim.h * 0.45, 260);
  const pos = (a: number) => ({ x: cx + Math.cos(a * Math.PI / 180) * rx, y: cy + Math.sin(a * Math.PI / 180) * ry });
  const sc = score >= 75 ? "#34d399" : score >= 50 ? "#f9ab00" : "#94a3b8";

  return (
    <div ref={ref} className="relative w-full select-none overflow-visible" style={{ height: dim.h, marginTop: "-3.5rem" }}>
      <svg width={dim.w} height={dim.h} viewBox={`0 0 ${dim.w} ${dim.h}`} className="absolute inset-0">
        <defs>
          <linearGradient id="lg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#22d3ee" stopOpacity=".4"/><stop offset="100%" stopColor="#34d399" stopOpacity=".25"/></linearGradient>
          <filter id="pg"><feGaussianBlur stdDeviation="5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
          <filter id="sg"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
          <radialGradient id="hubGlow" cx="50%" cy="40%" r="50%"><stop offset="0%" stopColor="#22d3ee" stopOpacity=".15"/><stop offset="100%" stopColor="#22d3ee" stopOpacity="0"/></radialGradient>
          <linearGradient id="platTop" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor="#e0f7fa"/><stop offset="100%" stopColor="#f0fdfa"/></linearGradient>
          <linearGradient id="platSide" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor="#b2ebf2"/><stop offset="100%" stopColor="#80deea"/></linearGradient>
        </defs>

        {/* Background circuit traces */}
        <g opacity=".05" stroke="#22d3ee" strokeWidth="1" fill="none">
          <path d={`M 0 ${dim.h*.3} L ${dim.w*.12} ${dim.h*.3} L ${dim.w*.12} ${dim.h*.6}`}/>
          <path d={`M ${dim.w} ${dim.h*.2} L ${dim.w*.88} ${dim.h*.2} L ${dim.w*.88} ${dim.h*.55}`}/>
          <path d={`M ${dim.w*.3} ${dim.h} L ${dim.w*.3} ${dim.h*.88} L ${dim.w*.55} ${dim.h*.88}`}/>
        </g>

        {/* Circuit connection lines */}
        {TOOLS.map((t, i) => {
          const p = pos(t.angle), ic = conn.has(i), ih = hovered === i, alt = i % 2 === 0;
          const d = circuitPath(p.x, p.y, cx, cy, alt);
          return (<g key={`c-${i}`}>
            <path d={d} fill="none" stroke={ih ? t.color : "url(#lg)"} strokeWidth={ih ? 2.5 : 1} opacity={ic ? (ih ? .7 : .18) : 0} strokeLinejoin="round" style={{ transition: "all .5s ease" }}/>
            {ih && ic && <path d={d} fill="none" stroke={t.color} strokeWidth={4} opacity={.12} strokeLinejoin="round" filter="url(#sg)"/>}
            {ic && <circle cx={alt ? cx : p.x} cy={alt ? p.y : cy} r={ih ? 3 : 1.5} fill={ih ? t.color : "#22d3ee"} opacity={ih ? .5 : .12} style={{ transition: "all .3s" }}/>}
          </g>);
        })}

        {/* Data pulses */}
        {pulses.map(pulse => {
          const t = TOOLS[pulse.toolIndex], p = pos(t.angle), alt = pulse.toolIndex % 2 === 0;
          const pt = circuitPoint(p.x, p.y, cx, cy, pulse.progress, alt);
          const op = pulse.progress < .08 ? pulse.progress * 12 : 1 - pulse.progress * .5;
          return (<g key={pulse.id}>
            <circle cx={pt.x} cy={pt.y} r={6} fill={t.color} opacity={op * .1}/>
            <circle cx={pt.x} cy={pt.y} r={3.5} fill={t.color} filter="url(#pg)" opacity={op * .8}/>
            <circle cx={pt.x} cy={pt.y} r={1.5} fill="white" opacity={op}/>
          </g>);
        })}

        {/* Center platform — futuristic hub */}
        <g>
          {/* Outer glow */}
          <ellipse cx={cx} cy={cy} rx={80} ry={80} fill="url(#hubGlow)"/>
          {/* Platform base (3D side) */}
          <ellipse cx={cx} cy={cy + 12} rx={62} ry={18} fill="url(#platSide)" opacity=".6"/>
          {/* Platform top surface */}
          <ellipse cx={cx} cy={cy} rx={62} ry={18} fill="url(#platTop)" stroke="#b2ebf2" strokeWidth=".5"/>
          {/* Inner ring */}
          <ellipse cx={cx} cy={cy - 2} rx={48} ry={14} fill="none" stroke="#22d3ee" strokeWidth=".5" opacity=".3" strokeDasharray="3 3"/>
          {/* Core ring */}
          <ellipse cx={cx} cy={cy - 4} rx={34} ry={10} fill="none" stroke="#34d399" strokeWidth=".5" opacity=".2" strokeDasharray="2 4"/>
        </g>
      </svg>

      {/* Center hub overlay (HTML for text) */}
      <div className="absolute flex flex-col items-center justify-center z-10" style={{ left: cx - 50, top: cy - 62, width: 100 }}>
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gp-cyan to-gp-green flex items-center justify-center font-extrabold text-white text-base shadow-lg mb-1">GP</div>
        {score > 0 ? (<>
          <span className="text-2xl font-black transition-colors duration-300" style={{ color: sc }}>{score}</span>
          <span className="text-[7px] font-bold text-gp-gray-400 uppercase tracking-widest -mt-0.5">Growth Score</span>
        </>) : (
          <span className="text-[9px] font-bold text-gp-gray-600 tracking-wide mt-1">GrowthPulse AI</span>
        )}
      </div>

      {/* Hexagonal tool nodes */}
      {TOOLS.map((tool, i) => {
        const p = pos(tool.angle), ic = conn.has(i), ih = hovered === i;
        const sz = 76;
        return (
          <div key={tool.name} className="absolute" style={{
            left: p.x - sz / 2, top: p.y - sz / 2, width: sz, height: sz + 8,
            opacity: ic ? 1 : 0, transform: `scale(${ic ? (ih ? 1.1 : 1) : .5})`,
            transition: "opacity .5s ease, transform .3s ease",
          }} onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)}>
            <svg viewBox="0 0 100 110" width={sz} height={sz + 8} className="cursor-pointer drop-shadow-md" style={{ filter: ih ? `drop-shadow(0 4px 12px ${tool.color}40)` : undefined }}>
              {/* 3D side face */}
              <polygon points={HEX_SIDE} fill={tool.color} opacity={ih ? .35 : .15} style={{ transition: "opacity .3s" }}/>
              {/* Main hex face */}
              <polygon points={HEX_POINTS} fill="white" stroke={ih ? tool.color : "#e2e8f0"} strokeWidth={ih ? 2 : 1} style={{ transition: "stroke .3s, stroke-width .3s" }}/>
              {/* Top accent line */}
              <line x1="50" y1="2" x2="95" y2="25" stroke={tool.color} strokeWidth={ih ? 2.5 : 1.5} opacity={ih ? .8 : .4} style={{ transition: "all .3s" }}/>
              <line x1="5" y1="25" x2="50" y2="2" stroke={tool.color} strokeWidth={ih ? 2.5 : 1.5} opacity={ih ? .8 : .4} style={{ transition: "all .3s" }}/>
            </svg>
            {/* Icon + label inside hex */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none" style={{ height: sz }}>
              <div className="mb-0.5">{tool.icon}</div>
              <span className="text-[7px] font-bold text-center leading-tight px-2 transition-colors" style={{ color: ih ? tool.color : "#64748b" }}>{tool.name}</span>
            </div>
            {/* Green check */}
            <div className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-white shadow-sm" style={{
              backgroundColor: ic ? "#34d399" : "#cbd5e1", transform: ic ? "scale(1)" : "scale(0)", transition: "all .5s"
            }}>{ic && <svg viewBox="0 0 12 12" width="9" height="9" className="absolute inset-0 m-auto"><path d="M3 6l2 2 4-4" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round"/></svg>}</div>
            {/* Tooltip */}
            {ih && <div className="absolute left-1/2 -translate-x-1/2 -bottom-10 z-20 whitespace-nowrap animate-fade-in">
              <div className="px-3 py-1.5 rounded-lg text-[10px] font-semibold text-white shadow-lg" style={{ backgroundColor: tool.color }}>{tool.dataType}</div>
              <div className="w-2 h-2 rotate-45 absolute -top-1 left-1/2 -translate-x-1/2" style={{ backgroundColor: tool.color }}/>
            </div>}
          </div>
        );
      })}
    </div>
  );
}

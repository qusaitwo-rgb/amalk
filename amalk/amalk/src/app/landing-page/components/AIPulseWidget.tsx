'use client';
import React, { useEffect, useState, useRef } from 'react';

interface StatConfig {
  id: string;
  label: string;
  target: number;
  suffix: string;
  prefix: string;
  color: string;
  description: string;
  icon: React.ReactNode;
}

const STATS: StatConfig[] = [
  {
    id: 'jobs',
    label: 'Jobs Available',
    target: 14872,
    suffix: '',
    prefix: '',
    color: '#D4AF37',
    description: 'Active positions across MENA',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    id: 'hires',
    label: 'Hires Today',
    target: 347,
    suffix: '',
    prefix: '',
    color: '#22C55E',
    description: 'Successful placements in 24h',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    id: 'match',
    label: 'Matching Success Rate',
    target: 94,
    suffix: '%',
    prefix: '',
    color: '#818CF8',
    description: 'AI accuracy across all matches',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
  },
  {
    id: 'talents',
    label: 'Active Talents',
    target: 89430,
    suffix: '+',
    prefix: '',
    color: '#F59E0B',
    description: 'Verified profiles on platform',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
];

function AnimatedCounter({ target, suffix, prefix, color, duration = 1800 }: {
  target: number;
  suffix: string;
  prefix: string;
  color: string;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started.current) {
          started.current = true;
          const start = Date.now();
          const tick = () => {
            const elapsed = Date.now() - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return (
    <div ref={ref} className="font-display font-800 text-4xl md:text-5xl font-mono-data" style={{ color }}>
      {prefix}{count.toLocaleString()}{suffix}
    </div>
  );
}

export default function AIPulseWidget() {
  const [pulse, setPulse] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulse((p) => p + 1);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative py-20 px-6 lg:px-10">
      <div className="max-w-screen-2xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse" />
            <span className="text-xs font-semibold text-[#22C55E] tracking-widest uppercase">Live AI Pulse</span>
            <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse" />
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-700 text-white mb-3">
            The Platform in Real-Time
          </h2>
          <p className="text-white/50 text-base max-w-xl mx-auto">
            Every number updates in real-time as AI matches talents with opportunities across the region.
          </p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
          {STATS.map((stat, i) => (
            <div
              key={stat.id}
              className="glass rounded-3xl p-6 card-hover relative overflow-hidden group"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              {/* Background glow */}
              <div
                className="absolute -top-8 -right-8 w-32 h-32 rounded-full blur-2xl opacity-10 group-hover:opacity-20 transition-opacity duration-500"
                style={{ backgroundColor: stat.color }}
              />

              {/* Icon */}
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4"
                style={{ backgroundColor: `${stat.color}18`, color: stat.color }}
              >
                {stat.icon}
              </div>

              {/* Counter */}
              <AnimatedCounter
                target={stat.target}
                suffix={stat.suffix}
                prefix={stat.prefix}
                color={stat.color}
              />

              {/* Label */}
              <div className="mt-2">
                <p className="text-white font-semibold text-sm">{stat.label}</p>
                <p className="text-white/40 text-xs mt-0.5">{stat.description}</p>
              </div>

              {/* Pulse bar */}
              <div className="mt-4 h-1 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-[3000ms] ease-in-out"
                  style={{
                    backgroundColor: stat.color,
                    width: `${60 + ((pulse * 13 + i * 17) % 40)}%`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Live feed ticker */}
        <div className="mt-8 glass rounded-2xl px-6 py-3 flex items-center gap-4 overflow-hidden">
          <div className="flex items-center gap-2 flex-shrink-0">
            <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse" />
            <span className="text-xs font-semibold text-[#22C55E] uppercase tracking-wider">Live</span>
          </div>
          <div className="overflow-hidden flex-1">
            <div className="flex gap-8 text-xs text-white/50 animate-marquee whitespace-nowrap">
              {[
                '🎯 Layla Al-Rashidi matched with Senior UX Designer at Noon — 92%',
                '✅ Omar Khalil hired as Data Analyst at Saudi Aramco Digital',
                '🚀 New: 47 fintech roles added in Dubai',
                '⭐ Fatima Zahra shortlisted at Careem — 88% match',
                '📈 Riyadh tech sector: 23% salary increase predicted by AI',
                '🏆 Ahmed Benali promoted via Amalk referral at Starzplay',
              ].map((item, i) => (
                <span key={`ticker-${i}`}>{item}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </section>
  );
}
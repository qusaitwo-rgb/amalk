'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

// Icons for Talent features
const TALENT_ICONS = [
  // Smart Profile Builder
  <svg key="t0" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>,
  // Intelligent Job Matching
  <svg key="t1" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
  </svg>,
  // Application Tracker
  <svg key="t2" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
  </svg>,
  // Career Guidance
  <svg key="t3" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
  </svg>,
  // Interview Preparation
  <svg key="t4" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
  </svg>,
];

// Icons for Company features
const COMPANY_ICONS = [
  // Smart Job Posting
  <svg key="c0" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
  </svg>,
  // Candidate Ranking
  <svg key="c1" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
  </svg>,
  // Interview Scheduler
  <svg key="c2" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>,
  // Analytics Dashboard
  <svg key="c3" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>,
  // Bulk Screening
  <svg key="c4" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
  </svg>,
];

const TALENT_COLORS = ['#D4AF37', '#818CF8', '#22C55E', '#F59E0B', '#EC4899'];
const COMPANY_COLORS = ['#D4AF37', '#818CF8', '#22C55E', '#F59E0B', '#F05A00'];

export default function FeaturesSection() {
  const [activeTab, setActiveTab] = useState<'talent' | 'company'>('talent');
  const { t, isRTL } = useLanguage();

  const ft = t.featuresTabbed;
  const items = activeTab === 'talent' ? ft.talentItems : ft.companyItems;
  const icons = activeTab === 'talent' ? TALENT_ICONS : COMPANY_ICONS;
  const colors = activeTab === 'talent' ? TALENT_COLORS : COMPANY_COLORS;

  return (
    <section id="features" className="py-24 px-6 lg:px-10 relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #0a1628 0%, #0D1B3E 50%, #0a1628 100%)' }}>
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-10" style={{ background: 'radial-gradient(circle, #D4AF37 0%, transparent 70%)' }} />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full opacity-8" style={{ background: 'radial-gradient(circle, #818CF8 0%, transparent 70%)' }} />
      </div>

      <div className="max-w-screen-2xl mx-auto relative z-10" dir={isRTL ? 'rtl' : 'ltr'}>
        {/* Section header */}
        <div className="text-center mb-12">
          <span className="text-xs font-semibold tracking-widest uppercase mb-3 block" style={{ color: '#D4AF37' }}>
            {ft.sectionLabel}
          </span>
          <h2 className={`text-4xl md:text-5xl font-bold text-white mb-4 ${isRTL ? 'font-arabic' : 'font-display'}`}>
            {ft.sectionTitle}
          </h2>
          <p className={`text-white/50 text-lg max-w-2xl mx-auto ${isRTL ? 'font-arabic' : ''}`}>
            {ft.sectionSubtitle}
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center justify-center mb-12">
          <div
            className="relative flex rounded-2xl p-1.5"
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(212,175,55,0.25)',
              backdropFilter: 'blur(12px)',
            }}
          >
            {/* Sliding indicator */}
            <div
              className="absolute top-1.5 bottom-1.5 rounded-xl transition-all duration-300 ease-in-out"
              style={{
                background: 'linear-gradient(135deg, #D4AF37 0%, #B8960C 100%)',
                boxShadow: '0 4px 20px rgba(212,175,55,0.4)',
                width: 'calc(50% - 6px)',
                left: activeTab === 'talent' ? '6px' : 'calc(50%)',
              }}
            />
            <button
              onClick={() => setActiveTab('talent')}
              className={`relative z-10 px-8 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${isRTL ? 'font-arabic' : ''} ${
                activeTab === 'talent' ? 'text-[#0D1B3E]' : 'text-white/60 hover:text-white'
              }`}
            >
              {ft.tabTalent}
            </button>
            <button
              onClick={() => setActiveTab('company')}
              className={`relative z-10 px-8 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${isRTL ? 'font-arabic' : ''} ${
                activeTab === 'company' ? 'text-[#0D1B3E]' : 'text-white/60 hover:text-white'
              }`}
            >
              {ft.tabCompany}
            </button>
          </div>
        </div>

        {/* Feature cards grid */}
        <div
          key={activeTab}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
          style={{ animation: 'fadeInUp 0.4s ease-out' }}
        >
          {items.map((feature, i) => (
            <div
              key={`${activeTab}-feature-${i}`}
              className="group relative rounded-2xl p-7 overflow-hidden transition-all duration-300 hover:-translate-y-1"
              style={{
                background: 'rgba(255,255,255,0.04)',
                backdropFilter: 'blur(16px)',
                border: `1px solid rgba(212,175,55,0.2)`,
                boxShadow: '0 4px 24px rgba(0,0,0,0.2)',
                animationDelay: `${i * 0.08}s`,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.border = `1px solid rgba(212,175,55,0.55)`;
                (e.currentTarget as HTMLDivElement).style.boxShadow = `0 8px 40px rgba(212,175,55,0.15)`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.border = `1px solid rgba(212,175,55,0.2)`;
                (e.currentTarget as HTMLDivElement).style.boxShadow = `0 4px 24px rgba(0,0,0,0.2)`;
              }}
            >
              {/* Subtle top gradient */}
              <div
                className="absolute top-0 left-0 right-0 h-px"
                style={{ background: `linear-gradient(90deg, transparent, ${colors[i]}, transparent)` }}
              />

              {/* Icon + Badge row */}
              <div className={`flex items-center justify-between mb-5 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                  style={{ backgroundColor: `${colors[i]}18`, color: colors[i] }}
                >
                  {icons[i]}
                </div>
                <span
                  className={`text-xs font-bold px-3 py-1 rounded-full ${isRTL ? 'font-arabic' : ''}`}
                  style={{ backgroundColor: `${colors[i]}18`, color: colors[i], border: `1px solid ${colors[i]}30` }}
                >
                  {feature.badge}
                </span>
              </div>

              <h3 className={`text-lg font-bold text-white mb-2 ${isRTL ? 'font-arabic text-right' : 'font-display'}`}>
                {feature.title}
              </h3>
              <p className={`text-white/45 text-sm leading-relaxed mb-5 ${isRTL ? 'font-arabic text-right' : ''}`}>
                {feature.description}
              </p>

              {/* Metrics */}
              <div className={`flex flex-wrap gap-2 ${isRTL ? 'justify-end' : ''}`}>
                {feature.metrics.map((metric, mi) => (
                  <span
                    key={`metric-${i}-${mi}`}
                    className={`text-xs px-3 py-1 rounded-full ${isRTL ? 'font-arabic' : ''}`}
                    style={{
                      background: 'rgba(255,255,255,0.06)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      color: 'rgba(255,255,255,0.55)',
                    }}
                  >
                    {metric}
                  </span>
                ))}
              </div>

              {/* Bottom accent glow on hover */}
              <div
                className="absolute bottom-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: `linear-gradient(90deg, transparent, ${colors[i]}, transparent)` }}
              />
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-14">
          <Link
            href="/sign-up-login-screen"
            className={`inline-flex items-center gap-3 px-8 py-4 rounded-xl font-bold text-base transition-all duration-200 hover:opacity-90 active:scale-95 ${isRTL ? 'font-arabic flex-row-reverse' : 'font-display'}`}
            style={{
              background: 'linear-gradient(135deg, #D4AF37 0%, #B8960C 100%)',
              color: '#0D1B3E',
              boxShadow: '0 4px 24px rgba(212,175,55,0.35)',
            }}
          >
            {ft.cta}
            <svg className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
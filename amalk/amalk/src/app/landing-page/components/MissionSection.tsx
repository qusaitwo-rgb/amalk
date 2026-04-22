'use client';
import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function MissionSection() {
  const { t, isRTL } = useLanguage();

  return (
    <section id="mission" className="py-24 px-6 lg:px-10 relative overflow-hidden bg-[#0D1B3E]" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(17,34,85,0.6)_0%,transparent_70%)]" />
      <div className="max-w-screen-2xl mx-auto relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Icon */}
          <div className="w-20 h-20 rounded-2xl mx-auto flex items-center justify-center mb-8 bg-[#F05A00]/10 border border-[#F05A00]/30">
            <svg className="w-10 h-10 text-[#F05A00]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
            </svg>
          </div>

          <span className={`text-xs font-semibold text-[#F05A00] tracking-widest uppercase mb-3 block ${isRTL ? 'font-arabic' : ''}`}>
            {t?.mission?.sectionLabel}
          </span>

          <h2 className={`text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight ${isRTL ? 'font-arabic' : 'font-display'}`}>
            {t?.mission?.title1}
            <span className="orange-text">{t?.mission?.titleHighlight}</span>
          </h2>

          <p className={`text-white/60 text-lg leading-relaxed mb-8 max-w-3xl mx-auto ${isRTL ? 'font-arabic' : ''}`}>
            {t?.mission?.subtitle}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-12">
            {t?.mission?.stats?.map((item, i) => {
              const colors = ['#EF4444', '#22C55E', '#F05A00'];
              return (
                <div key={`stat-${i}`} className="bg-white/05 border border-white/10 rounded-xl p-5 text-center">
                  <div className="font-display font-extrabold text-4xl font-mono-data mb-2" style={{ color: colors?.[i] }}>
                    {item?.stat}
                  </div>
                  <p className={`text-white/50 text-sm ${isRTL ? 'font-arabic' : ''}`}>{item?.label}</p>
                </div>
              );
            })}
          </div>

          <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
            <Link
              href="/sign-up-login-screen"
              className={`inline-flex items-center gap-3 px-8 py-4 rounded-lg orange-gradient text-white font-bold text-base hover:opacity-90 active:scale-95 transition-all duration-150 glow-orange ${isRTL ? 'font-arabic flex-row-reverse' : 'font-display'}`}
            >
              {t?.mission?.cta}
              <svg className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <a
              href="#stories"
              className={`inline-flex items-center gap-2 px-6 py-4 rounded-lg glass text-white/70 hover:text-white font-medium text-sm transition-colors duration-200 ${isRTL ? 'font-arabic' : ''}`}
            >
              {t?.mission?.ctaSecondary}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
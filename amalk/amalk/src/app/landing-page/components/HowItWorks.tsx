'use client';
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';

const STEP_ICONS = [
  <svg key="icon-0" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>,
  <svg key="icon-1" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>,
  <svg key="icon-2" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
  </svg>,
  <svg key="icon-3" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>,
];

const STEP_COLORS = ['#F05A00', '#0D1B3E', '#22C55E', '#F59E0B'];

export default function HowItWorks() {
  const { t, isRTL } = useLanguage();

  return (
    <section id="how-it-works" className="py-24 px-6 lg:px-10 relative overflow-hidden bg-white" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-screen-2xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <span className={`text-xs font-semibold text-[#F05A00] tracking-widest uppercase mb-3 block ${isRTL ? 'font-arabic' : ''}`}>
            {t?.howItWorks?.sectionLabel}
          </span>
          <h2 className={`text-4xl md:text-5xl font-bold text-[#0D1B3E] mb-4 ${isRTL ? 'font-arabic' : 'font-display'}`}>
            {t?.howItWorks?.sectionTitle}
          </h2>
          <p className={`text-[#0D1B3E]/55 text-lg max-w-xl mx-auto ${isRTL ? 'font-arabic' : ''}`}>
            {t?.howItWorks?.sectionSubtitle}
          </p>
        </div>

        <div className="relative">
          <div className="absolute top-16 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#F05A00]/30 to-transparent hidden lg:block" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {t?.howItWorks?.steps?.map((step, i) => (
              <div key={`step-${i}`} className="relative flex flex-col items-center text-center group">
                <div
                  className="relative w-16 h-16 rounded-xl bg-white border-2 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 z-10 shadow-md"
                  style={{ borderColor: `${STEP_COLORS?.[i]}50`, color: STEP_COLORS?.[i] }}
                >
                  {STEP_ICONS?.[i]}
                  <span
                    className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white"
                    style={{ backgroundColor: STEP_COLORS?.[i] }}
                  >
                    {i + 1}
                  </span>
                </div>

                <h3 className={`text-lg font-bold text-[#0D1B3E] mb-2 ${isRTL ? 'font-arabic' : 'font-display'}`}>{step?.title}</h3>
                <p className={`text-[#0D1B3E]/55 text-sm leading-relaxed ${isRTL ? 'font-arabic' : ''}`}>{step?.description}</p>

                {i < t?.howItWorks?.steps?.length - 1 && (
                  <div className={`hidden lg:block absolute top-8 z-20 text-[#F05A00]/40 ${isRTL ? '-left-3' : '-right-3'}`}>
                    <svg className={`w-6 h-6 ${isRTL ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
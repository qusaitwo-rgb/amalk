'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function LandingHero() {
  const [wordIndex, setWordIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const [loaded, setLoaded] = useState(false);
  const { t, isRTL } = useLanguage();

  const heroWords = t?.hero?.words;

  useEffect(() => {
    setLoaded(true);
  }, []);

  useEffect(() => {
    setWordIndex(0);
  }, [heroWords]);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setWordIndex((i) => (i + 1) % heroWords?.length);
        setVisible(true);
      }, 300);
    }, 2500);
    return () => clearInterval(interval);
  }, [heroWords]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Background layers */}
      <div className="absolute inset-0 bg-[#0D1B3E]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(17,34,85,0.9)_0%,transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_80%,rgba(240,90,0,0.05)_0%,transparent_50%)]" />
      {/* Animated grid */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            'linear-gradient(rgba(240,90,0,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(240,90,0,0.12) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />
      {/* Floating orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-[#112255]/40 blur-3xl animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-[#F05A00]/06 blur-3xl animate-float" style={{ animationDelay: '3s' }} />
      {/* SVG Map of Palestine — decorative */}
      <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none select-none">
        <svg viewBox="0 0 800 500" className="w-full max-w-4xl" fill="none">
          <path
            d="M380 120 Q400 100 420 115 Q440 105 450 130 Q465 120 470 145 Q480 160 470 185 Q475 210 460 235 Q455 260 440 275 Q430 300 415 310 Q400 330 385 315 Q370 300 365 275 Q350 255 355 230 Q345 205 355 180 Q350 155 365 140 Q372 128 380 120Z"
            stroke="rgba(240,90,0,0.6)"
            strokeWidth="1.5"
            fill="rgba(17,34,85,0.2)"
            strokeDasharray="8 4"
          />
          {[
            { cx: 400, cy: 165, label: 'Ramallah' },
            { cx: 395, cy: 270, label: 'Gaza' },
            { cx: 415, cy: 150, label: 'Nablus' },
            { cx: 405, cy: 290, label: 'Hebron' },
            { cx: 408, cy: 200, label: 'Jerusalem' },
            { cx: 400, cy: 240, label: 'Bethlehem' },
          ]?.map((city) => (
            <g key={`city-${city?.label}`}>
              <circle cx={city?.cx} cy={city?.cy} r="4" fill="#F05A00" opacity="0.7" />
              <circle cx={city?.cx} cy={city?.cy} r="8" fill="none" stroke="#F05A00" strokeWidth="1" opacity="0.4" />
            </g>
          ))}
          <line x1="400" y1="165" x2="415" y2="150" stroke="rgba(240,90,0,0.3)" strokeWidth="1" strokeDasharray="4 4" />
          <line x1="400" y1="165" x2="408" y2="200" stroke="rgba(240,90,0,0.3)" strokeWidth="1" strokeDasharray="4 4" />
          <line x1="408" y1="200" x2="400" y2="240" stroke="rgba(240,90,0,0.3)" strokeWidth="1" strokeDasharray="4 4" />
          <line x1="400" y1="240" x2="405" y2="290" stroke="rgba(240,90,0,0.3)" strokeWidth="1" strokeDasharray="4 4" />
          <line x1="400" y1="240" x2="395" y2="270" stroke="rgba(240,90,0,0.3)" strokeWidth="1" strokeDasharray="4 4" />
        </svg>
      </div>
      {/* Main content */}
      <div className="relative z-10 max-w-screen-2xl mx-auto px-6 lg:px-10 pt-24 pb-16 text-center">
        {/* Badge */}
        <div
          className={`inline-flex items-center gap-2 rounded-full px-4 py-2 mb-8 border border-[#F05A00]/30 bg-[#F05A00]/08 transition-all duration-700 ${
            loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          } ${isRTL ? 'flex-row-reverse' : ''}`}
        >
          <span className="w-2 h-2 rounded-full bg-[#F05A00] animate-pulse" />
          <span className={`text-xs font-semibold text-[#F05A00] tracking-wider uppercase ${isRTL ? 'font-arabic' : ''}`}>
            {t?.hero?.badge}
          </span>
        </div>

        {/* Main headline */}
        <h1
          className={`text-5xl md:text-7xl lg:text-8xl font-extrabold leading-[1.05] mb-6 transition-all duration-700 delay-100 ${
            loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          } ${isRTL ? 'font-arabic' : 'font-display'}`}
        >
          <span className="text-white">{t?.hero?.headline1}</span>
          <span
            className={`orange-text inline-block transition-all duration-300 ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
            }`}
          >
            {heroWords?.[wordIndex]}
          </span>
          <br />
          <span className="text-white">{t?.hero?.headline2}</span>
        </h1>

        <p
          className={`text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-12 leading-relaxed transition-all duration-700 delay-200 ${
            loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          } ${isRTL ? 'font-arabic' : ''}`}
        >
          {t?.hero?.subtitle}
        </p>

        {/* CTA Buttons */}
        <div
          className={`flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 transition-all duration-700 delay-300 ${
            loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          } ${isRTL ? 'sm:flex-row-reverse' : ''}`}
        >
          <Link
            href="/sign-up-login-screen"
            className={`group flex items-center gap-3 px-8 py-4 rounded-lg orange-gradient text-white font-bold text-base hover:opacity-90 active:scale-95 transition-all duration-150 glow-orange w-full sm:w-auto justify-center ${isRTL ? 'font-arabic flex-row-reverse' : 'font-display'}`}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            {t?.hero?.ctaTalent}
          </Link>

          <Link
            href="/sign-up-login-screen"
            className={`group flex items-center gap-3 px-8 py-4 rounded-lg glass border border-white/20 text-white font-semibold text-base hover:bg-white/10 active:scale-95 transition-all duration-150 w-full sm:w-auto justify-center ${isRTL ? 'font-arabic flex-row-reverse' : 'font-display'}`}
          >
            <svg className="w-5 h-5 text-[#F05A00]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-2 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            {t?.hero?.ctaCompany}
          </Link>

          <a
            href="#mission"
            className={`group flex items-center gap-2 px-6 py-4 rounded-lg text-white/60 hover:text-white font-medium text-sm transition-colors duration-200 w-full sm:w-auto justify-center ${isRTL ? 'font-arabic flex-row-reverse' : ''}`}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {t?.hero?.ctaMission}
          </a>
        </div>

        {/* Scroll indicator */}
        <div className="flex flex-col items-center gap-2 text-white/30 animate-bounce">
          <span className={`text-xs tracking-widest uppercase ${isRTL ? 'font-arabic' : ''}`}>{t?.hero?.scrollLabel}</span>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </section>
  );
}
'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import AppLogo from '@/components/ui/AppLogo';
import { useLanguage } from '@/context/LanguageContext';

export default function LandingNav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { lang, setLang, t, isRTL } = useLanguage();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: t?.nav?.howItWorks, href: '#how-it-works' },
    { label: t?.nav?.features, href: '#features' },
    { label: t?.nav?.successStories, href: '#stories' },
    { label: t?.nav?.ourMission, href: '#mission' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0D1B3E]/95 backdrop-blur-xl border-b border-white/10 py-3'
          : 'bg-[#0D1B3E] py-5'
      }`}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-10 flex items-center justify-between">
        {/* Logo */}
        <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <AppLogo size={36} />
          <span className={`text-xl font-bold text-white tracking-tight ${isRTL ? 'font-arabic' : 'font-display'}`}>
            {isRTL ? 'عملك' : 'Amalak'}
          </span>
          <span className="hidden sm:block text-xs font-mono-data text-[#F05A00] border border-[#F05A00]/30 rounded-full px-2 py-0.5">
            AI-Powered
          </span>
        </div>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks?.map((item) => (
            <a
              key={`nav-${item?.label}`}
              href={item?.href}
              className={`text-sm text-white/70 hover:text-white transition-colors duration-200 font-medium ${isRTL ? 'font-arabic' : ''}`}
            >
              {item?.label}
            </a>
          ))}
        </div>

        {/* Desktop CTA + Language Switcher */}
        <div className={`hidden md:flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
          {/* Language Switcher — Matte Gold style */}
          <div
            className="flex items-center rounded-xl overflow-hidden"
            style={{ border: '1px solid rgba(212,175,55,0.35)', background: 'rgba(212,175,55,0.06)' }}
          >
            <button
              onClick={() => setLang('en')}
              className={`px-3 py-1.5 text-xs font-bold transition-all duration-200 ${
                lang === 'en' ?'text-[#0D1B3E]' :'text-white/50 hover:text-white'
              }`}
              style={lang === 'en' ? { background: 'linear-gradient(135deg, #D4AF37 0%, #B8960C 100%)' } : {}}
            >
              EN
            </button>
            <button
              onClick={() => setLang('ar')}
              className={`px-3 py-1.5 text-xs font-bold font-arabic transition-all duration-200 ${
                lang === 'ar' ?'text-[#0D1B3E]' :'text-white/50 hover:text-white'
              }`}
              style={lang === 'ar' ? { background: 'linear-gradient(135deg, #D4AF37 0%, #B8960C 100%)' } : {}}
            >
              ع
            </button>
          </div>

          <Link
            href="/sign-up-login-screen"
            className={`text-sm text-white/80 hover:text-white px-4 py-2 rounded-lg transition-colors duration-200 font-medium ${isRTL ? 'font-arabic' : ''}`}
          >
            {t?.nav?.signIn}
          </Link>
          <Link
            href="/sign-up-login-screen"
            className={`text-sm font-semibold px-5 py-2 rounded-lg orange-gradient text-white hover:opacity-90 active:scale-95 transition-all duration-150 glow-orange ${isRTL ? 'font-arabic' : ''}`}
          >
            {t?.nav?.getStarted}
          </Link>
          <Link
            href="/admin-dashboard"
            className="text-xs font-semibold px-3 py-2 rounded-lg bg-red-500/15 border border-red-500/25 text-red-400 hover:bg-red-500/25 transition-all duration-150"
          >
            Admin
          </Link>
          <Link
            href="/company-dashboard"
            className="text-xs font-semibold px-3 py-2 rounded-lg bg-[#818CF8]/15 border border-[#818CF8]/25 text-[#818CF8] hover:bg-[#818CF8]/25 transition-all duration-150"
          >
            {lang === 'ar' ? 'الشركة' : 'Company'}
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 rounded-lg glass text-white"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>
      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#0D1B3E] border-t border-white/10 px-6 py-4 flex flex-col gap-4" dir={isRTL ? 'rtl' : 'ltr'}>
          {navLinks?.map((item) => (
            <a
              key={`mobile-nav-${item?.label}`}
              href={item?.href}
              className={`text-sm text-white/70 hover:text-white transition-colors font-medium ${isRTL ? 'font-arabic text-right' : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              {item?.label}
            </a>
          ))}
          {/* Mobile language switcher */}
          <div className="flex items-center gap-2 pt-1">
            <span className={`text-xs text-white/40 ${isRTL ? 'font-arabic' : ''}`}>{isRTL ? 'اللغة:' : 'Language:'}</span>
            <div
              className="flex items-center rounded-xl overflow-hidden"
              style={{ border: '1px solid rgba(212,175,55,0.35)', background: 'rgba(212,175,55,0.06)' }}
            >
              <button
                onClick={() => setLang('en')}
                className={`px-3 py-1.5 text-xs font-bold transition-all duration-200 ${lang === 'en' ? 'text-[#0D1B3E]' : 'text-white/60'}`}
                style={lang === 'en' ? { background: 'linear-gradient(135deg, #D4AF37 0%, #B8960C 100%)' } : {}}
              >
                EN
              </button>
              <button
                onClick={() => setLang('ar')}
                className={`px-3 py-1.5 text-xs font-bold font-arabic transition-all duration-200 ${lang === 'ar' ? 'text-[#0D1B3E]' : 'text-white/60'}`}
                style={lang === 'ar' ? { background: 'linear-gradient(135deg, #D4AF37 0%, #B8960C 100%)' } : {}}
              >
                ع
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-2 pt-2 border-t border-white/10">
            <Link
              href="/sign-up-login-screen"
              className={`text-sm text-center text-white/80 hover:text-white px-4 py-2 rounded-lg glass transition-colors font-medium ${isRTL ? 'font-arabic' : ''}`}
            >
              {t?.nav?.signIn}
            </Link>
            <Link
              href="/sign-up-login-screen"
              className={`text-sm text-center font-semibold px-5 py-2 rounded-lg orange-gradient text-white ${isRTL ? 'font-arabic' : ''}`}
            >
              {t?.nav?.getStarted}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
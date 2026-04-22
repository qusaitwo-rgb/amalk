'use client';
import React from 'react';
import Link from 'next/link';
import AppLogo from '@/components/ui/AppLogo';
import { useLanguage } from '@/context/LanguageContext';

export default function LandingFooter() {
  const { t, isRTL } = useLanguage();

  return (
    <footer className="bg-[#080F24] border-t border-white/08 py-16 px-6 lg:px-10" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-screen-2xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className={`flex items-center gap-3 mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <AppLogo size={36} />
              <span className={`text-xl font-bold text-white ${isRTL ? 'font-arabic' : 'font-display'}`}>{isRTL ? 'عملك' : 'Amalak'}</span>
            </div>
            <p className={`text-white/40 text-sm leading-relaxed mb-4 ${isRTL ? 'font-arabic text-right' : ''}`}>
              {t?.footer?.tagline}
            </p>
            <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse" />
              <span className={`text-xs text-[#22C55E] font-medium ${isRTL ? 'font-arabic' : ''}`}>{t?.footer?.online}</span>
            </div>
          </div>

          {/* Platform */}
          <div>
            <h4 className={`font-semibold text-white text-sm mb-4 uppercase tracking-wider ${isRTL ? 'font-arabic text-right' : 'font-display'}`}>
              {t?.footer?.platformTitle}
            </h4>
            <ul className={`space-y-2.5 ${isRTL ? 'text-right' : ''}`}>
              {t?.footer?.platformLinks?.map((item, i) => (
                <li key={`footer-platform-${i}`}>
                  <Link href="/sign-up-login-screen" className={`text-white/40 hover:text-[#F05A00] text-sm transition-colors ${isRTL ? 'font-arabic' : ''}`}>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className={`font-semibold text-white text-sm mb-4 uppercase tracking-wider ${isRTL ? 'font-arabic text-right' : 'font-display'}`}>
              {t?.footer?.companyTitle}
            </h4>
            <ul className={`space-y-2.5 ${isRTL ? 'text-right' : ''}`}>
              {t?.footer?.companyLinks?.map((item, i) => (
                <li key={`footer-company-${i}`}>
                  <a href="#mission" className={`text-white/40 hover:text-[#F05A00] text-sm transition-colors ${isRTL ? 'font-arabic' : ''}`}>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className={`font-semibold text-white text-sm mb-4 uppercase tracking-wider ${isRTL ? 'font-arabic text-right' : 'font-display'}`}>
              {t?.footer?.legalTitle}
            </h4>
            <ul className={`space-y-2.5 ${isRTL ? 'text-right' : ''}`}>
              {t?.footer?.legalLinks?.map((item, i) => (
                <li key={`footer-legal-${i}`}>
                  <a href="#" className={`text-white/40 hover:text-[#F05A00] text-sm transition-colors ${isRTL ? 'font-arabic' : ''}`}>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className={`border-t border-white/08 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 ${isRTL ? 'md:flex-row-reverse' : ''}`}>
          <p className={`text-white/30 text-sm ${isRTL ? 'font-arabic' : ''}`}>
            {t?.footer?.copyright}
          </p>
          <div className="flex items-center gap-6">
            <span className={`text-white/30 text-xs ${isRTL ? 'font-arabic' : ''}`}>{t?.footer?.cities}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
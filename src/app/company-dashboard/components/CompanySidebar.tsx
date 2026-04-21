'use client';
import React from 'react';
import AppLogo from '@/components/ui/AppLogo';
import type { CompanyTab } from './CompanyDashboardLayout';
import { useLanguage } from '@/context/LanguageContext';

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (v: boolean) => void;
  activeTab: CompanyTab;
  setActiveTab: (tab: CompanyTab) => void;
}

const NAV_ITEMS: { id: CompanyTab; labelEn: string; labelAr: string; badge?: string; badgeColor?: string; icon: React.ReactNode }[] = [
  {
    id: 'overview',
    labelEn: 'Dashboard',
    labelAr: 'لوحة التحكم',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    id: 'jobs',
    labelEn: 'Job Postings',
    labelAr: 'إعلانات الوظائف',
    badge: '5',
    badgeColor: '#F05A00',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    id: 'candidates',
    labelEn: 'Candidates',
    labelAr: 'المرشحون',
    badge: '34',
    badgeColor: '#818CF8',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    id: 'ai-shortlist',
    labelEn: 'AI Shortlisting',
    labelAr: 'القائمة المختصرة بالذكاء الاصطناعي',
    badge: 'New',
    badgeColor: '#22C55E',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
  },
  {
    id: 'analytics',
    labelEn: 'Hiring Analytics',
    labelAr: 'تحليلات التوظيف',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
];

export default function CompanySidebar({ collapsed, setCollapsed, activeTab, setActiveTab }: SidebarProps) {
  const { lang, setLang, isRTL, userSession } = useLanguage();

  const displayName = userSession?.fullName || (lang === 'ar' ? 'شركة نون' : 'Noon Careers');
  const displayCity = userSession?.city || 'Ramallah';
  const displayInitials = userSession?.initials || 'NC';

  return (
    <aside
      className={`flex-shrink-0 flex flex-col bg-[#0D1B3E] border-r border-white/08 transition-all duration-300 ease-in-out ${collapsed ? 'w-16' : 'w-64'} min-h-screen`}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* Logo */}
      <div className={`flex items-center gap-3 px-4 py-5 border-b border-white/08 ${collapsed ? 'justify-center' : ''}`}>
        <AppLogo size={32} />
        {!collapsed && (
          <span className={`text-lg font-bold text-white ${isRTL ? 'font-arabic' : 'font-display'}`}>{isRTL ? 'عملك' : 'Amalak'}</span>
        )}
      </div>

      {/* Company badge */}
      {!collapsed && (
        <div className="px-4 py-3 border-b border-white/08">
          <div className={`flex items-center gap-2 px-3 py-2 rounded-xl bg-[#818CF8]/10 border border-[#818CF8]/20 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <span className="w-2 h-2 rounded-full bg-[#818CF8] animate-pulse" />
            <span className={`text-xs font-semibold text-[#818CF8] ${isRTL ? 'font-arabic' : ''}`}>
              {lang === 'ar' ? 'حساب الشركة' : 'Company Account'}
            </span>
          </div>
        </div>
      )}

      {/* Nav items */}
      <nav className="flex-1 px-2 py-4 space-y-1">
        {NAV_ITEMS.map((item) => (
          <button
            key={`company-sidebar-${item.id}`}
            onClick={() => setActiveTab(item.id)}
            title={collapsed ? (lang === 'ar' ? item.labelAr : item.labelEn) : undefined}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group relative ${
              activeTab === item.id
                ? 'bg-[#F05A00]/15 border border-[#F05A00]/25 text-[#F05A00]'
                : 'text-white/50 hover:text-white hover:bg-white/06'
            } ${collapsed ? 'justify-center' : isRTL ? 'flex-row-reverse' : ''}`}
          >
            <span className="flex-shrink-0">{item.icon}</span>
            {!collapsed && (
              <>
                <span className={`text-sm font-medium flex-1 ${isRTL ? 'text-right font-arabic' : 'text-left'}`}>
                  {lang === 'ar' ? item.labelAr : item.labelEn}
                </span>
                {item.badge && (
                  <span
                    className="text-xs font-bold px-1.5 py-0.5 rounded-full"
                    style={{ backgroundColor: `${item.badgeColor}20`, color: item.badgeColor }}
                  >
                    {item.badge}
                  </span>
                )}
              </>
            )}
            {collapsed && item.badge && (
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full" style={{ backgroundColor: item.badgeColor }} />
            )}
          </button>
        ))}
      </nav>

      {/* Bottom section */}
      <div className="px-2 pb-4 space-y-1 border-t border-white/08 pt-3">
        {!collapsed && (
          <div className="px-3 py-2 mb-1">
            <div className="flex items-center rounded-lg overflow-hidden border border-white/15">
              <button
                onClick={() => setLang('en')}
                className={`flex-1 py-1.5 text-xs font-semibold transition-all duration-200 ${lang === 'en' ? 'bg-[#F05A00] text-white' : 'text-white/50 hover:text-white hover:bg-white/08'}`}
              >
                EN
              </button>
              <button
                onClick={() => setLang('ar')}
                className={`flex-1 py-1.5 text-xs font-semibold font-arabic transition-all duration-200 ${lang === 'ar' ? 'bg-[#F05A00] text-white' : 'text-white/50 hover:text-white hover:bg-white/08'}`}
              >
                ع
              </button>
            </div>
          </div>
        )}

        {/* Company profile */}
        <div className={`flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/06 transition-colors cursor-pointer ${collapsed ? 'justify-center' : isRTL ? 'flex-row-reverse' : ''}`}>
          <div className="w-8 h-8 rounded-xl bg-[#818CF8] flex items-center justify-center font-bold text-xs text-white flex-shrink-0">
            {displayInitials}
          </div>
          {!collapsed && (
            <div className={`flex-1 min-w-0 ${isRTL ? 'text-right' : ''}`}>
              <p className={`text-sm font-semibold text-white truncate ${isRTL ? 'font-arabic' : ''}`}>{displayName}</p>
              <p className={`text-xs text-white/40 truncate ${isRTL ? 'font-arabic' : ''}`}>
                {lang === 'ar' ? 'صاحب عمل' : 'Employer'} · {displayCity}
              </p>
            </div>
          )}
        </div>

        {/* Collapse toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-white/30 hover:text-white hover:bg-white/06 transition-all duration-200 ${collapsed ? 'justify-center' : ''}`}
        >
          <svg
            className={`w-4 h-4 transition-transform duration-300 ${collapsed ? 'rotate-180' : ''}`}
            fill="none" viewBox="0 0 24 24" stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
          </svg>
          {!collapsed && <span className={`text-xs ${isRTL ? 'font-arabic' : ''}`}>{lang === 'ar' ? 'طي' : 'Collapse'}</span>}
        </button>
      </div>
    </aside>
  );
}

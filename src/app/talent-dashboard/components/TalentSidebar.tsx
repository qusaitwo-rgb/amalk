'use client';
import React from 'react';

import AppLogo from '@/components/ui/AppLogo';
import type { DashboardTab } from './TalentDashboardLayout';
import { useLanguage } from '@/context/LanguageContext';

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (v: boolean) => void;
  activeTab: DashboardTab;
  setActiveTab: (tab: DashboardTab) => void;
}

const NAV_ITEMS: { id: DashboardTab; labelEn: string; labelAr: string; badge?: string; badgeColor?: string; icon: React.ReactNode }[] = [
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
    id: 'matches',
    labelEn: 'Job Matches',
    labelAr: 'تطابقات الوظائف',
    badge: '12',
    badgeColor: '#F05A00',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    id: 'skills',
    labelEn: 'Skill Analysis',
    labelAr: 'تحليل المهارات',
    badge: '3 gaps',
    badgeColor: '#F59E0B',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
  },
  {
    id: 'salary',
    labelEn: 'Salary Insights',
    labelAr: 'رؤى الراتب',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    id: 'roadmap',
    labelEn: 'Career Roadmap',
    labelAr: 'خارطة المسيرة',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
      </svg>
    ),
  },
];

const BOTTOM_ITEMS = [
  {
    id: 'settings',
    labelEn: 'Settings',
    labelAr: 'الإعدادات',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
];

export default function TalentSidebar({ collapsed, setCollapsed, activeTab, setActiveTab }: SidebarProps) {
  const { lang, setLang, isRTL, userSession } = useLanguage();

  const displayName = userSession?.fullName || (lang === 'ar' ? 'أحمد خليل' : 'Ahmad Khalil');
  const displayCity = userSession?.city || 'Ramallah';
  const displayInitials = userSession?.initials || (displayName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2));
  const displayRole = userSession?.role === 'company'
    ? (lang === 'ar' ? 'صاحب عمل' : 'Employer')
    : (lang === 'ar' ? 'مهندس برمجيات' : 'Software Engineer');

  return (
    <aside
      className={`flex-shrink-0 flex flex-col bg-[#0D1B3E] border-r border-white/08 transition-all duration-300 ease-in-out ${
        collapsed ? 'w-16' : 'w-64'
      } min-h-screen`}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* Logo */}
      <div className={`flex items-center gap-3 px-4 py-5 border-b border-white/08 ${collapsed ? 'justify-center' : ''}`}>
        <AppLogo size={32} />
        {!collapsed && (
          <span className={`text-lg font-bold text-white ${isRTL ? 'font-arabic' : 'font-display'}`}>{isRTL ? 'عملك' : 'Amalak'}</span>
        )}
      </div>

      {/* Status badge */}
      {!collapsed && (
        <div className="px-4 py-3 border-b border-white/08">
          <div className={`flex items-center gap-2 px-3 py-2 rounded-xl bg-[#22C55E]/10 border border-[#22C55E]/20 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse" />
            <span className={`text-xs font-semibold text-[#22C55E] ${isRTL ? 'font-arabic' : ''}`}>
              {lang === 'ar' ? 'باحث نشط' : 'Active Hunter'}
            </span>
          </div>
        </div>
      )}

      {/* Nav items */}
      <nav className="flex-1 px-2 py-4 space-y-1">
        {NAV_ITEMS.map((item) => (
          <button
            key={`sidebar-${item.id}`}
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
              <span
                className="absolute top-1 right-1 w-2 h-2 rounded-full"
                style={{ backgroundColor: item.badgeColor }}
              />
            )}
          </button>
        ))}
      </nav>

      {/* Bottom section */}
      <div className="px-2 pb-4 space-y-1 border-t border-white/08 pt-3">
        {/* Language switcher in sidebar */}
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

        {BOTTOM_ITEMS.map((item) => (
          <button
            key={`sidebar-bottom-${item.id}`}
            title={collapsed ? (lang === 'ar' ? item.labelAr : item.labelEn) : undefined}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-white/40 hover:text-white hover:bg-white/06 transition-all duration-200 ${collapsed ? 'justify-center' : isRTL ? 'flex-row-reverse' : ''}`}
          >
            <span className="flex-shrink-0">{item.icon}</span>
            {!collapsed && <span className={`text-sm font-medium ${isRTL ? 'font-arabic' : ''}`}>{lang === 'ar' ? item.labelAr : item.labelEn}</span>}
          </button>
        ))}

        {/* User profile — real session data */}
        <div className={`flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/06 transition-colors cursor-pointer ${collapsed ? 'justify-center' : isRTL ? 'flex-row-reverse' : ''}`}>
          <div className="w-8 h-8 rounded-xl bg-[#F05A00] flex items-center justify-center font-bold text-xs text-white flex-shrink-0">
            {displayInitials}
          </div>
          {!collapsed && (
            <div className={`flex-1 min-w-0 ${isRTL ? 'text-right' : ''}`}>
              <p className={`text-sm font-semibold text-white truncate ${isRTL ? 'font-arabic' : ''}`}>
                {displayName}
              </p>
              <p className={`text-xs text-white/40 truncate ${isRTL ? 'font-arabic' : ''}`}>
                {displayRole} · {displayCity}
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
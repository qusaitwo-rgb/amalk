'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import type { DashboardTab } from './TalentDashboardLayout';
import { useLanguage } from '@/context/LanguageContext';

const TAB_LABELS_EN: Record<DashboardTab, string> = {
  overview: 'Dashboard Overview',
  matches: 'Job Matches',
  skills: 'Skill Gap Analysis',
  salary: 'Salary Insights',
  roadmap: 'Career Roadmap',
};

const TAB_LABELS_AR: Record<DashboardTab, string> = {
  overview: 'نظرة عامة على لوحة التحكم',
  matches: 'تطابقات الوظائف',
  skills: 'تحليل فجوات المهارات',
  salary: 'رؤى الراتب',
  roadmap: 'خارطة المسيرة المهنية',
};

interface TopbarProps {
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (v: boolean) => void;
  activeTab: DashboardTab;
}

export default function TalentTopbar({ activeTab }: TopbarProps) {
  const [notifOpen, setNotifOpen] = useState(false);
  const { lang, isRTL, userSession, setUserSession } = useLanguage();

  const NOTIFICATIONS = [
    { id: 'notif-1', text: lang === 'ar' ? 'فتح وظيفي جديد في بنك فلسطين' : 'New Opening at Bank of Palestine', time: lang === 'ar' ? 'منذ دقيقتين' : '2m ago', color: '#F05A00', unread: true },
    { id: 'notif-2', text: lang === 'ar' ? 'تطابق جديد: مهندس برمجيات أول في جوال — 91%' : 'New match: Senior Software Engineer at Jawwal — 91%', time: lang === 'ar' ? 'منذ 18 دقيقة' : '18m ago', color: '#22C55E', unread: true },
    { id: 'notif-3', text: lang === 'ar' ? 'بالتل اطلعت على ملفك الشخصي' : 'Paltel viewed your profile', time: lang === 'ar' ? 'منذ ساعة' : '1h ago', color: '#818CF8', unread: false },
    { id: 'notif-4', text: lang === 'ar' ? 'فرصة جديدة في أوريدو فلسطين — رام الله' : 'New opportunity at Ooredoo Palestine — Ramallah', time: lang === 'ar' ? 'منذ 3 ساعات' : '3h ago', color: '#F59E0B', unread: false },
    { id: 'notif-5', text: lang === 'ar' ? 'تم اختيارك في القائمة المختصرة لدى PADICO' : 'You were shortlisted by PADICO', time: lang === 'ar' ? 'منذ 5 ساعات' : '5h ago', color: '#22C55E', unread: false },
  ];

  const tabLabel = lang === 'ar' ? TAB_LABELS_AR[activeTab] : TAB_LABELS_EN[activeTab];
  const displayName = userSession?.fullName || (lang === 'ar' ? 'أحمد خليل' : 'Ahmad Khalil');

  const handleSignOut = () => {
    setUserSession(null);
  };

  return (
    <header className="flex-shrink-0 flex items-center justify-between px-6 lg:px-8 py-4 border-b border-white/08 bg-[#0D1B3E] relative z-30" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className={isRTL ? 'text-right' : ''}>
        <h1 className={`text-xl font-bold text-white ${isRTL ? 'font-arabic' : 'font-display'}`}>{tabLabel}</h1>
        <p className={`text-white/40 text-xs mt-0.5 ${isRTL ? 'font-arabic' : ''}`}>
          {lang === 'ar' ? `مرحباً، ${displayName}` : `Welcome, ${displayName}`}
        </p>
      </div>

      <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
        {/* Search */}
        <div className={`hidden md:flex items-center gap-2 bg-white/05 border border-white/10 rounded-xl px-3 py-2 w-52 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <svg className="w-4 h-4 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder={lang === 'ar' ? 'ابحث عن وظائف، مهارات...' : 'Search jobs, skills...'}
            className={`bg-transparent text-sm text-white placeholder-white/25 outline-none w-full ${isRTL ? 'text-right font-arabic' : ''}`}
          />
        </div>

        {/* PRO badge */}
        <button className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#F05A00]/10 border border-[#F05A00]/30 text-[#F05A00] text-xs font-bold hover:opacity-80 transition-opacity">
          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
          <span className={isRTL ? 'font-arabic' : ''}>{lang === 'ar' ? 'ترقية إلى PRO' : 'Upgrade to PRO'}</span>
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setNotifOpen(!notifOpen)}
            className="relative w-9 h-9 rounded-xl glass flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all duration-200"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#F05A00]" />
          </button>

          {notifOpen && (
            <div className={`absolute top-12 w-80 glass-dark rounded-2xl border border-white/10 shadow-glass overflow-hidden z-50 ${isRTL ? 'left-0' : 'right-0'}`} dir={isRTL ? 'rtl' : 'ltr'}>
              <div className={`px-4 py-3 border-b border-white/08 flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                <span className={`text-sm font-semibold text-white ${isRTL ? 'font-arabic' : ''}`}>
                  {lang === 'ar' ? 'الإشعارات' : 'Notifications'}
                </span>
                <span className={`text-xs text-[#F05A00] font-medium ${isRTL ? 'font-arabic' : ''}`}>
                  {lang === 'ar' ? '2 غير مقروءة' : '2 unread'}
                </span>
              </div>
              <div className="max-h-72 overflow-y-auto">
                {NOTIFICATIONS.map((notif) => (
                  <div
                    key={notif.id}
                    className={`px-4 py-3 flex items-start gap-3 hover:bg-white/05 transition-colors border-b border-white/05 last:border-0 ${notif.unread ? 'bg-white/02' : ''} ${isRTL ? 'flex-row-reverse' : ''}`}
                  >
                    <span className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: notif.color }} />
                    <div className={`flex-1 min-w-0 ${isRTL ? 'text-right' : ''}`}>
                      <p className={`text-sm text-white/80 leading-snug ${isRTL ? 'font-arabic' : ''}`}>{notif.text}</p>
                      <p className={`text-xs text-white/30 mt-0.5 ${isRTL ? 'font-arabic' : ''}`}>{notif.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sign out */}
        <Link
          href="/landing-page"
          onClick={handleSignOut}
          className="w-9 h-9 rounded-xl glass flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all duration-200"
          title={lang === 'ar' ? 'تسجيل الخروج' : 'Sign out'}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
        </Link>
      </div>
    </header>
  );
}
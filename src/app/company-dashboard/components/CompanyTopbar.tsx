'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import type { CompanyTab } from './CompanyDashboardLayout';
import { useLanguage } from '@/context/LanguageContext';

const TAB_LABELS_EN: Record<CompanyTab, string> = {
  overview: 'Company Dashboard',
  jobs: 'Job Postings',
  candidates: 'Candidate Management',
  'ai-shortlist': 'AI Shortlisting',
  analytics: 'Hiring Analytics',
};

const TAB_LABELS_AR: Record<CompanyTab, string> = {
  overview: 'لوحة تحكم الشركة',
  jobs: 'إعلانات الوظائف',
  candidates: 'إدارة المرشحين',
  'ai-shortlist': 'القائمة المختصرة بالذكاء الاصطناعي',
  analytics: 'تحليلات التوظيف',
};

interface TopbarProps {
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (v: boolean) => void;
  activeTab: CompanyTab;
}

export default function CompanyTopbar({ activeTab }: TopbarProps) {
  const [notifOpen, setNotifOpen] = useState(false);
  const { lang, isRTL, userSession, setUserSession } = useLanguage();

  const NOTIFICATIONS = [
    { id: 'cn-1', text: lang === 'ar' ? 'مرشح جديد تقدم لوظيفة مهندس برمجيات أول' : 'New candidate applied for Senior Software Engineer', time: lang === 'ar' ? 'منذ 5 دقائق' : '5m ago', color: '#F05A00', unread: true },
    { id: 'cn-2', text: lang === 'ar' ? 'الذكاء الاصطناعي أنهى تصنيف 12 مرشحاً' : 'AI finished ranking 12 candidates for Backend Engineer', time: lang === 'ar' ? 'منذ 22 دقيقة' : '22m ago', color: '#22C55E', unread: true },
    { id: 'cn-3', text: lang === 'ar' ? 'انتهت صلاحية إعلان وظيفة محلل البيانات' : 'Data Analyst job posting expires in 2 days', time: lang === 'ar' ? 'منذ ساعة' : '1h ago', color: '#F59E0B', unread: false },
    { id: 'cn-4', text: lang === 'ar' ? 'تم قبول دعوة المقابلة من أحمد خليل' : 'Ahmad Khalil accepted your interview invitation', time: lang === 'ar' ? 'منذ 3 ساعات' : '3h ago', color: '#818CF8', unread: false },
  ];

  const tabLabel = lang === 'ar' ? TAB_LABELS_AR[activeTab] : TAB_LABELS_EN[activeTab];
  const displayName = userSession?.fullName || (lang === 'ar' ? 'شركة نون' : 'Noon Careers');

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
            placeholder={lang === 'ar' ? 'ابحث عن مرشحين، وظائف...' : 'Search candidates, jobs...'}
            className={`bg-transparent text-sm text-white placeholder-white/25 outline-none w-full ${isRTL ? 'text-right font-arabic' : ''}`}
          />
        </div>

        {/* Post Job quick button */}
        <button className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#F05A00]/10 border border-[#F05A00]/30 text-[#F05A00] text-xs font-bold hover:opacity-80 transition-opacity">
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span className={isRTL ? 'font-arabic' : ''}>{lang === 'ar' ? 'نشر وظيفة' : 'Post Job'}</span>
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
                <span className={`text-sm font-semibold text-white ${isRTL ? 'font-arabic' : ''}`}>{lang === 'ar' ? 'الإشعارات' : 'Notifications'}</span>
                <span className={`text-xs text-[#F05A00] font-medium ${isRTL ? 'font-arabic' : ''}`}>{lang === 'ar' ? '2 غير مقروءة' : '2 unread'}</span>
              </div>
              <div className="max-h-72 overflow-y-auto">
                {NOTIFICATIONS.map((notif) => (
                  <div key={notif.id} className={`px-4 py-3 flex items-start gap-3 hover:bg-white/05 transition-colors border-b border-white/05 last:border-0 ${notif.unread ? 'bg-white/02' : ''} ${isRTL ? 'flex-row-reverse' : ''}`}>
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

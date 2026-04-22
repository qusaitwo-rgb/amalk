'use client';
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';

const ACTIVITIES = [
  {
    id: 'act-1',
    type: 'view',
    textEn: 'Paltel viewed your profile',
    textAr: 'بالتل اطلعت على ملفك الشخصي',
    subEn: 'Recruiter: Hana Al-Khalidi',
    subAr: 'المسؤول: هناء الخالدي',
    timeEn: '2 min ago',
    timeAr: 'منذ دقيقتين',
    color: '#F05A00',
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0zM2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    ),
  },
  {
    id: 'act-2',
    type: 'match',
    textEn: 'New 91% match: Full Stack Developer',
    textAr: 'تطابق جديد 91%: مطور متكامل',
    subEn: 'Jawwal · Nablus · ₪11,000/mo',
    subAr: 'جوال · نابلس · 11,000 ₪/شهر',
    timeEn: '18 min ago',
    timeAr: 'منذ 18 دقيقة',
    color: '#22C55E',
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
  },
  {
    id: 'act-3',
    type: 'applied',
    textEn: 'Application sent: Backend Engineer',
    textAr: 'تم إرسال الطلب: مهندس خلفية',
    subEn: 'Ooredoo Palestine · Ramallah · Under review',
    subAr: 'أوريدو فلسطين · رام الله · قيد المراجعة',
    timeEn: '2 hrs ago',
    timeAr: 'منذ ساعتين',
    color: '#818CF8',
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
      </svg>
    ),
  },
  {
    id: 'act-4',
    type: 'gap',
    textEn: 'Skill gap alert: React Native',
    textAr: 'تنبيه فجوة مهارات: React Native',
    subEn: 'Add this to unlock 8 more matches',
    subAr: 'أضف هذه المهارة لفتح 8 تطابقات إضافية',
    timeEn: '3 hrs ago',
    timeAr: 'منذ 3 ساعات',
    color: '#F59E0B',
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    ),
  },
  {
    id: 'act-5',
    type: 'ats',
    textEn: 'CV ATS score improved to 87/100',
    textAr: 'تحسّن نقاط ATS لسيرتك الذاتية إلى 87/100',
    subEn: 'AI optimized 4 sections',
    subAr: 'الذكاء الاصطناعي حسّن 4 أقسام',
    timeEn: '5 hrs ago',
    timeAr: 'منذ 5 ساعات',
    color: '#22C55E',
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    id: 'act-6',
    type: 'shortlist',
    textEn: 'Shortlisted by Bank of Palestine',
    textAr: 'تم اختيارك من قِبل بنك فلسطين',
    subEn: 'Software Developer role · Awaiting your response',
    subAr: 'دور مطور برمجيات · في انتظار ردك',
    timeEn: '1 day ago',
    timeAr: 'منذ يوم',
    color: '#F05A00',
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>
    ),
  },
];

export default function ActivityFeed() {
  const { lang, isRTL } = useLanguage();

  return (
    <div className="space-y-3 max-h-72 overflow-y-auto scrollbar-hide" dir={isRTL ? 'rtl' : 'ltr'}>
      {ACTIVITIES?.map((item) => (
        <div key={item?.id} className={`flex items-start gap-3 group ${isRTL ? 'flex-row-reverse' : ''}`}>
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
            style={{ backgroundColor: `${item?.color}18`, color: item?.color }}
          >
            {item?.icon}
          </div>
          <div className={`flex-1 min-w-0 ${isRTL ? 'text-right' : ''}`}>
            <p className={`text-sm text-white/80 font-medium leading-snug ${isRTL ? 'font-arabic' : ''}`}>
              {lang === 'ar' ? item?.textAr : item?.textEn}
            </p>
            <p className={`text-xs text-white/40 mt-0.5 ${isRTL ? 'font-arabic' : ''}`}>
              {lang === 'ar' ? item?.subAr : item?.subEn}
            </p>
          </div>
          <span className={`text-xs text-white/25 flex-shrink-0 mt-0.5 ${isRTL ? 'font-arabic' : ''}`}>
            {lang === 'ar' ? item?.timeAr : item?.timeEn}
          </span>
        </div>
      ))}
    </div>
  );
}
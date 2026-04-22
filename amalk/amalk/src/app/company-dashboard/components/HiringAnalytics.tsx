'use client';
import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, Legend,
} from 'recharts';

const hiresPerMonth = [
  { month: 'Oct', hires: 2, applications: 18 },
  { month: 'Nov', hires: 3, applications: 25 },
  { month: 'Dec', hires: 2, applications: 20 },
  { month: 'Jan', hires: 5, applications: 38 },
  { month: 'Feb', hires: 6, applications: 45 },
  { month: 'Mar', hires: 7, applications: 52 },
  { month: 'Apr', hires: 8, applications: 61 },
];

const cityData = [
  { city: 'Ramallah', hires: 12 },
  { city: 'Nablus', hires: 7 },
  { city: 'Gaza', hires: 5 },
  { city: 'Hebron', hires: 4 },
  { city: 'Jerusalem', hires: 3 },
  { city: 'Bethlehem', hires: 2 },
];

const roleData = [
  { name: 'Software Eng.', value: 35, color: '#F05A00' },
  { name: 'Data Analyst', value: 20, color: '#818CF8' },
  { name: 'UX/UI Design', value: 18, color: '#22C55E' },
  { name: 'Backend Eng.', value: 15, color: '#F59E0B' },
  { name: 'Other', value: 12, color: '#EC4899' },
];

const timeToHireData = [
  { month: 'Oct', days: 18 },
  { month: 'Nov', days: 16 },
  { month: 'Dec', days: 20 },
  { month: 'Jan', days: 14 },
  { month: 'Feb', days: 13 },
  { month: 'Mar', days: 12 },
  { month: 'Apr', days: 11 },
];

const METRIC_CARDS = [
  { id: 'm-1', labelEn: 'Total Hires', labelAr: 'إجمالي التوظيفات', value: '33', subtextEn: 'Since platform launch', subtextAr: 'منذ إطلاق المنصة', color: '#F05A00' },
  { id: 'm-2', labelEn: 'Avg. Time to Hire', labelAr: 'متوسط وقت التوظيف', value: '12 days', valueAr: '12 يوم', subtextEn: '↓ 6 days vs industry avg', subtextAr: '↓ 6 أيام مقارنة بمتوسط الصناعة', color: '#22C55E' },
  { id: 'm-3', labelEn: 'AI Match Accuracy', labelAr: 'دقة تطابق الذكاء الاصطناعي', value: '91%', subtextEn: 'Hired candidates avg match', subtextAr: 'متوسط تطابق المرشحين المعينين', color: '#818CF8' },
  { id: 'm-4', labelEn: 'Offer Acceptance', labelAr: 'قبول العروض', value: '87%', subtextEn: '↑ 12% vs last quarter', subtextAr: '↑ 12% مقارنة بالربع الماضي', color: '#F59E0B' },
];

export default function HiringAnalytics() {
  const { lang, isRTL } = useLanguage();
  const [period, setPeriod] = useState('7m');

  return (
    <div className="space-y-6" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Header */}
      <div className={`flex items-center justify-between flex-wrap gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
        <div className={isRTL ? 'text-right' : ''}>
          <h2 className={`text-2xl font-bold text-white ${isRTL ? 'font-arabic' : 'font-display'}`}>{lang === 'ar' ? 'تحليلات التوظيف' : 'Hiring Analytics'}</h2>
          <p className={`text-white/40 text-sm mt-0.5 ${isRTL ? 'font-arabic' : ''}`}>{lang === 'ar' ? 'رؤى شاملة لأداء التوظيف' : 'Comprehensive hiring performance insights'}</p>
        </div>
        <div className={`flex gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
          {[
            { id: '3m', labelEn: '3 Months', labelAr: '3 أشهر' },
            { id: '7m', labelEn: '7 Months', labelAr: '7 أشهر' },
            { id: '1y', labelEn: '1 Year', labelAr: 'سنة' },
          ]?.map(p => (
            <button key={p?.id} onClick={() => setPeriod(p?.id)} className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${period === p?.id ? 'bg-[#F05A00] text-white' : 'glass text-white/50 hover:text-white border border-white/10'} ${isRTL ? 'font-arabic' : ''}`}>
              {lang === 'ar' ? p?.labelAr : p?.labelEn}
            </button>
          ))}
        </div>
      </div>
      {/* Metric cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {METRIC_CARDS?.map(card => (
          <div key={card?.id} className="rounded-2xl p-5 glass border border-white/08">
            <p className={`text-3xl font-bold mb-1 ${isRTL ? 'font-arabic text-right' : 'font-display'}`} style={{ color: card?.color }}>
              {lang === 'ar' && card?.valueAr ? card?.valueAr : card?.value}
            </p>
            <p className={`text-sm font-semibold text-white/80 mb-0.5 ${isRTL ? 'font-arabic text-right' : ''}`}>{lang === 'ar' ? card?.labelAr : card?.labelEn}</p>
            <p className={`text-xs text-white/40 ${isRTL ? 'font-arabic text-right' : ''}`}>{lang === 'ar' ? card?.subtextAr : card?.subtextEn}</p>
          </div>
        ))}
      </div>
      {/* Charts row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Hires & Applications bar chart */}
        <div className="lg:col-span-2 rounded-2xl p-6 glass border border-white/08">
          <div className={`flex items-center justify-between mb-5 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <div className={isRTL ? 'text-right' : ''}>
              <h3 className={`text-base font-bold text-white ${isRTL ? 'font-arabic' : 'font-display'}`}>{lang === 'ar' ? 'الطلبات مقابل التوظيفات' : 'Applications vs Hires'}</h3>
              <p className={`text-xs text-white/40 mt-0.5 ${isRTL ? 'font-arabic' : ''}`}>{lang === 'ar' ? 'آخر 7 أشهر' : 'Last 7 months'}</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={hiresPerMonth} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="month" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: '#0D1B3E', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, color: '#fff' }} />
              <Legend wrapperStyle={{ color: 'rgba(255,255,255,0.5)', fontSize: 12 }} />
              <Bar dataKey="applications" fill="#818CF8" radius={[4, 4, 0, 0]} name={lang === 'ar' ? 'طلبات' : 'Applications'} />
              <Bar dataKey="hires" fill="#F05A00" radius={[4, 4, 0, 0]} name={lang === 'ar' ? 'توظيفات' : 'Hires'} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Role distribution pie */}
        <div className="rounded-2xl p-6 glass border border-white/08">
          <h3 className={`text-base font-bold text-white mb-5 ${isRTL ? 'font-arabic text-right' : 'font-display'}`}>{lang === 'ar' ? 'توزيع الأدوار' : 'Role Distribution'}</h3>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie data={roleData} cx="50%" cy="50%" innerRadius={45} outerRadius={70} paddingAngle={3} dataKey="value">
                {roleData?.map((entry, index) => <Cell key={`cell-${index}`} fill={entry?.color} />)}
              </Pie>
              <Tooltip contentStyle={{ background: '#0D1B3E', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: '#fff', fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-1.5 mt-2">
            {roleData?.map(r => (
              <div key={r?.name} className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: r?.color }} />
                  <span className="text-xs text-white/60">{r?.name}</span>
                </div>
                <span className="text-xs font-bold text-white/80">{r?.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Charts row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Time to hire trend */}
        <div className="rounded-2xl p-6 glass border border-white/08">
          <div className={isRTL ? 'text-right mb-5' : 'mb-5'}>
            <h3 className={`text-base font-bold text-white ${isRTL ? 'font-arabic' : 'font-display'}`}>{lang === 'ar' ? 'وقت التوظيف (أيام)' : 'Time to Hire (Days)'}</h3>
            <p className={`text-xs text-white/40 mt-0.5 ${isRTL ? 'font-arabic' : ''}`}>{lang === 'ar' ? 'الاتجاه التنازلي يعني كفاءة أعلى' : 'Downward trend = higher efficiency'}</p>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={timeToHireData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="month" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: '#0D1B3E', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, color: '#fff' }} formatter={(v) => [`${v} days`, lang === 'ar' ? 'أيام' : 'Days']} />
              <Line type="monotone" dataKey="days" stroke="#22C55E" strokeWidth={2.5} dot={{ fill: '#22C55E', r: 4 }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* City hires bar */}
        <div className="rounded-2xl p-6 glass border border-white/08">
          <div className={isRTL ? 'text-right mb-5' : 'mb-5'}>
            <h3 className={`text-base font-bold text-white ${isRTL ? 'font-arabic' : 'font-display'}`}>{lang === 'ar' ? 'التوظيفات حسب المدينة' : 'Hires by City'}</h3>
            <p className={`text-xs text-white/40 mt-0.5 ${isRTL ? 'font-arabic' : ''}`}>{lang === 'ar' ? 'التوزيع الجغرافي للتوظيفات' : 'Geographic distribution of hires'}</p>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={cityData} layout="vertical" margin={{ top: 0, right: 10, left: 10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" horizontal={false} />
              <XAxis type="number" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="city" tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 11 }} axisLine={false} tickLine={false} width={70} />
              <Tooltip contentStyle={{ background: '#0D1B3E', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: '#fff', fontSize: 12 }} />
              <Bar dataKey="hires" fill="#818CF8" radius={[0, 4, 4, 0]} name={lang === 'ar' ? 'توظيفات' : 'Hires'} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      {/* Anti-nepotism compliance */}
      <div className="rounded-2xl p-6 glass border border-[#22C55E]/20">
        <div className={`flex items-center gap-3 mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <div className="w-10 h-10 rounded-xl bg-[#22C55E]/10 flex items-center justify-center">
            <svg className="w-5 h-5 text-[#22C55E]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
          </div>
          <div className={isRTL ? 'text-right' : ''}>
            <h3 className={`text-base font-bold text-white ${isRTL ? 'font-arabic' : 'font-display'}`}>{lang === 'ar' ? 'تقرير مكافحة المحسوبية' : 'Anti-Nepotism Compliance Report'}</h3>
            <p className={`text-xs text-[#22C55E] ${isRTL ? 'font-arabic' : ''}`}>{lang === 'ar' ? 'جميع قرارات التوظيف مدققة' : 'All hiring decisions audited'}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { labelEn: 'Blind Screenings', labelAr: 'فحوصات عمياء', value: '100%', color: '#22C55E' },
            { labelEn: 'Bias Flags', labelAr: 'علامات التحيز', value: '0', color: '#22C55E' },
            { labelEn: 'Audit Trail', labelAr: 'سجل التدقيق', value: '∞', color: '#818CF8' },
            { labelEn: 'Compliance Score', labelAr: 'نقاط الامتثال', value: '98/100', color: '#F05A00' },
          ]?.map((item, i) => (
            <div key={i} className="text-center p-3 rounded-xl bg-white/03 border border-white/08">
              <p className="text-2xl font-bold mb-1" style={{ color: item?.color }}>{item?.value}</p>
              <p className={`text-xs text-white/50 ${isRTL ? 'font-arabic' : ''}`}>{lang === 'ar' ? item?.labelAr : item?.labelEn}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

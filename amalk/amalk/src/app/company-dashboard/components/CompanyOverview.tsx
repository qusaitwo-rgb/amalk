'use client';
import React, { useState } from 'react';
import type { CompanyTab } from './CompanyDashboardLayout';
import { useLanguage } from '@/context/LanguageContext';
import { toast } from 'sonner';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface Props {
  setActiveTab: (tab: CompanyTab) => void;
}

const applicationData = [
  { month: 'Oct', applications: 18, hires: 2 },
  { month: 'Nov', applications: 25, hires: 3 },
  { month: 'Dec', applications: 20, hires: 2 },
  { month: 'Jan', applications: 38, hires: 5 },
  { month: 'Feb', applications: 45, hires: 6 },
  { month: 'Mar', applications: 52, hires: 7 },
  { month: 'Apr', applications: 61, hires: 8 },
];

const RECENT_APPLICANTS = [
  { id: 'ra-1', nameEn: 'Ahmad Khalil', nameAr: 'أحمد خليل', roleEn: 'Senior Software Engineer', roleAr: 'مهندس برمجيات أول', cityEn: 'Ramallah', cityAr: 'رام الله', match: 94, status: 'new', initials: 'AK', color: '#F05A00' },
  { id: 'ra-2', nameEn: 'Layla Hassan', nameAr: 'ليلى حسن', roleEn: 'Full Stack Developer', roleAr: 'مطور متكامل', cityEn: 'Gaza', cityAr: 'غزة', match: 91, status: 'reviewing', initials: 'LH', color: '#818CF8' },
  { id: 'ra-3', nameEn: 'Rami Nasser', nameAr: 'رامي ناصر', roleEn: 'Backend Engineer', roleAr: 'مهندس خلفية', cityEn: 'Nablus', cityAr: 'نابلس', match: 88, status: 'shortlisted', initials: 'RN', color: '#22C55E' },
  { id: 'ra-4', nameEn: 'Sara Mansour', nameAr: 'سارة منصور', roleEn: 'Data Analyst', roleAr: 'محلل بيانات', cityEn: 'Hebron', cityAr: 'الخليل', match: 85, status: 'new', initials: 'SM', color: '#F59E0B' },
];

const STATUS_COLORS: Record<string, string> = {
  new: '#F05A00',
  reviewing: '#F59E0B',
  shortlisted: '#22C55E',
  rejected: '#EF4444',
};

const STATUS_LABELS_EN: Record<string, string> = { new: 'New', reviewing: 'Reviewing', shortlisted: 'Shortlisted', rejected: 'Rejected' };
const STATUS_LABELS_AR: Record<string, string> = { new: 'جديد', reviewing: 'قيد المراجعة', shortlisted: 'مختصر', rejected: 'مرفوض' };

export default function CompanyOverview({ setActiveTab }: Props) {
  const { lang, isRTL, userSession } = useLanguage();
  const [showJobModal, setShowJobModal] = useState(false);
  const [jobTitle, setJobTitle] = useState('');
  const [jobCity, setJobCity] = useState('');
  const [jobType, setJobType] = useState('Full-time');

  const displayName = userSession?.fullName || (lang === 'ar' ? 'شركة نون' : 'Noon Careers');
  const firstName = displayName.split(' ')[0];

  const KPI_CARDS = [
    { id: 'kpi-active', labelEn: 'Active Job Posts', labelAr: 'الوظائف النشطة', value: '5', subtextEn: '2 closing this week', subtextAr: '2 تنتهي هذا الأسبوع', trendEn: '+2 this month', trendAr: '+2 هذا الشهر', trendUp: true, color: '#F05A00', icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg> },
    { id: 'kpi-apps', labelEn: 'Total Applicants', labelAr: 'إجمالي المتقدمين', value: '34', subtextEn: '12 new this week', subtextAr: '12 جديد هذا الأسبوع', trendEn: '+18% vs last week', trendAr: '+18% مقارنة بالأسبوع الماضي', trendUp: true, color: '#818CF8', icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg> },
    { id: 'kpi-shortlist', labelEn: 'AI Shortlisted', labelAr: 'مختصرون بالذكاء الاصطناعي', value: '8', subtextEn: 'Avg match: 89%', subtextAr: 'متوسط التطابق: 89%', trendEn: 'Top: Ahmad Khalil 94%', trendAr: 'الأعلى: أحمد خليل 94%', trendUp: true, color: '#22C55E', icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg> },
    { id: 'kpi-hires', labelEn: 'Hires This Month', labelAr: 'التوظيفات هذا الشهر', value: '8', subtextEn: 'Time-to-hire: 12 days avg', subtextAr: 'وقت التوظيف: 12 يوم متوسط', trendEn: '+3 vs last month', trendAr: '+3 مقارنة بالشهر الماضي', trendUp: true, color: '#F59E0B', icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> },
  ];

  const handlePostJob = () => {
    if (!jobTitle.trim()) {
      toast.error(lang === 'ar' ? 'يرجى إدخال عنوان الوظيفة' : 'Please enter a job title');
      return;
    }
    toast.success(
      lang === 'ar' ? `تم نشر وظيفة "${jobTitle}" بنجاح!` : `Job "${jobTitle}" posted successfully!`,
      { description: lang === 'ar' ? 'سيبدأ الذكاء الاصطناعي في مطابقة المرشحين خلال دقائق' : 'AI will start matching candidates within minutes' }
    );
    setShowJobModal(false);
    setJobTitle('');
    setJobCity('');
  };

  return (
    <div className="space-y-8" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Welcome banner */}
      <div className="rounded-3xl px-7 py-5 flex items-center justify-between flex-wrap gap-4 bg-[#818CF8]/10 border border-[#818CF8]/25">
        <div className={isRTL ? 'text-right' : ''}>
          <h2 className={`text-2xl font-bold text-white mb-1 ${isRTL ? 'font-arabic' : 'font-display'}`}>
            {lang === 'ar' ? `مرحباً، ${firstName} 👋` : `Welcome back, ${firstName} 👋`}
          </h2>
          <p className={`text-white/50 text-sm ${isRTL ? 'font-arabic' : ''}`}>
            {lang === 'ar' ? (
              <>لديك <span className="text-[#F05A00] font-semibold">12 متقدم جديد</span> و<span className="text-[#22C55E] font-semibold">الذكاء الاصطناعي جاهز</span> لتصنيف المرشحين.</>
            ) : (
              <>You have <span className="text-[#F05A00] font-semibold">12 new applicants</span> and <span className="text-[#22C55E] font-semibold">AI is ready</span> to shortlist candidates.</>
            )}
          </p>
        </div>
        <div className={`flex items-center gap-3 flex-wrap ${isRTL ? 'flex-row-reverse' : ''}`}>
          <button
            onClick={() => setShowJobModal(true)}
            className={`px-5 py-2.5 rounded-xl orange-gradient text-white font-bold text-sm hover:opacity-90 active:scale-95 transition-all duration-150 glow-orange ${isRTL ? 'font-arabic' : 'font-display'}`}
          >
            {lang === 'ar' ? '+ نشر وظيفة جديدة' : '+ Post New Job'}
          </button>
          <button
            onClick={() => setActiveTab('ai-shortlist')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl glass text-white/70 hover:text-white text-sm font-medium transition-colors border border-white/15 ${isRTL ? 'font-arabic flex-row-reverse' : ''}`}
          >
            <svg className="w-4 h-4 text-[#22C55E]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            {lang === 'ar' ? 'تشغيل الذكاء الاصطناعي' : 'Run AI Shortlist'}
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {KPI_CARDS.map((card) => (
          <div key={card.id} className="rounded-2xl p-5 glass border border-white/08 hover:border-white/15 transition-all duration-200 group">
            <div className={`flex items-start justify-between mb-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${card.color}15`, color: card.color }}>
                {card.icon}
              </div>
              <span className={`text-xs font-medium px-2 py-1 rounded-full ${card.trendUp ? 'text-[#22C55E] bg-[#22C55E]/10' : 'text-[#EF4444] bg-[#EF4444]/10'}`}>
                {card.trendUp ? '↑' : '↓'} {lang === 'ar' ? card.trendAr : card.trendEn}
              </span>
            </div>
            <p className={`text-3xl font-bold text-white mb-1 ${isRTL ? 'font-arabic text-right' : 'font-display'}`} style={{ color: card.color }}>{card.value}</p>
            <p className={`text-sm font-semibold text-white/80 mb-0.5 ${isRTL ? 'font-arabic text-right' : ''}`}>{lang === 'ar' ? card.labelAr : card.labelEn}</p>
            <p className={`text-xs text-white/40 ${isRTL ? 'font-arabic text-right' : ''}`}>{lang === 'ar' ? card.subtextAr : card.subtextEn}</p>
          </div>
        ))}
      </div>

      {/* Chart + Recent Applicants */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Applications chart */}
        <div className="lg:col-span-3 rounded-2xl p-6 glass border border-white/08">
          <div className={`flex items-center justify-between mb-5 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <div className={isRTL ? 'text-right' : ''}>
              <h3 className={`text-base font-bold text-white ${isRTL ? 'font-arabic' : 'font-display'}`}>{lang === 'ar' ? 'الطلبات والتوظيفات' : 'Applications & Hires'}</h3>
              <p className={`text-xs text-white/40 mt-0.5 ${isRTL ? 'font-arabic' : ''}`}>{lang === 'ar' ? 'آخر 7 أشهر' : 'Last 7 months'}</p>
            </div>
            <div className={`flex items-center gap-4 text-xs ${isRTL ? 'flex-row-reverse' : ''}`}>
              <span className="flex items-center gap-1.5 text-white/50"><span className="w-3 h-1 rounded-full bg-[#818CF8] inline-block" />{lang === 'ar' ? 'طلبات' : 'Applications'}</span>
              <span className="flex items-center gap-1.5 text-white/50"><span className="w-3 h-1 rounded-full bg-[#22C55E] inline-block" />{lang === 'ar' ? 'توظيفات' : 'Hires'}</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={applicationData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="appGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#818CF8" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#818CF8" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="hireGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22C55E" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#22C55E" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="month" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: '#0D1B3E', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, color: '#fff' }} />
              <Area type="monotone" dataKey="applications" stroke="#818CF8" strokeWidth={2} fill="url(#appGrad)" />
              <Area type="monotone" dataKey="hires" stroke="#22C55E" strokeWidth={2} fill="url(#hireGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Recent applicants */}
        <div className="lg:col-span-2 rounded-2xl p-6 glass border border-white/08">
          <div className={`flex items-center justify-between mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <h3 className={`text-base font-bold text-white ${isRTL ? 'font-arabic' : 'font-display'}`}>{lang === 'ar' ? 'أحدث المتقدمين' : 'Recent Applicants'}</h3>
            <button onClick={() => setActiveTab('candidates')} className={`text-xs text-[#F05A00] hover:underline ${isRTL ? 'font-arabic' : ''}`}>{lang === 'ar' ? 'عرض الكل' : 'View all'}</button>
          </div>
          <div className="space-y-3">
            {RECENT_APPLICANTS.map((a) => (
              <div key={a.id} className={`flex items-center gap-3 p-3 rounded-xl hover:bg-white/05 transition-colors ${isRTL ? 'flex-row-reverse' : ''}`}>
                <div className="w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold text-white flex-shrink-0" style={{ backgroundColor: `${a.color}25`, color: a.color }}>
                  {a.initials}
                </div>
                <div className={`flex-1 min-w-0 ${isRTL ? 'text-right' : ''}`}>
                  <p className={`text-sm font-semibold text-white truncate ${isRTL ? 'font-arabic' : ''}`}>{lang === 'ar' ? a.nameAr : a.nameEn}</p>
                  <p className={`text-xs text-white/40 truncate ${isRTL ? 'font-arabic' : ''}`}>{lang === 'ar' ? a.roleAr : a.roleEn} · {lang === 'ar' ? a.cityAr : a.cityEn}</p>
                </div>
                <div className={`flex flex-col items-end gap-1 ${isRTL ? 'items-start' : ''}`}>
                  <span className="text-xs font-bold" style={{ color: a.color }}>{a.match}%</span>
                  <span className="text-xs px-1.5 py-0.5 rounded-full font-medium" style={{ backgroundColor: `${STATUS_COLORS[a.status]}15`, color: STATUS_COLORS[a.status] }}>
                    {lang === 'ar' ? STATUS_LABELS_AR[a.status] : STATUS_LABELS_EN[a.status]}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { labelEn: 'Post New Job', labelAr: 'نشر وظيفة جديدة', icon: '📝', color: '#F05A00', action: () => setShowJobModal(true) },
          { labelEn: 'View Candidates', labelAr: 'عرض المرشحين', icon: '👥', color: '#818CF8', action: () => setActiveTab('candidates') },
          { labelEn: 'AI Shortlist', labelAr: 'قائمة الذكاء الاصطناعي', icon: '🤖', color: '#22C55E', action: () => setActiveTab('ai-shortlist') },
          { labelEn: 'View Analytics', labelAr: 'عرض التحليلات', icon: '📊', color: '#F59E0B', action: () => setActiveTab('analytics') },
        ].map((item, i) => (
          <button
            key={`qa-${i}`}
            onClick={item.action}
            className={`flex items-center gap-3 p-4 rounded-2xl glass border border-white/08 hover:border-white/20 transition-all duration-200 group ${isRTL ? 'flex-row-reverse' : ''}`}
          >
            <span className="text-2xl">{item.icon}</span>
            <span className={`text-sm font-semibold text-white/70 group-hover:text-white transition-colors ${isRTL ? 'font-arabic text-right' : ''}`}>
              {lang === 'ar' ? item.labelAr : item.labelEn}
            </span>
          </button>
        ))}
      </div>

      {/* Post Job Modal */}
      {showJobModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-3xl bg-[#0D1B3E] border border-white/15 p-6 shadow-2xl" dir={isRTL ? 'rtl' : 'ltr'}>
            <div className={`flex items-center justify-between mb-5 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <h3 className={`text-lg font-bold text-white ${isRTL ? 'font-arabic' : 'font-display'}`}>{lang === 'ar' ? 'نشر وظيفة جديدة' : 'Post New Job'}</h3>
              <button onClick={() => setShowJobModal(false)} className="text-white/40 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className={`text-xs text-white/50 mb-1.5 block ${isRTL ? 'font-arabic text-right' : ''}`}>{lang === 'ar' ? 'عنوان الوظيفة *' : 'Job Title *'}</label>
                <input
                  value={jobTitle}
                  onChange={e => setJobTitle(e.target.value)}
                  placeholder={lang === 'ar' ? 'مثال: مهندس برمجيات أول' : 'e.g. Senior Software Engineer'}
                  className={`w-full bg-white/05 border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-white/25 outline-none focus:border-[#F05A00]/50 transition-colors ${isRTL ? 'text-right font-arabic' : ''}`}
                />
              </div>
              <div>
                <label className={`text-xs text-white/50 mb-1.5 block ${isRTL ? 'font-arabic text-right' : ''}`}>{lang === 'ar' ? 'المدينة' : 'City'}</label>
                <select
                  value={jobCity}
                  onChange={e => setJobCity(e.target.value)}
                  className={`w-full bg-white/05 border border-white/15 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-[#F05A00]/50 transition-colors ${isRTL ? 'text-right font-arabic' : ''}`}
                >
                  <option value="" className="bg-[#0D1B3E]">{lang === 'ar' ? 'اختر مدينة' : 'Select city'}</option>
                  {['Ramallah', 'Gaza', 'Nablus', 'Hebron', 'Jerusalem', 'Bethlehem', 'Jenin'].map(c => (
                    <option key={c} value={c} className="bg-[#0D1B3E]">{c}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className={`text-xs text-white/50 mb-1.5 block ${isRTL ? 'font-arabic text-right' : ''}`}>{lang === 'ar' ? 'نوع الوظيفة' : 'Job Type'}</label>
                <div className={`flex gap-2 flex-wrap ${isRTL ? 'flex-row-reverse' : ''}`}>
                  {['Full-time', 'Part-time', 'Remote', 'Contract'].map(t => (
                    <button
                      key={t}
                      onClick={() => setJobType(t)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${jobType === t ? 'bg-[#F05A00] text-white' : 'bg-white/05 text-white/50 hover:text-white border border-white/10'}`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
              <button
                onClick={handlePostJob}
                className={`w-full py-3 rounded-xl orange-gradient text-white font-bold text-sm hover:opacity-90 active:scale-95 transition-all duration-150 mt-2 ${isRTL ? 'font-arabic' : 'font-display'}`}
              >
                {lang === 'ar' ? 'نشر الوظيفة' : 'Post Job'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

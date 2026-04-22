'use client';
import React, { useState, useRef } from 'react';
import type { DashboardTab } from './TalentDashboardLayout';
import ActivityFeed from './ActivityFeed';
import MatchRadarChart from './MatchRadarChart';
import { useLanguage } from '@/context/LanguageContext';
import { toast } from 'sonner';
import { Toaster } from 'sonner';

interface Props {
  setActiveTab: (tab: DashboardTab) => void;
}

// Palestinian companies and cities for search
const SEARCH_RESULTS = [
  { id: 'sr-1', titleEn: 'Senior Software Engineer', titleAr: 'مهندس برمجيات أول', company: 'Paltel', locationEn: 'Ramallah', locationAr: 'رام الله', salaryEn: '₪12,000–16,000/mo', salaryAr: '12,000–16,000 ₪/شهر', match: 94 },
  { id: 'sr-2', titleEn: 'Full Stack Developer', titleAr: 'مطور متكامل', company: 'Jawwal', locationEn: 'Nablus', locationAr: 'نابلس', salaryEn: '₪10,000–13,000/mo', salaryAr: '10,000–13,000 ₪/شهر', match: 91 },
  { id: 'sr-3', titleEn: 'Backend Engineer', titleAr: 'مهندس خلفية', company: 'Ooredoo Palestine', locationEn: 'Ramallah', locationAr: 'رام الله', salaryEn: '₪11,000–14,000/mo', salaryAr: '11,000–14,000 ₪/شهر', match: 88 },
  { id: 'sr-4', titleEn: 'Software Developer', titleAr: 'مطور برمجيات', company: 'Bank of Palestine', locationEn: 'Hebron', locationAr: 'الخليل', salaryEn: '₪9,000–12,000/mo', salaryAr: '9,000–12,000 ₪/شهر', match: 85 },
  { id: 'sr-5', titleEn: 'Tech Lead', titleAr: 'قائد تقني', company: 'PADICO', locationEn: 'Ramallah', locationAr: 'رام الله', salaryEn: '₪15,000–20,000/mo', salaryAr: '15,000–20,000 ₪/شهر', match: 82 },
  { id: 'sr-6', titleEn: 'Data Analyst', titleAr: 'محلل بيانات', company: 'Siniora', locationEn: 'Gaza', locationAr: 'غزة', salaryEn: '₪8,000–11,000/mo', salaryAr: '8,000–11,000 ₪/شهر', match: 79 },
];

const PALESTINE_CITIES_EN = ['All Cities', 'Ramallah', 'Gaza', 'Nablus', 'Hebron', 'Jerusalem', 'Bethlehem', 'Jenin', 'Tulkarm', 'Jericho'];
const PALESTINE_CITIES_AR = ['كل المدن', 'رام الله', 'غزة', 'نابلس', 'الخليل', 'القدس', 'بيت لحم', 'جنين', 'طولكرم', 'أريحا'];

const KPI_CARDS = [
  {
    id: 'kpi-match',
    labelEn: 'Top Match Score',
    labelAr: 'أعلى نقاط تطابق',
    value: '94%',
    subtextEn: 'Senior Software Engineer · Paltel',
    subtextAr: 'مهندس برمجيات أول · بالتل',
    trendEn: '+6% vs last week',
    trendAr: '+6% مقارنة بالأسبوع الماضي',
    trendUp: true,
    color: '#F05A00',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
  },
  {
    id: 'kpi-applications',
    labelEn: 'Applications Sent',
    labelAr: 'الطلبات المرسلة',
    value: '23',
    subtextEn: '8 under review',
    subtextAr: '8 قيد المراجعة',
    trendEn: '+5 this week',
    trendAr: '+5 هذا الأسبوع',
    trendUp: true,
    color: '#818CF8',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    ),
  },
  {
    id: 'kpi-views',
    labelEn: 'Profile Views',
    labelAr: 'مشاهدات الملف',
    value: '147',
    subtextEn: 'Last 30 days',
    subtextAr: 'آخر 30 يوماً',
    trendEn: '+23% vs last month',
    trendAr: '+23% مقارنة بالشهر الماضي',
    trendUp: true,
    color: '#22C55E',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    ),
  },
  {
    id: 'kpi-salary',
    labelEn: 'Predicted Salary',
    labelAr: 'الراتب المتوقع',
    value: '12,500',
    subtextEn: 'ILS/month · Palestine market',
    subtextAr: 'شيكل/شهر · السوق الفلسطيني',
    trendEn: '+12% above your current',
    trendAr: '+12% فوق راتبك الحالي',
    trendUp: true,
    color: '#F59E0B',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    id: 'kpi-skill',
    labelEn: 'Skill Score',
    labelAr: 'نقاط المهارات',
    value: '78/100',
    subtextEn: '3 gaps identified',
    subtextAr: '3 فجوات محددة',
    trendEn: 'React Native missing',
    trendAr: 'React Native مفقود',
    trendUp: false,
    color: '#EF4444',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
];

function simulateCVParsing(fileName: string): string[] {
  const skillSets = [
    ['JavaScript', 'React', 'Node.js', 'TypeScript', 'REST APIs', 'Git'],
    ['Python', 'Django', 'PostgreSQL', 'Docker', 'AWS', 'Linux'],
    ['Java', 'Spring Boot', 'Microservices', 'SQL', 'Maven', 'CI/CD'],
  ];
  return skillSets[fileName.length % skillSets.length];
}

export default function DashboardOverview({ setActiveTab }: Props) {
  const { lang, isRTL, userSession, setUserSession } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [searchResults, setSearchResults] = useState<typeof SEARCH_RESULTS | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [cvParsing, setCvParsing] = useState(false);
  const cvInputRef = useRef<HTMLInputElement>(null);

  const displayName = userSession?.fullName || (lang === 'ar' ? 'أحمد' : 'Ahmad');
  const firstName = displayName.split(' ')[0];
  const cvUploaded = userSession?.cvUploaded;
  const cvSkills = userSession?.cvSkills;

  const handleSearch = async () => {
    setIsSearching(true);
    await new Promise(r => setTimeout(r, 900));
    let results = SEARCH_RESULTS;
    if (selectedCity && selectedCity !== 'All Cities' && selectedCity !== 'كل المدن') {
      const cityEn = PALESTINE_CITIES_AR.includes(selectedCity)
        ? PALESTINE_CITIES_EN[PALESTINE_CITIES_AR.indexOf(selectedCity)]
        : selectedCity;
      results = SEARCH_RESULTS.filter(r => r.locationEn === cityEn);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      results = results.filter(r =>
        r.titleEn.toLowerCase().includes(q) ||
        r.company.toLowerCase().includes(q) ||
        r.titleAr.includes(q)
      );
    }
    setSearchResults(results.length > 0 ? results : SEARCH_RESULTS);
    setIsSearching(false);
    toast.success(
      lang === 'ar'
        ? `تم العثور على ${results.length} وظيفة في فلسطين`
        : `Found ${results.length} jobs across Palestine`,
      { description: lang === 'ar' ? 'نتائج من شركات فلسطينية رائدة' : 'Results from leading Palestinian companies' }
    );
  };

  const handleCVUpload = async (file: File) => {
    const allowed = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/msword'];
    if (!allowed.includes(file.type) && !file.name.match(/\.(pdf|docx|doc)$/i)) {
      toast.error(lang === 'ar' ? 'يُرجى رفع ملف PDF أو DOCX فقط' : 'Please upload a PDF or DOCX file only');
      return;
    }
    setCvParsing(true);
    toast.info(lang === 'ar' ? 'جارٍ تحليل السيرة الذاتية...' : 'Analyzing your CV with AI...');
    await new Promise(r => setTimeout(r, 2000));
    const skills = simulateCVParsing(file.name);
    setCvParsing(false);
    if (userSession) {
      setUserSession({ ...userSession, cvUploaded: true, cvSkills: skills });
    }
    toast.success(
      lang === 'ar' ? `تم استخراج ${skills.length} مهارة من سيرتك الذاتية!` : `Extracted ${skills.length} skills from your CV!`,
      { description: skills.join(', ') }
    );
  };

  const cities = lang === 'ar' ? PALESTINE_CITIES_AR : PALESTINE_CITIES_EN;

  return (
    <div className="space-y-8" dir={isRTL ? 'rtl' : 'ltr'}>
      <Toaster position="bottom-right" theme="dark" richColors />

      {/* Welcome banner */}
      <div className="rounded-3xl px-7 py-5 flex items-center justify-between flex-wrap gap-4 bg-[#F05A00]/10 border border-[#F05A00]/25">
        <div className={isRTL ? 'text-right' : ''}>
          <h2 className={`text-2xl font-bold text-white mb-1 ${isRTL ? 'font-arabic' : 'font-display'}`}>
            {lang === 'ar' ? `مرحباً، ${firstName} 👋` : `Welcome back, ${firstName} 👋`}
          </h2>
          <p className={`text-white/50 text-sm ${isRTL ? 'font-arabic' : ''}`}>
            {lang === 'ar' ? (
              <>لديك <span className="text-[#F05A00] font-semibold">12 تطابق وظيفي جديد</span> و<span className="text-[#22C55E] font-semibold">شركتان</span> اطلعتا على ملفك اليوم.</>
            ) : (
              <>You have <span className="text-[#F05A00] font-semibold">12 new job matches</span> and{' '}<span className="text-[#22C55E] font-semibold">2 companies</span> viewed your profile today.</>
            )}
          </p>
          {cvSkills && cvSkills.length > 0 && (
            <p className={`text-white/40 text-xs mt-1 ${isRTL ? 'font-arabic' : ''}`}>
              {lang === 'ar' ? `مهاراتك المستخرجة: ${cvSkills.join('، ')}` : `CV Skills: ${cvSkills.join(', ')}`}
            </p>
          )}
        </div>
        <div className={`flex items-center gap-3 flex-wrap ${isRTL ? 'flex-row-reverse' : ''}`}>
          <button
            onClick={() => setActiveTab('matches')}
            className={`px-5 py-2.5 rounded-xl orange-gradient text-white font-bold text-sm hover:opacity-90 active:scale-95 transition-all duration-150 glow-orange ${isRTL ? 'font-arabic' : 'font-display'}`}
          >
            {lang === 'ar' ? 'عرض التطابقات' : 'View Matches'}
          </button>
          {/* CV Upload Button */}
          <input
            ref={cvInputRef}
            type="file"
            accept=".pdf,.doc,.docx"
            className="hidden"
            onChange={(e) => { if (e.target.files?.[0]) handleCVUpload(e.target.files[0]); }}
          />
          <button
            onClick={() => cvInputRef.current?.click()}
            disabled={cvParsing}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl glass text-white/70 hover:text-white text-sm font-medium transition-colors border border-white/15 disabled:opacity-50 ${isRTL ? 'font-arabic flex-row-reverse' : ''}`}
          >
            {cvParsing ? (
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            ) : cvUploaded ? (
              <svg className="w-4 h-4 text-[#22C55E]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            )}
            {cvParsing
              ? (lang === 'ar' ? 'جارٍ التحليل...' : 'Analyzing...')
              : cvUploaded
                ? (lang === 'ar' ? 'تحديث السيرة الذاتية' : 'Update CV')
                : (lang === 'ar' ? 'رفع السيرة الذاتية' : 'Upload CV')}
          </button>
        </div>
      </div>

      {/* Job Search Bar */}
      <div className="glass rounded-3xl p-6">
        <h3 className={`font-bold text-white text-base mb-4 ${isRTL ? 'font-arabic text-right' : 'font-display'}`}>
          {lang === 'ar' ? 'البحث عن وظائف في فلسطين' : 'Search for Jobs in Palestine'}
        </h3>
        <div className={`flex flex-col sm:flex-row gap-3 ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
          <div className={`flex-1 flex items-center gap-2 bg-white/05 border border-white/10 rounded-xl px-4 py-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <svg className="w-4 h-4 text-white/30 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              placeholder={lang === 'ar' ? 'مهندس برمجيات، مطور، محلل...' : 'Software Engineer, Developer, Analyst...'}
              className={`bg-transparent text-sm text-white placeholder-white/25 outline-none w-full ${isRTL ? 'text-right font-arabic' : ''}`}
            />
          </div>
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className={`bg-white/05 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-[#F05A00]/50 transition-all ${isRTL ? 'font-arabic text-right' : ''}`}
          >
            {cities.map((c, i) => (
              <option key={`city-${i}`} value={c} className="bg-[#0D1B3E]">{c}</option>
            ))}
          </select>
          <button
            onClick={handleSearch}
            disabled={isSearching}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl orange-gradient text-white font-bold text-sm hover:opacity-90 active:scale-95 transition-all duration-150 glow-orange disabled:opacity-50 ${isRTL ? 'font-arabic flex-row-reverse' : 'font-display'}`}
          >
            {isSearching ? (
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            )}
            {lang === 'ar' ? 'بحث' : 'Search Jobs'}
          </button>
        </div>

        {/* Search Results */}
        {searchResults !== null && (
          <div className="mt-5">
            <div className={`flex items-center justify-between mb-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <p className={`text-white/60 text-sm ${isRTL ? 'font-arabic' : ''}`}>
                {lang === 'ar' ? `${searchResults.length} نتيجة وجدت` : `${searchResults.length} results found`}
              </p>
              <button onClick={() => setSearchResults(null)} className="text-white/30 hover:text-white/60 text-xs transition-colors">
                {lang === 'ar' ? 'إغلاق' : 'Clear'}
              </button>
            </div>
            <div className="space-y-2 max-h-64 overflow-y-auto scrollbar-hide">
              {searchResults.map((result) => (
                <div key={result.id} className={`flex items-center justify-between p-3 rounded-xl bg-white/04 hover:bg-white/08 border border-white/08 transition-all cursor-pointer ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <div className={`flex-1 min-w-0 ${isRTL ? 'text-right' : ''}`}>
                    <p className={`text-sm font-semibold text-white ${isRTL ? 'font-arabic' : ''}`}>
                      {lang === 'ar' ? result.titleAr : result.titleEn}
                    </p>
                    <p className={`text-xs text-white/40 mt-0.5 ${isRTL ? 'font-arabic' : ''}`}>
                      {result.company} · {lang === 'ar' ? result.locationAr : result.locationEn}
                    </p>
                  </div>
                  <div className={`flex items-center gap-3 flex-shrink-0 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <span className={`text-xs text-white/50 ${isRTL ? 'font-arabic' : ''}`}>
                      {lang === 'ar' ? result.salaryAr : result.salaryEn}
                    </span>
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-[#F05A00]/15 text-[#F05A00]">
                      {result.match}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* KPI Bento Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {/* Hero card */}
        <div
          className="col-span-1 sm:col-span-2 xl:col-span-2 glass rounded-3xl p-6 relative overflow-hidden group card-hover"
          style={{ borderColor: `${KPI_CARDS[0].color}25`, borderWidth: '1px' }}
        >
          <div
            className="absolute -top-10 -right-10 w-40 h-40 rounded-full blur-3xl opacity-10 group-hover:opacity-20 transition-opacity duration-500"
            style={{ backgroundColor: KPI_CARDS[0].color }}
          />
          <div className={`flex items-start justify-between mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center"
              style={{ backgroundColor: `${KPI_CARDS[0].color}18`, color: KPI_CARDS[0].color }}
            >
              {KPI_CARDS[0].icon}
            </div>
            <span
              className={`text-xs font-bold px-2.5 py-1 rounded-full ${isRTL ? 'font-arabic' : ''}`}
              style={{ backgroundColor: `${KPI_CARDS[0].color}20`, color: KPI_CARDS[0].color }}
            >
              {lang === 'ar' ? 'أعلى تطابق' : 'Top Match'}
            </span>
          </div>
          <p className={`text-white/50 text-xs font-semibold uppercase tracking-wider mb-1 ${isRTL ? 'font-arabic text-right' : ''}`}>
            {lang === 'ar' ? KPI_CARDS[0].labelAr : KPI_CARDS[0].labelEn}
          </p>
          <div className="font-bold text-6xl font-mono-data mb-1" style={{ color: KPI_CARDS[0].color }}>
            {KPI_CARDS[0].value}
          </div>
          <p className={`text-white/70 text-sm font-medium ${isRTL ? 'font-arabic text-right' : ''}`}>
            {lang === 'ar' ? KPI_CARDS[0].subtextAr : KPI_CARDS[0].subtextEn}
          </p>
          <div className={`mt-3 flex items-center gap-1.5 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <svg className="w-3.5 h-3.5 text-[#22C55E]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
            <span className={`text-xs text-[#22C55E] font-medium ${isRTL ? 'font-arabic' : ''}`}>
              {lang === 'ar' ? KPI_CARDS[0].trendAr : KPI_CARDS[0].trendEn}
            </span>
          </div>
          <div className="mt-4 h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full rounded-full skill-bar" style={{ width: '94%', backgroundColor: KPI_CARDS[0].color }} />
          </div>
        </div>

        {/* Normal KPI cards */}
        {KPI_CARDS.slice(1).map((card) => (
          <div key={card.id} className="glass rounded-3xl p-5 relative overflow-hidden group card-hover">
            <div
              className="absolute -top-6 -right-6 w-24 h-24 rounded-full blur-2xl opacity-08 group-hover:opacity-15 transition-opacity duration-500"
              style={{ backgroundColor: card.color }}
            />
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
              style={{ backgroundColor: `${card.color}18`, color: card.color }}
            >
              {card.icon}
            </div>
            <p className={`text-white/40 text-xs font-semibold uppercase tracking-wider mb-1 ${isRTL ? 'font-arabic text-right' : ''}`}>
              {lang === 'ar' ? card.labelAr : card.labelEn}
            </p>
            <div className="font-bold text-3xl font-mono-data mb-1" style={{ color: card.color }}>
              {card.value}
            </div>
            <p className={`text-white/50 text-xs ${isRTL ? 'font-arabic text-right' : ''}`}>
              {lang === 'ar' ? card.subtextAr : card.subtextEn}
            </p>
            <div className={`mt-2 flex items-center gap-1 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <svg
                className={`w-3 h-3 ${card.trendUp ? 'text-[#22C55E]' : 'text-[#EF4444]'}`}
                fill="none" viewBox="0 0 24 24" stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5}
                  d={card.trendUp ? "M5 10l7-7m0 0l7 7m-7-7v18" : "M19 14l-7 7m0 0l-7-7m7 7V3"} />
              </svg>
              <span className={`text-xs font-medium ${card.trendUp ? 'text-[#22C55E]' : 'text-[#EF4444]'} ${isRTL ? 'font-arabic' : ''}`}>
                {lang === 'ar' ? card.trendAr : card.trendEn}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="glass rounded-3xl p-6">
          <div className={`flex items-center justify-between mb-5 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <div className={isRTL ? 'text-right' : ''}>
              <h3 className={`font-bold text-white text-base ${isRTL ? 'font-arabic' : 'font-display'}`}>
                {lang === 'ar' ? 'رادار تطابق المهارات' : 'Skill Match Radar'}
              </h3>
              <p className={`text-white/40 text-xs mt-0.5 ${isRTL ? 'font-arabic' : ''}`}>
                {lang === 'ar' ? 'مهاراتك مقابل متطلبات الوظائف' : 'Your skills vs. top job requirements'}
              </p>
            </div>
            <span className={`text-xs font-bold px-2.5 py-1 rounded-full bg-[#F05A00]/15 text-[#F05A00] ${isRTL ? 'font-arabic' : ''}`}>
              {lang === 'ar' ? 'أعلى تطابق: 94%' : 'Top Match: 94%'}
            </span>
          </div>
          <MatchRadarChart />
        </div>

        <div className="glass rounded-3xl p-6">
          <div className={`flex items-center justify-between mb-5 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <div className={isRTL ? 'text-right' : ''}>
              <h3 className={`font-bold text-white text-base ${isRTL ? 'font-arabic' : 'font-display'}`}>
                {lang === 'ar' ? 'آخر النشاطات' : 'Recent Activity'}
              </h3>
              <p className={`text-white/40 text-xs mt-0.5 ${isRTL ? 'font-arabic' : ''}`}>
                {lang === 'ar' ? 'آخر تحديثات ملفك الشخصي' : 'Latest updates on your profile'}
              </p>
            </div>
          </div>
          <ActivityFeed />
        </div>
      </div>
    </div>
  );
}
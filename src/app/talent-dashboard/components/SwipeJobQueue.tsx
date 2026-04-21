'use client';
import React, { useState } from 'react';
import { toast } from 'sonner';
import { useLanguage } from '@/context/LanguageContext';

interface Job {
  id: string;
  titleEn: string;
  titleAr: string;
  company: string;
  locationEn: string;
  locationAr: string;
  salaryEn: string;
  salaryAr: string;
  matchScore: number;
  matchColor: string;
  tags: string[];
  tagsAr: string[];
  typeEn: string;
  typeAr: string;
  posted: string;
  postedAr: string;
  descriptionEn: string;
  descriptionAr: string;
  matchedSkills: string[];
  missingSkills: string[];
  companyLogo: string;
  companyColor: string;
}

const JOBS: Job[] = [
  {
    id: 'job-001',
    titleEn: 'Senior Software Engineer',
    titleAr: 'مهندس برمجيات أول',
    company: 'Paltel',
    locationEn: 'Ramallah, Palestine',
    locationAr: 'رام الله، فلسطين',
    salaryEn: '₪12,000 – 16,000/mo',
    salaryAr: '12,000 – 16,000 ₪/شهر',
    matchScore: 94,
    matchColor: '#F05A00',
    tags: ['React', 'Node.js', 'Cloud', 'Agile'],
    tagsAr: ['ريأكت', 'نود جي إس', 'الحوسبة السحابية', 'أجايل'],
    typeEn: 'Full-time · Hybrid',
    typeAr: 'دوام كامل · هجين',
    posted: '2 hours ago',
    postedAr: 'منذ ساعتين',
    descriptionEn: 'Lead the development of Paltel\'s next-generation telecom infrastructure. Work with product and engineering teams to build services used by millions across Palestine.',
    descriptionAr: 'قيادة تطوير البنية التحتية للاتصالات من الجيل التالي لبالتل. العمل مع فرق المنتج والهندسة لبناء خدمات يستخدمها الملايين في فلسطين.',
    matchedSkills: ['React', 'Node.js', 'Cloud', 'Agile', 'REST APIs'],
    missingSkills: ['React Native'],
    companyLogo: 'PT',
    companyColor: '#F05A00',
  },
  {
    id: 'job-002',
    titleEn: 'Full Stack Developer',
    titleAr: 'مطور متكامل',
    company: 'Jawwal',
    locationEn: 'Nablus, Palestine',
    locationAr: 'نابلس، فلسطين',
    salaryEn: '₪10,000 – 13,000/mo',
    salaryAr: '10,000 – 13,000 ₪/شهر',
    matchScore: 91,
    matchColor: '#22C55E',
    tags: ['Vue.js', 'Python', 'PostgreSQL', 'Docker'],
    tagsAr: ['فيو جي إس', 'بايثون', 'بوستجريس', 'دوكر'],
    typeEn: 'Full-time · On-site',
    typeAr: 'دوام كامل · حضوري',
    posted: '5 hours ago',
    postedAr: 'منذ 5 ساعات',
    descriptionEn: 'Build and maintain Jawwal\'s digital services platform. Own end-to-end development for mobile and web applications serving Palestinian customers.',
    descriptionAr: 'بناء وصيانة منصة الخدمات الرقمية لجوال. تطوير تطبيقات الهاتف والويب من البداية للنهاية لخدمة العملاء الفلسطينيين.',
    matchedSkills: ['JavaScript', 'Python', 'Databases', 'APIs'],
    missingSkills: ['Vue.js advanced patterns'],
    companyLogo: 'JW',
    companyColor: '#22C55E',
  },
  {
    id: 'job-003',
    titleEn: 'Backend Engineer',
    titleAr: 'مهندس خلفية',
    company: 'Ooredoo Palestine',
    locationEn: 'Ramallah, Palestine',
    locationAr: 'رام الله، فلسطين',
    salaryEn: '₪11,000 – 14,000/mo',
    salaryAr: '11,000 – 14,000 ₪/شهر',
    matchScore: 88,
    matchColor: '#818CF8',
    tags: ['Java', 'Spring Boot', 'Microservices', 'AWS'],
    tagsAr: ['جافا', 'سبرينج بوت', 'ميكروسيرفيسز', 'أمازون ويب'],
    typeEn: 'Full-time · Hybrid',
    typeAr: 'دوام كامل · هجين',
    posted: '1 day ago',
    postedAr: 'منذ يوم',
    descriptionEn: 'Design and build scalable backend systems for Ooredoo Palestine\'s telecom services. Drive architecture decisions and mentor junior engineers.',
    descriptionAr: 'تصميم وبناء أنظمة خلفية قابلة للتوسع لخدمات أوريدو فلسطين. قيادة قرارات المعمارية وتوجيه المهندسين المبتدئين.',
    matchedSkills: ['Java', 'APIs', 'Databases', 'Cloud'],
    missingSkills: ['Spring Boot advanced', 'Microservices patterns'],
    companyLogo: 'OR',
    companyColor: '#EF4444',
  },
  {
    id: 'job-004',
    titleEn: 'Software Developer',
    titleAr: 'مطور برمجيات',
    company: 'Bank of Palestine',
    locationEn: 'Hebron, Palestine',
    locationAr: 'الخليل، فلسطين',
    salaryEn: '₪9,000 – 12,000/mo',
    salaryAr: '9,000 – 12,000 ₪/شهر',
    matchScore: 85,
    matchColor: '#F59E0B',
    tags: ['Java', 'Angular', 'Banking', 'Security'],
    tagsAr: ['جافا', 'أنغولار', 'مصرفية', 'أمان'],
    typeEn: 'Full-time · On-site',
    typeAr: 'دوام كامل · حضوري',
    posted: '2 days ago',
    postedAr: 'منذ يومين',
    descriptionEn: 'Develop and maintain digital banking solutions for Bank of Palestine. Work on mobile banking, online portals, and core banking integrations.',
    descriptionAr: 'تطوير وصيانة حلول الخدمات المصرفية الرقمية لبنك فلسطين. العمل على الخدمات المصرفية عبر الهاتف والبوابات الإلكترونية.',
    matchedSkills: ['Java', 'Web Development', 'APIs', 'Security'],
    missingSkills: ['Banking domain knowledge', 'Angular'],
    companyLogo: 'BP',
    companyColor: '#22C55E',
  },
  {
    id: 'job-005',
    titleEn: 'Tech Lead',
    titleAr: 'قائد تقني',
    company: 'PADICO',
    locationEn: 'Ramallah, Palestine',
    locationAr: 'رام الله، فلسطين',
    salaryEn: '₪15,000 – 20,000/mo',
    salaryAr: '15,000 – 20,000 ₪/شهر',
    matchScore: 82,
    matchColor: '#EF4444',
    tags: ['Leadership', 'Architecture', 'Agile', 'Mentoring'],
    tagsAr: ['قيادة', 'معمارية', 'أجايل', 'توجيه'],
    typeEn: 'Full-time · Hybrid',
    typeAr: 'دوام كامل · هجين',
    posted: '3 days ago',
    postedAr: 'منذ 3 أيام',
    descriptionEn: 'Lead a team of 6 engineers building PADICO\'s investment management platform. Drive technical strategy and architecture decisions.',
    descriptionAr: 'قيادة فريق من 6 مهندسين لبناء منصة إدارة الاستثمار في باديكو. قيادة الاستراتيجية التقنية وقرارات المعمارية.',
    matchedSkills: ['Leadership', 'Architecture', 'Agile', 'Code Review'],
    missingSkills: ['Investment domain', 'Team management at scale'],
    companyLogo: 'PD',
    companyColor: '#0D1B3E',
  },
];

export default function SwipeJobQueue() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);
  const [applied, setApplied] = useState<string[]>([]);
  const [skipped, setSkipped] = useState<string[]>([]);
  const { lang, isRTL } = useLanguage();

  const currentJob = JOBS[currentIndex];
  const hasMore = currentIndex < JOBS.length;

  const handleSwipe = (direction: 'left' | 'right') => {
    if (!currentJob) return;
    setSwipeDirection(direction);

    setTimeout(() => {
      if (direction === 'right') {
        setApplied((prev) => [...prev, currentJob.id]);
        toast.success(
          lang === 'ar'
            ? `تم التقديم على ${currentJob.titleAr} في ${currentJob.company}!`
            : `Applied to ${currentJob.titleEn} at ${currentJob.company}!`,
          { description: `Match score: ${currentJob.matchScore}%` }
        );
      } else {
        setSkipped((prev) => [...prev, currentJob.id]);
        toast.info(
          lang === 'ar' ? `تم تخطي ${currentJob.titleAr}` : `Skipped ${currentJob.titleEn}`,
          { description: lang === 'ar' ? 'سنعرض عليك أدواراً مختلفة.' : 'We\'ll show fewer roles like this.' }
        );
      }
      setCurrentIndex((i) => i + 1);
      setSwipeDirection(null);
    }, 300);
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return '#F05A00';
    if (score >= 80) return '#22C55E';
    if (score >= 70) return '#F59E0B';
    return '#EF4444';
  };

  return (
    <div className="space-y-6" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Header */}
      <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
        <div className={isRTL ? 'text-right' : ''}>
          <h2 className={`text-2xl font-bold text-white ${isRTL ? 'font-arabic' : 'font-display'}`}>
            {lang === 'ar' ? 'قائمة تطابق الوظائف' : 'Job Match Queue'}
          </h2>
          <p className={`text-white/40 text-sm mt-0.5 ${isRTL ? 'font-arabic' : ''}`}>
            {lang === 'ar'
              ? `مرر يميناً للتقديم · يساراً للتخطي · ${JOBS.length - currentIndex} متبقية`
              : `Swipe right to apply · Swipe left to skip · ${JOBS.length - currentIndex} remaining`}
          </p>
        </div>
        <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <div className="text-center">
            <div className="font-bold text-[#22C55E] text-xl font-mono-data">{applied.length}</div>
            <div className={`text-white/30 text-xs ${isRTL ? 'font-arabic' : ''}`}>{lang === 'ar' ? 'مُقدَّم' : 'Applied'}</div>
          </div>
          <div className="w-px h-8 bg-white/10" />
          <div className="text-center">
            <div className="font-bold text-white/40 text-xl font-mono-data">{skipped.length}</div>
            <div className={`text-white/30 text-xs ${isRTL ? 'font-arabic' : ''}`}>{lang === 'ar' ? 'متخطى' : 'Skipped'}</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Main swipe card */}
        <div className="xl:col-span-2">
          {hasMore && currentJob ? (
            <div className="relative">
              {currentIndex + 1 < JOBS.length && (
                <div className="absolute inset-0 glass rounded-3xl scale-95 translate-y-3 opacity-40" style={{ zIndex: 0 }} />
              )}

              <div
                className={`relative glass rounded-3xl p-7 transition-all duration-300 ${
                  swipeDirection === 'right' ? 'translate-x-full opacity-0 rotate-12'
                    : swipeDirection === 'left' ? '-translate-x-full opacity-0 -rotate-12' : ''
                }`}
                style={{ zIndex: 1 }}
              >
                <div className={`flex items-start justify-between mb-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-base text-white"
                      style={{ backgroundColor: currentJob.companyColor }}
                    >
                      {currentJob.companyLogo}
                    </div>
                    <div className={isRTL ? 'text-right' : ''}>
                      <h3 className={`text-xl font-bold text-white ${isRTL ? 'font-arabic' : 'font-display'}`}>
                        {lang === 'ar' ? currentJob.titleAr : currentJob.titleEn}
                      </h3>
                      <p className={`text-white/60 text-sm ${isRTL ? 'font-arabic' : ''}`}>
                        {currentJob.company} · {lang === 'ar' ? currentJob.locationAr : currentJob.locationEn}
                      </p>
                    </div>
                  </div>
                  <div className={isRTL ? 'text-left' : 'text-right'}>
                    <div className="font-bold text-3xl font-mono-data" style={{ color: getScoreColor(currentJob.matchScore) }}>
                      {currentJob.matchScore}%
                    </div>
                    <div className={`text-white/30 text-xs ${isRTL ? 'font-arabic' : ''}`}>{lang === 'ar' ? 'تطابق' : 'match'}</div>
                  </div>
                </div>

                <div className="mb-5">
                  <div className={`flex items-center justify-between text-xs text-white/40 mb-1.5 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <span className={isRTL ? 'font-arabic' : ''}>{lang === 'ar' ? 'نقاط التطابق بالذكاء الاصطناعي' : 'AI Match Score'}</span>
                    <span>{currentJob.matchScore}% {lang === 'ar' ? 'متوافق' : 'compatible'}</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{ width: `${currentJob.matchScore}%`, backgroundColor: getScoreColor(currentJob.matchScore) }}
                    />
                  </div>
                </div>

                <div className={`flex flex-wrap items-center gap-3 mb-5 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <span className={`text-xs px-3 py-1 rounded-full bg-white/08 text-white/60 ${isRTL ? 'font-arabic' : ''}`}>
                    {lang === 'ar' ? currentJob.typeAr : currentJob.typeEn}
                  </span>
                  <span className="text-xs px-3 py-1 rounded-full bg-[#F05A00]/10 text-[#F05A00] font-semibold">
                    {lang === 'ar' ? currentJob.salaryAr : currentJob.salaryEn}
                  </span>
                  <span className={`text-xs text-white/30 ${isRTL ? 'font-arabic' : ''}`}>
                    {lang === 'ar' ? `نُشر ${currentJob.postedAr}` : `Posted ${currentJob.posted}`}
                  </span>
                </div>

                <p className={`text-white/60 text-sm leading-relaxed mb-5 ${isRTL ? 'font-arabic text-right' : ''}`}>
                  {lang === 'ar' ? currentJob.descriptionAr : currentJob.descriptionEn}
                </p>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <p className={`text-xs font-semibold text-[#22C55E] uppercase tracking-wider mb-2 ${isRTL ? 'font-arabic text-right' : ''}`}>
                      {lang === 'ar' ? 'المهارات المتطابقة' : 'Matched Skills'}
                    </p>
                    <div className={`flex flex-wrap gap-1.5 ${isRTL ? 'justify-end' : ''}`}>
                      {currentJob.matchedSkills.map((skill) => (
                        <span
                          key={`matched-${currentJob.id}-${skill}`}
                          className="text-xs px-2 py-0.5 rounded-full bg-[#22C55E]/10 text-[#22C55E] border border-[#22C55E]/20"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className={`text-xs font-semibold text-[#EF4444] uppercase tracking-wider mb-2 ${isRTL ? 'font-arabic text-right' : ''}`}>
                      {lang === 'ar' ? 'المهارات المفقودة' : 'Missing Skills'}
                    </p>
                    <div className={`flex flex-wrap gap-1.5 ${isRTL ? 'justify-end' : ''}`}>
                      {currentJob.missingSkills.map((skill) => (
                        <span
                          key={`missing-${currentJob.id}-${skill}`}
                          className="text-xs px-2 py-0.5 rounded-full bg-[#EF4444]/10 text-[#EF4444] border border-[#EF4444]/20"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Swipe buttons */}
                <div className={`flex items-center gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <button
                    onClick={() => handleSwipe('left')}
                    className="flex-1 py-3 rounded-xl glass border border-white/15 text-white/60 hover:text-white hover:bg-white/08 font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    {lang === 'ar' ? 'تخطي' : 'Skip'}
                  </button>
                  <button
                    onClick={() => handleSwipe('right')}
                    className="flex-1 py-3 rounded-xl orange-gradient text-white font-bold text-sm hover:opacity-90 active:scale-95 transition-all duration-150 glow-orange flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {lang === 'ar' ? 'تقديم الآن' : 'Apply Now'}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="glass rounded-3xl p-12 text-center">
              <div className="w-16 h-16 rounded-2xl bg-[#22C55E]/15 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-[#22C55E]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className={`font-bold text-white text-xl mb-2 ${isRTL ? 'font-arabic' : 'font-display'}`}>
                {lang === 'ar' ? 'تم الانتهاء من القائمة!' : 'Queue Complete!'}
              </h3>
              <p className={`text-white/50 text-sm mb-6 ${isRTL ? 'font-arabic' : ''}`}>
                {lang === 'ar'
                  ? `قدّمت على ${applied.length} وظيفة. سيتواصل معك الذكاء الاصطناعي بتطابقات جديدة.`
                  : `You applied to ${applied.length} jobs. AI will notify you of new matches.`}
              </p>
              <button
                onClick={() => { setCurrentIndex(0); setApplied([]); setSkipped([]); }}
                className={`px-6 py-3 rounded-xl orange-gradient text-white font-bold text-sm hover:opacity-90 transition-opacity ${isRTL ? 'font-arabic' : ''}`}
              >
                {lang === 'ar' ? 'إعادة تشغيل القائمة' : 'Restart Queue'}
              </button>
            </div>
          )}
        </div>

        {/* Sidebar — applied/skipped list */}
        <div className="space-y-4">
          <div className="glass rounded-2xl p-4">
            <h3 className={`font-bold text-white text-sm mb-3 ${isRTL ? 'font-arabic text-right' : 'font-display'}`}>
              {lang === 'ar' ? 'الوظائف المُقدَّم عليها' : 'Applied Jobs'}
            </h3>
            {applied.length === 0 ? (
              <p className={`text-white/30 text-xs ${isRTL ? 'font-arabic text-right' : ''}`}>
                {lang === 'ar' ? 'لم تتقدم بعد' : 'No applications yet'}
              </p>
            ) : (
              <div className="space-y-2">
                {applied.map((id) => {
                  const job = JOBS.find((j) => j.id === id);
                  if (!job) return null;
                  return (
                    <div key={`applied-${id}`} className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <span className="w-2 h-2 rounded-full bg-[#22C55E] flex-shrink-0" />
                      <div className={`flex-1 min-w-0 ${isRTL ? 'text-right' : ''}`}>
                        <p className={`text-xs font-medium text-white truncate ${isRTL ? 'font-arabic' : ''}`}>
                          {lang === 'ar' ? job.titleAr : job.titleEn}
                        </p>
                        <p className="text-xs text-white/30">{job.company}</p>
                      </div>
                      <span className="text-xs font-bold text-[#22C55E]">{job.matchScore}%</span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* All jobs list */}
          <div className="glass rounded-2xl p-4">
            <h3 className={`font-bold text-white text-sm mb-3 ${isRTL ? 'font-arabic text-right' : 'font-display'}`}>
              {lang === 'ar' ? 'جميع التطابقات' : 'All Matches'}
            </h3>
            <div className="space-y-2">
              {JOBS.map((job, i) => (
                <div
                  key={job.id}
                  className={`flex items-center gap-2 p-2 rounded-xl transition-colors ${
                    i === currentIndex ? 'bg-[#F05A00]/10 border border-[#F05A00]/20' :
                    applied.includes(job.id) ? 'opacity-40': skipped.includes(job.id) ?'opacity-20' : 'hover:bg-white/04'
                  } ${isRTL ? 'flex-row-reverse' : ''}`}
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                    style={{ backgroundColor: job.companyColor }}
                  >
                    {job.companyLogo}
                  </div>
                  <div className={`flex-1 min-w-0 ${isRTL ? 'text-right' : ''}`}>
                    <p className={`text-xs font-medium text-white truncate ${isRTL ? 'font-arabic' : ''}`}>
                      {lang === 'ar' ? job.titleAr : job.titleEn}
                    </p>
                    <p className="text-xs text-white/30">{job.company}</p>
                  </div>
                  <span className="text-xs font-bold flex-shrink-0" style={{ color: getScoreColor(job.matchScore) }}>
                    {job.matchScore}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function getScoreColor(score: number) {
  if (score >= 90) return '#F05A00';
  if (score >= 80) return '#22C55E';
  if (score >= 70) return '#F59E0B';
  return '#EF4444';
}
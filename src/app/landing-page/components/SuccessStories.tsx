'use client';
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';

const STORIES = [
  {
    id: 'story-ahmad',
    name: 'Ahmad Khalil',
    nameAr: 'أحمد خليل',
    role: 'Senior Software Engineer',
    roleAr: 'مهندس برمجيات أول',
    company: 'Paltel Group',
    location: 'Nablus, Palestine',
    locationAr: 'نابلس، فلسطين',
    matchScore: 93,
    salaryIncrease: '+38%',
    timeToHire: '9 days',
    quote: 'I applied to dozens of jobs manually with no responses. On Amalk, I got shortlisted within 48 hours. The AI matched me to Paltel based purely on my skills — not who I know.',
    quoteAr: 'تقدمت لعشرات الوظائف يدوياً دون أي رد. على أمالك، تم اختياري خلال 48 ساعة. طابقني الذكاء الاصطناعي مع بالتل بناءً على مهاراتي فقط.',
    avatar: 'AK',
    avatarColor: '#F05A00',
    tags: ['React', 'Node.js', 'Cloud'],
    tagsAr: ['ريأكت', 'نود جي إس', 'الحوسبة السحابية'],
  },
  {
    id: 'story-layla',
    name: 'Layla Hassan',
    nameAr: 'ليلى حسن',
    role: 'UX Designer',
    roleAr: 'مصممة تجربة مستخدم',
    company: 'Bank of Palestine',
    location: 'Gaza, Palestine',
    locationAr: 'غزة، فلسطين',
    matchScore: 91,
    salaryIncrease: '+31%',
    timeToHire: '11 days',
    quote: 'As a designer in Gaza, opportunities felt limited. Amalk connected me with Bank of Palestine — the blind screening meant my portfolio was evaluated on quality, not my location.',
    quoteAr: 'كمصممة في غزة، بدت الفرص محدودة. ربطتني أمالك ببنك فلسطين — الفحص العمياء يعني تقييم أعمالي على الجودة، لا على موقعي.',
    avatar: 'LH',
    avatarColor: '#22C55E',
    tags: ['UX Design', 'Figma', 'User Research'],
    tagsAr: ['تصميم UX', 'فيغما', 'بحث المستخدم'],
  },
  {
    id: 'story-rami',
    name: 'Rami Barakat',
    nameAr: 'رامي بركات',
    role: 'Product Manager',
    roleAr: 'مدير منتج',
    company: 'Jawwal',
    location: 'Hebron, Palestine',
    locationAr: 'الخليل، فلسطين',
    matchScore: 89,
    salaryIncrease: '+44%',
    timeToHire: '7 days',
    quote: 'The salary predictor showed me I was worth 40% more than I was making. I negotiated with that data and got it. Amalk paid for itself a hundred times over.',
    quoteAr: 'أظهر لي توقع الراتب أنني أستحق 40% أكثر مما كنت أتقاضاه. تفاوضت بتلك البيانات وحصلت عليه. أمالك استحقت كل شيء.',
    avatar: 'RB',
    avatarColor: '#818CF8',
    tags: ['Product Strategy', 'Agile', 'Analytics'],
    tagsAr: ['استراتيجية المنتج', 'أجايل', 'التحليلات'],
  },
];

const COMPANIES = [
  { id: 'co-paltel', name: 'Paltel', nameAr: 'بالتل', sector: 'Telecom', sectorAr: 'اتصالات', color: '#F05A00', initials: 'PT' },
  { id: 'co-jawwal', name: 'Jawwal', nameAr: 'جوال', sector: 'Mobile', sectorAr: 'هاتف محمول', color: '#0D1B3E', initials: 'JW' },
  { id: 'co-ooredoo', name: 'Ooredoo', nameAr: 'أوريدو', sector: 'Telecom', sectorAr: 'اتصالات', color: '#EF4444', initials: 'OR' },
  { id: 'co-bop', name: 'Bank of Palestine', nameAr: 'بنك فلسطين', sector: 'Banking', sectorAr: 'مصرفية', color: '#22C55E', initials: 'BP' },
  { id: 'co-siniora', name: 'Siniora', nameAr: 'سنيورة', sector: 'Food & Beverage', sectorAr: 'أغذية ومشروبات', color: '#F59E0B', initials: 'SN' },
  { id: 'co-juneidi', name: 'Al-Juneidi', nameAr: 'الجنيدي', sector: 'Dairy', sectorAr: 'ألبان', color: '#818CF8', initials: 'AJ' },
  { id: 'co-padico', name: 'PADICO', nameAr: 'باديكو', sector: 'Investment', sectorAr: 'استثمار', color: '#0D1B3E', initials: 'PD' },
];

export default function SuccessStories() {
  const { t, isRTL, lang } = useLanguage();

  return (
    <>
      {/* Featured Companies Section */}
      <section className="py-16 px-6 lg:px-10 bg-white" dir={isRTL ? 'rtl' : 'ltr'}>
        <div className="max-w-screen-2xl mx-auto">
          <div className="text-center mb-10">
            <span className={`text-xs font-semibold text-[#F05A00] tracking-widest uppercase mb-3 block ${isRTL ? 'font-arabic' : ''}`}>
              {t?.companies?.sectionLabel}
            </span>
            <h2 className={`text-3xl md:text-4xl font-bold text-[#0D1B3E] mb-3 ${isRTL ? 'font-arabic' : 'font-display'}`}>
              {t?.companies?.sectionTitle}
            </h2>
            <p className={`text-[#0D1B3E]/55 text-base max-w-xl mx-auto ${isRTL ? 'font-arabic' : ''}`}>
              {t?.companies?.sectionSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-4">
            {COMPANIES?.map((company) => (
              <div
                key={company?.id}
                className="flex flex-col items-center gap-3 p-4 rounded-xl border border-gray-100 bg-white hover:shadow-md hover:border-[#F05A00]/20 transition-all duration-200 group cursor-pointer"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-sm text-white"
                  style={{ backgroundColor: company?.color }}
                >
                  {company?.initials}
                </div>
                <div className="text-center">
                  <p className={`text-xs font-bold text-[#0D1B3E] group-hover:text-[#F05A00] transition-colors ${isRTL ? 'font-arabic' : ''}`}>
                    {lang === 'ar' ? company?.nameAr : company?.name}
                  </p>
                  <p className={`text-xs text-[#0D1B3E]/40 mt-0.5 ${isRTL ? 'font-arabic' : ''}`}>
                    {lang === 'ar' ? company?.sectorAr : company?.sector}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Success Stories Section */}
      <section id="stories" className="py-24 px-6 lg:px-10 relative overflow-hidden" dir={isRTL ? 'rtl' : 'ltr'}>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,rgba(26,35,126,0.4)_0%,transparent_60%)]" />
        <div className="max-w-screen-2xl mx-auto relative z-10">
          <div className="text-center mb-14">
            <span className={`text-xs font-semibold text-[#F05A00] tracking-widest uppercase mb-3 block ${isRTL ? 'font-arabic' : ''}`}>
              {t?.successStories?.sectionLabel}
            </span>
            <h2 className={`text-4xl md:text-5xl font-bold text-white mb-4 ${isRTL ? 'font-arabic' : 'font-display'}`}>
              {t?.successStories?.sectionTitle}
            </h2>
            <p className={`text-white/50 text-lg max-w-2xl mx-auto ${isRTL ? 'font-arabic' : ''}`}>
              {t?.successStories?.sectionSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {STORIES?.map((story) => (
              <div key={story?.id} className="glass rounded-3xl p-7 card-hover flex flex-col gap-5 relative overflow-hidden group">
                <div
                  className="absolute -bottom-8 -right-8 w-40 h-40 rounded-full blur-3xl opacity-05 group-hover:opacity-10 transition-opacity duration-500"
                  style={{ backgroundColor: story?.avatarColor }}
                />

                <div className={`flex items-start justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-sm text-[#0D1547]"
                      style={{ backgroundColor: story?.avatarColor }}
                    >
                      {story?.avatar}
                    </div>
                    <div className={isRTL ? 'text-right' : ''}>
                      <p className={`font-bold text-white text-sm ${isRTL ? 'font-arabic' : 'font-display'}`}>
                        {lang === 'ar' ? story?.nameAr : story?.name}
                      </p>
                      <p className={`text-white/50 text-xs ${isRTL ? 'font-arabic' : ''}`}>
                        {lang === 'ar' ? story?.roleAr : story?.role} · {story?.company}
                      </p>
                      <p className={`text-white/30 text-xs ${isRTL ? 'font-arabic' : ''}`}>
                        {lang === 'ar' ? story?.locationAr : story?.location}
                      </p>
                    </div>
                  </div>
                  <div className={isRTL ? 'text-left' : 'text-right'}>
                    <div className="text-2xl font-bold font-mono-data" style={{ color: story?.avatarColor }}>
                      {story?.matchScore}%
                    </div>
                    <div className={`text-white/30 text-xs ${isRTL ? 'font-arabic' : ''}`}>{t?.successStories?.matchLabel}</div>
                  </div>
                </div>

                <blockquote
                  className={`text-white/70 text-sm leading-relaxed italic ${isRTL ? 'border-r-2 pr-4 font-arabic text-right' : 'border-l-2 pl-4'}`}
                  style={{ borderColor: `${story?.avatarColor}50` }}
                >
                  &ldquo;{lang === 'ar' ? story?.quoteAr : story?.quote}&rdquo;
                </blockquote>

                <div className="grid grid-cols-2 gap-3">
                  <div className="glass-dark rounded-xl p-3 text-center">
                    <div className="font-bold text-[#22C55E] text-lg font-mono-data">{story?.salaryIncrease}</div>
                    <div className={`text-white/40 text-xs ${isRTL ? 'font-arabic' : ''}`}>{t?.successStories?.salaryLabel}</div>
                  </div>
                  <div className="glass-dark rounded-xl p-3 text-center">
                    <div className="font-bold text-[#F05A00] text-lg font-mono-data">{story?.timeToHire}</div>
                    <div className={`text-white/40 text-xs ${isRTL ? 'font-arabic' : ''}`}>{t?.successStories?.timeLabel}</div>
                  </div>
                </div>

                <div className={`flex flex-wrap gap-2 ${isRTL ? 'justify-end' : ''}`}>
                  {(lang === 'ar' ? story?.tagsAr : story?.tags)?.map((tag, i) => (
                    <span
                      key={`${story?.id}-tag-${i}`}
                      className={`text-xs px-2.5 py-1 rounded-full ${isRTL ? 'font-arabic' : ''}`}
                      style={{ backgroundColor: `${story?.avatarColor}15`, color: story?.avatarColor }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
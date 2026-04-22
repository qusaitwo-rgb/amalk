'use client';
import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { toast } from 'sonner';
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer, Tooltip } from 'recharts';

const JOBS_FOR_SHORTLIST = [
  { id: 'js-1', titleEn: 'Senior Software Engineer', titleAr: 'مهندس برمجيات أول', applicants: 14 },
  { id: 'js-2', titleEn: 'Full Stack Developer', titleAr: 'مطور متكامل', applicants: 9 },
  { id: 'js-3', titleEn: 'Backend Engineer', titleAr: 'مهندس خلفية', applicants: 6 },
];

const SHORTLISTED_CANDIDATES = [
  {
    id: 'sc-1', nameEn: 'Ahmad Khalil', nameAr: 'أحمد خليل', initials: 'AK', color: '#F05A00', match: 94,
    reasonEn: 'Exceptional React & Node.js skills. 5 years experience matches role requirements. Located in Ramallah — zero relocation needed.',
    reasonAr: 'مهارات استثنائية في React و Node.js. خبرة 5 سنوات تتطابق مع متطلبات الدور. يقيم في رام الله — لا حاجة للانتقال.',
    skills: [
      { skill: 'React', score: 95 }, { skill: 'Node.js', score: 90 }, { skill: 'TypeScript', score: 88 },
      { skill: 'SQL', score: 75 }, { skill: 'DevOps', score: 70 }, { skill: 'Leadership', score: 80 },
    ],
    blindScore: 94, experienceEn: '5 years', experienceAr: '5 سنوات', cityEn: 'Ramallah', cityAr: 'رام الله',
  },
  {
    id: 'sc-2', nameEn: 'Layla Hassan', nameAr: 'ليلى حسن', initials: 'LH', color: '#818CF8', match: 91,
    reasonEn: 'Strong full-stack background with Vue.js and Python. Portfolio shows 3 production apps. Excellent communication skills.',
    reasonAr: 'خلفية قوية في التطوير الكامل مع Vue.js و Python. المحفظة تُظهر 3 تطبيقات إنتاجية. مهارات تواصل ممتازة.',
    skills: [
      { skill: 'Vue.js', score: 92 }, { skill: 'Python', score: 88 }, { skill: 'PostgreSQL', score: 85 },
      { skill: 'React', score: 70 }, { skill: 'DevOps', score: 65 }, { skill: 'Leadership', score: 75 },
    ],
    blindScore: 91, experienceEn: '4 years', experienceAr: '4 سنوات', cityEn: 'Gaza', cityAr: 'غزة',
  },
  {
    id: 'sc-3', nameEn: 'Rami Nasser', nameAr: 'رامي ناصر', initials: 'RN', color: '#22C55E', match: 88,
    reasonEn: 'Java & Spring Boot expert with microservices experience. 6 years in enterprise software. Strong system design skills.',
    reasonAr: 'خبير Java و Spring Boot مع خبرة في الخدمات المصغرة. 6 سنوات في برمجيات المؤسسات. مهارات قوية في تصميم الأنظمة.',
    skills: [
      { skill: 'Java', score: 96 }, { skill: 'Spring', score: 90 }, { skill: 'Docker', score: 85 },
      { skill: 'SQL', score: 88 }, { skill: 'DevOps', score: 80 }, { skill: 'Leadership', score: 72 },
    ],
    blindScore: 88, experienceEn: '6 years', experienceAr: '6 سنوات', cityEn: 'Nablus', cityAr: 'نابلس',
  },
  {
    id: 'sc-4', nameEn: 'Sara Mansour', nameAr: 'سارة منصور', initials: 'SM', color: '#F59E0B', match: 85,
    reasonEn: 'Data analysis specialist with Python & Tableau. Proven track record in business intelligence. Fast learner.',
    reasonAr: 'متخصصة في تحليل البيانات مع Python و Tableau. سجل حافل في ذكاء الأعمال. متعلمة سريعة.',
    skills: [
      { skill: 'Python', score: 90 }, { skill: 'SQL', score: 88 }, { skill: 'Tableau', score: 85 },
      { skill: 'React', score: 50 }, { skill: 'DevOps', score: 45 }, { skill: 'Leadership', score: 70 },
    ],
    blindScore: 85, experienceEn: '3 years', experienceAr: '3 سنوات', cityEn: 'Hebron', cityAr: 'الخليل',
  },
  {
    id: 'sc-5', nameEn: 'Omar Barakat', nameAr: 'عمر بركات', initials: 'OB', color: '#EC4899', match: 82,
    reasonEn: 'Creative UX/UI designer with strong Figma skills. User research background adds strategic value to the team.',
    reasonAr: 'مصمم UX/UI مبدع بمهارات Figma قوية. خلفية في أبحاث المستخدم تضيف قيمة استراتيجية للفريق.',
    skills: [
      { skill: 'Figma', score: 95 }, { skill: 'Adobe XD', score: 88 }, { skill: 'CSS', score: 82 },
      { skill: 'React', score: 60 }, { skill: 'DevOps', score: 30 }, { skill: 'Leadership', score: 65 },
    ],
    blindScore: 82, experienceEn: '4 years', experienceAr: '4 سنوات', cityEn: 'Jerusalem', cityAr: 'القدس',
  },
];

export default function AIShortlisting() {
  const { lang, isRTL } = useLanguage();
  const [selectedJob, setSelectedJob] = useState(JOBS_FOR_SHORTLIST[0].id);
  const [running, setRunning] = useState(false);
  const [ran, setRan] = useState(true);
  const [blindMode, setBlindMode] = useState(true);
  const [selectedCandidate, setSelectedCandidate] = useState(SHORTLISTED_CANDIDATES[0]);

  const handleRunAI = async () => {
    setRunning(true);
    setRan(false);
    toast.info(lang === 'ar' ? 'الذكاء الاصطناعي يحلل المرشحين...' : 'AI is analyzing candidates...');
    await new Promise(r => setTimeout(r, 2200));
    setRunning(false);
    setRan(true);
    toast.success(
      lang === 'ar' ? 'تم تصنيف 5 مرشحين بنجاح!' : 'Successfully ranked 5 candidates!',
      { description: lang === 'ar' ? 'الفحص العمياء مفعّل — الأسماء مخفية أثناء التحليل' : 'Blind screening active — names hidden during analysis' }
    );
  };

  const handleInvite = (name: string) => {
    toast.success(
      lang === 'ar' ? `تم إرسال دعوة مقابلة إلى ${name}` : `Interview invitation sent to ${name}`,
      { description: lang === 'ar' ? 'سيتلقى المرشح إشعاراً فورياً' : 'Candidate will receive an instant notification' }
    );
  };

  const selectedJobData = JOBS_FOR_SHORTLIST.find(j => j.id === selectedJob);

  return (
    <div className="space-y-6" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Header */}
      <div className={`flex items-center justify-between flex-wrap gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
        <div className={isRTL ? 'text-right' : ''}>
          <h2 className={`text-2xl font-bold text-white ${isRTL ? 'font-arabic' : 'font-display'}`}>{lang === 'ar' ? 'القائمة المختصرة بالذكاء الاصطناعي' : 'AI Shortlisting'}</h2>
          <p className={`text-white/40 text-sm mt-0.5 ${isRTL ? 'font-arabic' : ''}`}>{lang === 'ar' ? 'تصنيف المرشحين بدون تحيز' : 'Bias-free candidate ranking'}</p>
        </div>
        <div className={`flex items-center gap-3 flex-wrap ${isRTL ? 'flex-row-reverse' : ''}`}>
          {/* Blind mode toggle */}
          <button
            onClick={() => setBlindMode(!blindMode)}
            className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium transition-all border ${blindMode ? 'bg-[#22C55E]/10 border-[#22C55E]/30 text-[#22C55E]' : 'glass border-white/10 text-white/50'} ${isRTL ? 'flex-row-reverse font-arabic' : ''}`}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
            {lang === 'ar' ? (blindMode ? 'الفحص العمياء: مفعّل' : 'الفحص العمياء: معطّل') : (blindMode ? 'Blind Mode: ON' : 'Blind Mode: OFF')}
          </button>
          <button
            onClick={handleRunAI}
            disabled={running}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl orange-gradient text-white font-bold text-sm hover:opacity-90 active:scale-95 transition-all duration-150 glow-orange disabled:opacity-60 ${isRTL ? 'font-arabic flex-row-reverse' : 'font-display'}`}
          >
            {running ? (
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
            ) : (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            )}
            {running ? (lang === 'ar' ? 'جارٍ التحليل...' : 'Analyzing...') : (lang === 'ar' ? 'تشغيل الذكاء الاصطناعي' : 'Run AI Analysis')}
          </button>
        </div>
      </div>

      {/* Job selector */}
      <div className="rounded-2xl p-5 glass border border-white/08">
        <p className={`text-xs text-white/40 mb-3 ${isRTL ? 'font-arabic text-right' : ''}`}>{lang === 'ar' ? 'اختر الوظيفة للتحليل' : 'Select job for analysis'}</p>
        <div className={`flex gap-3 flex-wrap ${isRTL ? 'flex-row-reverse' : ''}`}>
          {JOBS_FOR_SHORTLIST.map(j => (
            <button
              key={j.id}
              onClick={() => setSelectedJob(j.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all border ${selectedJob === j.id ? 'bg-[#F05A00]/15 border-[#F05A00]/30 text-[#F05A00]' : 'glass border-white/10 text-white/50 hover:text-white'} ${isRTL ? 'flex-row-reverse font-arabic' : ''}`}
            >
              <span>{lang === 'ar' ? j.titleAr : j.titleEn}</span>
              <span className="text-xs px-1.5 py-0.5 rounded-full bg-white/10 text-white/50">{j.applicants}</span>
            </button>
          ))}
        </div>
      </div>

      {ran && (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Ranked list */}
          <div className="lg:col-span-2 space-y-3">
            <div className={`flex items-center justify-between mb-1 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <p className={`text-sm font-semibold text-white ${isRTL ? 'font-arabic' : ''}`}>{lang === 'ar' ? 'أفضل 5 مرشحين' : 'Top 5 Candidates'}</p>
              {blindMode && <span className={`text-xs text-[#22C55E] flex items-center gap-1 ${isRTL ? 'flex-row-reverse font-arabic' : ''}`}>🛡️ {lang === 'ar' ? 'فحص عمياء' : 'Blind screening'}</span>}
            </div>
            {SHORTLISTED_CANDIDATES.map((c, idx) => (
              <div
                key={c.id}
                onClick={() => setSelectedCandidate(c)}
                className={`rounded-2xl p-4 glass border transition-all duration-200 cursor-pointer ${selectedCandidate.id === c.id ? 'border-[#F05A00]/40 bg-[#F05A00]/05' : 'border-white/08 hover:border-white/20'}`}
              >
                <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <span className="text-lg font-bold text-white/20 w-6 text-center flex-shrink-0">#{idx + 1}</span>
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold flex-shrink-0" style={{ backgroundColor: `${c.color}25`, color: c.color }}>
                    {blindMode ? '?' : c.initials}
                  </div>
                  <div className={`flex-1 min-w-0 ${isRTL ? 'text-right' : ''}`}>
                    <p className={`text-sm font-bold text-white ${isRTL ? 'font-arabic' : ''}`}>
                      {blindMode ? (lang === 'ar' ? `مرشح #${idx + 1}` : `Candidate #${idx + 1}`) : (lang === 'ar' ? c.nameAr : c.nameEn)}
                    </p>
                    <p className={`text-xs text-white/40 ${isRTL ? 'font-arabic' : ''}`}>{lang === 'ar' ? c.cityAr : c.cityEn} · {lang === 'ar' ? c.experienceAr : c.experienceEn}</p>
                  </div>
                  <div className="flex flex-col items-end flex-shrink-0">
                    <span className="text-base font-bold" style={{ color: c.color }}>{c.match}%</span>
                    <div className="w-16 h-1.5 rounded-full bg-white/10 mt-1">
                      <div className="h-full rounded-full transition-all duration-500" style={{ width: `${c.match}%`, backgroundColor: c.color }} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Candidate detail */}
          <div className="lg:col-span-3 rounded-2xl p-6 glass border border-white/08">
            <div className={`flex items-center justify-between mb-5 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-sm font-bold" style={{ backgroundColor: `${selectedCandidate.color}25`, color: selectedCandidate.color }}>
                  {blindMode ? '?' : selectedCandidate.initials}
                </div>
                <div className={isRTL ? 'text-right' : ''}>
                  <p className={`text-base font-bold text-white ${isRTL ? 'font-arabic' : ''}`}>
                    {blindMode ? (lang === 'ar' ? 'مرشح مجهول' : 'Anonymous Candidate') : (lang === 'ar' ? selectedCandidate.nameAr : selectedCandidate.nameEn)}
                  </p>
                  <p className={`text-xs text-white/40 ${isRTL ? 'font-arabic' : ''}`}>{lang === 'ar' ? selectedCandidate.cityAr : selectedCandidate.cityEn} · {lang === 'ar' ? selectedCandidate.experienceAr : selectedCandidate.experienceEn}</p>
                </div>
              </div>
              <span className="text-2xl font-bold" style={{ color: selectedCandidate.color }}>{selectedCandidate.match}%</span>
            </div>

            {/* AI Reason */}
            <div className="rounded-xl p-4 bg-[#22C55E]/05 border border-[#22C55E]/15 mb-5">
              <p className={`text-xs text-[#22C55E] font-semibold mb-1.5 flex items-center gap-1.5 ${isRTL ? 'flex-row-reverse font-arabic' : ''}`}>
                🤖 {lang === 'ar' ? 'تحليل الذكاء الاصطناعي' : 'AI Analysis'}
              </p>
              <p className={`text-sm text-white/70 leading-relaxed ${isRTL ? 'font-arabic text-right' : ''}`}>
                {lang === 'ar' ? selectedCandidate.reasonAr : selectedCandidate.reasonEn}
              </p>
            </div>

            {/* Radar chart */}
            <div className="mb-5">
              <p className={`text-xs text-white/40 mb-3 ${isRTL ? 'font-arabic text-right' : ''}`}>{lang === 'ar' ? 'مخطط المهارات' : 'Skills Radar'}</p>
              <ResponsiveContainer width="100%" height={180}>
                <RadarChart data={selectedCandidate.skills}>
                  <PolarGrid stroke="rgba(255,255,255,0.08)" />
                  <PolarAngleAxis dataKey="skill" tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 11 }} />
                  <Radar name="Score" dataKey="score" stroke={selectedCandidate.color} fill={selectedCandidate.color} fillOpacity={0.2} strokeWidth={2} />
                  <Tooltip contentStyle={{ background: '#0D1B3E', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: '#fff', fontSize: 12 }} />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            <button
              onClick={() => handleInvite(lang === 'ar' ? selectedCandidate.nameAr : selectedCandidate.nameEn)}
              className={`w-full py-3 rounded-xl orange-gradient text-white font-bold text-sm hover:opacity-90 active:scale-95 transition-all duration-150 ${isRTL ? 'font-arabic' : 'font-display'}`}
            >
              {lang === 'ar' ? 'دعوة للمقابلة' : 'Invite to Interview'}
            </button>
          </div>
        </div>
      )}

      {!ran && !running && (
        <div className="rounded-2xl p-12 glass border border-white/08 text-center">
          <div className="w-16 h-16 rounded-2xl bg-[#F05A00]/10 flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-[#F05A00]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
          </div>
          <p className={`text-white/50 ${isRTL ? 'font-arabic' : ''}`}>{lang === 'ar' ? 'اضغط "تشغيل الذكاء الاصطناعي" لتصنيف المرشحين' : 'Click "Run AI Analysis" to rank candidates'}</p>
        </div>
      )}
    </div>
  );
}

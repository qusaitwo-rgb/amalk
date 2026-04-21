'use client';
import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { toast } from 'sonner';

const JOBS = [
  { id: 'j-1', titleEn: 'Senior Software Engineer', titleAr: 'مهندس برمجيات أول', cityEn: 'Ramallah', cityAr: 'رام الله', type: 'Full-time', salaryEn: '₪12,000–16,000/mo', salaryAr: '12,000–16,000 ₪/شهر', applicants: 14, daysLeft: 8, status: 'active', match: 94 },
  { id: 'j-2', titleEn: 'Full Stack Developer', titleAr: 'مطور متكامل', cityEn: 'Nablus', cityAr: 'نابلس', type: 'Full-time', salaryEn: '₪10,000–13,000/mo', salaryAr: '10,000–13,000 ₪/شهر', applicants: 9, daysLeft: 14, status: 'active', match: 91 },
  { id: 'j-3', titleEn: 'Backend Engineer', titleAr: 'مهندس خلفية', cityEn: 'Ramallah', cityAr: 'رام الله', type: 'Remote', salaryEn: '₪11,000–14,000/mo', salaryAr: '11,000–14,000 ₪/شهر', applicants: 6, daysLeft: 2, status: 'closing', match: 88 },
  { id: 'j-4', titleEn: 'Data Analyst', titleAr: 'محلل بيانات', cityEn: 'Gaza', cityAr: 'غزة', type: 'Full-time', salaryEn: '₪8,000–11,000/mo', salaryAr: '8,000–11,000 ₪/شهر', applicants: 3, daysLeft: 21, status: 'active', match: 85 },
  { id: 'j-5', titleEn: 'UX/UI Designer', titleAr: 'مصمم UX/UI', cityEn: 'Hebron', cityAr: 'الخليل', type: 'Part-time', salaryEn: '₪7,000–9,000/mo', salaryAr: '7,000–9,000 ₪/شهر', applicants: 2, daysLeft: 30, status: 'draft', match: 80 },
];

const STATUS_STYLES: Record<string, { bg: string; text: string; labelEn: string; labelAr: string }> = {
  active: { bg: '#22C55E15', text: '#22C55E', labelEn: 'Active', labelAr: 'نشط' },
  closing: { bg: '#F59E0B15', text: '#F59E0B', labelEn: 'Closing Soon', labelAr: 'ينتهي قريباً' },
  draft: { bg: 'rgba(255,255,255,0.05)', text: 'rgba(255,255,255,0.4)', labelEn: 'Draft', labelAr: 'مسودة' },
  paused: { bg: '#818CF815', text: '#818CF8', labelEn: 'Paused', labelAr: 'متوقف' },
};

export default function JobPostings() {
  const { lang, isRTL } = useLanguage();
  const [jobs, setJobs] = useState(JOBS);
  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState('all');
  const [jobTitle, setJobTitle] = useState('');
  const [jobCity, setJobCity] = useState('Ramallah');
  const [jobType, setJobType] = useState('Full-time');
  const [jobSalary, setJobSalary] = useState('');
  const [jobDesc, setJobDesc] = useState('');
  const [generating, setGenerating] = useState(false);

  const filtered = filter === 'all' ? jobs : jobs.filter(j => j.status === filter);

  const handleGenerateDesc = async () => {
    if (!jobTitle.trim()) {
      toast.error(lang === 'ar' ? 'أدخل عنوان الوظيفة أولاً' : 'Enter job title first');
      return;
    }
    setGenerating(true);
    toast.info(lang === 'ar' ? 'الذكاء الاصطناعي يكتب وصف الوظيفة...' : 'AI is writing job description...');
    await new Promise(r => setTimeout(r, 1800));
    setJobDesc(
      lang === 'ar'
        ? `نبحث عن ${jobTitle} موهوب للانضمام إلى فريقنا في ${jobCity}. ستعمل على مشاريع مبتكرة وتساهم في تطوير منتجاتنا. المتطلبات: خبرة 3+ سنوات، مهارات تقنية متقدمة، وقدرة على العمل ضمن فريق. نقدم راتباً تنافسياً وبيئة عمل محفزة.`
        : `We are looking for a talented ${jobTitle} to join our team in ${jobCity}. You will work on innovative projects and contribute to our product development. Requirements: 3+ years experience, strong technical skills, team player. We offer competitive salary and a motivating work environment.`
    );
    setGenerating(false);
    toast.success(lang === 'ar' ? 'تم توليد وصف الوظيفة بنجاح!' : 'Job description generated successfully!');
  };

  const handlePostJob = () => {
    if (!jobTitle.trim()) {
      toast.error(lang === 'ar' ? 'يرجى إدخال عنوان الوظيفة' : 'Please enter a job title');
      return;
    }
    const newJob = {
      id: `j-${Date.now()}`,
      titleEn: jobTitle,
      titleAr: jobTitle,
      cityEn: jobCity,
      cityAr: jobCity,
      type: jobType,
      salaryEn: jobSalary || '₪8,000–12,000/mo',
      salaryAr: jobSalary || '8,000–12,000 ₪/شهر',
      applicants: 0,
      daysLeft: 30,
      status: 'active',
      match: 0,
    };
    setJobs(prev => [newJob, ...prev]);
    toast.success(lang === 'ar' ? `تم نشر "${jobTitle}" بنجاح!` : `"${jobTitle}" posted successfully!`);
    setShowModal(false);
    setJobTitle(''); setJobCity('Ramallah'); setJobType('Full-time'); setJobSalary(''); setJobDesc('');
  };

  const handleToggleStatus = (id: string) => {
    setJobs(prev => prev.map(j => j.id === id ? { ...j, status: j.status === 'active' ? 'paused' : 'active' } : j));
    toast.success(lang === 'ar' ? 'تم تحديث حالة الوظيفة' : 'Job status updated');
  };

  return (
    <div className="space-y-6" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Header */}
      <div className={`flex items-center justify-between flex-wrap gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
        <div className={isRTL ? 'text-right' : ''}>
          <h2 className={`text-2xl font-bold text-white ${isRTL ? 'font-arabic' : 'font-display'}`}>{lang === 'ar' ? 'إعلانات الوظائف' : 'Job Postings'}</h2>
          <p className={`text-white/40 text-sm mt-0.5 ${isRTL ? 'font-arabic' : ''}`}>{lang === 'ar' ? `${jobs.length} وظيفة منشورة` : `${jobs.length} jobs posted`}</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className={`px-5 py-2.5 rounded-xl orange-gradient text-white font-bold text-sm hover:opacity-90 active:scale-95 transition-all duration-150 glow-orange ${isRTL ? 'font-arabic' : 'font-display'}`}
        >
          {lang === 'ar' ? '+ نشر وظيفة جديدة' : '+ Post New Job'}
        </button>
      </div>

      {/* Filter tabs */}
      <div className={`flex gap-2 flex-wrap ${isRTL ? 'flex-row-reverse' : ''}`}>
        {[
          { id: 'all', labelEn: 'All Jobs', labelAr: 'كل الوظائف' },
          { id: 'active', labelEn: 'Active', labelAr: 'نشطة' },
          { id: 'closing', labelEn: 'Closing Soon', labelAr: 'تنتهي قريباً' },
          { id: 'draft', labelEn: 'Drafts', labelAr: 'مسودات' },
        ].map(f => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${filter === f.id ? 'bg-[#F05A00] text-white' : 'glass text-white/50 hover:text-white border border-white/10'} ${isRTL ? 'font-arabic' : ''}`}
          >
            {lang === 'ar' ? f.labelAr : f.labelEn}
          </button>
        ))}
      </div>

      {/* Jobs list */}
      <div className="space-y-4">
        {filtered.map((job) => {
          const s = STATUS_STYLES[job.status];
          return (
            <div key={job.id} className="rounded-2xl p-5 glass border border-white/08 hover:border-white/15 transition-all duration-200">
              <div className={`flex items-start justify-between gap-4 flex-wrap ${isRTL ? 'flex-row-reverse' : ''}`}>
                <div className={`flex-1 min-w-0 ${isRTL ? 'text-right' : ''}`}>
                  <div className={`flex items-center gap-3 mb-1 flex-wrap ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <h3 className={`text-base font-bold text-white ${isRTL ? 'font-arabic' : 'font-display'}`}>{lang === 'ar' ? job.titleAr : job.titleEn}</h3>
                    <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ backgroundColor: s.bg, color: s.text }}>
                      {lang === 'ar' ? s.labelAr : s.labelEn}
                    </span>
                  </div>
                  <div className={`flex items-center gap-4 text-xs text-white/40 flex-wrap ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <span className={`flex items-center gap-1 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                      {lang === 'ar' ? job.cityAr : job.cityEn}
                    </span>
                    <span>{job.type}</span>
                    <span className={isRTL ? 'font-arabic' : ''}>{lang === 'ar' ? job.salaryAr : job.salaryEn}</span>
                    <span className={`${job.daysLeft <= 3 ? 'text-[#EF4444]' : 'text-white/40'} ${isRTL ? 'font-arabic' : ''}`}>
                      {lang === 'ar' ? `${job.daysLeft} يوم متبقي` : `${job.daysLeft} days left`}
                    </span>
                  </div>
                </div>
                <div className={`flex items-center gap-4 flex-shrink-0 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <div className={`text-center ${isRTL ? 'text-right' : ''}`}>
                    <p className="text-xl font-bold text-[#818CF8]">{job.applicants}</p>
                    <p className={`text-xs text-white/40 ${isRTL ? 'font-arabic' : ''}`}>{lang === 'ar' ? 'متقدم' : 'applicants'}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleToggleStatus(job.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all glass border border-white/10 hover:border-white/25 text-white/60 hover:text-white ${isRTL ? 'font-arabic' : ''}`}
                    >
                      {job.status === 'active' ? (lang === 'ar' ? 'إيقاف' : 'Pause') : (lang === 'ar' ? 'تفعيل' : 'Activate')}
                    </button>
                    <button className={`px-3 py-1.5 rounded-lg text-xs font-medium bg-[#F05A00]/10 border border-[#F05A00]/25 text-[#F05A00] hover:bg-[#F05A00]/20 transition-all ${isRTL ? 'font-arabic' : ''}`}>
                      {lang === 'ar' ? 'تعديل' : 'Edit'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Post Job Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg rounded-3xl bg-[#0D1B3E] border border-white/15 p-6 shadow-2xl max-h-[90vh] overflow-y-auto" dir={isRTL ? 'rtl' : 'ltr'}>
            <div className={`flex items-center justify-between mb-5 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <h3 className={`text-lg font-bold text-white ${isRTL ? 'font-arabic' : 'font-display'}`}>{lang === 'ar' ? 'نشر وظيفة جديدة' : 'Post New Job'}</h3>
              <button onClick={() => setShowModal(false)} className="text-white/40 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className={`text-xs text-white/50 mb-1.5 block ${isRTL ? 'font-arabic text-right' : ''}`}>{lang === 'ar' ? 'عنوان الوظيفة *' : 'Job Title *'}</label>
                <input value={jobTitle} onChange={e => setJobTitle(e.target.value)} placeholder={lang === 'ar' ? 'مثال: مهندس برمجيات أول' : 'e.g. Senior Software Engineer'} className={`w-full bg-white/05 border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-white/25 outline-none focus:border-[#F05A00]/50 transition-colors ${isRTL ? 'text-right font-arabic' : ''}`} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={`text-xs text-white/50 mb-1.5 block ${isRTL ? 'font-arabic text-right' : ''}`}>{lang === 'ar' ? 'المدينة' : 'City'}</label>
                  <select value={jobCity} onChange={e => setJobCity(e.target.value)} className={`w-full bg-white/05 border border-white/15 rounded-xl px-3 py-3 text-sm text-white outline-none focus:border-[#F05A00]/50 ${isRTL ? 'text-right font-arabic' : ''}`}>
                    {['Ramallah', 'Gaza', 'Nablus', 'Hebron', 'Jerusalem', 'Bethlehem', 'Jenin'].map(c => <option key={c} value={c} className="bg-[#0D1B3E]">{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className={`text-xs text-white/50 mb-1.5 block ${isRTL ? 'font-arabic text-right' : ''}`}>{lang === 'ar' ? 'نوع الوظيفة' : 'Job Type'}</label>
                  <select value={jobType} onChange={e => setJobType(e.target.value)} className={`w-full bg-white/05 border border-white/15 rounded-xl px-3 py-3 text-sm text-white outline-none focus:border-[#F05A00]/50 ${isRTL ? 'text-right font-arabic' : ''}`}>
                    {['Full-time', 'Part-time', 'Remote', 'Contract'].map(t => <option key={t} value={t} className="bg-[#0D1B3E]">{t}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className={`text-xs text-white/50 mb-1.5 block ${isRTL ? 'font-arabic text-right' : ''}`}>{lang === 'ar' ? 'نطاق الراتب' : 'Salary Range'}</label>
                <input value={jobSalary} onChange={e => setJobSalary(e.target.value)} placeholder={lang === 'ar' ? 'مثال: 10,000–14,000 ₪/شهر' : 'e.g. ₪10,000–14,000/mo'} className={`w-full bg-white/05 border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-white/25 outline-none focus:border-[#F05A00]/50 transition-colors ${isRTL ? 'text-right font-arabic' : ''}`} />
              </div>
              <div>
                <div className={`flex items-center justify-between mb-1.5 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <label className={`text-xs text-white/50 ${isRTL ? 'font-arabic' : ''}`}>{lang === 'ar' ? 'وصف الوظيفة' : 'Job Description'}</label>
                  <button onClick={handleGenerateDesc} disabled={generating} className={`text-xs text-[#22C55E] hover:underline flex items-center gap-1 disabled:opacity-50 ${isRTL ? 'font-arabic flex-row-reverse' : ''}`}>
                    {generating ? (lang === 'ar' ? 'جارٍ التوليد...' : 'Generating...') : (lang === 'ar' ? '✨ توليد بالذكاء الاصطناعي' : '✨ Generate with AI')}
                  </button>
                </div>
                <textarea value={jobDesc} onChange={e => setJobDesc(e.target.value)} rows={4} placeholder={lang === 'ar' ? 'اكتب وصف الوظيفة أو استخدم الذكاء الاصطناعي لتوليده...' : 'Write job description or use AI to generate...'} className={`w-full bg-white/05 border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-white/25 outline-none focus:border-[#F05A00]/50 transition-colors resize-none ${isRTL ? 'text-right font-arabic' : ''}`} />
              </div>
              <button onClick={handlePostJob} className={`w-full py-3 rounded-xl orange-gradient text-white font-bold text-sm hover:opacity-90 active:scale-95 transition-all duration-150 ${isRTL ? 'font-arabic' : 'font-display'}`}>
                {lang === 'ar' ? 'نشر الوظيفة' : 'Post Job'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

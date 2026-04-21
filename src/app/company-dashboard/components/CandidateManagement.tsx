'use client';
import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { toast } from 'sonner';

const CANDIDATES = [
  { id: 'c-1', nameEn: 'Ahmad Khalil', nameAr: 'أحمد خليل', roleEn: 'Senior Software Engineer', roleAr: 'مهندس برمجيات أول', cityEn: 'Ramallah', cityAr: 'رام الله', match: 94, status: 'shortlisted', initials: 'AK', color: '#F05A00', skillsEn: ['React', 'Node.js', 'TypeScript'], skillsAr: ['React', 'Node.js', 'TypeScript'], appliedEn: '2 days ago', appliedAr: 'منذ يومين', experienceEn: '5 years', experienceAr: '5 سنوات' },
  { id: 'c-2', nameEn: 'Layla Hassan', nameAr: 'ليلى حسن', roleEn: 'Full Stack Developer', roleAr: 'مطور متكامل', cityEn: 'Gaza', cityAr: 'غزة', match: 91, status: 'reviewing', initials: 'LH', color: '#818CF8', skillsEn: ['Vue.js', 'Python', 'PostgreSQL'], skillsAr: ['Vue.js', 'Python', 'PostgreSQL'], appliedEn: '3 days ago', appliedAr: 'منذ 3 أيام', experienceEn: '4 years', experienceAr: '4 سنوات' },
  { id: 'c-3', nameEn: 'Rami Nasser', nameAr: 'رامي ناصر', roleEn: 'Backend Engineer', roleAr: 'مهندس خلفية', cityEn: 'Nablus', cityAr: 'نابلس', match: 88, status: 'interview', initials: 'RN', color: '#22C55E', skillsEn: ['Java', 'Spring Boot', 'Docker'], skillsAr: ['Java', 'Spring Boot', 'Docker'], appliedEn: '1 week ago', appliedAr: 'منذ أسبوع', experienceEn: '6 years', experienceAr: '6 سنوات' },
  { id: 'c-4', nameEn: 'Sara Mansour', nameAr: 'سارة منصور', roleEn: 'Data Analyst', roleAr: 'محلل بيانات', cityEn: 'Hebron', cityAr: 'الخليل', match: 85, status: 'new', initials: 'SM', color: '#F59E0B', skillsEn: ['Python', 'SQL', 'Tableau'], skillsAr: ['Python', 'SQL', 'Tableau'], appliedEn: '1 day ago', appliedAr: 'منذ يوم', experienceEn: '3 years', experienceAr: '3 سنوات' },
  { id: 'c-5', nameEn: 'Omar Barakat', nameAr: 'عمر بركات', roleEn: 'UX/UI Designer', roleAr: 'مصمم UX/UI', cityEn: 'Jerusalem', cityAr: 'القدس', match: 82, status: 'new', initials: 'OB', color: '#EC4899', skillsEn: ['Figma', 'Adobe XD', 'CSS'], skillsAr: ['Figma', 'Adobe XD', 'CSS'], appliedEn: '5 hours ago', appliedAr: 'منذ 5 ساعات', experienceEn: '4 years', experienceAr: '4 سنوات' },
  { id: 'c-6', nameEn: 'Nour Khalidi', nameAr: 'نور الخالدي', roleEn: 'Senior Software Engineer', roleAr: 'مهندس برمجيات أول', cityEn: 'Bethlehem', cityAr: 'بيت لحم', match: 79, status: 'rejected', initials: 'NK', color: '#EF4444', skillsEn: ['Angular', 'C#', '.NET'], skillsAr: ['Angular', 'C#', '.NET'], appliedEn: '2 weeks ago', appliedAr: 'منذ أسبوعين', experienceEn: '2 years', experienceAr: '2 سنوات' },
];

const STATUS_CONFIG: Record<string, { bg: string; text: string; labelEn: string; labelAr: string }> = {
  new: { bg: '#F05A0015', text: '#F05A00', labelEn: 'New', labelAr: 'جديد' },
  reviewing: { bg: '#F59E0B15', text: '#F59E0B', labelEn: 'Reviewing', labelAr: 'قيد المراجعة' },
  shortlisted: { bg: '#818CF815', text: '#818CF8', labelEn: 'Shortlisted', labelAr: 'مختصر' },
  interview: { bg: '#22C55E15', text: '#22C55E', labelEn: 'Interview', labelAr: 'مقابلة' },
  rejected: { bg: '#EF444415', text: '#EF4444', labelEn: 'Rejected', labelAr: 'مرفوض' },
};

export default function CandidateManagement() {
  const { lang, isRTL } = useLanguage();
  const [candidates, setCandidates] = useState(CANDIDATES);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selected, setSelected] = useState<string | null>(null);

  const filtered = candidates.filter(c => {
    const matchesSearch = !search || c.nameEn.toLowerCase().includes(search.toLowerCase()) || c.nameAr.includes(search) || c.roleEn.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const selectedCandidate = candidates.find(c => c.id === selected);

  const handleStatusChange = (id: string, newStatus: string) => {
    setCandidates(prev => prev.map(c => c.id === id ? { ...c, status: newStatus } : c));
    toast.success(lang === 'ar' ? 'تم تحديث حالة المرشح' : 'Candidate status updated');
  };

  const handleInvite = (name: string) => {
    toast.success(
      lang === 'ar' ? `تم إرسال دعوة مقابلة إلى ${name}` : `Interview invitation sent to ${name}`,
      { description: lang === 'ar' ? 'سيتلقى المرشح إشعاراً فورياً' : 'Candidate will receive an instant notification' }
    );
  };

  return (
    <div className="space-y-6" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Header */}
      <div className={`flex items-center justify-between flex-wrap gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
        <div className={isRTL ? 'text-right' : ''}>
          <h2 className={`text-2xl font-bold text-white ${isRTL ? 'font-arabic' : 'font-display'}`}>{lang === 'ar' ? 'إدارة المرشحين' : 'Candidate Management'}</h2>
          <p className={`text-white/40 text-sm mt-0.5 ${isRTL ? 'font-arabic' : ''}`}>{lang === 'ar' ? `${candidates.length} مرشح إجمالاً` : `${candidates.length} total candidates`}</p>
        </div>
        <div className={`flex items-center gap-3 flex-wrap ${isRTL ? 'flex-row-reverse' : ''}`}>
          <div className={`flex items-center gap-2 bg-white/05 border border-white/10 rounded-xl px-3 py-2 w-48 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <svg className="w-4 h-4 text-white/30 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder={lang === 'ar' ? 'ابحث عن مرشح...' : 'Search candidate...'} className={`bg-transparent text-sm text-white placeholder-white/25 outline-none w-full ${isRTL ? 'text-right font-arabic' : ''}`} />
          </div>
        </div>
      </div>

      {/* Status filter */}
      <div className={`flex gap-2 flex-wrap ${isRTL ? 'flex-row-reverse' : ''}`}>
        {[
          { id: 'all', en: 'All', ar: 'الكل' },
          { id: 'new', en: 'New', ar: 'جديد' },
          { id: 'reviewing', en: 'Reviewing', ar: 'قيد المراجعة' },
          { id: 'shortlisted', en: 'Shortlisted', ar: 'مختصر' },
          { id: 'interview', en: 'Interview', ar: 'مقابلة' },
          { id: 'rejected', en: 'Rejected', ar: 'مرفوض' },
        ].map(f => (
          <button key={f.id} onClick={() => setStatusFilter(f.id)} className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all duration-200 ${statusFilter === f.id ? 'bg-[#F05A00] text-white' : 'glass text-white/50 hover:text-white border border-white/10'} ${isRTL ? 'font-arabic' : ''}`}>
            {lang === 'ar' ? f.ar : f.en}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Candidates list */}
        <div className="lg:col-span-2 space-y-3">
          {filtered.map((c) => {
            const sc = STATUS_CONFIG[c.status];
            return (
              <div
                key={c.id}
                onClick={() => setSelected(selected === c.id ? null : c.id)}
                className={`rounded-2xl p-4 glass border transition-all duration-200 cursor-pointer ${selected === c.id ? 'border-[#F05A00]/40 bg-[#F05A00]/05' : 'border-white/08 hover:border-white/20'}`}
              >
                <div className={`flex items-center gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center text-sm font-bold text-white flex-shrink-0" style={{ backgroundColor: `${c.color}25`, color: c.color }}>
                    {c.initials}
                  </div>
                  <div className={`flex-1 min-w-0 ${isRTL ? 'text-right' : ''}`}>
                    <div className={`flex items-center gap-2 flex-wrap ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <p className={`text-sm font-bold text-white ${isRTL ? 'font-arabic' : ''}`}>{lang === 'ar' ? c.nameAr : c.nameEn}</p>
                      <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ backgroundColor: sc.bg, color: sc.text }}>{lang === 'ar' ? sc.labelAr : sc.labelEn}</span>
                    </div>
                    <p className={`text-xs text-white/40 mt-0.5 ${isRTL ? 'font-arabic' : ''}`}>{lang === 'ar' ? c.roleAr : c.roleEn} · {lang === 'ar' ? c.cityAr : c.cityEn}</p>
                    <div className={`flex items-center gap-2 mt-1.5 flex-wrap ${isRTL ? 'flex-row-reverse' : ''}`}>
                      {c.skillsEn.map(s => <span key={s} className="text-xs px-2 py-0.5 rounded-full bg-white/05 text-white/50">{s}</span>)}
                    </div>
                  </div>
                  <div className={`flex flex-col items-end gap-1 flex-shrink-0 ${isRTL ? 'items-start' : ''}`}>
                    <span className="text-lg font-bold" style={{ color: c.color }}>{c.match}%</span>
                    <span className={`text-xs text-white/30 ${isRTL ? 'font-arabic' : ''}`}>{lang === 'ar' ? 'تطابق' : 'match'}</span>
                  </div>
                </div>
              </div>
            );
          })}
          {filtered.length === 0 && (
            <div className="rounded-2xl p-10 glass border border-white/08 text-center">
              <p className={`text-white/40 ${isRTL ? 'font-arabic' : ''}`}>{lang === 'ar' ? 'لا يوجد مرشحون مطابقون' : 'No matching candidates found'}</p>
            </div>
          )}
        </div>

        {/* Candidate detail panel */}
        <div className="rounded-2xl p-5 glass border border-white/08 h-fit sticky top-6">
          {selectedCandidate ? (
            <div dir={isRTL ? 'rtl' : 'ltr'}>
              <div className={`flex items-center gap-3 mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-sm font-bold text-white" style={{ backgroundColor: `${selectedCandidate.color}25`, color: selectedCandidate.color }}>
                  {selectedCandidate.initials}
                </div>
                <div className={isRTL ? 'text-right' : ''}>
                  <p className={`text-base font-bold text-white ${isRTL ? 'font-arabic' : ''}`}>{lang === 'ar' ? selectedCandidate.nameAr : selectedCandidate.nameEn}</p>
                  <p className={`text-xs text-white/40 ${isRTL ? 'font-arabic' : ''}`}>{lang === 'ar' ? selectedCandidate.roleAr : selectedCandidate.roleEn}</p>
                </div>
              </div>
              <div className="space-y-3 mb-4">
                {[
                  { labelEn: 'Location', labelAr: 'الموقع', valueEn: selectedCandidate.cityEn, valueAr: selectedCandidate.cityAr },
                  { labelEn: 'Experience', labelAr: 'الخبرة', valueEn: selectedCandidate.experienceEn, valueAr: selectedCandidate.experienceAr },
                  { labelEn: 'Applied', labelAr: 'تقدم', valueEn: selectedCandidate.appliedEn, valueAr: selectedCandidate.appliedAr },
                ].map((row, i) => (
                  <div key={i} className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <span className={`text-xs text-white/40 ${isRTL ? 'font-arabic' : ''}`}>{lang === 'ar' ? row.labelAr : row.labelEn}</span>
                    <span className={`text-xs text-white font-medium ${isRTL ? 'font-arabic' : ''}`}>{lang === 'ar' ? row.valueAr : row.valueEn}</span>
                  </div>
                ))}
                <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <span className={`text-xs text-white/40 ${isRTL ? 'font-arabic' : ''}`}>{lang === 'ar' ? 'نقاط التطابق' : 'Match Score'}</span>
                  <span className="text-sm font-bold" style={{ color: selectedCandidate.color }}>{selectedCandidate.match}%</span>
                </div>
              </div>
              <div className="mb-4">
                <p className={`text-xs text-white/40 mb-2 ${isRTL ? 'font-arabic text-right' : ''}`}>{lang === 'ar' ? 'المهارات' : 'Skills'}</p>
                <div className={`flex flex-wrap gap-1.5 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  {selectedCandidate.skillsEn.map(s => <span key={s} className="text-xs px-2 py-1 rounded-lg bg-white/08 text-white/70">{s}</span>)}
                </div>
              </div>
              <div className="mb-4">
                <p className={`text-xs text-white/40 mb-2 ${isRTL ? 'font-arabic text-right' : ''}`}>{lang === 'ar' ? 'تغيير الحالة' : 'Change Status'}</p>
                <div className={`flex flex-wrap gap-1.5 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  {['reviewing', 'shortlisted', 'interview', 'rejected'].map(s => {
                    const sc = STATUS_CONFIG[s];
                    return (
                      <button key={s} onClick={() => handleStatusChange(selectedCandidate.id, s)} className={`text-xs px-2 py-1 rounded-lg font-medium transition-all ${selectedCandidate.status === s ? 'ring-1' : 'opacity-60 hover:opacity-100'} ${isRTL ? 'font-arabic' : ''}`} style={{ backgroundColor: sc.bg, color: sc.text, ringColor: sc.text }}>
                        {lang === 'ar' ? sc.labelAr : sc.labelEn}
                      </button>
                    );
                  })}
                </div>
              </div>
              <button
                onClick={() => handleInvite(lang === 'ar' ? selectedCandidate.nameAr : selectedCandidate.nameEn)}
                className={`w-full py-2.5 rounded-xl orange-gradient text-white font-bold text-sm hover:opacity-90 active:scale-95 transition-all duration-150 ${isRTL ? 'font-arabic' : 'font-display'}`}
              >
                {lang === 'ar' ? 'دعوة للمقابلة' : 'Invite to Interview'}
              </button>
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="w-12 h-12 rounded-2xl bg-white/05 flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-white/20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
              </div>
              <p className={`text-sm text-white/30 ${isRTL ? 'font-arabic' : ''}`}>{lang === 'ar' ? 'اختر مرشحاً لعرض تفاصيله' : 'Select a candidate to view details'}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

'use client';
import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { useLanguage } from '@/context/LanguageContext';

const SALARY_DATA = [
  { id: 'sal-junior', roleEn: 'Junior Dev', roleAr: 'مطور مبتدئ', min: 4000, median: 5500, max: 7000, currency: 'ILS' },
  { id: 'sal-mid', roleEn: 'Mid Dev', roleAr: 'مطور متوسط', min: 6500, median: 8500, max: 11000, currency: 'ILS' },
  { id: 'sal-senior', roleEn: 'Senior Dev', roleAr: 'مطور أول', min: 10000, median: 12500, max: 16000, currency: 'ILS' },
  { id: 'sal-lead', roleEn: 'Tech Lead', roleAr: 'قائد تقني', min: 14000, median: 18000, max: 23000, currency: 'ILS' },
  { id: 'sal-head', roleEn: 'Head of Eng', roleAr: 'رئيس هندسة', min: 20000, median: 26000, max: 34000, currency: 'ILS' },
];

const MARKET_COMPARISON = [
  { id: 'mkt-ramallah', cityEn: 'Ramallah', cityAr: 'رام الله', value: 12500, color: '#F05A00', isYou: false },
  { id: 'mkt-nablus', cityEn: 'Nablus', cityAr: 'نابلس', value: 10800, color: '#818CF8', isYou: false },
  { id: 'mkt-hebron', cityEn: 'Hebron', cityAr: 'الخليل', value: 9500, color: '#22C55E', isYou: false },
  { id: 'mkt-jenin', cityEn: 'Jenin', cityAr: 'جنين', value: 8900, color: '#F59E0B', isYou: false },
  { id: 'mkt-you', cityEn: 'Your Est.', cityAr: 'تقديرك', value: 12500, color: '#F05A00', isYou: true },
];

const COMPANY_OFFERS = [
  { id: 'offer-paltel', company: 'Paltel', roleEn: 'Senior Software Engineer', roleAr: 'مهندس برمجيات أول', salary: 12000, equity: 'Options', bonusEn: 'ILS 8,000/yr', bonusAr: '8,000 ₪/سنة', matchScore: 94 },
  { id: 'offer-jawwal', company: 'Jawwal', roleEn: 'Full Stack Developer', roleAr: 'مطور متكامل', salary: 11500, equity: 'None', bonusEn: 'ILS 6,000/yr', bonusAr: '6,000 ₪/سنة', matchScore: 91 },
  { id: 'offer-ooredoo', company: 'Ooredoo', roleEn: 'Backend Engineer', roleAr: 'مهندس خلفية', salary: 13000, equity: 'RSUs', bonusEn: 'ILS 10,000/yr', bonusAr: '10,000 ₪/سنة', matchScore: 88 },
  { id: 'offer-bop', company: 'Bank of Palestine', roleEn: 'Software Developer', roleAr: 'مطور برمجيات', salary: 10000, equity: 'None', bonusEn: 'ILS 5,000/yr', bonusAr: '5,000 ₪/سنة', matchScore: 85 },
];

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: { value: number }[]; label?: string }) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-dark rounded-xl px-3 py-2.5 border border-white/15 shadow-glass text-xs">
        <p className="font-semibold text-white mb-1">{label}</p>
        <p className="text-[#F05A00]">₪{payload[0]?.value?.toLocaleString()}/mo</p>
      </div>
    );
  }
  return null;
};

export default function SalaryBenchmark() {
  const [selectedLevel, setSelectedLevel] = useState('sal-senior');
  const { lang, isRTL } = useLanguage();
  const selectedData = SALARY_DATA.find((d) => d.id === selectedLevel) || SALARY_DATA[2];

  return (
    <div className="space-y-8" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className={`flex items-center justify-between flex-wrap gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
        <div className={isRTL ? 'text-right' : ''}>
          <h2 className={`text-2xl font-bold text-white ${isRTL ? 'font-arabic' : 'font-display'}`}>
            {lang === 'ar' ? 'ذكاء الرواتب' : 'Salary Intelligence'}
          </h2>
          <p className={`text-white/40 text-sm mt-0.5 ${isRTL ? 'font-arabic' : ''}`}>
            {lang === 'ar' ? 'مقارنة رواتب بالذكاء الاصطناعي · تحديث أسبوعي · 200 ألف+ نقطة بيانات' : 'AI-powered salary benchmarking · Updated weekly · 200K+ data points'}
          </p>
        </div>
        <div className="rounded-2xl px-5 py-3 text-center bg-[#F05A00]/10 border border-[#F05A00]/30">
          <div className="font-bold text-3xl text-[#F05A00] font-mono-data">₪12,500</div>
          <div className={`text-white/40 text-xs mt-0.5 ${isRTL ? 'font-arabic' : ''}`}>
            {lang === 'ar' ? 'راتبك الشهري المتوقع' : 'Your estimated monthly salary'}
          </div>
        </div>
      </div>

      {/* Hero salary card */}
      <div className="rounded-3xl p-7 bg-[#F05A00]/08 border border-[#F05A00]/20">
        <div className={`flex flex-col md:flex-row md:items-center justify-between gap-6 ${isRTL ? 'md:flex-row-reverse' : ''}`}>
          <div className={isRTL ? 'text-right' : ''}>
            <p className={`text-[#F05A00]/70 text-sm font-semibold uppercase tracking-wider mb-2 ${isRTL ? 'font-arabic' : ''}`}>
              {lang === 'ar' ? 'توقع الراتب بالذكاء الاصطناعي لملفك الشخصي' : 'AI Salary Prediction for Your Profile'}
            </p>
            <h3 className="font-bold text-4xl text-white mb-1">
              ₪10,000 – 16,000
              <span className="text-[#F05A00]/60 text-xl font-normal">/{lang === 'ar' ? 'شهر' : 'month'}</span>
            </h3>
            <p className={`text-white/50 text-sm ${isRTL ? 'font-arabic' : ''}`}>
              {lang === 'ar' ? 'مهندس برمجيات أول · سوق رام الله · أبريل 2026' : 'Senior Software Engineer · Ramallah, Palestine market · April 2026'}
            </p>
          </div>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="glass-dark rounded-2xl p-3">
              <div className="font-bold text-[#EF4444] text-xl font-mono-data">₪10K</div>
              <div className={`text-white/30 text-xs mt-0.5 ${isRTL ? 'font-arabic' : ''}`}>
                {lang === 'ar' ? 'الربع الأدنى' : '25th percentile'}
              </div>
            </div>
            <div className="glass-dark rounded-2xl p-3 border border-[#F05A00]/30">
              <div className="font-bold text-[#F05A00] text-xl font-mono-data">₪12.5K</div>
              <div className={`text-white/40 text-xs mt-0.5 ${isRTL ? 'font-arabic' : ''}`}>
                {lang === 'ar' ? 'الوسيط (أنت)' : 'Median (you)'}
              </div>
            </div>
            <div className="glass-dark rounded-2xl p-3">
              <div className="font-bold text-[#22C55E] text-xl font-mono-data">₪16K</div>
              <div className={`text-white/30 text-xs mt-0.5 ${isRTL ? 'font-arabic' : ''}`}>
                {lang === 'ar' ? 'الربع الأعلى' : '75th percentile'}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <div className="relative h-3 bg-white/10 rounded-full overflow-hidden">
            <div className="absolute inset-y-0 left-0 rounded-full" style={{ width: '30%', backgroundColor: '#EF4444', opacity: 0.5 }} />
            <div className="absolute inset-y-0" style={{ left: '30%', width: '40%', background: 'linear-gradient(90deg, #F59E0B, #F05A00)' }} />
            <div className="absolute inset-y-0 right-0 rounded-full" style={{ width: '30%', backgroundColor: '#22C55E', opacity: 0.5 }} />
            <div className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white border-2 border-[#F05A00]" style={{ left: '52%' }} />
          </div>
          <div className={`flex justify-between text-xs text-white/30 mt-1.5 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <span>₪6,000</span>
            <span className={`text-[#F05A00] font-medium ${isRTL ? 'font-arabic' : ''}`}>
              {lang === 'ar' ? 'أنت: ₪12,500' : 'You: ₪12,500'}
            </span>
            <span>₪24,000</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* City comparison chart */}
        <div className="glass rounded-3xl p-6">
          <h3 className={`font-bold text-white text-base mb-2 ${isRTL ? 'font-arabic text-right' : 'font-display'}`}>
            {lang === 'ar' ? 'الراتب حسب المدينة (مطور أول)' : 'Salary by City (Senior Dev)'}
          </h3>
          <p className={`text-white/40 text-xs mb-5 ${isRTL ? 'font-arabic text-right' : ''}`}>
            {lang === 'ar' ? 'الراتب الشهري الوسيط · بالشيكل الإسرائيلي' : 'Median monthly salary · ILS'}
          </p>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={MARKET_COMPARISON} margin={{ top: 5, right: 10, bottom: 5, left: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" vertical={false} />
              <XAxis
                dataKey={lang === 'ar' ? 'cityAr' : 'cityEn'}
                tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10 }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `₪${(v / 1000).toFixed(0)}K`}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.04)' }} />
              <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                {MARKET_COMPARISON.map((entry) => (
                  <Cell
                    key={entry.id}
                    fill={entry.isYou ? '#F05A00' : 'rgba(255,255,255,0.15)'}
                    opacity={entry.isYou ? 1 : 0.7}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Company offers comparison */}
        <div className="glass rounded-3xl p-6">
          <h3 className={`font-bold text-white text-base mb-2 ${isRTL ? 'font-arabic text-right' : 'font-display'}`}>
            {lang === 'ar' ? 'مقارنة العروض الحية' : 'Live Offer Comparison'}
          </h3>
          <p className={`text-white/40 text-xs mb-5 ${isRTL ? 'font-arabic text-right' : ''}`}>
            {lang === 'ar' ? 'بناءً على طلباتك النشطة' : 'Based on your active applications'}
          </p>
          <div className="space-y-3">
            {COMPANY_OFFERS.map((offer) => (
              <div key={offer.id} className={`flex items-center gap-3 p-3 rounded-2xl hover:bg-white/04 transition-colors ${isRTL ? 'flex-row-reverse' : ''}`}>
                <div className={`flex-1 min-w-0 ${isRTL ? 'text-right' : ''}`}>
                  <div className={`flex items-center gap-2 mb-0.5 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <span className="text-sm font-semibold text-white">{offer.company}</span>
                    <span className={`text-xs text-white/30 ${isRTL ? 'font-arabic' : ''}`}>
                      {lang === 'ar' ? offer.roleAr : offer.roleEn}
                    </span>
                  </div>
                  <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <span className={`text-xs text-white/40 ${isRTL ? 'font-arabic' : ''}`}>
                      {lang === 'ar' ? 'تطابق: ' : 'Match: '}
                    </span>
                    <span className="text-xs font-bold text-[#F05A00]">{offer.matchScore}%</span>
                    <span className={`text-xs text-white/30 ${isRTL ? 'font-arabic' : ''}`}>
                      · {lang === 'ar' ? `مكافأة: ${offer.bonusAr}` : `Bonus: ${offer.bonusEn}`}
                    </span>
                  </div>
                </div>
                <div className={`flex-shrink-0 ${isRTL ? 'text-left' : 'text-right'}`}>
                  <div className="font-bold text-white text-sm font-mono-data">
                    ₪{offer.salary.toLocaleString()}
                  </div>
                  <div className={`text-xs text-white/30 ${isRTL ? 'font-arabic' : ''}`}>
                    /{lang === 'ar' ? 'شهر' : 'month'}
                  </div>
                </div>
                <div className="w-20 h-1.5 bg-white/10 rounded-full overflow-hidden flex-shrink-0">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${(offer.salary / 16000) * 100}%`,
                      backgroundColor: offer.salary >= 12000 ? '#22C55E' : offer.salary >= 10000 ? '#F05A00' : '#F59E0B',
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 p-3 rounded-xl bg-[#22C55E]/08 border border-[#22C55E]/20">
            <p className={`text-xs text-[#22C55E] font-semibold mb-0.5 ${isRTL ? 'font-arabic text-right' : ''}`}>
              {lang === 'ar' ? 'نصيحة التفاوض بالذكاء الاصطناعي' : 'AI Negotiation Tip'}
            </p>
            <p className={`text-xs text-white/50 ${isRTL ? 'font-arabic text-right' : ''}`}>
              {lang === 'ar' ?'أنت في أعلى 35% لدورك في رام الله. استخدم عرض أوريدو (₪13,000) كورقة ضغط عند التفاوض مع بالتل.' :'You are in the top 35% for your role in Ramallah. Use Ooredoo\'s offer (₪13K) as leverage when negotiating with Paltel.'}
            </p>
          </div>
        </div>
      </div>

      {/* Career level selector */}
      <div className="glass rounded-3xl p-6">
        <h3 className={`font-bold text-white text-base mb-5 ${isRTL ? 'font-arabic text-right' : 'font-display'}`}>
          {lang === 'ar' ? 'تطور الراتب حسب المستوى' : 'Salary Progression by Level'}
        </h3>
        <div className="flex flex-wrap gap-2 mb-6">
          {SALARY_DATA.map((level) => (
            <button
              key={level.id}
              onClick={() => setSelectedLevel(level.id)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                selectedLevel === level.id
                  ? 'orange-gradient text-white' :'glass text-white/50 hover:text-white'
              } ${isRTL ? 'font-arabic' : ''}`}
            >
              {lang === 'ar' ? level.roleAr : level.roleEn}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-4">
          {[
            { labelEn: 'Floor', labelAr: 'الحد الأدنى', value: selectedData.min, color: '#EF4444' },
            { labelEn: 'Median', labelAr: 'الوسيط', value: selectedData.median, color: '#F05A00' },
            { labelEn: 'Ceiling', labelAr: 'الحد الأقصى', value: selectedData.max, color: '#22C55E' },
          ].map((item) => (
            <div key={`level-${item.labelEn}`} className="glass-dark rounded-2xl p-4 text-center">
              <p className={`text-white/40 text-xs mb-1 ${isRTL ? 'font-arabic' : ''}`}>
                {lang === 'ar' ? item.labelAr : item.labelEn}
              </p>
              <p className="font-bold text-2xl font-mono-data" style={{ color: item.color }}>
                ₪{(item.value / 1000).toFixed(0)}K
              </p>
              <p className={`text-white/30 text-xs ${isRTL ? 'font-arabic' : ''}`}>
                /{lang === 'ar' ? 'شهر' : 'month'}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
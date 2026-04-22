'use client';
import React, { useState, useRef } from 'react';

import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Toaster } from 'sonner';
import AppLogo from '@/components/ui/AppLogo';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import type { UserSession } from '@/context/LanguageContext';

type AuthMode = 'login' | 'register';
type UserRole = 'talent' | 'company' | 'admin';

interface LoginForm {
  email: string;
  password: string;
  remember: boolean;
}

interface RegisterForm {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  city: string;
  currency: string;
  agreeTerms: boolean;
}

const DEMO_CREDENTIALS = [
  { role: 'talent' as UserRole, label: 'Talent Explorer', email: 'ahmad@amalak.ps', password: 'talent2026!', color: '#F05A00', fullName: 'Ahmad Khalil', city: 'Ramallah', initials: 'AK' },
  { role: 'company' as UserRole, label: 'Opportunity Creator', email: 'hr@paltel.ps', password: 'company2026!', color: '#818CF8', fullName: 'Paltel HR Team', city: 'Ramallah', initials: 'PT' },
  { role: 'admin' as UserRole, label: 'Admin', email: 'admin@amalak.ps', password: 'admin2026!', color: '#22C55E', fullName: 'Amalak Admin', city: 'Ramallah', initials: 'AA' },
];

const ROLE_CONFIG = {
  talent: {
    label: 'Talent Explorer',
    description: 'Find your perfect role with AI matching',
    color: '#F05A00',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
  },
  company: {
    label: 'Opportunity Creator',
    description: 'Find top talent with AI shortlisting',
    color: '#818CF8',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-2 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
  admin: {
    label: 'Admin',
    description: 'Platform oversight and management',
    color: '#22C55E',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
};

const PALESTINE_CITIES = [
  'Ramallah', 'Gaza', 'Nablus', 'Hebron', 'Jerusalem',
  'Bethlehem', 'Jenin', 'Tulkarm', 'Jericho',
];

const PALESTINE_CITIES_AR = [
  'رام الله', 'غزة', 'نابلس', 'الخليل', 'القدس',
  'بيت لحم', 'جنين', 'طولكرم', 'أريحا',
];

const CURRENCIES = [
  { value: 'ILS', label: 'ILS — Israeli New Shekel (₪)' },
  { value: 'JOD', label: 'JOD — Jordanian Dinar (JD)' },
  { value: 'USD', label: 'USD — US Dollar ($)' },
];

// Simulated CV skill extraction
function simulateCVParsing(fileName: string): string[] {
  const skillSets = [
    ['JavaScript', 'React', 'Node.js', 'TypeScript', 'REST APIs', 'Git'],
    ['Python', 'Django', 'PostgreSQL', 'Docker', 'AWS', 'Linux'],
    ['Java', 'Spring Boot', 'Microservices', 'SQL', 'Maven', 'CI/CD'],
    ['Project Management', 'Agile', 'Scrum', 'Communication', 'Leadership'],
    ['Marketing', 'SEO', 'Content Writing', 'Social Media', 'Analytics'],
  ];
  const idx = fileName.length % skillSets.length;
  return skillSets[idx];
}

function getInitials(name: string): string {
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
}

export default function AuthScreen() {
  const [mode, setMode] = useState<AuthMode>('login');
  const [role, setRole] = useState<UserRole>('talent');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [cvParsing, setCvParsing] = useState(false);
  const [cvSkills, setCvSkills] = useState<string[]>([]);
  const [welcomeMsg, setWelcomeMsg] = useState<string | null>(null);
  const cvInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { lang, setLang, isRTL, setUserSession } = useLanguage();

  const loginForm = useForm<LoginForm>({ defaultValues: { remember: false } });
  const registerForm = useForm<RegisterForm>({ defaultValues: { agreeTerms: false, currency: 'ILS' } });

  const handleCVUpload = async (file: File) => {
    const allowed = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/msword'];
    if (!allowed.includes(file.type) && !file.name.match(/\.(pdf|docx|doc)$/i)) {
      toast.error(lang === 'ar' ? 'يُرجى رفع ملف PDF أو DOCX فقط' : 'Please upload a PDF or DOCX file only');
      return;
    }
    setCvFile(file);
    setCvParsing(true);
    toast.info(lang === 'ar' ? 'جارٍ تحليل السيرة الذاتية...' : 'Analyzing your CV...');
    await new Promise(r => setTimeout(r, 1800));
    const skills = simulateCVParsing(file.name);
    setCvSkills(skills);
    setCvParsing(false);
    toast.success(
      lang === 'ar'
        ? `تم استخراج ${skills.length} مهارة من سيرتك الذاتية!`
        : `Extracted ${skills.length} skills from your CV!`,
      { description: skills.join(', ') }
    );
  };

  const getRoleDashboard = (r: UserRole): string => {
    if (r === 'company') return '/company-dashboard';
    if (r === 'admin') return '/admin-dashboard';
    return '/talent-dashboard';
  };

  const handleLogin = async (data: LoginForm) => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1200));

    const validCred = DEMO_CREDENTIALS.find(
      (c) => c.email === data.email && c.password === data.password
    );

    if (!validCred) {
      toast.error(lang === 'ar' ? 'بيانات غير صحيحة — استخدم الحسابات التجريبية أدناه' : 'Invalid credentials — use the demo accounts below to sign in');
      setIsLoading(false);
      return;
    }

    const session: UserSession = {
      fullName: validCred.fullName,
      email: validCred.email,
      role: validCred.role,
      city: validCred.city,
      currency: 'ILS',
      initials: validCred.initials,
      cvUploaded: cvFile !== null,
      cvSkills: cvSkills.length > 0 ? cvSkills : undefined,
    };
    setUserSession(session);

    const welcomeText = lang === 'ar'
      ? `مرحباً بعودتك، ${validCred.fullName}!`
      : `Welcome back, ${validCred.fullName}!`;
    setWelcomeMsg(welcomeText);
    toast.success(welcomeText);

    setTimeout(() => {
      router.push(getRoleDashboard(validCred.role));
    }, 1800);
    setIsLoading(false);
  };

  const handleRegister = async (data: RegisterForm) => {
    if (data.password !== data.confirmPassword) {
      registerForm.setError('confirmPassword', { message: lang === 'ar' ? 'كلمتا المرور غير متطابقتين' : 'Passwords do not match' });
      return;
    }
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1400));

    const session: UserSession = {
      fullName: data.fullName,
      email: data.email,
      role: role,
      city: data.city,
      currency: data.currency,
      initials: getInitials(data.fullName),
      cvUploaded: cvFile !== null,
      cvSkills: cvSkills.length > 0 ? cvSkills : undefined,
    };
    setUserSession(session);

    const welcomeText = lang === 'ar'
      ? `مرحباً ${data.fullName}! تم إنشاء حسابك.`
      : `Welcome, ${data.fullName}! Account created.`;
    setWelcomeMsg(welcomeText);
    toast.success(welcomeText);

    setTimeout(() => router.push(getRoleDashboard(role)), 1800);
    setIsLoading(false);
  };

  const autofillCredentials = (cred: typeof DEMO_CREDENTIALS[0]) => {
    setRole(cred.role);
    loginForm.setValue('email', cred.email);
    loginForm.setValue('password', cred.password);
    toast.info(lang === 'ar' ? `تم تحميل بيانات ${cred.label}` : `Demo credentials loaded for ${cred.label}`);
  };

  const activeRole = ROLE_CONFIG[role];
  const cities = lang === 'ar' ? PALESTINE_CITIES_AR : PALESTINE_CITIES;

  return (
    <div className="min-h-screen bg-[#0D1B3E] flex relative overflow-hidden" dir={isRTL ? 'rtl' : 'ltr'}>
      <Toaster position="bottom-right" theme="dark" richColors />

      {/* Welcome overlay */}
      {welcomeMsg && (
        <div className="welcome-overlay fixed inset-0 z-50 flex items-center justify-center bg-[#0D1B3E]/95 pointer-events-none">
          <div className="text-center px-8">
            <div className="w-16 h-16 rounded-full orange-gradient flex items-center justify-center mx-auto mb-5 glow-orange">
              <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className={`text-3xl font-extrabold text-white mb-2 ${isRTL ? 'font-arabic' : 'font-display'}`}>{welcomeMsg}</h2>
            <p className={`text-white/50 text-sm ${isRTL ? 'font-arabic' : ''}`}>
              {lang === 'ar' ? 'جارٍ تحميل لوحة التحكم...' : 'Loading your dashboard...'}
            </p>
            <div className="mt-5 flex justify-center">
              <svg className="w-6 h-6 text-[#F05A00] animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            </div>
          </div>
        </div>
      )}

      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(17,34,85,0.6)_0%,transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_20%,rgba(240,90,0,0.06)_0%,transparent_50%)]" />
      <div
        className="absolute inset-0 opacity-05"
        style={{
          backgroundImage: 'linear-gradient(rgba(240,90,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(240,90,0,0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Left panel — branding */}
      <div className={`hidden lg:flex lg:w-1/2 flex-col justify-between p-12 relative z-10 ${isRTL ? 'order-2' : ''}`}>
        <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <AppLogo size={40} />
          <span className={`text-2xl font-bold text-white ${isRTL ? 'font-arabic' : 'font-display'}`}>{isRTL ? 'عملك' : 'Amalak'}</span>
        </div>

        <div className="max-w-md">
          <div className={`inline-flex items-center gap-2 rounded-full px-4 py-2 mb-6 border border-[#F05A00]/30 bg-[#F05A00]/08 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <span className="w-2 h-2 rounded-full bg-[#F05A00] animate-pulse" />
            <span className={`text-xs font-semibold text-[#F05A00] tracking-wider ${isRTL ? 'font-arabic' : ''}`}>
              {lang === 'ar' ? 'منصة التوظيف بالذكاء الاصطناعي لفلسطين' : 'AI-Powered Job Platform for Palestine'}
            </span>
          </div>

          <h1 className={`text-5xl font-extrabold text-white leading-tight mb-5 ${isRTL ? 'font-arabic' : 'font-display'}`}>
            {lang === 'ar' ? (
              <>مسيرتك المهنية،<br /><span className="orange-text">مدعومة بالذكاء الاصطناعي</span></>
            ) : (
              <>Your Career,<br /><span className="orange-text">Powered by AI</span></>
            )}
          </h1>

          <p className={`text-white/50 text-lg leading-relaxed mb-10 ${isRTL ? 'font-arabic' : ''}`}>
            {lang === 'ar' ?'انضم إلى آلاف المواهب الفلسطينية الذين وجدوا دورهم المثالي من خلال المطابقة بالذكاء الاصطناعي — لا علاقات الشخصية.' :'Join thousands of Palestinian talents who found their perfect role through AI matching — not personal connections.'}
          </p>

          {/* Feature list */}
          <div className="space-y-4">
            {[
              { id: 'feat-match', text: lang === 'ar' ? 'يطابقك الذكاء الاصطناعي مع الأدوار بناءً على أكثر من 50 إشارة مهارة' : 'AI matches you to roles based on 50+ skill signals', color: '#F05A00' },
              { id: 'feat-salary', text: lang === 'ar' ? 'اعرف راتبك في السوق قبل التفاوض' : 'Know your market salary before you negotiate', color: '#818CF8' },
              { id: 'feat-blind', text: lang === 'ar' ? 'فحص عمياء — الجدارة فوق العلاقات' : 'Blind screening — merit over connections', color: '#22C55E' },
            ].map((feat) => (
              <div key={feat.id} className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${feat.color}20` }}>
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke={feat.color}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className={`text-white/70 text-sm ${isRTL ? 'font-arabic' : ''}`}>{feat.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom stats */}
        <div className={`flex items-center gap-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
          {[
            { id: 'stat-hires', val: '347', label: lang === 'ar' ? 'توظيف اليوم' : 'hires today' },
            { id: 'stat-match', val: '94%', label: lang === 'ar' ? 'دقة التطابق' : 'match accuracy' },
            { id: 'stat-days', val: lang === 'ar' ? '8 أيام' : '8 days', label: lang === 'ar' ? 'متوسط وقت التوظيف' : 'avg. time to hire' },
          ].map((s) => (
            <div key={s.id} className="text-center">
              <div className={`font-bold text-[#F05A00] text-xl font-mono-data ${isRTL ? 'font-arabic' : 'font-display'}`}>{s.val}</div>
              <div className={`text-white/30 text-xs ${isRTL ? 'font-arabic' : ''}`}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Right panel — form */}
      <div className={`w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12 relative z-10 ${isRTL ? 'order-1' : ''}`}>
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className={`flex lg:hidden items-center gap-3 mb-8 justify-center ${isRTL ? 'flex-row-reverse' : ''}`}>
            <AppLogo size={36} />
            <span className={`text-xl font-bold text-white ${isRTL ? 'font-arabic' : 'font-display'}`}>{isRTL ? 'عملك' : 'Amalak'}</span>
          </div>

          {/* Language switcher on mobile */}
          <div className="flex lg:hidden justify-center mb-4">
            <div className="flex items-center rounded-lg overflow-hidden border border-white/20">
              <button
                onClick={() => setLang('en')}
                className={`px-4 py-2 text-xs font-semibold transition-all duration-200 ${lang === 'en' ? 'bg-[#F05A00] text-white' : 'text-white/60 hover:text-white hover:bg-white/10'}`}
              >
                EN
              </button>
              <button
                onClick={() => setLang('ar')}
                className={`px-4 py-2 text-xs font-semibold font-arabic transition-all duration-200 ${lang === 'ar' ? 'bg-[#F05A00] text-white' : 'text-white/60 hover:text-white hover:bg-white/10'}`}
              >
                ع
              </button>
            </div>
          </div>

          {/* Glass card */}
          <div className="glass rounded-3xl p-8 shadow-glass">
            {/* Mode toggle */}
            <div className="flex items-center bg-white/05 rounded-2xl p-1 mb-7">
              {(['login', 'register'] as AuthMode[]).map((m) => (
                <button
                  key={`mode-${m}`}
                  onClick={() => setMode(m)}
                  className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    mode === m
                      ? 'bg-[#F05A00] text-white shadow-sm'
                      : 'text-white/50 hover:text-white'
                  } ${isRTL ? 'font-arabic' : ''}`}
                >
                  {m === 'login'
                    ? (lang === 'ar' ? 'تسجيل الدخول' : 'Sign In')
                    : (lang === 'ar' ? 'إنشاء حساب' : 'Create Account')}
                </button>
              ))}
            </div>

            {/* Role selector */}
            <div className="mb-6">
              <p className={`text-white/40 text-xs font-semibold uppercase tracking-wider mb-3 ${isRTL ? 'font-arabic text-right' : ''}`}>
                {lang === 'ar' ? 'أنا...' : 'I am a...'}
              </p>
              <div className="grid grid-cols-3 gap-2">
                {(Object.keys(ROLE_CONFIG) as UserRole[]).map((r) => {
                  const cfg = ROLE_CONFIG[r];
                  return (
                    <button
                      key={`role-${r}`}
                      onClick={() => setRole(r)}
                      className={`flex flex-col items-center gap-1.5 p-3 rounded-2xl border transition-all duration-200 ${
                        role === r
                          ? 'border-opacity-50 bg-opacity-10' :'border-white/10 hover:border-white/20 hover:bg-white/05'
                      }`}
                      style={role === r ? { borderColor: `${cfg.color}50`, backgroundColor: `${cfg.color}10` } : {}}
                    >
                      <span style={{ color: role === r ? cfg.color : 'rgba(255,255,255,0.4)' }}>{cfg.icon}</span>
                      <span
                        className={`text-xs font-semibold leading-tight text-center ${isRTL ? 'font-arabic' : ''}`}
                        style={{ color: role === r ? cfg.color : 'rgba(255,255,255,0.4)' }}
                      >
                        {r === 'talent' ? (lang === 'ar' ? 'موهبة' : 'Talent') : r === 'company' ? (lang === 'ar' ? 'شركة' : 'Company') : (lang === 'ar' ? 'مشرف' : 'Admin')}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {mode === 'login' ? (
              <form onSubmit={loginForm.handleSubmit(handleLogin)} className="space-y-4">
                <div>
                  <label className={`block text-white/60 text-xs font-semibold mb-1.5 ${isRTL ? 'font-arabic text-right' : ''}`}>
                    {lang === 'ar' ? 'البريد الإلكتروني' : 'Email'}
                  </label>
                  <input
                    {...loginForm.register('email', { required: true })}
                    type="email"
                    placeholder={lang === 'ar' ? 'you@example.com' : 'you@example.com'}
                    className={`w-full bg-white/05 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/25 text-sm outline-none focus:border-[#F05A00]/50 focus:bg-white/08 transition-all ${isRTL ? 'text-right font-arabic' : ''}`}
                  />
                </div>
                <div>
                  <label className={`block text-white/60 text-xs font-semibold mb-1.5 ${isRTL ? 'font-arabic text-right' : ''}`}>
                    {lang === 'ar' ? 'كلمة المرور' : 'Password'}
                  </label>
                  <div className="relative">
                    <input
                      {...loginForm.register('password', { required: true, minLength: 6 })}
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      className="w-full bg-white/05 border border-white/10 rounded-xl px-4 py-3 pr-12 text-white placeholder-white/25 text-sm outline-none focus:border-[#F05A00]/50 transition-all"
                      dir="ltr"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        {showPassword
                          ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                          : <><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></>
                        }
                      </svg>
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full py-3.5 rounded-xl orange-gradient text-white font-bold text-sm hover:opacity-90 active:scale-95 transition-all duration-150 glow-orange disabled:opacity-50 disabled:cursor-not-allowed ${isRTL ? 'font-arabic' : 'font-display'}`}
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      {lang === 'ar' ? 'جارٍ تسجيل الدخول...' : 'Signing in...'}
                    </span>
                  ) : (lang === 'ar' ? 'تسجيل الدخول' : 'Sign In')}
                </button>

                {/* Demo credentials */}
                <div className="pt-3 border-t border-white/08">
                  <p className={`text-white/30 text-xs mb-2.5 ${isRTL ? 'font-arabic text-right' : ''}`}>
                    {lang === 'ar' ? 'حسابات تجريبية:' : 'Demo accounts:'}
                  </p>
                  <div className="space-y-1.5">
                    {DEMO_CREDENTIALS.map((cred) => (
                      <button
                        key={`demo-${cred.role}`}
                        type="button"
                        onClick={() => autofillCredentials(cred)}
                        className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl bg-white/04 hover:bg-white/08 border border-white/08 transition-all duration-200 ${isRTL ? 'flex-row-reverse' : ''}`}
                      >
                        <span className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${cred.color}20`, color: cred.color }}>
                          {ROLE_CONFIG[cred.role].icon}
                        </span>
                        <div className={`flex-1 min-w-0 ${isRTL ? 'text-right' : ''}`}>
                          <p className="text-white/70 text-xs font-semibold">{cred.label}</p>
                          <p className="text-white/30 text-xs truncate">{cred.email}</p>
                        </div>
                        <span className="text-white/20 text-xs">{lang === 'ar' ? 'تعبئة' : 'Fill'}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </form>
            ) : (
              <form onSubmit={registerForm.handleSubmit(handleRegister)} className="space-y-4">
                <div>
                  <label className={`block text-white/60 text-xs font-semibold mb-1.5 ${isRTL ? 'font-arabic text-right' : ''}`}>
                    {lang === 'ar' ? 'الاسم الكامل' : 'Full Name'}
                  </label>
                  <input
                    {...registerForm.register('fullName', { required: true })}
                    type="text"
                    placeholder={lang === 'ar' ? 'أحمد خليل' : 'Ahmad Khalil'}
                    className={`w-full bg-white/05 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/25 text-sm outline-none focus:border-[#F05A00]/50 transition-all ${isRTL ? 'text-right font-arabic' : ''}`}
                  />
                </div>
                <div>
                  <label className={`block text-white/60 text-xs font-semibold mb-1.5 ${isRTL ? 'font-arabic text-right' : ''}`}>
                    {lang === 'ar' ? 'البريد الإلكتروني' : 'Email'}
                  </label>
                  <input
                    {...registerForm.register('email', { required: true })}
                    type="email"
                    placeholder="you@example.com"
                    className={`w-full bg-white/05 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/25 text-sm outline-none focus:border-[#F05A00]/50 transition-all ${isRTL ? 'text-right' : ''}`}
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className={`block text-white/60 text-xs font-semibold mb-1.5 ${isRTL ? 'font-arabic text-right' : ''}`}>
                      {lang === 'ar' ? 'المدينة' : 'City'}
                    </label>
                    <select
                      {...registerForm.register('city', { required: true })}
                      className={`w-full bg-white/05 border border-white/10 rounded-xl px-3 py-3 text-white text-sm outline-none focus:border-[#F05A00]/50 transition-all ${isRTL ? 'font-arabic text-right' : ''}`}
                    >
                      <option value="" className="bg-[#0D1B3E]">{lang === 'ar' ? 'اختر' : 'Select'}</option>
                      {cities.map((c, i) => (
                        <option key={`city-${i}`} value={PALESTINE_CITIES[i]} className="bg-[#0D1B3E]">{c}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className={`block text-white/60 text-xs font-semibold mb-1.5 ${isRTL ? 'font-arabic text-right' : ''}`}>
                      {lang === 'ar' ? 'العملة' : 'Currency'}
                    </label>
                    <select
                      {...registerForm.register('currency')}
                      className="w-full bg-white/05 border border-white/10 rounded-xl px-3 py-3 text-white text-sm outline-none focus:border-[#F05A00]/50 transition-all"
                    >
                      {CURRENCIES.map((c) => (
                        <option key={c.value} value={c.value} className="bg-[#0D1B3E]">{c.value}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className={`block text-white/60 text-xs font-semibold mb-1.5 ${isRTL ? 'font-arabic text-right' : ''}`}>
                    {lang === 'ar' ? 'كلمة المرور' : 'Password'}
                  </label>
                  <div className="relative">
                    <input
                      {...registerForm.register('password', { required: true, minLength: 6 })}
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      className="w-full bg-white/05 border border-white/10 rounded-xl px-4 py-3 pr-12 text-white placeholder-white/25 text-sm outline-none focus:border-[#F05A00]/50 transition-all"
                      dir="ltr"
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0zM2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </button>
                  </div>
                </div>
                <div>
                  <label className={`block text-white/60 text-xs font-semibold mb-1.5 ${isRTL ? 'font-arabic text-right' : ''}`}>
                    {lang === 'ar' ? 'تأكيد كلمة المرور' : 'Confirm Password'}
                  </label>
                  <div className="relative">
                    <input
                      {...registerForm.register('confirmPassword', { required: true })}
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      className="w-full bg-white/05 border border-white/10 rounded-xl px-4 py-3 pr-12 text-white placeholder-white/25 text-sm outline-none focus:border-[#F05A00]/50 transition-all"
                      dir="ltr"
                    />
                    <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0zM2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </button>
                  </div>
                  {registerForm.formState.errors.confirmPassword && (
                    <p className="text-red-400 text-xs mt-1">{registerForm.formState.errors.confirmPassword.message}</p>
                  )}
                </div>

                {/* CV Upload */}
                <div>
                  <label className={`block text-white/60 text-xs font-semibold mb-1.5 ${isRTL ? 'font-arabic text-right' : ''}`}>
                    {lang === 'ar' ? 'رفع السيرة الذاتية (اختياري)' : 'Upload CV (Optional)'}
                  </label>
                  <input
                    ref={cvInputRef}
                    type="file"
                    accept=".pdf,.doc,.docx"
                    className="hidden"
                    onChange={(e) => { if (e.target.files?.[0]) handleCVUpload(e.target.files[0]); }}
                  />
                  <button
                    type="button"
                    onClick={() => cvInputRef.current?.click()}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border-2 border-dashed transition-all duration-200 ${
                      cvFile ? 'border-[#22C55E]/50 bg-[#22C55E]/08' : 'border-white/15 hover:border-[#F05A00]/40 hover:bg-white/05'
                    } ${isRTL ? 'flex-row-reverse' : ''}`}
                  >
                    {cvParsing ? (
                      <svg className="w-5 h-5 text-[#F05A00] animate-spin flex-shrink-0" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                    ) : cvFile ? (
                      <svg className="w-5 h-5 text-[#22C55E] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5 text-white/30 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                    )}
                    <div className={`flex-1 min-w-0 ${isRTL ? 'text-right' : ''}`}>
                      <p className={`text-sm font-medium ${cvFile ? 'text-[#22C55E]' : 'text-white/50'} ${isRTL ? 'font-arabic' : ''}`}>
                        {cvParsing
                          ? (lang === 'ar' ? 'جارٍ التحليل...' : 'Analyzing...')
                          : cvFile
                            ? cvFile.name
                            : (lang === 'ar' ? 'اسحب ملف PDF أو DOCX هنا' : 'Drop PDF or DOCX here')}
                      </p>
                      {cvSkills.length > 0 && (
                        <p className={`text-xs text-[#22C55E]/70 mt-0.5 truncate ${isRTL ? 'font-arabic' : ''}`}>
                          {lang === 'ar' ? `مهارات مستخرجة: ${cvSkills.join('، ')}` : `Skills: ${cvSkills.join(', ')}`}
                        </p>
                      )}
                    </div>
                  </button>
                </div>

                <div className={`flex items-start gap-2.5 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <input
                    {...registerForm.register('agreeTerms', { required: true })}
                    type="checkbox"
                    id="agreeTerms"
                    className="mt-0.5 w-4 h-4 rounded border-white/20 bg-white/05 accent-[#F05A00]"
                  />
                  <label htmlFor="agreeTerms" className={`text-white/50 text-xs leading-relaxed ${isRTL ? 'font-arabic text-right' : ''}`}>
                    {lang === 'ar' ? 'أوافق على شروط الخدمة وسياسة الخصوصية' : 'I agree to the Terms of Service and Privacy Policy'}
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full py-3.5 rounded-xl orange-gradient text-white font-bold text-sm hover:opacity-90 active:scale-95 transition-all duration-150 glow-orange disabled:opacity-50 disabled:cursor-not-allowed ${isRTL ? 'font-arabic' : 'font-display'}`}
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      {lang === 'ar' ? 'جارٍ الإنشاء...' : 'Creating account...'}
                    </span>
                  ) : (lang === 'ar' ? 'إنشاء الحساب' : 'Create Account')}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
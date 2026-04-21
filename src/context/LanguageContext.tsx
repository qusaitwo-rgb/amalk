'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'ar';

export interface UserSession {
  fullName: string;
  email: string;
  role: 'talent' | 'company' | 'admin';
  city?: string;
  currency?: string;
  cvUploaded?: boolean;
  cvSkills?: string[];
  initials?: string;
}

interface FeatureItem {
  title: string;
  description: string;
  badge: string;
  metrics: string[];
}

interface Translations {
  nav: {
    howItWorks: string;
    features: string;
    successStories: string;
    ourMission: string;
    signIn: string;
    getStarted: string;
  };
  hero: {
    badge: string;
    words: string[];
    headline1: string;
    headline2: string;
    subtitle: string;
    ctaTalent: string;
    ctaCompany: string;
    ctaMission: string;
    scrollLabel: string;
  };
  features: {
    sectionLabel: string;
    sectionTitle: string;
    sectionSubtitle: string;
    filters: string[];
    cta: string;
    items: {
      title: string;
      description: string;
      badge: string;
      metrics: string[];
    }[];
  };
  featuresTabbed: {
    sectionLabel: string;
    sectionTitle: string;
    sectionSubtitle: string;
    tabTalent: string;
    tabCompany: string;
    cta: string;
    talentItems: FeatureItem[];
    companyItems: FeatureItem[];
  };
  howItWorks: {
    sectionLabel: string;
    sectionTitle: string;
    sectionSubtitle: string;
    steps: { title: string; description: string }[];
  };
  mission: {
    sectionLabel: string;
    title1: string;
    titleHighlight: string;
    subtitle: string;
    stats: { stat: string; label: string }[];
    cta: string;
    ctaSecondary: string;
  };
  successStories: {
    sectionLabel: string;
    sectionTitle: string;
    sectionSubtitle: string;
    salaryLabel: string;
    timeLabel: string;
    matchLabel: string;
  };
  companies: {
    sectionLabel: string;
    sectionTitle: string;
    sectionSubtitle: string;
  };
  footer: {
    tagline: string;
    online: string;
    platformTitle: string;
    platformLinks: string[];
    companyTitle: string;
    companyLinks: string[];
    legalTitle: string;
    legalLinks: string[];
    copyright: string;
    cities: string;
  };
  dashboard: {
    overview: string;
    matchRadar: string;
    salaryPredictor: string;
    jobMatches: string;
    applications: string;
    careerRoadmap: string;
    skillGap: string;
    notifications: string;
    searchJobs: string;
    uploadCV: string;
    welcome: string;
    profileStrength: string;
    aiMatchScore: string;
    appliedJobs: string;
    interviews: string;
    yourSkills: string;
    jobRequired: string;
    salaryIntelligence: string;
    estimatedSalary: string;
    negotiationTip: string;
  };
}

const EN: Translations = {
  nav: {
    howItWorks: 'How It Works',
    features: 'Features',
    successStories: 'Success Stories',
    ourMission: 'Our Mission',
    signIn: 'Sign In',
    getStarted: 'Get Started',
  },
  hero: {
    badge: 'AI-Powered Job Matching for Palestine',
    words: ['Talent', 'Ambition', 'Merit', 'Potential'],
    headline1: 'Where ',
    headline2: 'Meets Opportunity',
    subtitle: 'Amalak connects Palestinian talent with leading national companies — using advanced AI to eliminate nepotism, reduce unemployment, and support the local economy.',
    ctaTalent: 'I am a Talent Explorer',
    ctaCompany: 'I am an Opportunity Creator',
    ctaMission: 'Supporting Palestine — Our Mission',
    scrollLabel: 'Scroll to explore',
  },
  features: {
    sectionLabel: 'Platform Capabilities',
    sectionTitle: 'Built for the Future of Work',
    sectionSubtitle: 'Every feature is designed to remove barriers between exceptional talent and exceptional opportunities.',
    filters: ['All', 'For Talents', 'For Companies', 'Platform'],
    cta: 'Start for Free — No CV Required',
    items: [
      { title: 'AI Skill Matching', description: 'Upload your CV once. Our NLP engine extracts 50+ skills and matches you to roles with a precision score — no guesswork, no bias.', badge: 'Core Feature', metrics: ['94% accuracy', '50+ skill signals', 'Real-time scoring'] },
      { title: 'Salary Predictor', description: 'Know your worth before you negotiate. AI analyzes 200,000+ salary data points to give you a fair market estimate for your exact profile.', badge: 'PRO', metrics: ['200K+ data points', 'Palestine market', 'Updated weekly'] },
      { title: 'Swipe to Apply', description: 'Browse job matches like a curated feed. Swipe right to apply instantly, left to skip — your queue updates based on your behavior.', badge: 'New', metrics: ['2-tap apply', 'Smart queue', 'Zero friction'] },
      { title: 'AI Job Description Generator', description: 'Type 3 sentences about the role. Our AI writes a complete, bias-free, ATS-optimized job description in seconds.', badge: 'Employers', metrics: ['Bias-free language', 'ATS optimized', '30-second setup'] },
      { title: 'Instant AI Shortlisting', description: 'Post a job and get the top 5 candidates ranked by AI match score within minutes — with a plain-language explanation for each.', badge: 'Employers', metrics: ['Top 5 ranked', 'Match explanation', 'One-click invite'] },
      { title: 'Anti-Nepotism Engine', description: 'Blind screening mode hides names and photos during initial matching. AI flags anomalous hiring patterns and alerts administrators.', badge: 'Mission', metrics: ['Blind screening', 'Fraud detection', 'Audit trail'] },
    ],
  },
  featuresTabbed: {
    sectionLabel: 'Platform Features',
    sectionTitle: 'Everything You Need to Succeed',
    sectionSubtitle: 'Powerful AI tools tailored for both talents and companies — built to make every match count.',
    tabTalent: 'For Talents',
    tabCompany: 'For Companies',
    cta: 'Get Started Free',
    talentItems: [
      {
        title: 'Smart Profile Builder',
        description: 'Create a professional profile in minutes with AI-assisted CV parsing. Our engine extracts your skills, experience, and achievements automatically.',
        badge: 'AI-Powered',
        metrics: ['60-second setup', 'Auto skill extraction', 'ATS-ready profile'],
      },
      {
        title: 'Intelligent Job Matching',
        description: 'Get matched with roles that perfectly align with your skills and career goals using our AI radar. No more scrolling through irrelevant listings.',
        badge: 'Core Feature',
        metrics: ['94% match accuracy', 'Real-time updates', 'Skill-based ranking'],
      },
      {
        title: 'Application Tracker',
        description: 'Real-time visibility into your application status and recruiter interactions. Know exactly where you stand at every stage of the hiring process.',
        badge: 'Live',
        metrics: ['Status updates', 'Recruiter activity', 'Timeline view'],
      },
      {
        title: 'Career Guidance',
        description: 'Personalized AI roadmap to help you bridge skill gaps and reach your dream role. Get actionable steps tailored to your unique career path.',
        badge: 'Roadmap',
        metrics: ['Skill gap analysis', 'Learning paths', 'Goal tracking'],
      },
      {
        title: 'Interview Preparation',
        description: 'Practice with AI-simulated interviews and receive instant feedback on your performance. Walk into every interview with confidence.',
        badge: 'Practice',
        metrics: ['AI mock interviews', 'Instant feedback', 'Industry-specific Q&A'],
      },
    ],
    companyItems: [
      {
        title: 'Smart Job Posting',
        description: 'Generate high-quality job descriptions instantly with minimal input. Our AI crafts bias-free, ATS-optimized postings that attract the right candidates.',
        badge: 'AI-Generated',
        metrics: ['30-second setup', 'Bias-free language', 'ATS optimized'],
      },
      {
        title: 'Candidate Ranking',
        description: 'AI-powered shortlisting that ranks the top 5 candidates based on technical and soft skill fit. Get the best matches delivered to your dashboard.',
        badge: 'Top 5',
        metrics: ['Technical fit score', 'Soft skill analysis', 'Ranked shortlist'],
      },
      {
        title: 'Interview Scheduler',
        description: 'Automated coordination and scheduling to eliminate back-and-forth emails. Candidates self-book from your available slots in seconds.',
        badge: 'Automated',
        metrics: ['Self-booking', 'Calendar sync', 'Auto reminders'],
      },
      {
        title: 'Analytics Dashboard',
        description: 'Data-driven insights into your hiring funnel and team productivity. Track time-to-hire, source quality, and diversity metrics in real time.',
        badge: 'Insights',
        metrics: ['Funnel analytics', 'Time-to-hire', 'Diversity metrics'],
      },
      {
        title: 'Bulk Screening',
        description: 'Rapidly process hundreds of applications with AI filters to find the needle in the haystack. Scale your hiring without scaling your team.',
        badge: 'Scale',
        metrics: ['100s of apps/min', 'AI filters', 'Zero manual review'],
      },
    ],
  },
  howItWorks: {
    sectionLabel: 'The Process',
    sectionTitle: 'From Upload to Hired in 4 Steps',
    sectionSubtitle: 'The entire process takes less than 5 minutes. The results last a career.',
    steps: [
      { title: 'Create Your Profile', description: 'Sign up in 60 seconds. Choose your role — Talent or Company. Your journey begins.' },
      { title: 'Upload & AI Parses', description: 'Drop your CV. Our NLP extracts skills, experience, and soft traits — building your AI profile automatically.' },
      { title: 'AI Generates Matches', description: 'The matching engine compares your skill vector to thousands of roles — ranking by compatibility, not connections.' },
      { title: 'Swipe, Apply, Get Hired', description: 'Browse your curated match queue. Swipe right to apply. Track your status in real-time until you land the role.' },
    ],
  },
  mission: {
    sectionLabel: 'Our Mission',
    title1: 'Connecting Palestinian Talent with ',
    titleHighlight: 'National Companies',
    subtitle: 'Amalak was built to reduce unemployment and support the Palestinian economy. We connect talented Palestinians with leading national companies — ensuring every person is evaluated on merit, skills, and potential, not personal connections.',
    stats: [
      { stat: '30%+', label: 'youth unemployment rate in Palestine' },
      { stat: '100%', label: 'blind screening for all initial matches' },
      { stat: '∞', label: 'audit trail — every decision logged' },
    ],
    cta: 'Join the Palestinian Talent Network',
    ctaSecondary: 'Read Success Stories',
  },
  successStories: {
    sectionLabel: 'Palestinian Success Stories',
    sectionTitle: 'Real People. Real Matches. Real Results.',
    sectionSubtitle: 'Stories from Palestinian talents who let AI fight for them.',
    salaryLabel: 'Salary increase',
    timeLabel: 'Time to hire',
    matchLabel: 'match',
  },
  companies: {
    sectionLabel: 'Featured Palestinian Companies',
    sectionTitle: 'Leading Companies Hiring Now',
    sectionSubtitle: 'Top Palestinian companies trust Amalak to find merit-based talent.',
  },
  footer: {
    tagline: 'AI-powered job matching for Palestine. Connecting talent with national companies — always.',
    online: 'Platform online',
    platformTitle: 'Platform',
    platformLinks: ['For Talents', 'For Companies', 'AI Matching', 'Salary Predictor', 'Career Roadmap'],
    companyTitle: 'Company',
    companyLinks: ['Our Mission', 'Anti-Nepotism', 'Press', 'Careers', 'Blog'],
    legalTitle: 'Legal',
    legalLinks: ['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Data Processing', 'Security'],
    copyright: '© 2026 Amalak Technologies. Built with AI, driven by merit.',
    cities: '🇵🇸 Ramallah · 🇵🇸 Gaza · 🇵🇸 Nablus · 🇵🇸 Hebron · 🇵🇸 Jerusalem',
  },
  dashboard: {
    overview: 'Overview',
    matchRadar: 'Match Radar',
    salaryPredictor: 'Salary Predictor',
    jobMatches: 'Job Matches',
    applications: 'Applications',
    careerRoadmap: 'Career Roadmap',
    skillGap: 'Skill Gap',
    notifications: 'Notifications',
    searchJobs: 'Search Jobs',
    uploadCV: 'Upload CV',
    welcome: 'Welcome back',
    profileStrength: 'Profile Strength',
    aiMatchScore: 'AI Match Score',
    appliedJobs: 'Applied Jobs',
    interviews: 'Interviews',
    yourSkills: 'Your Skills',
    jobRequired: 'Job Required',
    salaryIntelligence: 'Salary Intelligence',
    estimatedSalary: 'Your estimated monthly salary',
    negotiationTip: 'AI Negotiation Tip',
  },
};

const AR: Translations = {
  nav: {
    howItWorks: 'كيف يعمل',
    features: 'المميزات',
    successStories: 'قصص النجاح',
    ourMission: 'مهمتنا',
    signIn: 'تسجيل الدخول',
    getStarted: 'ابدأ الآن',
  },
  hero: {
    badge: 'مطابقة وظائف بالذكاء الاصطناعي لفلسطين',
    words: ['المواهب', 'الطموح', 'الجدارة', 'الإمكانات'],
    headline1: 'حيث تلتقي ',
    headline2: 'بالفرصة',
    subtitle: 'تربط عملك المواهب الفلسطينية بالشركات الوطنية الرائدة — باستخدام الذكاء الاصطناعي للقضاء على المحسوبية وتقليل البطالة ودعم الاقتصاد المحلي.',
    ctaTalent: 'أنا باحث عن عمل',
    ctaCompany: 'أنا صاحب عمل',
    ctaMission: 'دعم فلسطين — مهمتنا',
    scrollLabel: 'مرر للاستكشاف',
  },
  features: {
    sectionLabel: 'إمكانيات المنصة',
    sectionTitle: 'مبني لمستقبل العمل',
    sectionSubtitle: 'كل ميزة مصممة لإزالة الحواجز بين المواهب الاستثنائية والفرص الاستثنائية.',
    filters: ['الكل', 'للمواهب', 'للشركات', 'المنصة'],
    cta: 'ابدأ مجاناً — لا تحتاج سيرة ذاتية',
    items: [
      { title: 'مطابقة المهارات بالذكاء الاصطناعي', description: 'ارفع سيرتك الذاتية مرة واحدة. يستخرج محرك NLP لدينا أكثر من 50 مهارة ويطابقك مع الأدوار بدقة عالية.', badge: 'الميزة الأساسية', metrics: ['دقة 94%', 'أكثر من 50 إشارة مهارة', 'تقييم فوري'] },
      { title: 'توقع الراتب', description: 'اعرف قيمتك قبل التفاوض. يحلل الذكاء الاصطناعي أكثر من 200,000 نقطة بيانات للرواتب لتقديم تقدير عادل لملفك الشخصي.', badge: 'احترافي', metrics: ['أكثر من 200 ألف نقطة', 'السوق الفلسطيني', 'تحديث أسبوعي'] },
      { title: 'التقديم بالتمرير', description: 'تصفح تطابقات الوظائف كخلاصة منتقاة. مرر يميناً للتقديم فوراً، يساراً للتخطي.', badge: 'جديد', metrics: ['تقديم بنقرتين', 'قائمة ذكية', 'بدون تعقيد'] },
      { title: 'مولد وصف الوظائف بالذكاء الاصطناعي', description: 'اكتب 3 جمل عن الدور. يكتب الذكاء الاصطناعي وصفاً وظيفياً كاملاً وخالياً من التحيز في ثوانٍ.', badge: 'أصحاب العمل', metrics: ['لغة خالية من التحيز', 'محسّن لـ ATS', 'إعداد في 30 ثانية'] },
      { title: 'القائمة المختصرة الفورية', description: 'انشر وظيفة واحصل على أفضل 5 مرشحين مرتبين حسب درجة التطابق في دقائق.', badge: 'أصحاب العمل', metrics: ['أفضل 5 مرشحين', 'شرح التطابق', 'دعوة بنقرة واحدة'] },
      { title: 'محرك مكافحة المحسوبية', description: 'يخفي وضع الفحص العمياء الأسماء والصور أثناء المطابقة الأولية. يرصد الذكاء الاصطناعي أنماط التوظيف غير الطبيعية.', badge: 'المهمة', metrics: ['فحص عمياء', 'كشف الاحتيال', 'سجل التدقيق'] },
    ],
  },
  featuresTabbed: {
    sectionLabel: 'مميزات المنصة',
    sectionTitle: 'كل ما تحتاجه للنجاح',
    sectionSubtitle: 'أدوات ذكاء اصطناعي قوية مصممة للمواهب والشركات على حد سواء — لجعل كل تطابق يُحدث فرقاً.',
    tabTalent: 'للمواهب',
    tabCompany: 'للشركات',
    cta: 'ابدأ مجاناً',
    talentItems: [
      {
        title: 'منشئ الملف الذكي',
        description: 'أنشئ ملفاً مهنياً في دقائق بمساعدة الذكاء الاصطناعي في تحليل سيرتك الذاتية. يستخرج محركنا مهاراتك وخبراتك وإنجازاتك تلقائياً.',
        badge: 'مدعوم بالذكاء الاصطناعي',
        metrics: ['إعداد في 60 ثانية', 'استخراج تلقائي للمهارات', 'ملف جاهز لـ ATS'],
      },
      {
        title: 'المطابقة الذكية للوظائف',
        description: 'احصل على تطابقات مع الأدوار التي تتوافق تماماً مع مهاراتك وأهدافك المهنية باستخدام رادار الذكاء الاصطناعي. لا مزيد من التمرير في قوائم غير ذات صلة.',
        badge: 'الميزة الأساسية',
        metrics: ['دقة تطابق 94%', 'تحديثات فورية', 'ترتيب قائم على المهارات'],
      },
      {
        title: 'متتبع الطلبات',
        description: 'رؤية فورية لحالة طلباتك وتفاعلات المسؤولين عن التوظيف. اعرف بالضبط أين أنت في كل مرحلة من مراحل التوظيف.',
        badge: 'مباشر',
        metrics: ['تحديثات الحالة', 'نشاط المسؤول', 'عرض الجدول الزمني'],
      },
      {
        title: 'التوجيه المهني',
        description: 'خارطة طريق مهنية مخصصة بالذكاء الاصطناعي لمساعدتك على سد فجوات المهارات والوصول إلى دورك المثالي. احصل على خطوات قابلة للتنفيذ مصممة لمسارك المهني الفريد.',
        badge: 'خارطة الطريق',
        metrics: ['تحليل فجوة المهارات', 'مسارات التعلم', 'تتبع الأهداف'],
      },
      {
        title: 'التحضير للمقابلات',
        description: 'تدرب مع مقابلات محاكاة بالذكاء الاصطناعي واحصل على تغذية راجعة فورية حول أدائك. ادخل كل مقابلة بثقة.',
        badge: 'تدريب',
        metrics: ['مقابلات محاكاة بالذكاء الاصطناعي', 'تغذية راجعة فورية', 'أسئلة خاصة بالصناعة'],
      },
    ],
    companyItems: [
      {
        title: 'نشر الوظائف الذكي',
        description: 'أنشئ أوصافاً وظيفية عالية الجودة فوراً بأدنى مدخلات. يصنع الذكاء الاصطناعي إعلانات خالية من التحيز ومحسّنة لـ ATS تجذب المرشحين المناسبين.',
        badge: 'مولّد بالذكاء الاصطناعي',
        metrics: ['إعداد في 30 ثانية', 'لغة خالية من التحيز', 'محسّن لـ ATS'],
      },
      {
        title: 'ترتيب المرشحين',
        description: 'قائمة مختصرة بالذكاء الاصطناعي ترتب أفضل 5 مرشحين بناءً على التوافق التقني والمهارات الشخصية. احصل على أفضل التطابقات مباشرة في لوحة التحكم.',
        badge: 'أفضل 5',
        metrics: ['درجة التوافق التقني', 'تحليل المهارات الشخصية', 'قائمة مختصرة مرتبة'],
      },
      {
        title: 'جدولة المقابلات',
        description: 'تنسيق وجدولة آلية للقضاء على رسائل البريد الإلكتروني المتبادلة. يحجز المرشحون من الفترات المتاحة لديك في ثوانٍ.',
        badge: 'آلي',
        metrics: ['حجز ذاتي', 'مزامنة التقويم', 'تذكيرات تلقائية'],
      },
      {
        title: 'لوحة التحليلات',
        description: 'رؤى مستندة إلى البيانات حول قمع التوظيف وإنتاجية الفريق. تتبع وقت التوظيف وجودة المصدر ومقاييس التنوع في الوقت الفعلي.',
        badge: 'رؤى',
        metrics: ['تحليلات القمع', 'وقت التوظيف', 'مقاييس التنوع'],
      },
      {
        title: 'الفرز الجماعي',
        description: 'معالجة سريعة لمئات الطلبات بفلاتر الذكاء الاصطناعي للعثور على الإبرة في كومة القش. وسّع توظيفك دون توسيع فريقك.',
        badge: 'توسع',
        metrics: ['مئات الطلبات/دقيقة', 'فلاتر الذكاء الاصطناعي', 'صفر مراجعة يدوية'],
      },
    ],
  },
  howItWorks: {
    sectionLabel: 'العملية',
    sectionTitle: 'من الرفع إلى التوظيف في 4 خطوات',
    sectionSubtitle: 'تستغرق العملية بأكملها أقل من 5 دقائق. والنتائج تدوم طوال المسيرة المهنية.',
    steps: [
      { title: 'أنشئ ملفك الشخصي', description: 'سجل في 60 ثانية. اختر دورك — موهبة أو شركة. تبدأ رحلتك.' },
      { title: 'ارفع وسيحلل الذكاء الاصطناعي', description: 'أسقط سيرتك الذاتية. يستخرج نظام NLP لدينا المهارات والخبرات والسمات تلقائياً.' },
      { title: 'الذكاء الاصطناعي يولد التطابقات', description: 'يقارن محرك المطابقة متجه مهاراتك بآلاف الأدوار — مرتبة حسب التوافق، لا الاتصالات.' },
      { title: 'مرر، قدّم، احصل على الوظيفة', description: 'تصفح قائمة التطابق المنتقاة. مرر يميناً للتقديم. تابع حالتك في الوقت الفعلي.' },
    ],
  },
  mission: {
    sectionLabel: 'مهمتنا',
    title1: 'ربط المواهب الفلسطينية بـ',
    titleHighlight: 'الشركات الوطنية',
    subtitle: 'بُنيت عملك لتقليل البطالة ودعم الاقتصاد الفلسطيني. نربط المواهب الفلسطينية بالشركات الوطنية الرائدة — لضمان تقييم كل شخص على أساس الجدارة والمهارات والإمكانات، لا العلاقات الشخصية.',
    stats: [
      { stat: '30%+', label: 'معدل بطالة الشباب في فلسطين' },
      { stat: '100%', label: 'فحص عمياء لجميع التطابقات الأولية' },
      { stat: '∞', label: 'سجل تدقيق — كل قرار موثق' },
    ],
    cta: 'انضم إلى شبكة المواهب الفلسطينية',
    ctaSecondary: 'اقرأ قصص النجاح',
  },
  successStories: {
    sectionLabel: 'قصص نجاح فلسطينية',
    sectionTitle: 'أشخاص حقيقيون. تطابقات حقيقية. نتائج حقيقية.',
    sectionSubtitle: 'قصص من مواهب فلسطينية تركت الذكاء الاصطناعي يناضل من أجلها.',
    salaryLabel: 'زيادة الراتب',
    timeLabel: 'وقت التوظيف',
    matchLabel: 'تطابق',
  },
  companies: {
    sectionLabel: 'الشركات الفلسطينية المميزة',
    sectionTitle: 'شركات رائدة تُوظّف الآن',
    sectionSubtitle: 'تثق الشركات الفلسطينية الكبرى بعملك للعثور على المواهب القائمة على الجدارة.',
  },
  footer: {
    tagline: 'مطابقة وظائف بالذكاء الاصطناعي لفلسطين. ربط المواهب بالشركات الوطنية — دائماً.',
    online: 'المنصة متاحة',
    platformTitle: 'المنصة',
    platformLinks: ['للمواهب', 'للشركات', 'المطابقة بالذكاء الاصطناعي', 'توقع الراتب', 'خارطة المسيرة'],
    companyTitle: 'الشركة',
    companyLinks: ['مهمتنا', 'مكافحة المحسوبية', 'الصحافة', 'الوظائف', 'المدونة'],
    legalTitle: 'القانونية',
    legalLinks: ['سياسة الخصوصية', 'شروط الخدمة', 'سياسة الكوكيز', 'معالجة البيانات', 'الأمان'],
    copyright: '© 2026 عملك تكنولوجيز. مبني بالذكاء الاصطناعي، مدفوع بالجدارة.',
    cities: '🇵🇸 رام الله · 🇵🇸 غزة · 🇵🇸 نابلس · 🇵🇸 الخليل · 🇵🇸 القدس',
  },
  dashboard: {
    overview: 'نظرة عامة',
    matchRadar: 'رادار التطابق',
    salaryPredictor: 'توقع الراتب',
    jobMatches: 'تطابقات الوظائف',
    applications: 'الطلبات',
    careerRoadmap: 'خارطة المسيرة',
    skillGap: 'فجوة المهارات',
    notifications: 'الإشعارات',
    searchJobs: 'البحث عن وظائف',
    uploadCV: 'رفع السيرة الذاتية',
    welcome: 'مرحباً بعودتك',
    profileStrength: 'قوة الملف الشخصي',
    aiMatchScore: 'درجة تطابق الذكاء الاصطناعي',
    appliedJobs: 'الوظائف المتقدم إليها',
    interviews: 'المقابلات',
    yourSkills: 'مهاراتك',
    jobRequired: 'متطلبات الوظيفة',
    salaryIntelligence: 'ذكاء الرواتب',
    estimatedSalary: 'راتبك الشهري المتوقع',
    negotiationTip: 'نصيحة التفاوض بالذكاء الاصطناعي',
  },
};

interface LanguageContextType {
  lang: Language;
  setLang: (l: Language) => void;
  t: Translations;
  isRTL: boolean;
  userSession: UserSession | null;
  setUserSession: (session: UserSession | null) => void;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'en',
  setLang: () => {},
  t: EN,
  isRTL: false,
  userSession: null,
  setUserSession: () => {},
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>('en');
  const [userSession, setUserSessionState] = useState<UserSession | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('amalak_session');
    if (stored) {
      try { setUserSessionState(JSON.parse(stored)); } catch {}
    }
  }, []);

  const setLang = (l: Language) => {
    setLangState(l);
    if (typeof document !== 'undefined') {
      document.documentElement.lang = l;
      document.documentElement.dir = l === 'ar' ? 'rtl' : 'ltr';
    }
  };

  const setUserSession = (session: UserSession | null) => {
    setUserSessionState(session);
    if (session) {
      localStorage.setItem('amalak_session', JSON.stringify(session));
    } else {
      localStorage.removeItem('amalak_session');
    }
  };

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: lang === 'ar' ? AR : EN, isRTL: lang === 'ar', userSession, setUserSession }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}

'use client';
import React, { useState } from 'react';
import { toast } from 'sonner';

const CURRENT_SKILLS = [
  { id: 'skill-ux', name: 'UX Design', level: 92, category: 'Design', verified: true },
  { id: 'skill-figma', name: 'Figma', level: 88, category: 'Tools', verified: true },
  { id: 'skill-research', name: 'User Research', level: 85, category: 'Design', verified: true },
  { id: 'skill-proto', name: 'Prototyping', level: 78, category: 'Design', verified: true },
  { id: 'skill-leadership', name: 'Leadership', level: 80, category: 'Soft Skills', verified: false },
  { id: 'skill-agile', name: 'Agile / Scrum', level: 75, category: 'Process', verified: false },
  { id: 'skill-html', name: 'HTML / CSS', level: 65, category: 'Technical', verified: false },
  { id: 'skill-analytics', name: 'Data Analysis', level: 55, category: 'Analytics', verified: false },
];

const SKILL_GAPS = [
  {
    id: 'gap-react-native',
    name: 'React Native',
    category: 'Technical',
    urgency: 'high',
    impact: 'Unlocks 8 additional job matches',
    matchBoost: '+12%',
    resources: [
      { id: 'res-rn-1', title: 'React Native for Designers', provider: 'Udemy', duration: '14h', price: 'AED 89' },
      { id: 'res-rn-2', title: 'Mobile UX with React Native', provider: 'Coursera', duration: '8h', price: 'Free' },
    ],
  },
  {
    id: 'gap-design-systems',
    name: 'Design Systems',
    category: 'Design',
    urgency: 'medium',
    impact: 'Required by 6 of your top matches',
    matchBoost: '+8%',
    resources: [
      { id: 'res-ds-1', title: 'Design Systems Mastery', provider: 'Designlab', duration: '20h', price: 'AED 149' },
      { id: 'res-ds-2', title: 'Figma Design Systems', provider: 'YouTube', duration: '4h', price: 'Free' },
    ],
  },
  {
    id: 'gap-storybook',
    name: 'Storybook',
    category: 'Technical',
    urgency: 'low',
    impact: 'Nice-to-have for 4 senior roles',
    matchBoost: '+4%',
    resources: [
      { id: 'res-sb-1', title: 'Storybook for Designers', provider: 'Frontend Masters', duration: '6h', price: 'AED 120' },
    ],
  },
];

const URGENCY_CONFIG = {
  high: { label: 'High Priority', color: '#EF4444', bg: 'rgba(239,68,68,0.12)' },
  medium: { label: 'Medium Priority', color: '#F59E0B', bg: 'rgba(245,158,11,0.12)' },
  low: { label: 'Low Priority', color: '#818CF8', bg: 'rgba(129,140,248,0.12)' },
};

export default function SkillGapPanel() {
  const [expandedGap, setExpandedGap] = useState<string | null>('gap-react-native');

  const getSkillColor = (level: number) => {
    if (level >= 85) return '#22C55E';
    if (level >= 70) return '#D4AF37';
    if (level >= 55) return '#F59E0B';
    return '#EF4444';
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-2xl font-700 text-white">Skill Gap Analysis</h2>
          <p className="text-white/40 text-sm mt-0.5">
            AI-identified gaps based on your top 12 job matches
          </p>
        </div>
        <div className="glass-gold rounded-2xl px-4 py-2 text-center">
          <div className="font-display font-700 text-[#D4AF37] text-2xl font-mono-data">78</div>
          <div className="text-white/40 text-xs">Skill Score / 100</div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Current skills */}
        <div className="glass rounded-3xl p-6">
          <h3 className="font-display font-700 text-white text-base mb-5">Your Current Skills</h3>
          <div className="space-y-4">
            {CURRENT_SKILLS.map((skill) => (
              <div key={skill.id}>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-white">{skill.name}</span>
                    {skill.verified && (
                      <span className="text-xs px-1.5 py-0.5 rounded-full bg-[#22C55E]/15 text-[#22C55E]">✓ Verified</span>
                    )}
                    <span className="text-xs text-white/30">{skill.category}</span>
                  </div>
                  <span className="text-sm font-bold font-mono-data" style={{ color: getSkillColor(skill.level) }}>
                    {skill.level}%
                  </span>
                </div>
                <div className="h-2 bg-white/08 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full skill-bar"
                    style={{ width: `${skill.level}%`, backgroundColor: getSkillColor(skill.level) }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Add skill button */}
          <button
            onClick={() => toast.info('CV re-analysis started — this takes ~30 seconds')}
            className="mt-5 w-full py-2.5 rounded-xl glass border border-white/15 text-white/50 hover:text-white hover:bg-white/08 text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Re-analyze CV for More Skills
          </button>
        </div>

        {/* Skill gaps */}
        <div className="space-y-4">
          <h3 className="font-display font-700 text-white text-base">Identified Gaps ({SKILL_GAPS.length})</h3>

          {SKILL_GAPS.map((gap) => {
            const urgency = URGENCY_CONFIG[gap.urgency as keyof typeof URGENCY_CONFIG];
            const isExpanded = expandedGap === gap.id;

            return (
              <div
                key={gap.id}
                className="glass rounded-2xl overflow-hidden border transition-all duration-200"
                style={{ borderColor: isExpanded ? `${urgency.color}30` : 'rgba(255,255,255,0.08)' }}
              >
                <button
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-white/03 transition-colors"
                  onClick={() => setExpandedGap(isExpanded ? null : gap.id)}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-lg font-bold"
                      style={{ backgroundColor: urgency.bg, color: urgency.color }}
                    >
                      !
                    </div>
                    <div>
                      <p className="font-semibold text-white text-sm">{gap.name}</p>
                      <p className="text-white/40 text-xs">{gap.category} · {gap.impact}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span
                      className="text-xs font-bold px-2.5 py-1 rounded-full"
                      style={{ backgroundColor: urgency.bg, color: urgency.color }}
                    >
                      {urgency.label}
                    </span>
                    <span className="text-xs font-bold text-[#22C55E]">{gap.matchBoost}</span>
                    <svg
                      className={`w-4 h-4 text-white/40 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                      fill="none" viewBox="0 0 24 24" stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>

                {isExpanded && (
                  <div className="px-5 pb-5 border-t border-white/08 pt-4">
                    <p className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-3">Recommended Courses</p>
                    <div className="space-y-2">
                      {gap.resources.map((resource) => (
                        <div
                          key={resource.id}
                          className="flex items-center justify-between p-3 rounded-xl bg-white/04 hover:bg-white/07 transition-colors cursor-pointer group"
                        >
                          <div>
                            <p className="text-sm font-medium text-white group-hover:text-[#D4AF37] transition-colors">{resource.title}</p>
                            <p className="text-xs text-white/40">{resource.provider} · {resource.duration}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <span
                              className="text-xs font-bold px-2 py-0.5 rounded-full"
                              style={{
                                backgroundColor: resource.price === 'Free' ? 'rgba(34,197,94,0.15)' : 'rgba(212,175,55,0.15)',
                                color: resource.price === 'Free' ? '#22C55E' : '#D4AF37',
                              }}
                            >
                              {resource.price}
                            </span>
                            <button
                              onClick={() => toast.success(`Enrolled in "${resource.title}"`)}
                              className="text-xs px-3 py-1 rounded-lg gold-gradient text-[#0D1547] font-semibold hover:opacity-90 transition-opacity"
                            >
                              Enroll
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {/* Impact summary */}
          <div className="glass-gold rounded-2xl p-4">
            <p className="text-xs font-semibold text-[#D4AF37] uppercase tracking-wider mb-2">Fix All Gaps → Impact</p>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white text-sm">Match score boost</p>
                <p className="text-white/40 text-xs">Across your top 12 matches</p>
              </div>
              <div className="text-right">
                <span className="font-display font-800 text-2xl text-[#22C55E] font-mono-data">+24%</span>
                <p className="text-white/40 text-xs">avg. improvement</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
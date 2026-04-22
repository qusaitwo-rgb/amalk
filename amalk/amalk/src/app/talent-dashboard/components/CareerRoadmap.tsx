'use client';
import React, { useState } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const CAREER_TRAJECTORY = [
  { id: 'traj-2022', year: '2022', salaryK: 14, level: 'Junior UX', skillScore: 55 },
  { id: 'traj-2023', year: '2023', salaryK: 18, level: 'Mid UX', skillScore: 64 },
  { id: 'traj-2024', year: '2024', salaryK: 22, level: 'Mid UX', skillScore: 71 },
  { id: 'traj-2025', year: '2025', salaryK: 25, level: 'Senior UX', skillScore: 78 },
  { id: 'traj-2026', year: '2026 (Now)', salaryK: 28.4, level: 'Senior UX', skillScore: 82 },
  { id: 'traj-2027', year: '2027 (AI Pred)', salaryK: 34, level: 'UX Lead', skillScore: 88 },
  { id: 'traj-2028', year: '2028 (AI Pred)', salaryK: 42, level: 'UX Lead', skillScore: 92 },
  { id: 'traj-2029', year: '2029 (AI Pred)', salaryK: 52, level: 'Head of UX', skillScore: 96 },
];

const MILESTONES = [
  {
    id: 'milestone-1',
    year: '2022',
    title: 'Junior Software Developer',
    company: 'Freelance',
    status: 'completed',
    description: 'Started career with React and Node.js. Completed 12 freelance projects for local Palestinian businesses.',
    skills: ['React', 'Node.js', 'HTML/CSS'],
  },
  {
    id: 'milestone-2',
    year: '2023–2024',
    title: 'Software Developer',
    company: 'Paltel Group',
    status: 'completed',
    description: 'Led development of 3 digital services for Paltel. Built scalable APIs and improved system performance by 40%.',
    skills: ['Node.js', 'REST APIs', 'PostgreSQL', 'Agile'],
  },
  {
    id: 'milestone-3',
    year: '2025',
    title: 'Senior Software Engineer',
    company: 'Jawwal',
    status: 'completed',
    description: 'Promoted to senior after leading the Jawwal mobile app rebuild (4.7★ rating, +31% user retention).',
    skills: ['React Native', 'Architecture', 'Team Leadership'],
  },
  {
    id: 'milestone-4',
    year: '2026 (Now)',
    title: 'Senior Software Engineer',
    company: 'Seeking Next Role',
    status: 'current',
    description: 'Actively exploring senior roles at leading Palestinian companies. Target: Ooredoo, Bank of Palestine, or PADICO.',
    skills: ['Cloud (learning)', 'Microservices (learning)'],
  },
  {
    id: 'milestone-5',
    year: '2027 (Predicted)',
    title: 'Tech Lead',
    company: 'AI Prediction',
    status: 'predicted',
    description: 'AI predicts Tech Lead role within 12–18 months based on skill trajectory and Palestinian market demand.',
    skills: ['Team Leadership', 'Technical Strategy', 'OKRs'],
  },
  {
    id: 'milestone-6',
    year: '2029 (Predicted)',
    title: 'Head of Engineering / CTO',
    company: 'AI Prediction',
    status: 'predicted',
    description: 'Long-term prediction: Director-level role with ₪25K+/mo compensation in the Palestinian tech sector.',
    skills: ['Executive Leadership', 'P&L Ownership', 'Engineering Operations'],
  },
];

const STATUS_CONFIG = {
  completed: { color: '#22C55E', label: 'Completed', dotClass: 'bg-[#22C55E]' },
  current: { color: '#D4AF37', label: 'Current', dotClass: 'bg-[#D4AF37] animate-pulse' },
  predicted: { color: '#818CF8', label: 'AI Predicted', dotClass: 'bg-[#818CF8]' },
};

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: { value: number; dataKey: string }[]; label?: string }) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-dark rounded-xl px-3 py-2.5 border border-white/15 shadow-glass text-xs">
        <p className="font-semibold text-white mb-1">{label}</p>
        {payload.map((entry) => (
          <p key={`ct-${entry.dataKey}`} className="text-[#D4AF37]">
            {entry.dataKey === 'salaryK' ? `AED ${entry.value}K/mo` : `Skill Score: ${entry.value}`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function CareerRoadmap() {
  const [activeTab, setActiveTab] = useState<'timeline' | 'chart'>('timeline');

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h2 className="font-display text-2xl font-700 text-white">Career Roadmap</h2>
          <p className="text-white/40 text-sm mt-0.5">
            AI-powered career trajectory · Based on your skills, market data, and 50K+ similar profiles
          </p>
        </div>
        <div className="flex items-center gap-2">
          {(['timeline', 'chart'] as const).map((tab) => (
            <button
              key={`roadmap-tab-${tab}`}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                activeTab === tab
                  ? 'gold-gradient text-[#0D1547]'
                  : 'glass text-white/50 hover:text-white'
              }`}
            >
              {tab === 'timeline' ? 'Timeline' : 'Chart View'}
            </button>
          ))}
        </div>
      </div>

      {activeTab === 'chart' && (
        <div className="glass rounded-3xl p-6">
          <h3 className="font-display font-700 text-white text-base mb-1">Salary Trajectory (Actual + AI Predicted)</h3>
          <p className="text-white/40 text-xs mb-5">AED thousands per month · Dashed = AI prediction</p>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={CAREER_TRAJECTORY} margin={{ top: 10, right: 20, bottom: 10, left: 0 }}>
              <defs>
                <linearGradient id="salGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#D4AF37" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
              <XAxis
                dataKey="year"
                tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10 }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `${v}K`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="salaryK"
                stroke="#D4AF37"
                strokeWidth={2.5}
                fill="url(#salGradient)"
                dot={{ fill: '#D4AF37', strokeWidth: 0, r: 4 }}
                activeDot={{ r: 6, fill: '#D4AF37' }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}

      {activeTab === 'timeline' && (
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-white/10" style={{ zIndex: 0 }} />

          <div className="space-y-6">
            {MILESTONES.map((milestone, i) => {
              const config = STATUS_CONFIG[milestone.status as keyof typeof STATUS_CONFIG];
              return (
                <div key={milestone.id} className="relative flex gap-6">
                  {/* Timeline dot */}
                  <div className="relative z-10 flex-shrink-0">
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center font-display font-700 text-xs text-[#0D1547]`}
                      style={{ backgroundColor: config.color }}
                    >
                      {i + 1}
                    </div>
                  </div>

                  {/* Content */}
                  <div
                    className={`flex-1 glass rounded-2xl p-5 mb-1 border transition-all duration-200 ${
                      milestone.status === 'current' ? 'border-[#D4AF37]/30' : 'border-white/08'
                    }`}
                  >
                    <div className="flex items-start justify-between flex-wrap gap-2 mb-2">
                      <div>
                        <div className="flex items-center gap-2 mb-0.5">
                          <h3 className="font-display font-700 text-white text-base">{milestone.title}</h3>
                          <span
                            className="text-xs font-bold px-2 py-0.5 rounded-full"
                            style={{ backgroundColor: `${config.color}20`, color: config.color }}
                          >
                            {config.label}
                          </span>
                        </div>
                        <p className="text-white/50 text-sm">{milestone.company}</p>
                      </div>
                      <span className="text-xs text-white/30 font-mono-data">{milestone.year}</span>
                    </div>

                    <p className="text-white/60 text-sm leading-relaxed mb-3">{milestone.description}</p>

                    <div className="flex flex-wrap gap-2">
                      {milestone.skills.map((skill) => (
                        <span
                          key={`ms-${milestone.id}-${skill}`}
                          className="text-xs px-2.5 py-1 rounded-full border"
                          style={{
                            borderColor: `${config.color}30`,
                            backgroundColor: `${config.color}10`,
                            color: config.color,
                          }}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    {milestone.status === 'predicted' && (
                      <div className="mt-3 flex items-center gap-2 text-xs text-white/30">
                        <svg className="w-3.5 h-3.5 text-[#818CF8]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                        AI prediction based on 50,432 similar career profiles in MENA
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* AI insight banner */}
      <div className="glass-gold rounded-3xl p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#D4AF37]/20 flex items-center justify-center flex-shrink-0">
            <svg className="w-6 h-6 text-[#D4AF37]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <div>
            <p className="font-display font-700 text-[#D4AF37] text-sm mb-1">AI Career Advisor</p>
            <p className="text-white/70 text-sm leading-relaxed">
              Based on your current trajectory, you are 14 months ahead of the average Senior UX Designer in Dubai.
              Adding React Native and Design Systems skills will accelerate your path to UX Lead by approximately 6 months.
              Your profile is in the top 8% of UX talent on the platform.
            </p>
            <div className="flex flex-wrap gap-2 mt-3">
              <span className="text-xs px-2.5 py-1 rounded-full bg-[#22C55E]/15 text-[#22C55E]">Top 8% on platform</span>
              <span className="text-xs px-2.5 py-1 rounded-full bg-[#D4AF37]/15 text-[#D4AF37]">14 months ahead of avg.</span>
              <span className="text-xs px-2.5 py-1 rounded-full bg-[#818CF8]/15 text-[#818CF8]">UX Lead in ~14 months</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
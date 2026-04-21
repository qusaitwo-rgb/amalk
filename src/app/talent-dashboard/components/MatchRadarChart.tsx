'use client';
import React from 'react';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from 'recharts';
import { useLanguage } from '@/context/LanguageContext';

const RADAR_DATA_EN = [
  { skill: 'UX Design', you: 92, required: 95 },
  { skill: 'Figma', you: 88, required: 90 },
  { skill: 'User Research', you: 85, required: 80 },
  { skill: 'Prototyping', you: 78, required: 85 },
  { skill: 'React', you: 60, required: 70 },
  { skill: 'Data Analysis', you: 55, required: 65 },
  { skill: 'Leadership', you: 80, required: 75 },
  { skill: 'Agile/Scrum', you: 75, required: 80 },
];

const RADAR_DATA_AR = [
  { skill: 'تصميم UX', you: 92, required: 95 },
  { skill: 'فيغما', you: 88, required: 90 },
  { skill: 'بحث المستخدم', you: 85, required: 80 },
  { skill: 'النماذج الأولية', you: 78, required: 85 },
  { skill: 'React', you: 60, required: 70 },
  { skill: 'تحليل البيانات', you: 55, required: 65 },
  { skill: 'القيادة', you: 80, required: 75 },
  { skill: 'أجايل/سكرم', you: 75, required: 80 },
];

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: { name: string; value: number; color: string }[]; label?: string }) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-dark rounded-xl px-3 py-2 border border-white/15 shadow-glass text-xs">
        <p className="font-semibold text-white mb-1">{label}</p>
        {payload.map((entry) => (
          <p key={`tooltip-${entry.name}`} style={{ color: entry.color }}>
            {entry.name}: {entry.value}%
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function MatchRadarChart() {
  const { lang, t } = useLanguage();
  const radarData = lang === 'ar' ? RADAR_DATA_AR : RADAR_DATA_EN;
  const yourSkillsLabel = t.dashboard?.yourSkills || 'Your Skills';
  const jobRequiredLabel = t.dashboard?.jobRequired || 'Job Required';

  return (
    <ResponsiveContainer width="100%" height={280}>
      <RadarChart data={radarData} margin={{ top: 10, right: 20, bottom: 10, left: 20 }}>
        <PolarGrid stroke="rgba(255,255,255,0.1)" />
        <PolarAngleAxis
          dataKey="skill"
          tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 11, fontFamily: lang === 'ar' ? 'Noto Kufi Arabic' : 'DM Sans' }}
        />
        <Radar
          name={yourSkillsLabel}
          dataKey="you"
          stroke="#D4AF37"
          fill="#D4AF37"
          fillOpacity={0.2}
          strokeWidth={2}
        />
        <Radar
          name={jobRequiredLabel}
          dataKey="required"
          stroke="#818CF8"
          fill="#818CF8"
          fillOpacity={0.1}
          strokeWidth={1.5}
          strokeDasharray="4 4"
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend
          wrapperStyle={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', paddingTop: '8px' }}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
}
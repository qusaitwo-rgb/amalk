'use client';
import React, { useState } from 'react';
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

type ReportPeriod = '7d' | '30d' | '90d';

const MONTHLY_DATA = [
  { month: 'Oct', registrations: 142, hires: 28, matches: 680, jobs: 45 },
  { month: 'Nov', registrations: 189, hires: 34, matches: 820, jobs: 58 },
  { month: 'Dec', registrations: 167, hires: 31, matches: 760, jobs: 52 },
  { month: 'Jan', registrations: 224, hires: 42, matches: 1020, jobs: 71 },
  { month: 'Feb', registrations: 198, hires: 38, matches: 940, jobs: 64 },
  { month: 'Mar', registrations: 247, hires: 45, matches: 1180, jobs: 82 },
];

const WEEKLY_DATA = [
  { day: 'Mon', registrations: 34, hires: 6, matches: 180 },
  { day: 'Tue', registrations: 41, hires: 8, matches: 210 },
  { day: 'Wed', registrations: 38, hires: 7, matches: 195 },
  { day: 'Thu', registrations: 52, hires: 11, matches: 260 },
  { day: 'Fri', registrations: 29, hires: 5, matches: 140 },
  { day: 'Sat', registrations: 18, hires: 3, matches: 90 },
  { day: 'Sun', registrations: 22, hires: 4, matches: 110 },
];

const INDUSTRY_DATA = [
  { name: 'Technology', value: 312, color: '#818CF8' },
  { name: 'Telecom', value: 198, color: '#F05A00' },
  { name: 'Banking', value: 167, color: '#22C55E' },
  { name: 'Healthcare', value: 124, color: '#F59E0B' },
  { name: 'Education', value: 98, color: '#EC4899' },
  { name: 'Other', value: 185, color: '#64748B' },
];

const CITY_HIRE_DATA = [
  { city: 'Ramallah', hires: 78, color: '#F05A00' },
  { city: 'Nablus', hires: 42, color: '#818CF8' },
  { city: 'Gaza', hires: 38, color: '#22C55E' },
  { city: 'Hebron', hires: 29, color: '#F59E0B' },
  { city: 'Jerusalem', hires: 18, color: '#EC4899' },
  { city: 'Bethlehem', hires: 13, color: '#64748B' },
];

const KPI_METRICS = [
  { label: 'Avg. Time to Hire', value: '11 days', change: '-3 days', up: true, color: '#22C55E' },
  { label: 'Match Acceptance Rate', value: '68%', change: '+4%', up: true, color: '#818CF8' },
  { label: 'Platform Retention', value: '82%', change: '+2%', up: true, color: '#F05A00' },
  { label: 'Anti-Nepotism Flags', value: '3', change: '-5 vs last month', up: true, color: '#F59E0B' },
];

export default function ReportingAnalytics() {
  const [period, setPeriod] = useState<ReportPeriod>('30d');
  const chartData = period === '7d' ? WEEKLY_DATA : MONTHLY_DATA;
  const xKey = period === '7d' ? 'day' : 'month';

  return (
    <div className="space-y-6">
      {/* Period selector */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-white font-display">Platform Analytics</h2>
          <p className="text-xs text-white/40 mt-0.5">Comprehensive reporting for Amalak Palestine</p>
        </div>
        <div className="flex gap-2">
          {([['7d', 'Last 7 Days'], ['30d', 'Last 30 Days'], ['90d', 'Last 90 Days']] as [ReportPeriod, string][]).map(([val, label]) => (
            <button
              key={val}
              onClick={() => setPeriod(val)}
              className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${
                period === val ? 'bg-[#F05A00] text-white' : 'bg-white/05 text-white/50 hover:text-white hover:bg-white/10'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* KPI metrics */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {KPI_METRICS.map((m) => (
          <div key={m.label} className="bg-[#0D1B3E]/80 border border-white/08 rounded-xl p-4">
            <p className="text-2xl font-bold text-white font-display">{m.value}</p>
            <p className="text-xs text-white/50 mt-0.5 mb-2">{m.label}</p>
            <span
              className="text-xs font-semibold px-2 py-0.5 rounded-full"
              style={{ backgroundColor: `${m.color}15`, color: m.color }}
            >
              {m.change}
            </span>
          </div>
        ))}
      </div>

      {/* Main charts */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Registrations & Hires */}
        <div className="bg-[#0D1B3E]/80 border border-white/08 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-sm font-bold text-white font-display">Registrations vs Hires</h3>
              <p className="text-xs text-white/40 mt-0.5">New users and successful placements</p>
            </div>
            <div className="flex items-center gap-3 text-xs text-white/50">
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#818CF8]" />Registrations</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#22C55E]" />Hires</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={chartData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey={xKey} tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ backgroundColor: '#0D1B3E', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff' }}
              />
              <Bar dataKey="registrations" fill="#818CF8" radius={[4, 4, 0, 0]} />
              <Bar dataKey="hires" fill="#22C55E" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* AI Matches trend */}
        <div className="bg-[#0D1B3E]/80 border border-white/08 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-sm font-bold text-white font-display">AI Match Volume</h3>
              <p className="text-xs text-white/40 mt-0.5">Total matches generated by AI engine</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={chartData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="matchGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#F05A00" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#F05A00" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey={xKey} tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ backgroundColor: '#0D1B3E', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff' }}
              />
              <Area type="monotone" dataKey="matches" stroke="#F05A00" strokeWidth={2.5} fill="url(#matchGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom charts */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Industry breakdown */}
        <div className="bg-[#0D1B3E]/80 border border-white/08 rounded-2xl p-6">
          <div className="mb-5">
            <h3 className="text-sm font-bold text-white font-display">Jobs by Industry</h3>
            <p className="text-xs text-white/40 mt-0.5">Distribution of active job listings</p>
          </div>
          <div className="flex items-center gap-6">
            <ResponsiveContainer width={160} height={160}>
              <PieChart>
                <Pie data={INDUSTRY_DATA} cx="50%" cy="50%" innerRadius={45} outerRadius={70} dataKey="value" paddingAngle={3}>
                  {INDUSTRY_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#0D1B3E', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff' }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex-1 space-y-2">
              {INDUSTRY_DATA.map((item) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
                    <span className="text-xs text-white/60">{item.name}</span>
                  </div>
                  <span className="text-xs font-semibold text-white">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Hires by city */}
        <div className="bg-[#0D1B3E]/80 border border-white/08 rounded-2xl p-6">
          <div className="mb-5">
            <h3 className="text-sm font-bold text-white font-display">Successful Hires by City</h3>
            <p className="text-xs text-white/40 mt-0.5">Geographic distribution of placements</p>
          </div>
          <div className="space-y-3">
            {CITY_HIRE_DATA.map((item) => {
              const max = Math.max(...CITY_HIRE_DATA.map((c) => c.hires));
              const pct = Math.round((item.hires / max) * 100);
              return (
                <div key={item.city}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-white/70">{item.city}</span>
                    <span className="text-xs font-semibold text-white">{item.hires} hires</span>
                  </div>
                  <div className="h-2 bg-white/08 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{ width: `${pct}%`, backgroundColor: item.color }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Anti-nepotism report */}
      <div className="bg-[#0D1B3E]/80 border border-white/08 rounded-2xl p-6">
        <div className="flex items-start justify-between mb-5">
          <div>
            <h3 className="text-sm font-bold text-white font-display">Anti-Nepotism Engine Report</h3>
            <p className="text-xs text-white/40 mt-0.5">Blind screening compliance and anomaly detection</p>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#22C55E]/15 text-[#22C55E]">All Clear</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: 'Blind Screenings', value: '5,891', color: '#818CF8', icon: '🔒' },
            { label: 'Anomalies Detected', value: '3', color: '#F59E0B', icon: '⚠️' },
            { label: 'Anomalies Resolved', value: '3', color: '#22C55E', icon: '✅' },
            { label: 'Audit Log Entries', value: '12,440', color: '#F05A00', icon: '📋' },
          ].map((item) => (
            <div key={item.label} className="bg-white/04 border border-white/06 rounded-xl p-4 text-center">
              <div className="text-2xl mb-1">{item.icon}</div>
              <p className="text-xl font-bold font-display" style={{ color: item.color }}>{item.value}</p>
              <p className="text-xs text-white/40 mt-0.5">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

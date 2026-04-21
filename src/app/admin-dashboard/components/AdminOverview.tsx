'use client';
import React from 'react';
import type { AdminTab } from './AdminDashboardLayout';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface Props {
  setActiveTab: (tab: AdminTab) => void;
}

const PLATFORM_STATS = [
  {
    id: 'stat-users',
    label: 'Total Users',
    value: '1,284',
    subtext: '847 talents · 437 employers',
    trend: '+124 this month',
    trendUp: true,
    color: '#818CF8',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    id: 'stat-jobs',
    label: 'Active Job Listings',
    value: '342',
    subtext: '89 companies posting',
    trend: '+38 this week',
    trendUp: true,
    color: '#F05A00',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    id: 'stat-matches',
    label: 'AI Matches Made',
    value: '5,891',
    subtext: '94.2% avg match score',
    trend: '+412 this week',
    trendUp: true,
    color: '#22C55E',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    id: 'stat-hires',
    label: 'Successful Hires',
    value: '218',
    subtext: 'Across 12 cities',
    trend: '+31 this month',
    trendUp: true,
    color: '#F59E0B',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
  },
];

const GROWTH_DATA = [
  { month: 'Oct', users: 620, jobs: 180, matches: 2800 },
  { month: 'Nov', users: 780, jobs: 220, matches: 3400 },
  { month: 'Dec', users: 890, jobs: 260, matches: 3900 },
  { month: 'Jan', users: 1020, jobs: 290, matches: 4600 },
  { month: 'Feb', users: 1140, jobs: 315, matches: 5200 },
  { month: 'Mar', users: 1284, jobs: 342, matches: 5891 },
];

const CITY_DATA = [
  { city: 'Ramallah', users: 412 },
  { city: 'Nablus', users: 198 },
  { city: 'Gaza', users: 187 },
  { city: 'Hebron', users: 156 },
  { city: 'Jerusalem', users: 143 },
  { city: 'Bethlehem', users: 98 },
  { city: 'Jenin', users: 90 },
];

const RECENT_ACTIVITY = [
  { id: 'ra1', type: 'hire', text: 'Ahmad Khalil hired at Paltel as Senior Engineer', time: '12m ago', color: '#22C55E' },
  { id: 'ra2', type: 'verify', text: 'Jawwal verification approved by admin', time: '34m ago', color: '#818CF8' },
  { id: 'ra3', type: 'flag', text: 'Suspicious hiring pattern flagged — reviewed', time: '1h ago', color: '#EF4444' },
  { id: 'ra4', type: 'register', text: '14 new talent profiles created today', time: '2h ago', color: '#F05A00' },
  { id: 'ra5', type: 'match', text: '89 new AI matches generated this morning', time: '3h ago', color: '#F59E0B' },
  { id: 'ra6', type: 'hire', text: 'Layla Hassan hired at Bank of Palestine', time: '5h ago', color: '#22C55E' },
];

export default function AdminOverview({ setActiveTab }: Props) {
  return (
    <div className="space-y-8">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {PLATFORM_STATS.map((stat) => (
          <div
            key={stat.id}
            className="bg-[#0D1B3E]/80 border border-white/08 rounded-2xl p-5 hover:border-white/15 transition-all duration-200"
          >
            <div className="flex items-start justify-between mb-4">
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: `${stat.color}18`, color: stat.color }}
              >
                {stat.icon}
              </div>
              <span
                className="text-xs font-semibold px-2 py-1 rounded-full"
                style={{ backgroundColor: `${stat.color}15`, color: stat.color }}
              >
                {stat.trend}
              </span>
            </div>
            <p className="text-3xl font-bold text-white font-display mb-1">{stat.value}</p>
            <p className="text-sm font-semibold text-white/70">{stat.label}</p>
            <p className="text-xs text-white/35 mt-0.5">{stat.subtext}</p>
          </div>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Growth chart — spans 2 cols */}
        <div className="xl:col-span-2 bg-[#0D1B3E]/80 border border-white/08 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base font-bold text-white font-display">Platform Growth</h3>
              <p className="text-xs text-white/40 mt-0.5">Users, jobs & matches over 6 months</p>
            </div>
            <div className="flex items-center gap-4 text-xs text-white/50">
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#818CF8]" />Users</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#F05A00]" />Jobs</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={GROWTH_DATA} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="usersGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#818CF8" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#818CF8" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="jobsGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#F05A00" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#F05A00" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="month" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ backgroundColor: '#0D1B3E', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff' }}
                labelStyle={{ color: 'rgba(255,255,255,0.6)' }}
              />
              <Area type="monotone" dataKey="users" stroke="#818CF8" strokeWidth={2} fill="url(#usersGrad)" />
              <Area type="monotone" dataKey="jobs" stroke="#F05A00" strokeWidth={2} fill="url(#jobsGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* City distribution */}
        <div className="bg-[#0D1B3E]/80 border border-white/08 rounded-2xl p-6">
          <div className="mb-6">
            <h3 className="text-base font-bold text-white font-display">Users by City</h3>
            <p className="text-xs text-white/40 mt-0.5">Palestinian talent distribution</p>
          </div>
          <div className="space-y-3">
            {CITY_DATA.map((item) => {
              const pct = Math.round((item.users / 1284) * 100);
              return (
                <div key={item.city}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-white/70">{item.city}</span>
                    <span className="text-xs font-semibold text-white">{item.users}</span>
                  </div>
                  <div className="h-1.5 bg-white/08 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[#F05A00] to-[#818CF8] transition-all duration-700"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Quick actions + Recent activity */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Quick actions */}
        <div className="bg-[#0D1B3E]/80 border border-white/08 rounded-2xl p-6">
          <h3 className="text-base font-bold text-white font-display mb-4">Quick Actions</h3>
          <div className="space-y-2.5">
            {[
              { label: 'Review Pending Verifications', tab: 'companies' as AdminTab, badge: '7', color: '#F59E0B' },
              { label: 'Manage Users', tab: 'users' as AdminTab, badge: '1,284', color: '#818CF8' },
              { label: 'View Analytics Report', tab: 'analytics' as AdminTab, badge: null, color: '#22C55E' },
            ].map((action) => (
              <button
                key={action.label}
                onClick={() => setActiveTab(action.tab)}
                className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-white/04 border border-white/08 hover:bg-white/08 hover:border-white/15 transition-all duration-200 group"
              >
                <span className="text-sm text-white/70 group-hover:text-white transition-colors">{action.label}</span>
                {action.badge && (
                  <span
                    className="text-xs font-bold px-2 py-0.5 rounded-full"
                    style={{ backgroundColor: `${action.color}20`, color: action.color }}
                  >
                    {action.badge}
                  </span>
                )}
                {!action.badge && (
                  <svg className="w-4 h-4 text-white/30 group-hover:text-white/60 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Recent activity */}
        <div className="xl:col-span-2 bg-[#0D1B3E]/80 border border-white/08 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-white font-display">Recent Activity</h3>
            <span className="text-xs text-white/40">Live feed</span>
          </div>
          <div className="space-y-3">
            {RECENT_ACTIVITY.map((item) => (
              <div key={item.id} className="flex items-start gap-3 py-2.5 border-b border-white/05 last:border-0">
                <span className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: item.color }} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-white/75">{item.text}</p>
                </div>
                <span className="text-xs text-white/30 flex-shrink-0">{item.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

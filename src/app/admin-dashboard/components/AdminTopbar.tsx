'use client';
import React, { useState } from 'react';
import type { AdminTab } from './AdminDashboardLayout';

const TAB_LABELS: Record<AdminTab, string> = {
  overview: 'Platform Overview',
  users: 'User Management',
  companies: 'Company Verification',
  analytics: 'Reporting & Analytics',
};

interface TopbarProps {
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (v: boolean) => void;
  activeTab: AdminTab;
}

export default function AdminTopbar({ activeTab }: TopbarProps) {
  const [notifOpen, setNotifOpen] = useState(false);

  const ALERTS = [
    { id: 'a1', text: 'Paltel submitted verification documents', time: '5m ago', color: '#F59E0B', unread: true },
    { id: 'a2', text: 'Unusual hiring pattern detected — PADICO', time: '22m ago', color: '#EF4444', unread: true },
    { id: 'a3', text: 'New company registration: Al-Quds Tech', time: '1h ago', color: '#818CF8', unread: false },
    { id: 'a4', text: '47 new talent registrations today', time: '3h ago', color: '#22C55E', unread: false },
  ];

  return (
    <header className="flex-shrink-0 flex items-center justify-between px-6 lg:px-8 py-4 border-b border-white/08 bg-[#0A1128] relative z-30">
      <div>
        <h1 className="text-xl font-bold text-white font-display">{TAB_LABELS[activeTab]}</h1>
        <p className="text-white/40 text-xs mt-0.5">Amalak Admin Panel · Palestine</p>
      </div>

      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="hidden md:flex items-center gap-2 bg-white/05 border border-white/10 rounded-xl px-3 py-2 w-52">
          <svg className="w-4 h-4 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search users, companies..."
            className="bg-transparent text-sm text-white placeholder-white/25 outline-none w-full"
          />
        </div>

        {/* Alerts */}
        <div className="relative">
          <button
            onClick={() => setNotifOpen(!notifOpen)}
            className="relative w-9 h-9 rounded-xl bg-white/05 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all duration-200"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500" />
          </button>

          {notifOpen && (
            <div className="absolute top-12 right-0 w-80 bg-[#0D1B3E] rounded-2xl border border-white/10 shadow-2xl overflow-hidden z-50">
              <div className="px-4 py-3 border-b border-white/08 flex items-center justify-between">
                <span className="text-sm font-semibold text-white">System Alerts</span>
                <span className="text-xs text-red-400 font-medium">2 critical</span>
              </div>
              <div className="max-h-72 overflow-y-auto">
                {ALERTS.map((alert) => (
                  <div
                    key={alert.id}
                    className={`px-4 py-3 flex items-start gap-3 hover:bg-white/05 transition-colors border-b border-white/05 last:border-0 ${alert.unread ? 'bg-white/02' : ''}`}
                  >
                    <span className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: alert.color }} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-white/80 leading-snug">{alert.text}</p>
                      <p className="text-xs text-white/30 mt-0.5">{alert.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Admin badge */}
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-red-500/10 border border-red-500/20">
          <span className="w-2 h-2 rounded-full bg-red-400" />
          <span className="text-xs font-semibold text-red-400 hidden sm:block">Admin</span>
        </div>
      </div>
    </header>
  );
}

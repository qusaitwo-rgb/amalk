'use client';
import React, { useState } from 'react';
import { toast } from 'sonner';

type VerifyStatus = 'pending' | 'verified' | 'rejected';

interface Company {
  id: string;
  name: string;
  email: string;
  city: string;
  industry: string;
  status: VerifyStatus;
  submittedDate: string;
  employees: string;
  docs: string[];
  jobsPosted: number;
  description: string;
}

const COMPANIES: Company[] = [
  {
    id: 'c1', name: 'Paltel', email: 'verify@paltel.ps', city: 'Ramallah', industry: 'Telecommunications',
    status: 'verified', submittedDate: 'Dec 5, 2025', employees: '1,000–5,000', docs: ['Trade License', 'Tax Certificate', 'Company Profile'],
    jobsPosted: 14, description: 'Palestine Telecommunications Company — the leading telecom provider in Palestine.',
  },
  {
    id: 'c2', name: 'Jawwal', email: 'hr@jawwal.ps', city: 'Ramallah', industry: 'Telecommunications',
    status: 'verified', submittedDate: 'Dec 10, 2025', employees: '500–1,000', docs: ['Trade License', 'Tax Certificate'],
    jobsPosted: 9, description: 'Jawwal is the first Palestinian mobile network operator.',
  },
  {
    id: 'c3', name: 'Bank of Palestine', email: 'talent@bop.ps', city: 'Nablus', industry: 'Banking & Finance',
    status: 'verified', submittedDate: 'Jan 7, 2026', employees: '1,000–5,000', docs: ['Trade License', 'Banking License', 'Tax Certificate'],
    jobsPosted: 11, description: 'The largest Palestinian bank with branches across all governorates.',
  },
  {
    id: 'c4', name: 'Ooredoo Palestine', email: 'hr@ooredoo.ps', city: 'Ramallah', industry: 'Telecommunications',
    status: 'pending', submittedDate: 'Mar 28, 2026', employees: '200–500', docs: ['Trade License', 'Tax Certificate'],
    jobsPosted: 0, description: 'Ooredoo Palestine provides mobile and internet services across the West Bank.',
  },
  {
    id: 'c5', name: 'PADICO', email: 'jobs@padico.ps', city: 'Ramallah', industry: 'Investment & Development',
    status: 'pending', submittedDate: 'Apr 1, 2026', employees: '500–1,000', docs: ['Trade License', 'Investment Certificate'],
    jobsPosted: 0, description: 'Palestine Development and Investment Company — a leading investment holding company.',
  },
  {
    id: 'c6', name: 'Al-Quds Tech', email: 'info@alqudstech.ps', city: 'Jerusalem', industry: 'Technology',
    status: 'pending', submittedDate: 'Apr 3, 2026', employees: '10–50', docs: ['Trade License'],
    jobsPosted: 0, description: 'A Jerusalem-based software development and IT services company.',
  },
  {
    id: 'c7', name: 'Siniora Food Industries', email: 'hr@siniora.ps', city: 'Ramallah', industry: 'Food & Beverage',
    status: 'pending', submittedDate: 'Apr 5, 2026', employees: '200–500', docs: ['Trade License', 'Food Safety Certificate'],
    jobsPosted: 0, description: 'Leading Palestinian food manufacturer with products distributed across the region.',
  },
  {
    id: 'c8', name: 'Gaza Tech Hub', email: 'contact@gazatechhub.ps', city: 'Gaza', industry: 'Technology',
    status: 'rejected', submittedDate: 'Mar 10, 2026', employees: '10–50', docs: ['Trade License'],
    jobsPosted: 0, description: 'Tech startup incubator based in Gaza.',
  },
];

const STATUS_CONFIG: Record<VerifyStatus, { color: string; bg: string; label: string }> = {
  verified: { color: '#22C55E', bg: '#22C55E15', label: 'Verified' },
  pending: { color: '#F59E0B', bg: '#F59E0B15', label: 'Pending Review' },
  rejected: { color: '#EF4444', bg: '#EF444415', label: 'Rejected' },
};

export default function CompanyVerification() {
  const [companies, setCompanies] = useState<Company[]>(COMPANIES);
  const [filter, setFilter] = useState<VerifyStatus | 'all'>('all');
  const [selected, setSelected] = useState<Company | null>(null);

  const filtered = companies.filter((c) => filter === 'all' || c.status === filter);

  const handleVerify = (id: string, action: 'verified' | 'rejected') => {
    setCompanies((prev) => prev.map((c) => c.id === id ? { ...c, status: action } : c));
    const company = companies.find((c) => c.id === id);
    toast.success(action === 'verified' ? `${company?.name} verified successfully` : `${company?.name} application rejected`);
    setSelected(null);
  };

  const pending = companies.filter((c) => c.status === 'pending').length;
  const verified = companies.filter((c) => c.status === 'verified').length;
  const rejected = companies.filter((c) => c.status === 'rejected').length;

  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Pending Review', value: pending, color: '#F59E0B' },
          { label: 'Verified', value: verified, color: '#22C55E' },
          { label: 'Rejected', value: rejected, color: '#EF4444' },
        ].map((s) => (
          <div key={s.label} className="bg-[#0D1B3E]/80 border border-white/08 rounded-xl p-4">
            <p className="text-2xl font-bold text-white font-display">{s.value}</p>
            <p className="text-xs text-white/50 mt-0.5">{s.label}</p>
            <div className="mt-2 h-1 rounded-full" style={{ backgroundColor: `${s.color}25` }}>
              <div className="h-full rounded-full" style={{ backgroundColor: s.color, width: `${(s.value / companies.length) * 100}%` }} />
            </div>
          </div>
        ))}
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2">
        {(['all', 'pending', 'verified', 'rejected'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold capitalize transition-all duration-200 ${
              filter === f ? 'bg-[#F05A00] text-white' : 'bg-white/05 text-white/50 hover:text-white hover:bg-white/10'
            }`}
          >
            {f === 'all' ? `All (${companies.length})` : `${f} (${companies.filter((c) => c.status === f).length})`}
          </button>
        ))}
      </div>

      {/* Company cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filtered.map((company) => {
          const cfg = STATUS_CONFIG[company.status];
          return (
            <div
              key={company.id}
              className="bg-[#0D1B3E]/80 border border-white/08 rounded-2xl p-5 hover:border-white/15 transition-all duration-200"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#F05A00]/15 flex items-center justify-center">
                    <svg className="w-5 h-5 text-[#F05A00]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">{company.name}</h4>
                    <p className="text-xs text-white/40">{company.industry} · {company.city}</p>
                  </div>
                </div>
                <span
                  className="text-xs font-semibold px-2.5 py-1 rounded-full"
                  style={{ backgroundColor: cfg.bg, color: cfg.color }}
                >
                  {cfg.label}
                </span>
              </div>

              <p className="text-xs text-white/50 mb-3 line-clamp-2">{company.description}</p>

              <div className="flex items-center gap-4 mb-4 text-xs text-white/40">
                <span className="flex items-center gap-1">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {company.employees} employees
                </span>
                <span>Submitted {company.submittedDate}</span>
                {company.jobsPosted > 0 && <span className="text-[#F05A00]">{company.jobsPosted} jobs posted</span>}
              </div>

              {/* Docs */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {company.docs.map((doc) => (
                  <span key={doc} className="text-xs px-2 py-0.5 rounded-full bg-white/06 text-white/50 border border-white/08">
                    📄 {doc}
                  </span>
                ))}
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <button
                  onClick={() => setSelected(company)}
                  className="flex-1 py-2 rounded-xl bg-white/06 text-white/60 text-xs font-semibold hover:bg-white/12 hover:text-white transition-colors"
                >
                  View Details
                </button>
                {company.status === 'pending' && (
                  <>
                    <button
                      onClick={() => handleVerify(company.id, 'verified')}
                      className="flex-1 py-2 rounded-xl bg-[#22C55E]/15 text-[#22C55E] text-xs font-semibold hover:bg-[#22C55E]/25 transition-colors"
                    >
                      ✓ Verify
                    </button>
                    <button
                      onClick={() => handleVerify(company.id, 'rejected')}
                      className="flex-1 py-2 rounded-xl bg-red-500/15 text-red-400 text-xs font-semibold hover:bg-red-500/25 transition-colors"
                    >
                      ✕ Reject
                    </button>
                  </>
                )}
                {company.status === 'rejected' && (
                  <button
                    onClick={() => handleVerify(company.id, 'verified')}
                    className="flex-1 py-2 rounded-xl bg-[#F59E0B]/15 text-[#F59E0B] text-xs font-semibold hover:bg-[#F59E0B]/25 transition-colors"
                  >
                    Re-verify
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Detail modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setSelected(null)}>
          <div className="bg-[#0D1B3E] border border-white/15 rounded-2xl p-6 w-full max-w-lg shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between mb-5">
              <div>
                <h3 className="text-lg font-bold text-white">{selected.name}</h3>
                <p className="text-xs text-white/40 mt-0.5">{selected.email}</p>
              </div>
              <button onClick={() => setSelected(null)} className="text-white/40 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <p className="text-sm text-white/60 mb-4">{selected.description}</p>
            <div className="space-y-2 mb-5">
              {[
                { label: 'Industry', value: selected.industry },
                { label: 'City', value: selected.city },
                { label: 'Employees', value: selected.employees },
                { label: 'Submitted', value: selected.submittedDate },
                { label: 'Status', value: STATUS_CONFIG[selected.status].label },
              ].map((row) => (
                <div key={row.label} className="flex items-center justify-between py-2 border-b border-white/06">
                  <span className="text-xs text-white/40">{row.label}</span>
                  <span className="text-sm font-semibold text-white">{row.value}</span>
                </div>
              ))}
            </div>
            <div className="mb-5">
              <p className="text-xs text-white/40 mb-2">Submitted Documents</p>
              <div className="flex flex-wrap gap-2">
                {selected.docs.map((doc) => (
                  <span key={doc} className="text-xs px-2.5 py-1 rounded-full bg-white/08 text-white/60 border border-white/10">
                    📄 {doc}
                  </span>
                ))}
              </div>
            </div>
            {selected.status === 'pending' && (
              <div className="flex gap-3">
                <button
                  onClick={() => handleVerify(selected.id, 'verified')}
                  className="flex-1 py-3 rounded-xl bg-[#22C55E]/15 text-[#22C55E] font-semibold hover:bg-[#22C55E]/25 transition-colors"
                >
                  ✓ Approve & Verify
                </button>
                <button
                  onClick={() => handleVerify(selected.id, 'rejected')}
                  className="flex-1 py-3 rounded-xl bg-red-500/15 text-red-400 font-semibold hover:bg-red-500/25 transition-colors"
                >
                  ✕ Reject Application
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

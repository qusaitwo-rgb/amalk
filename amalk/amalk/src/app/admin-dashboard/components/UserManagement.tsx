'use client';
import React, { useState } from 'react';
import { toast } from 'sonner';

type UserRole = 'talent' | 'company' | 'admin' | 'all';
type UserStatus = 'active' | 'suspended' | 'pending' | 'all';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'talent' | 'company' | 'admin';
  status: 'active' | 'suspended' | 'pending';
  city: string;
  joined: string;
  matches?: number;
  company?: string;
}

const USERS: User[] = [
  { id: 'u1', name: 'Ahmad Khalil', email: 'ahmad@example.ps', role: 'talent', status: 'active', city: 'Ramallah', joined: 'Jan 12, 2026', matches: 94 },
  { id: 'u2', name: 'Layla Hassan', email: 'layla@example.ps', role: 'talent', status: 'active', city: 'Gaza', joined: 'Jan 18, 2026', matches: 87 },
  { id: 'u3', name: 'Rami Nasser', email: 'rami@example.ps', role: 'talent', status: 'active', city: 'Hebron', joined: 'Feb 3, 2026', matches: 76 },
  { id: 'u4', name: 'Sara Mansour', email: 'sara@example.ps', role: 'talent', status: 'pending', city: 'Nablus', joined: 'Mar 22, 2026', matches: 0 },
  { id: 'u5', name: 'Yousef Barakat', email: 'yousef@example.ps', role: 'talent', status: 'suspended', city: 'Jerusalem', joined: 'Feb 14, 2026', matches: 12 },
  { id: 'u6', name: 'HR Team', email: 'hr@paltel.ps', role: 'company', status: 'active', city: 'Ramallah', joined: 'Dec 5, 2025', company: 'Paltel' },
  { id: 'u7', name: 'Recruitment', email: 'jobs@jawwal.ps', role: 'company', status: 'active', city: 'Ramallah', joined: 'Dec 10, 2025', company: 'Jawwal' },
  { id: 'u8', name: 'Talent Dept', email: 'talent@bop.ps', role: 'company', status: 'active', city: 'Nablus', joined: 'Jan 7, 2026', company: 'Bank of Palestine' },
  { id: 'u9', name: 'HR Manager', email: 'hr@ooredoo.ps', role: 'company', status: 'pending', city: 'Ramallah', joined: 'Mar 28, 2026', company: 'Ooredoo Palestine' },
  { id: 'u10', name: 'Admin', email: 'admin@amalk.io', role: 'admin', status: 'active', city: 'Ramallah', joined: 'Nov 1, 2025' },
];

const ROLE_COLORS: Record<string, string> = {
  talent: '#818CF8',
  company: '#F05A00',
  admin: '#EF4444',
};

const STATUS_COLORS: Record<string, string> = {
  active: '#22C55E',
  suspended: '#EF4444',
  pending: '#F59E0B',
};

export default function UserManagement() {
  const [users, setUsers] = useState<User[]>(USERS);
  const [roleFilter, setRoleFilter] = useState<UserRole>('all');
  const [statusFilter, setStatusFilter] = useState<UserStatus>('all');
  const [search, setSearch] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const filtered = users.filter((u) => {
    const matchRole = roleFilter === 'all' || u.role === roleFilter;
    const matchStatus = statusFilter === 'all' || u.status === statusFilter;
    const matchSearch = search === '' || u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
    return matchRole && matchStatus && matchSearch;
  });

  const handleSuspend = (userId: string) => {
    setUsers((prev) => prev.map((u) => u.id === userId ? { ...u, status: u.status === 'suspended' ? 'active' : 'suspended' } : u));
    const user = users.find((u) => u.id === userId);
    toast.success(user?.status === 'suspended' ? `${user?.name} reactivated` : `${user?.name} suspended`);
    setSelectedUser(null);
  };

  const handleApprove = (userId: string) => {
    setUsers((prev) => prev.map((u) => u.id === userId ? { ...u, status: 'active' } : u));
    const user = users.find((u) => u.id === userId);
    toast.success(`${user?.name} approved`);
    setSelectedUser(null);
  };

  return (
    <div className="space-y-6">
      {/* Summary row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Total Users', value: users.length, color: '#818CF8' },
          { label: 'Active', value: users.filter((u) => u.status === 'active').length, color: '#22C55E' },
          { label: 'Pending', value: users.filter((u) => u.status === 'pending').length, color: '#F59E0B' },
          { label: 'Suspended', value: users.filter((u) => u.status === 'suspended').length, color: '#EF4444' },
        ].map((s) => (
          <div key={s.label} className="bg-[#0D1B3E]/80 border border-white/08 rounded-xl p-4">
            <p className="text-2xl font-bold text-white font-display">{s.value}</p>
            <p className="text-xs text-white/50 mt-0.5">{s.label}</p>
            <div className="mt-2 h-1 rounded-full" style={{ backgroundColor: `${s.color}30` }}>
              <div className="h-full rounded-full" style={{ backgroundColor: s.color, width: `${(s.value / users.length) * 100}%` }} />
            </div>
          </div>
        ))}
      </div>

      {/* Filters + Search */}
      <div className="bg-[#0D1B3E]/80 border border-white/08 rounded-2xl p-5">
        <div className="flex flex-col sm:flex-row gap-3 mb-5">
          <div className="flex items-center gap-2 bg-white/05 border border-white/10 rounded-xl px-3 py-2 flex-1">
            <svg className="w-4 h-4 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search by name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent text-sm text-white placeholder-white/25 outline-none w-full"
            />
          </div>
          <div className="flex gap-2">
            {(['all', 'talent', 'company', 'admin'] as UserRole[]).map((r) => (
              <button
                key={r}
                onClick={() => setRoleFilter(r)}
                className={`px-3 py-2 rounded-xl text-xs font-semibold capitalize transition-all duration-200 ${
                  roleFilter === r ? 'bg-[#F05A00] text-white' : 'bg-white/05 text-white/50 hover:text-white hover:bg-white/10'
                }`}
              >
                {r}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            {(['all', 'active', 'pending', 'suspended'] as UserStatus[]).map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`px-3 py-2 rounded-xl text-xs font-semibold capitalize transition-all duration-200 ${
                  statusFilter === s ? 'bg-[#818CF8] text-white' : 'bg-white/05 text-white/50 hover:text-white hover:bg-white/10'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/08">
                {['User', 'Role', 'Status', 'City', 'Joined', 'Actions'].map((h) => (
                  <th key={h} className="text-left text-xs font-semibold text-white/40 pb-3 pr-4 last:pr-0">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/05">
              {filtered.map((user) => (
                <tr key={user.id} className="hover:bg-white/02 transition-colors group">
                  <td className="py-3 pr-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                        style={{ backgroundColor: `${ROLE_COLORS[user.role]}30`, color: ROLE_COLORS[user.role] }}
                      >
                        {user.name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white">{user.name}</p>
                        <p className="text-xs text-white/40">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 pr-4">
                    <span
                      className="text-xs font-semibold px-2 py-1 rounded-full capitalize"
                      style={{ backgroundColor: `${ROLE_COLORS[user.role]}15`, color: ROLE_COLORS[user.role] }}
                    >
                      {user.role === 'company' && user.company ? user.company : user.role}
                    </span>
                  </td>
                  <td className="py-3 pr-4">
                    <span
                      className="flex items-center gap-1.5 text-xs font-semibold capitalize w-fit"
                      style={{ color: STATUS_COLORS[user.status] }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: STATUS_COLORS[user.status] }} />
                      {user.status}
                    </span>
                  </td>
                  <td className="py-3 pr-4">
                    <span className="text-sm text-white/60">{user.city}</span>
                  </td>
                  <td className="py-3 pr-4">
                    <span className="text-xs text-white/40">{user.joined}</span>
                  </td>
                  <td className="py-3">
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      {user.status === 'pending' && (
                        <button
                          onClick={() => handleApprove(user.id)}
                          className="px-2.5 py-1 rounded-lg bg-[#22C55E]/15 text-[#22C55E] text-xs font-semibold hover:bg-[#22C55E]/25 transition-colors"
                        >
                          Approve
                        </button>
                      )}
                      <button
                        onClick={() => handleSuspend(user.id)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors ${
                          user.status === 'suspended' ?'bg-[#22C55E]/15 text-[#22C55E] hover:bg-[#22C55E]/25' :'bg-red-500/15 text-red-400 hover:bg-red-500/25'
                        }`}
                      >
                        {user.status === 'suspended' ? 'Reactivate' : 'Suspend'}
                      </button>
                      <button
                        onClick={() => setSelectedUser(user)}
                        className="px-2.5 py-1 rounded-lg bg-white/08 text-white/60 text-xs font-semibold hover:bg-white/15 hover:text-white transition-colors"
                      >
                        View
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="text-center py-12 text-white/30 text-sm">No users match your filters</div>
          )}
        </div>
      </div>

      {/* User detail modal */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setSelectedUser(null)}>
          <div className="bg-[#0D1B3E] border border-white/15 rounded-2xl p-6 w-full max-w-md shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between mb-5">
              <div className="flex items-center gap-3">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-sm font-bold text-white"
                  style={{ backgroundColor: `${ROLE_COLORS[selectedUser.role]}30`, color: ROLE_COLORS[selectedUser.role] }}
                >
                  {selectedUser.name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">{selectedUser.name}</h3>
                  <p className="text-xs text-white/40">{selectedUser.email}</p>
                </div>
              </div>
              <button onClick={() => setSelectedUser(null)} className="text-white/40 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="space-y-3 mb-5">
              {[
                { label: 'Role', value: selectedUser.role },
                { label: 'Status', value: selectedUser.status },
                { label: 'City', value: selectedUser.city },
                { label: 'Joined', value: selectedUser.joined },
                ...(selectedUser.company ? [{ label: 'Company', value: selectedUser.company }] : []),
                ...(selectedUser.matches !== undefined ? [{ label: 'AI Match Score', value: `${selectedUser.matches}%` }] : []),
              ].map((row) => (
                <div key={row.label} className="flex items-center justify-between py-2 border-b border-white/06">
                  <span className="text-xs text-white/40">{row.label}</span>
                  <span className="text-sm font-semibold text-white capitalize">{row.value}</span>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              {selectedUser.status === 'pending' && (
                <button
                  onClick={() => handleApprove(selectedUser.id)}
                  className="flex-1 py-2.5 rounded-xl bg-[#22C55E]/15 text-[#22C55E] text-sm font-semibold hover:bg-[#22C55E]/25 transition-colors"
                >
                  Approve
                </button>
              )}
              <button
                onClick={() => handleSuspend(selectedUser.id)}
                className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                  selectedUser.status === 'suspended' ?'bg-[#22C55E]/15 text-[#22C55E] hover:bg-[#22C55E]/25' :'bg-red-500/15 text-red-400 hover:bg-red-500/25'
                }`}
              >
                {selectedUser.status === 'suspended' ? 'Reactivate' : 'Suspend'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

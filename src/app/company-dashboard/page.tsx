'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import CompanyDashboardLayout from './components/CompanyDashboardLayout';

export default function CompanyDashboardPage() {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('amalak_session');
      if (raw) {
        const session = JSON.parse(raw);
        if (session?.role === 'company') {
          setAuthorized(true);
          return;
        }
        if (session?.role === 'admin') {
          router?.replace('/admin-dashboard');
          return;
        }
      }
    } catch (_) {}
    router?.replace('/talent-dashboard');
  }, [router]);

  if (!authorized) {
    return (
      <div className="min-h-screen bg-[#0D1B3E] flex items-center justify-center">
        <svg className="w-8 h-8 text-[#F05A00] animate-spin" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      </div>
    );
  }

  return <CompanyDashboardLayout />;
}

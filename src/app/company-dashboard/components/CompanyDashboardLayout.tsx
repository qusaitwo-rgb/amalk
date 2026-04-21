'use client';
import React, { useState } from 'react';
import { Toaster } from 'sonner';
import CompanySidebar from './CompanySidebar';
import CompanyTopbar from './CompanyTopbar';
import CompanyOverview from './CompanyOverview';
import JobPostings from './JobPostings';
import CandidateManagement from './CandidateManagement';
import AIShortlisting from './AIShortlisting';
import HiringAnalytics from './HiringAnalytics';

export type CompanyTab = 'overview' | 'jobs' | 'candidates' | 'ai-shortlist' | 'analytics';

export default function CompanyDashboardLayout() {
  const [activeTab, setActiveTab] = useState<CompanyTab>('overview');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case 'overview': return <CompanyOverview setActiveTab={setActiveTab} />;
      case 'jobs': return <JobPostings />;
      case 'candidates': return <CandidateManagement />;
      case 'ai-shortlist': return <AIShortlisting />;
      case 'analytics': return <HiringAnalytics />;
      default: return <CompanyOverview setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0D1547] flex overflow-hidden">
      <Toaster position="bottom-right" theme="dark" richColors />
      <CompanySidebar
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <div className="flex-1 flex flex-col min-w-0 transition-all duration-300">
        <CompanyTopbar
          sidebarCollapsed={sidebarCollapsed}
          setSidebarCollapsed={setSidebarCollapsed}
          activeTab={activeTab}
        />
        <main className="flex-1 overflow-y-auto p-6 lg:p-8 xl:p-10">
          <div className="max-w-screen-2xl mx-auto">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
}

'use client';
import React, { useState } from 'react';
import { Toaster } from 'sonner';
import TalentSidebar from './TalentSidebar';
import TalentTopbar from './TalentTopbar';
import DashboardOverview from './DashboardOverview';
import SwipeJobQueue from './SwipeJobQueue';
import SkillGapPanel from './SkillGapPanel';
import SalaryBenchmark from './SalaryBenchmark';
import CareerRoadmap from './CareerRoadmap';

export type DashboardTab = 'overview' | 'matches' | 'skills' | 'salary' | 'roadmap';

export default function TalentDashboardLayout() {
  const [activeTab, setActiveTab] = useState<DashboardTab>('overview');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case 'overview': return <DashboardOverview setActiveTab={setActiveTab} />;
      case 'matches': return <SwipeJobQueue />;
      case 'skills': return <SkillGapPanel />;
      case 'salary': return <SalaryBenchmark />;
      case 'roadmap': return <CareerRoadmap />;
      default: return <DashboardOverview setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0D1547] flex overflow-hidden">
      <Toaster position="bottom-right" theme="dark" richColors />

      <TalentSidebar
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <div
        className="flex-1 flex flex-col min-w-0 transition-all duration-300"
        style={{ marginLeft: 0 }}
      >
        <TalentTopbar
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
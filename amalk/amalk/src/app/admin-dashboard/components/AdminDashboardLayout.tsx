'use client';
import React, { useState } from 'react';
import { Toaster } from 'sonner';
import AdminSidebar from './AdminSidebar';
import AdminTopbar from './AdminTopbar';
import AdminOverview from './AdminOverview';
import UserManagement from './UserManagement';
import CompanyVerification from './CompanyVerification';
import ReportingAnalytics from './ReportingAnalytics';

export type AdminTab = 'overview' | 'users' | 'companies' | 'analytics';

export default function AdminDashboardLayout() {
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case 'overview': return <AdminOverview setActiveTab={setActiveTab} />;
      case 'users': return <UserManagement />;
      case 'companies': return <CompanyVerification />;
      case 'analytics': return <ReportingAnalytics />;
      default: return <AdminOverview setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#060D1F] flex overflow-hidden">
      <Toaster position="bottom-right" theme="dark" richColors />
      <AdminSidebar
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <div className="flex-1 flex flex-col min-w-0 transition-all duration-300">
        <AdminTopbar
          sidebarCollapsed={sidebarCollapsed}
          setSidebarCollapsed={setSidebarCollapsed}
          activeTab={activeTab}
        />
        <main className="flex-1 overflow-y-auto p-6 lg:p-8">
          <div className="max-w-screen-2xl mx-auto">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
}

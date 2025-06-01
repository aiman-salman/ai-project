import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';
import { MobileNav } from './MobileNav';
import { Outlet } from 'react-router-dom';

export const Layout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-[#1c1c1c]">
      {/* Sidebar for desktop */}
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      
      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <TopBar setSidebarOpen={setSidebarOpen} />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="mx-auto max-w-7xl">
            {/* {children} */}
            <Outlet />
          </div>
        </main>
      </div>

      {/* Mobile navigation */}
      <MobileNav />
    </div>
  );
};
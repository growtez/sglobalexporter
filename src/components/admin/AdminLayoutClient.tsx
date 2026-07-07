"use client";

import React, { useState } from "react";
import AdminSidebar from "./AdminSidebar";
import { Menu } from "lucide-react";

interface AdminLayoutClientProps {
  adminName: string;
  children: React.ReactNode;
}

export default function AdminLayoutClient({
  adminName,
  children,
}: AdminLayoutClientProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-[#F0F0EE] dark:bg-[#0f0f0f] transition-colors duration-300">
      {/* Mobile Top Header */}
      <header className="md:hidden flex items-center justify-between px-6 py-4 bg-white dark:bg-[#1a1a1a] border-b border-stone-100 dark:border-stone-850 shadow-sm z-30">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsMobileOpen(true)}
            className="p-2 -ml-2 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
            aria-label="Open menu"
          >
            <Menu size={20} className="text-stone-600 dark:text-stone-300" />
          </button>
          <span className="font-serif font-bold text-lg text-charcoal">SGlobalExporter Admin</span>
        </div>
        {/* <div className="text-xs font-medium text-stone-500 max-w-[120px] truncate">
          {adminName}
        </div> */}
      </header>

      <div className="flex flex-1 relative">
        {/* Sidebar */}
        <AdminSidebar
          adminName={adminName}
          isCollapsed={isCollapsed}
          onToggle={() => setIsCollapsed(!isCollapsed)}
          isMobileOpen={isMobileOpen}
          onCloseMobile={() => setIsMobileOpen(false)}
        />

        {/* Backdrop for Mobile */}
        {isMobileOpen && (
          <div
            onClick={() => setIsMobileOpen(false)}
            className="fixed inset-0 bg-black/40 z-30 md:hidden animate-fade-in"
          />
        )}

        {/* Main Content Area */}
        <main
          className={`flex-1 p-4 md:p-8 overflow-y-auto transition-all duration-300 min-w-0 ${
            isCollapsed ? "md:ml-20" : "md:ml-64"
          } ml-0`}
        >
          {children}
        </main>
      </div>
    </div>
  );
}


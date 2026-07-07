"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  MessageSquare,
  Users,
  Leaf,
  ChevronLeft,
  ChevronRight,
  Home,
} from "lucide-react";
import LogoutButton from "@/components/auth/LogoutButton";
import { ThemeToggle } from "@/components/ThemeToggle";

const navItems = [
  { href: "/admin",            label: "Dashboard",  icon: LayoutDashboard },
  { href: "/admin/products",   label: "Products",   icon: Package },
  { href: "/admin/orders",     label: "Orders",     icon: ShoppingCart },
  { href: "/admin/inquiries",  label: "Inquiries",  icon: MessageSquare },
  { href: "/admin/customers",  label: "Customers",  icon: Users },
];

interface AdminSidebarProps {
  adminName: string;
  isCollapsed: boolean;
  onToggle: () => void;
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export default function AdminSidebar({
  adminName,
  isCollapsed,
  onToggle,
  isMobileOpen = false,
  onCloseMobile,
}: AdminSidebarProps) {
  const pathname = usePathname() || "";

  return (
    <aside
      className={`fixed top-0 left-0 h-full bg-white border-r border-stone-100 dark:bg-[#161616] dark:border-stone-800/60 flex flex-col z-40 shadow-md transition-all duration-300 w-64 ${
        isCollapsed ? "md:w-20" : "md:w-64"
      } ${isMobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
    >
      {/* Collapse / Expand Toggle Button (Desktop Only) */}
      <button
        onClick={onToggle}
        className="absolute top-6 -right-3 w-6 h-6 bg-white dark:bg-[#1A1A1A] border border-stone-200 dark:border-stone-800 rounded-full hidden md:flex items-center justify-center shadow-md cursor-pointer hover:bg-stone-50 dark:hover:bg-stone-800 transition-all z-50 text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-white"
        aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {isCollapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
      </button>

      {/* Logo Section */}
      <div
        className={`flex items-center border-b border-stone-100 dark:border-white/10 py-6 relative ${
          isCollapsed ? "md:justify-center px-4" : "gap-3 px-6"
        } px-6 gap-3`}
      >
        <div className="bg-[#1A3622]/10 text-[#1A3622] dark:bg-[#D4AF37]/15 dark:text-[#D4AF37] rounded-lg p-2 transition-colors shrink-0">
          <Leaf size={18} />
        </div>
        {(!isCollapsed || isMobileOpen) && (
          <div className="min-w-0 animate-in fade-in duration-200 flex-1">
            <p className="text-stone-900 dark:text-white font-semibold text-sm leading-none transition-colors truncate">
              SGlobalExporter
            </p>
            <p className="text-stone-400 dark:text-white/50 text-xs mt-0.5 transition-colors truncate">
              Admin Panel
            </p>
          </div>
        )}
        {isMobileOpen && onCloseMobile && (
          <button
            onClick={onCloseMobile}
            className="md:hidden p-1 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
            aria-label="Close sidebar"
          >
            <ChevronLeft size={18} className="text-stone-500" />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive =
            href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              onClick={onCloseMobile}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all relative group
                ${isCollapsed ? "md:justify-center" : ""}
                ${isActive
                  ? "bg-[#1A3622] text-white dark:bg-[#D4AF37] dark:text-[#1A3622] shadow-sm"
                  : "text-stone-600 hover:bg-stone-50 hover:text-stone-900 dark:text-stone-400 dark:hover:bg-white/5 dark:hover:text-white"
                }`}
            >
              <Icon size={17} className="shrink-0" />
              {(!isCollapsed || isMobileOpen) && (
                <span className="animate-in fade-in duration-200">{label}</span>
              )}
              {isCollapsed && (
                <div className="absolute left-full ml-3 px-2.5 py-1.5 bg-white text-stone-900 dark:bg-stone-900 dark:text-white text-xs font-semibold rounded-lg border border-stone-200 dark:border-stone-800 shadow-md opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50 hidden md:block">
                  {label}
                </div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* View Storefront Link */}
      <div className="pt-4 px-3">
        <Link
          href="/"
          onClick={onCloseMobile}
          className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group relative
            ${isCollapsed ? "md:justify-center" : "border border-stone-100 dark:border-stone-800/80"}
            text-stone-600 hover:bg-stone-50 hover:text-stone-900 dark:text-stone-400 dark:hover:bg-white/5 dark:hover:text-white`}
        >
          <Home size={17} className="shrink-0" />
          {(!isCollapsed || isMobileOpen) && (
            <span className="font-semibold text-xs uppercase tracking-wider text-stone-500 dark:text-stone-450 animate-in fade-in duration-200">
              View Storefront
            </span>
          )}
          {isCollapsed && (
            <div className="absolute left-full ml-3 px-2.5 py-1.5 bg-white text-stone-900 dark:bg-stone-900 dark:text-white text-xs font-semibold rounded-lg border border-stone-200 dark:border-stone-800 shadow-md opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50 hidden md:block">
              View Storefront
            </div>
          )}
        </Link>
      </div>

      {/* User + Logout */}
      <div className={`px-4 py-5 border-t border-stone-100 dark:border-white/10 flex ${isCollapsed ? "md:flex-col md:items-center md:gap-4 flex-col" : "flex-col"}`}>
        {(!isCollapsed || isMobileOpen) ? (
          <>
            <div className="flex items-center justify-between mb-4">
              <div className="min-w-0">
                <p className="text-stone-400 dark:text-white/50 text-xs px-1 mb-1 truncate transition-colors">
                  Signed in as
                </p>
                <p className="text-stone-700 dark:text-white text-sm font-medium px-1 truncate transition-colors">
                  {adminName}
                </p>
              </div>
              <ThemeToggle className="text-stone-500 hover:bg-stone-100 hover:text-stone-900 dark:text-white/70 dark:hover:bg-white/10 dark:hover:text-white" />
            </div>
            <LogoutButton
              variant="ghost"
              label="Sign Out"
              showIcon={true}
              className="w-full justify-start px-3 py-2.5 text-sm font-medium text-stone-600 hover:bg-stone-50 hover:text-stone-900 dark:text-white/70 dark:hover:bg-white/10 dark:hover:text-white rounded-xl transition-all h-auto"
            />
          </>
        ) : (
          <>
            <div className="relative group flex justify-center">
              <ThemeToggle className="w-10 h-10 text-stone-500 hover:bg-stone-100 hover:text-stone-900 dark:text-white/70 dark:hover:bg-white/10 dark:hover:text-white rounded-xl flex items-center justify-center transition-all" />
              <div className="absolute left-full ml-3 px-2.5 py-1.5 bg-white text-stone-900 dark:bg-stone-900 dark:text-white text-xs font-semibold rounded-lg border border-stone-200 dark:border-stone-800 shadow-md opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50">
                Toggle Theme
              </div>
            </div>
            <div className="relative group flex justify-center">
              <LogoutButton
                variant="ghost"
                label=""
                showIcon={true}
                className="w-10 h-10 flex items-center justify-center p-0 text-stone-600 hover:bg-stone-50 hover:text-stone-900 dark:text-white/70 dark:hover:bg-white/10 dark:hover:text-white rounded-xl transition-all"
              />
              <div className="absolute left-full ml-3 px-2.5 py-1.5 bg-white text-stone-900 dark:bg-stone-900 dark:text-white text-xs font-semibold rounded-lg border border-stone-200 dark:border-stone-800 shadow-md opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50">
                Sign Out
              </div>
            </div>
          </>
        )}
      </div>
    </aside>
  );
}

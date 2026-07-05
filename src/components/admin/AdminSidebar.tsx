"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  MessageSquare,
  Users,
  LogOut,
  Leaf,
} from "lucide-react";
import { logout } from "@/app/auth/actions";

const navItems = [
  { href: "/admin",            label: "Dashboard",  icon: LayoutDashboard },
  { href: "/admin/products",   label: "Products",   icon: Package },
  { href: "/admin/orders",     label: "Orders",     icon: ShoppingCart },
  { href: "/admin/inquiries",  label: "Inquiries",  icon: MessageSquare },
  { href: "/admin/customers",  label: "Customers",  icon: Users },
];

export default function AdminSidebar({ adminName }: { adminName: string }) {
  const pathname = usePathname() || "";

  return (
    <aside className="fixed top-0 left-0 h-full w-64 bg-[#1A3622] flex flex-col z-40 shadow-xl">
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-6 border-b border-white/10">
        <div className="bg-[#D4AF37] rounded-lg p-2">
          <Leaf size={18} className="text-[#1A3622]" />
        </div>
        <div>
          <p className="text-white font-semibold text-sm leading-none">SGlobalExporter</p>
          <p className="text-white/50 text-xs mt-0.5">Admin Panel</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-6 space-y-1">
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive =
            href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all
                ${isActive
                  ? "bg-[#D4AF37] text-[#1A3622] shadow-sm"
                  : "text-white/70 hover:bg-white/10 hover:text-white"
                }`}
            >
              <Icon size={17} />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* User + Logout */}
      <div className="px-4 py-5 border-t border-white/10">
        <p className="text-white/50 text-xs px-1 mb-1 truncate">Signed in as</p>
        <p className="text-white text-sm font-medium px-1 mb-4 truncate">{adminName}</p>
        <form action={logout}>
          <button
            type="submit"
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-white/70 hover:bg-white/10 hover:text-white transition-all"
          >
            <LogOut size={16} />
            Sign Out
          </button>
        </form>
      </div>
    </aside>
  );
}

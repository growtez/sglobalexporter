"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";

export default function GlobalBreadcrumb() {
  const pathname = usePathname();

  // Don't show breadcrumb on home page or admin pages
  if (!pathname || pathname === "/" || pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <div className="bg-stone-50/80 dark:bg-stone-900/80 border-b border-stone-200/50 dark:border-stone-800/50">
      <div className="container mx-auto px-4 md:px-8 py-2.5">
        <nav className="flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400 overflow-x-auto whitespace-nowrap scrollbar-hide">
          <Link href="/" className="hover:text-gold transition-colors">Home</Link>
          {pathname.split('/').filter(Boolean).map((path, index, array) => {
            const currentPath = `/${array.slice(0, index + 1).join('/')}`;
            const isLast = index === array.length - 1;
            let text = path.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
            
            return (
              <div key={currentPath} className="flex items-center gap-2">
                <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
                {isLast ? (
                  <span className="text-forest font-semibold">{text}</span>
                ) : (
                  <Link href={currentPath} className="hover:text-gold transition-colors">
                    {text}
                  </Link>
                )}
              </div>
            );
          })}
        </nav>
      </div>
    </div>
  );
}

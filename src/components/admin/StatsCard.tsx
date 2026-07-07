import Link from "next/link";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  label: string;
  value: number;
  icon: LucideIcon;
  color: string;
  href: string;
}

export default function StatsCard({
  label,
  value,
  icon: Icon,
  color,
  href,
}: StatsCardProps) {
  return (
    <Link
      href={href}
      className="bg-white rounded-2xl shadow-sm border border-stone-100 p-4 sm:p-6 flex items-center gap-3 sm:gap-5 hover:shadow-md transition-shadow group"
    >
      <div className={`${color} p-2.5 sm:p-3 rounded-xl text-white group-hover:scale-110 transition-transform shrink-0`}>
        <Icon size={20} className="sm:w-[22px] sm:h-[22px]" />
      </div>
      <div className="min-w-0">
        <p className="text-xl sm:text-2xl font-bold text-charcoal truncate">{value.toLocaleString()}</p>
        <p className="text-xs sm:text-sm text-stone-500 mt-0.5 truncate">{label}</p>
      </div>
    </Link>
  );
}

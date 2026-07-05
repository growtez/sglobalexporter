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
      className="bg-white rounded-2xl shadow-sm border border-stone-100 p-6 flex items-center gap-5 hover:shadow-md transition-shadow group"
    >
      <div className={`${color} p-3 rounded-xl text-white group-hover:scale-110 transition-transform`}>
        <Icon size={22} />
      </div>
      <div>
        <p className="text-2xl font-bold text-charcoal">{value.toLocaleString()}</p>
        <p className="text-sm text-stone-500 mt-0.5">{label}</p>
      </div>
    </Link>
  );
}

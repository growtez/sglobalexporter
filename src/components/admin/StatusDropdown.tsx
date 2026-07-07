"use client";

import { updateInquiryStatus } from "@/app/admin/actions";
import { useState, useTransition } from "react";
import { ChevronDown, Loader2 } from "lucide-react";

interface StatusDropdownProps {
  inquiryId: string;
  currentStatus: string;
}

const INQUIRY_STATUSES = ["pending", "reviewed", "quoted", "closed"];

const statusColorMap: Record<string, string> = {
  pending: "bg-amber-100 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-900/60 focus:ring-amber-500",
  reviewed: "bg-blue-100 dark:bg-blue-950/40 text-blue-800 dark:text-blue-300 border-blue-200 dark:border-blue-900/60 focus:ring-blue-500",
  quoted: "bg-emerald-100 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-900/60 focus:ring-emerald-500",
  closed: "bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 border-stone-200 dark:border-stone-700 focus:ring-stone-500",
};

export default function StatusDropdown({ inquiryId, currentStatus }: StatusDropdownProps) {
  const [status, setStatus] = useState(currentStatus);
  const [isPending, startTransition] = useTransition();

  const handleChange = (newStatus: string) => {
    setStatus(newStatus);
    startTransition(async () => {
      await updateInquiryStatus(inquiryId, newStatus);
    });
  };

  const colorClass = statusColorMap[status] || "bg-stone-100 text-stone-600";

  return (
    <div className="relative inline-block shrink-0">
      <select
        value={status}
        disabled={isPending}
        onChange={(e) => handleChange(e.target.value)}
        className={`appearance-none font-semibold text-sm rounded-full pl-3.5 pr-8 py-1.5 border focus:outline-none focus:ring-2 cursor-pointer transition-all ${colorClass} ${
          isPending ? "opacity-60 cursor-not-allowed" : ""
        }`}
      >
        {INQUIRY_STATUSES.map((s) => (
          <option key={s} value={s} className="bg-white dark:bg-stone-900 text-stone-850 dark:text-stone-100 font-medium">
            {s.charAt(0).toUpperCase() + s.slice(1)}
          </option>
        ))}
      </select>
      <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-current">
        {isPending ? (
          <Loader2 size={10} className="animate-spin text-stone-500" />
        ) : (
          <ChevronDown size={10} className="text-current opacity-70" />
        )}
      </div>
    </div>
  );
}

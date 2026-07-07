type StatusVariant =
  | "pending"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled"
  | "reviewed"
  | "quoted"
  | "closed"
  | "customer"
  | "admin"
  | string;

const variantMap: Record<string, string> = {
  pending:    "bg-amber-100 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300",
  processing: "bg-blue-100 text-blue-800 dark:bg-blue-950/40 dark:text-blue-300",
  shipped:    "bg-sky-100 text-sky-800 dark:bg-sky-950/40 dark:text-sky-300",
  delivered:  "bg-green-100 text-green-800 dark:bg-green-950/40 dark:text-green-300",
  cancelled:  "bg-red-100 text-red-800 dark:bg-red-950/40 dark:text-red-300",
  reviewed:   "bg-indigo-100 text-indigo-800 dark:bg-indigo-950/40 dark:text-indigo-300",
  quoted:     "bg-teal-100 text-teal-800 dark:bg-teal-950/40 dark:text-teal-300",
  closed:     "bg-stone-100 text-stone-600 dark:bg-stone-850 dark:text-stone-300",
  customer:   "bg-violet-100 text-violet-800 dark:bg-violet-950/40 dark:text-violet-300",
  admin:      "bg-[#1A3622]/10 text-[#1A3622] dark:bg-gold/20 dark:text-gold",
};

export default function StatusBadge({ status }: { status: StatusVariant }) {
  const classes = variantMap[status] ?? "bg-stone-100 text-stone-600";
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize ${classes}`}>
      {status}
    </span>
  );
}

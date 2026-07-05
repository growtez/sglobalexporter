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
  pending:    "bg-amber-100 text-amber-800",
  processing: "bg-blue-100 text-blue-800",
  shipped:    "bg-sky-100 text-sky-800",
  delivered:  "bg-green-100 text-green-800",
  cancelled:  "bg-red-100 text-red-800",
  reviewed:   "bg-indigo-100 text-indigo-800",
  quoted:     "bg-teal-100 text-teal-800",
  closed:     "bg-stone-100 text-stone-600",
  customer:   "bg-violet-100 text-violet-800",
  admin:      "bg-[#1A3622]/10 text-[#1A3622]",
};

export default function StatusBadge({ status }: { status: StatusVariant }) {
  const classes = variantMap[status] ?? "bg-stone-100 text-stone-600";
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize ${classes}`}>
      {status}
    </span>
  );
}

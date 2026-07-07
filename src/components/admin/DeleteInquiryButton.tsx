"use client";

import { deleteInquiry } from "@/app/admin/actions";
import { Trash2, Loader2 } from "lucide-react";
import { useTransition } from "react";

interface DeleteInquiryButtonProps {
  id: string;
}

export default function DeleteInquiryButton({ id }: DeleteInquiryButtonProps) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this inquiry?")) {
      startTransition(async () => {
        const res = await deleteInquiry(id);
        if (res && "error" in res && res.error) {
          alert("Failed to delete inquiry: " + res.error);
        }
      });
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      className="text-stone-400 hover:text-red-600 transition-colors p-2 rounded-xl hover:bg-red-50 dark:hover:bg-red-950/20 cursor-pointer disabled:opacity-50 shrink-0"
      title="Delete Inquiry"
    >
      {isPending ? (
        <Loader2 size={16} className="animate-spin text-red-500" />
      ) : (
        <Trash2 size={16} />
      )}
    </button>
  );
}

"use client";

import React, { useState, useTransition } from "react";
import { updateCustomerRole } from "@/app/admin/actions";
import { Loader2 } from "lucide-react";

interface RoleToggleButtonProps {
  profileId: string;
  fullName: string;
  currentRole: "admin" | "customer";
}

export default function RoleToggleButton({
  profileId,
  fullName,
  currentRole,
}: RoleToggleButtonProps) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleToggleRole = () => {
    startTransition(async () => {
      const targetRole = currentRole === "admin" ? "customer" : "admin";
      await updateCustomerRole(profileId, targetRole);
      setShowConfirm(false);
    });
  };

  const isAdmin = currentRole === "admin";

  return (
    <>
      <button
        type="button"
        onClick={() => setShowConfirm(true)}
        disabled={isPending}
        className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-colors flex items-center justify-center gap-1.5 w-full md:w-auto ${
          isAdmin
            ? "bg-red-50 text-red-650 hover:bg-red-100"
            : "bg-[#1A3622]/10 text-forest hover:bg-[#1A3622]/20"
        }`}
      >
        {isPending && <Loader2 size={12} className="animate-spin" />}
        {isAdmin ? "Revoke Admin" : "Make Admin"}
      </button>

      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-fade-in">
          <div className="bg-white dark:bg-[#1A1A1A] rounded-2xl max-w-sm w-full p-6 shadow-xl border border-stone-100 dark:border-stone-850 animate-scale-up text-left">
            <h3 className="text-lg font-bold text-charcoal mb-2">
              {isAdmin ? "Revoke Administrator Access?" : "Promote to Administrator?"}
            </h3>
            <p className="text-sm text-stone-500 dark:text-stone-400 mb-6 leading-relaxed">
              Are you sure you want to {isAdmin ? "revoke admin access for" : "promote"} <span className="font-semibold text-charcoal">{fullName || "this user"}</span>{isAdmin ? "?" : " to an admin? Admins have full access to manage products, orders, and site configurations."}
            </p>
            <div className="flex items-center justify-end gap-3 text-xs font-semibold">
              <button
                type="button"
                onClick={() => setShowConfirm(false)}
                disabled={isPending}
                className="px-4 py-2.5 rounded-xl border border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-850 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleToggleRole}
                disabled={isPending}
                className={`px-4 py-2.5 rounded-xl text-white transition-colors flex items-center gap-1.5 ${
                  isAdmin
                    ? "bg-red-600 hover:bg-red-700"
                    : "bg-[#1A3622] hover:bg-[#1A3622]/90"
                }`}
              >
                {isPending && <Loader2 size={14} className="animate-spin" />}
                {isAdmin ? "Revoke" : "Promote"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

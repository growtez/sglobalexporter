"use client";

import { useActionState } from "react";
import { updateProfile } from "@/app/auth/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ProfileForm({ profile, userEmail }: { profile: any; userEmail: string }) {
  const [state, formAction, isPending] = useActionState(
    async (prevState: any, formData: FormData) => {
      const res = await updateProfile(formData);
      return res || prevState;
    },
    null
  );

  return (
    <div className="bg-white border border-stone-200 p-8 shadow-sm">
      <form action={formAction} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <Label htmlFor="fullName" className="text-stone-500 uppercase tracking-widest text-xs">Full Name</Label>
            <Input id="fullName" name="fullName" defaultValue={profile?.full_name || ""} placeholder="John Doe" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-stone-500 uppercase tracking-widest text-xs">Email Address</Label>
            <Input id="email" type="email" defaultValue={userEmail} disabled className="bg-stone-50 text-stone-500" />
            <p className="text-[10px] text-stone-400">Email cannot be changed.</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="companyName" className="text-stone-500 uppercase tracking-widest text-xs">Company Name</Label>
            <Input id="companyName" name="companyName" defaultValue={profile?.company_name || ""} placeholder="Acme Corp" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-stone-500 uppercase tracking-widest text-xs">Phone Number</Label>
            <Input id="phone" name="phone" defaultValue={profile?.phone_number || ""} placeholder="+1 234 567 890" />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="address" className="text-stone-500 uppercase tracking-widest text-xs">Billing Address</Label>
            <Input id="address" name="address" defaultValue={profile?.billing_address || ""} placeholder="123 Main St, City, Country" />
          </div>
        </div>

        {state?.error && (
          <div className="text-sm text-red-500 font-medium">
            {state.error}
          </div>
        )}

        {state?.success && (
          <div className="text-sm text-green-600 font-medium">
            Profile updated successfully!
          </div>
        )}

        <div className="flex justify-end pt-4 border-t border-stone-100">
          <Button type="submit" disabled={isPending}>
            {isPending ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </div>
  );
}

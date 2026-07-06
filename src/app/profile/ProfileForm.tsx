"use client";

import { useState, useEffect, useActionState } from "react";
import { updateProfile } from "@/app/auth/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ProfileForm({ profile, userEmail }: { profile: any; userEmail: string }) {
  const [isEditing, setIsEditing] = useState(false);

  const [state, formAction, isPending] = useActionState(
    async (prevState: any, formData: FormData) => {
      const res = await updateProfile(formData);
      return res || prevState;
    },
    null
  );

  // Turn off edit mode automatically once update succeeds
  useEffect(() => {
    if (state?.success) {
      setIsEditing(false);
    }
  }, [state]);

  return (
    <div className="bg-white border border-stone-200 rounded-xl p-5 md:p-6 shadow-sm max-w-2xl mx-auto">
      <form action={formAction} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <Label htmlFor="fullName" className="text-stone-500 uppercase tracking-widest text-[10px] font-bold">Full Name</Label>
            <Input 
              id="fullName" 
              name="fullName" 
              defaultValue={profile?.full_name || ""} 
              placeholder="John Doe" 
              readOnly={!isEditing}
              className={`h-9.5 text-xs rounded-lg transition-colors ${!isEditing ? "bg-stone-50/40 border-stone-200/60 text-stone-900 font-medium cursor-default focus-visible:ring-0 focus-visible:border-stone-200/60" : "text-stone-900 bg-white"}`}
            />
          </div>
          
          <div className="space-y-1">
            <Label htmlFor="email" className="text-stone-500 uppercase tracking-widest text-[10px] font-bold">Email Address</Label>
            <Input 
              id="email" 
              type="email" 
              defaultValue={userEmail} 
              readOnly
              className="h-9.5 text-xs rounded-lg bg-stone-50/40 border-stone-200/60 text-stone-900 font-medium cursor-default focus-visible:ring-0 focus-visible:border-stone-200/60" 
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="companyName" className="text-stone-500 uppercase tracking-widest text-[10px] font-bold">Company Name</Label>
            <Input 
              id="companyName" 
              name="companyName" 
              defaultValue={profile?.company_name || ""} 
              placeholder="Acme Corp" 
              readOnly={!isEditing}
              className={`h-9.5 text-xs rounded-lg transition-colors ${!isEditing ? "bg-stone-50/40 border-stone-200/60 text-stone-900 font-medium cursor-default focus-visible:ring-0 focus-visible:border-stone-200/60" : "text-stone-900 bg-white"}`}
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="phone" className="text-stone-500 uppercase tracking-widest text-[10px] font-bold">Phone Number</Label>
            <Input 
              id="phone" 
              name="phone" 
              defaultValue={profile?.phone_number || ""} 
              placeholder="+1 234 567 890" 
              readOnly={!isEditing}
              className={`h-9.5 text-xs rounded-lg transition-colors ${!isEditing ? "bg-stone-50/40 border-stone-200/60 text-stone-900 font-medium cursor-default focus-visible:ring-0 focus-visible:border-stone-200/60" : "text-stone-900 bg-white"}`}
            />
          </div>

          <div className="space-y-1 md:col-span-2">
            <Label htmlFor="address" className="text-stone-500 uppercase tracking-widest text-[10px] font-bold">Billing Address</Label>
            <Input 
              id="address" 
              name="address" 
              defaultValue={profile?.billing_address || ""} 
              placeholder="123 Main St, City, Country" 
              readOnly={!isEditing}
              className={`h-9.5 text-xs rounded-lg transition-colors ${!isEditing ? "bg-stone-50/40 border-stone-200/60 text-stone-900 font-medium cursor-default focus-visible:ring-0 focus-visible:border-stone-200/60" : "text-stone-900 bg-white"}`}
            />
          </div>
        </div>

        {state?.error && (
          <div className="text-xs text-red-500 font-medium">
            {state.error}
          </div>
        )}

        {state?.success && (
          <div className="text-xs text-green-600 font-medium">
            Profile updated successfully!
          </div>
        )}

        <div className="flex justify-end gap-2 pt-3 border-t border-stone-100">
          {!isEditing ? (
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setIsEditing(true)}
              className="h-9 px-4 text-xs font-semibold rounded-lg"
            >
              Edit Profile
            </Button>
          ) : (
            <>
              <Button 
                type="button" 
                variant="ghost" 
                onClick={() => setIsEditing(false)}
                disabled={isPending}
                className="h-9 px-4 text-xs font-semibold rounded-lg"
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={isPending}
                className="h-9 px-4 text-xs font-semibold rounded-lg bg-forest hover:bg-forest/90 text-white"
              >
                {isPending ? "Saving..." : "Save Changes"}
              </Button>
            </>
          )}
        </div>
      </form>
    </div>
  );
}

"use client";

import { useActionState } from "react";
import Link from "next/link";
import { login } from "../actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(
    async (prevState: any, formData: FormData) => {
      const res = await login(formData);
      return res || prevState;
    },
    null
  );

  return (
    <div className="flex min-h-[calc(100vh-5rem)] items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 bg-white p-10 shadow-sm border border-stone-200">
        <div>
          <h2 className="mt-6 text-center text-3xl font-serif font-bold tracking-tight text-forest">
            Welcome Back
          </h2>
          <p className="mt-2 text-center text-sm text-stone-600">
            Or{" "}
            <Link href="/auth/register" className="font-medium text-gold hover:text-gold/80 transition-colors">
              create a new account
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-6" action={formAction}>
          <div className="space-y-4 rounded-md shadow-sm">
            <div className="space-y-1">
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="you@example.com"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
              />
            </div>
          </div>

          {state?.error && (
            <div className="text-sm text-red-500 font-medium">
              {state.error}
            </div>
          )}

          <div>
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? "Signing in..." : "Sign in"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

"use client";

import { logout } from "@/app/auth/actions";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

import { createClient } from "@/lib/supabase/client";

interface LogoutButtonProps {
  className?: string;
  variant?: "default" | "outline" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  showIcon?: boolean;
  label?: string;
}

export default function LogoutButton({
  className,
  variant = "outline",
  size = "sm",
  showIcon = false,
  label = "Log Out",
}: LogoutButtonProps) {
  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    await logout();
  };

  return (
    <Button
      variant={variant}
      size={size}
      className={className}
      onClick={handleLogout}
    >
      {showIcon && <LogOut className="w-3.5 h-3.5 mr-1.5" />}
      {label}
    </Button>
  );
}

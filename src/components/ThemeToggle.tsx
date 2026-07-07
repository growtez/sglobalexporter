"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button className="w-9 h-9 lg:w-9 lg:h-9 flex items-center justify-center rounded-xl text-stone-500 transition-all duration-200">
        <div className="w-[18px] h-[18px]" />
      </button>
    );
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="w-10 h-10 lg:w-9 lg:h-9 flex items-center justify-center rounded-xl text-stone-500 hover:text-gold hover:bg-stone-100 dark:hover:bg-stone-800 transition-all duration-200"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <Sun className="w-5 h-5 lg:w-[18px] lg:h-[18px]" />
      ) : (
        <Moon className="w-5 h-5 lg:w-[18px] lg:h-[18px]" />
      )}
    </button>
  );
}

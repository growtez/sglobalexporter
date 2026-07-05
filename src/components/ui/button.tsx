import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          {
            "bg-forest text-cream hover:bg-forest/90": variant === "default",
            "bg-red-500 text-stone-50 hover:bg-red-500/90": variant === "destructive",
            "border border-forest bg-transparent hover:bg-forest hover:text-cream text-forest": variant === "outline",
            "bg-gold text-charcoal hover:bg-gold/80": variant === "secondary",
            "hover:bg-forest/10 text-forest": variant === "ghost",
            "text-forest underline-offset-4 hover:underline": variant === "link",
            "h-12 px-6 py-3": size === "default",
            "h-9 px-3": size === "sm",
            "h-14 px-8 text-base": size === "lg",
            "h-10 w-10": size === "icon",
          },
          className
        )}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }

import React from "react";
import { cn } from "../utils/cn";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "gold" | "charcoal" | "outline";
  size?: "sm" | "md";
}

export const Badge: React.FC<BadgeProps> = ({
  className,
  variant = "default",
  size = "md",
  children,
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center font-montserrat font-medium rounded-pill tracking-wider uppercase transition-colors";

  const variants = {
    default: "bg-sand-beige/40 text-soft-charcoal border border-stone-taupe/30",
    gold: "bg-gold/15 text-soft-charcoal border border-gold/40",
    charcoal: "bg-soft-charcoal text-ivory border border-transparent",
    outline: "bg-transparent text-stone-taupe border border-stone-taupe/40",
  };

  const sizes = {
    sm: "text-[10px] px-2.5 py-0.5",
    md: "text-[11px] px-3 py-1",
  };

  return (
    <span
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </span>
  );
};

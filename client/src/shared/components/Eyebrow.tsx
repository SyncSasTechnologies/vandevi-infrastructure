import React from "react";
import { cn } from "../utils/cn";

export interface EyebrowProps {
  children: React.ReactNode;
  className?: string;
  withRule?: boolean;
  color?: "charcoal" | "taupe" | "ivory" | "gold";
}

export const Eyebrow: React.FC<EyebrowProps> = ({
  children,
  className,
  withRule = true,
  color = "charcoal",
}) => {
  const colorStyles = {
    charcoal: "text-soft-charcoal",
    taupe: "text-stone-taupe",
    ivory: "text-ivory",
    gold: "text-gold",
  };

  const ruleColors = {
    charcoal: "bg-gold",
    taupe: "bg-stone-taupe/60",
    ivory: "bg-gold",
    gold: "bg-gold",
  };

  return (
    <div className={cn("inline-flex items-center gap-3", className)}>
      {withRule && (
        <span
          className={cn("h-px w-8 md:w-10 rounded-full", ruleColors[color])}
          aria-hidden="true"
        />
      )}
      <span
        className={cn(
          "font-montserrat font-semibold text-[11px] md:text-[12px] uppercase tracking-[0.20em]",
          colorStyles[color],
        )}
      >
        {children}
      </span>
    </div>
  );
};

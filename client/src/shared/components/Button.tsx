import React from "react";
import { ArrowRight, Loader2 } from "lucide-react";
import { cn } from "../utils/cn";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "dark-primary" | "ghost";
  size?: "sm" | "md" | "lg";
  withArrow?: boolean;
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      withArrow = false,
      isLoading = false,
      disabled,
      children,
      ...props
    },
    ref,
  ) => {
    const baseStyles =
      "group inline-flex items-center justify-center font-montserrat font-semibold rounded-pill tracking-[-0.01em] transition-all duration-200 select-none cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none";

    const variants = {
      primary:
        "bg-soft-charcoal text-ivory hover:bg-[#3d3d37] active:bg-[#232320]",
      secondary:
        "bg-transparent border border-soft-charcoal/30 text-soft-charcoal hover:border-soft-charcoal hover:bg-soft-charcoal hover:text-ivory active:bg-[#232320]",
      "dark-primary":
        "bg-ivory text-soft-charcoal hover:bg-[#eae6db] active:bg-[#ded9cb]",
      ghost:
        "bg-transparent text-soft-charcoal hover:text-stone-taupe p-0 rounded-none",
    };

    const sizes = {
      sm: "text-[12px] md:text-[13px] px-5 py-2.5 gap-2",
      md: "text-[13px] md:text-[14px] px-[22px] md:px-[26px] py-3 md:py-3.5 gap-2.5",
      lg: "text-[14px] md:text-[15px] px-[26px] md:px-[30px] py-3.5 md:py-4 gap-3",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="w-4.5 h-4.5 animate-spin text-current" />
        ) : (
          <>
            <span>{children}</span>
            {withArrow && (
              <ArrowRight
                className="w-4 h-4 md:w-4.5 md:h-4.5 text-gold transition-transform duration-200 group-hover:translate-x-1 shrink-0"
                strokeWidth={2.4}
                aria-hidden="true"
              />
            )}
          </>
        )}
      </button>
    );
  },
);

Button.displayName = "Button";

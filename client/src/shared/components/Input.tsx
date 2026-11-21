import React, { useId } from 'react';
import { cn } from '../utils/cn';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, id, label, error, hint, required, ...props }, ref) => {
    const generatedId = useId();
    const inputId = id || generatedId;
    const errorId = `${inputId}-error`;
    const hintId = `${inputId}-hint`;

    return (
      <div className="flex flex-col gap-1.5 w-full text-left">
        {label && (
          <label
            htmlFor={inputId}
            className="font-montserrat font-medium text-[13px] text-soft-charcoal flex items-center justify-between"
          >
            <span>
              {label}
              {required && <span className="text-gold ml-1">*</span>}
            </span>
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          required={required}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : hint ? hintId : undefined}
          className={cn(
            'flex w-full bg-ivory text-soft-charcoal font-montserrat text-[14px] md:text-[15px] px-4',
            'h-[48px] md:h-[52px] rounded-control border border-stone-taupe/40',
            'placeholder:text-stone-taupe/60 transition-colors duration-200',
            'focus:outline-none focus:border-stone-taupe focus:ring-2 focus:ring-gold/40',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            error && 'border-red-600/70 focus:border-red-600 focus:ring-red-500/20',
            className
          )}
          {...props}
        />
        {hint && !error && (
          <span id={hintId} className="font-montserrat text-micro text-stone-taupe">
            {hint}
          </span>
        )}
        {error && (
          <span id={errorId} role="alert" className="font-montserrat text-micro text-red-600 font-medium">
            {error}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

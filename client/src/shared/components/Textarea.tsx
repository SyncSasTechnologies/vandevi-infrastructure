import React, { useId } from 'react';
import { cn } from '../utils/cn';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, id, label, error, hint, required, ...props }, ref) => {
    const generatedId = useId();
    const textareaId = id || generatedId;
    const errorId = `${textareaId}-error`;
    const hintId = `${textareaId}-hint`;

    return (
      <div className="flex flex-col gap-1.5 w-full text-left">
        {label && (
          <label
            htmlFor={textareaId}
            className="font-montserrat font-medium text-[13px] text-soft-charcoal flex items-center justify-between"
          >
            <span>
              {label}
              {required && <span className="text-gold ml-1">*</span>}
            </span>
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          required={required}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : hint ? hintId : undefined}
          className={cn(
            'flex w-full bg-ivory text-soft-charcoal font-montserrat text-[14px] md:text-[15px] p-4',
            'min-h-[132px] md:min-h-[150px] rounded-control border border-stone-taupe/40 resize-y',
            'placeholder:text-stone-taupe/60 transition-colors duration-200',
            'focus:outline-none focus:border-stone-taupe focus:ring-2 focus:ring-gold/40',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            error && 'border-red-600/70 focus:border-red-600 focus:ring-red-500/20',
            className
          )}
          {...props}
        />
        {hint && !error && (
          <span id={hintId} className="font-montserrat text-micro text-stone-taupe">{hint}</span>
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

Textarea.displayName = 'Textarea';

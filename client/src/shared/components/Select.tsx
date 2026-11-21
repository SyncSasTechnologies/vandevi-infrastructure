import React, { useId } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '../utils/cn';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options?: SelectOption[];
  placeholder?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, id, label, error, options = [], placeholder, required, children, ...props }, ref) => {
    const generatedId = useId();
    const selectId = id || generatedId;
    const errorId = `${selectId}-error`;

    return (
      <div className="flex flex-col gap-1.5 w-full text-left">
        {label && (
          <label
            htmlFor={selectId}
            className="font-montserrat font-medium text-[13px] text-soft-charcoal flex items-center justify-between"
          >
            <span>
              {label}
              {required && <span className="text-gold ml-1">*</span>}
            </span>
          </label>
        )}
        <div className="relative w-full">
          <select
            ref={ref}
            id={selectId}
            required={required}
            aria-invalid={!!error}
            aria-describedby={error ? errorId : undefined}
            className={cn(
              'flex w-full bg-ivory text-soft-charcoal font-montserrat text-[14px] md:text-[15px] px-4 pr-10',
              'h-[48px] md:h-[52px] rounded-control border border-stone-taupe/40 appearance-none cursor-pointer',
              'transition-colors duration-200',
              'focus:outline-none focus:border-stone-taupe focus:ring-2 focus:ring-gold/40',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              error && 'border-red-600/70 focus:border-red-600 focus:ring-red-500/20',
              className
            )}
            {...props}
          >
            {placeholder && (
              <option value="" disabled className="text-stone-taupe/60">
                {placeholder}
              </option>
            )}
            {children ||
              options.map((opt) => (
                <option key={opt.value} value={opt.value} className="bg-ivory text-soft-charcoal">
                  {opt.label}
                </option>
              ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-stone-taupe">
            <ChevronDown className="w-4.5 h-4.5 text-stone-taupe" strokeWidth={2.2} />
          </div>
        </div>
        {error && (
          <span id={errorId} role="alert" className="font-montserrat text-micro text-red-600 font-medium">
            {error}
          </span>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';

import React from 'react';
import { cn } from '../../../shared/utils/cn';
import type { LeadStatus } from '../types/lead.types';

interface LeadStatusBadgeProps {
  status: LeadStatus | string;
  className?: string;
}

export const LeadStatusBadge: React.FC<LeadStatusBadgeProps> = ({ status, className }) => {
  const getStyles = () => {
    switch (status) {
      case 'New':
        return 'bg-gold/15 text-soft-charcoal border-gold/40 font-semibold';
      case 'Contacted':
        return 'bg-blue-50 text-blue-800 border-blue-200';
      case 'In Progress':
        return 'bg-soft-charcoal text-ivory border-transparent';
      case 'Converted':
        return 'bg-emerald-50 text-emerald-800 border-emerald-200 font-semibold';
      case 'Closed':
        return 'bg-stone-taupe/15 text-stone-taupe border-stone-taupe/30';
      default:
        return 'bg-sand-beige/40 text-soft-charcoal border-stone-taupe/30';
    }
  };

  return (
    <span
      className={cn(
        'inline-flex items-center px-3 py-1 rounded-pill text-[11px] font-montserrat uppercase tracking-wider border',
        getStyles(),
        className
      )}
    >
      {status === 'New' && <span className="w-1.5 h-1.5 rounded-full bg-gold mr-1.5 shrink-0" />}
      {status}
    </span>
  );
};

import React, { useEffect, useCallback } from "react";
import { X } from "lucide-react";
import { cn } from "../utils/cn";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  className,
}) => {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose],
  );

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? "modal-title" : undefined}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-soft-charcoal/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Surface */}
      <div
        className={cn(
          "relative w-full max-w-lg bg-ivory rounded-panel border border-stone-taupe/30 p-6 md:p-8 shadow-2xl z-10 transition-all",
          className,
        )}
      >
        <div className="flex items-center justify-between pb-4 border-b border-stone-taupe/20 mb-6">
          {title && (
            <h3
              id="modal-title"
              className="font-montserrat font-semibold text-subheading text-soft-charcoal"
            >
              {title}
            </h3>
          )}
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="p-1.5 -mr-1.5 text-stone-taupe hover:text-soft-charcoal rounded-control focus:outline-none focus-visible:ring-2 focus-visible:ring-gold transition-colors ml-auto cursor-pointer"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={2.2} />
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};

import React, { useState, useEffect, useCallback } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "../components/Button";
import { useScrollPosition } from "../hooks/useScrollPosition";
import { cn } from "../utils/cn";

const NAV_LINKS = [
  { name: "Home", path: "/" },
  { name: "About Us", path: "/about" },
  { name: "Services", path: "/services" },
  { name: "Projects", path: "/projects" },
  { name: "Contact Us", path: "/contact" },
];

export const Header: React.FC = () => {
  const isScrolled = useScrollPosition(20);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Close mobile drawer upon route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Lock background scroll when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  // Close on Escape key press
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") {
      setMobileMenuOpen(false);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out",
        isScrolled
          ? "bg-ivory/95 backdrop-blur-md border-b border-stone-taupe/20 py-4 shadow-sm"
          : "bg-transparent py-5 md:py-6",
      )}
    >
      <div className="max-w-[1320px] mx-auto px-6 md:px-10 lg:px-14 flex items-center justify-between">
        {/* Brand Wordmark */}
        <Link
          to="/"
          className="flex flex-col group focus:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-sm z-50"
          aria-label="Vandevi Infrastructure Home"
        >
          <span className="font-montserrat font-semibold text-[17px] md:text-[20px] tracking-[-0.03em] text-soft-charcoal uppercase leading-none">
            Vandevi
          </span>
          <span className="font-montserrat text-[9px] md:text-[10px] tracking-[0.24em] text-stone-taupe uppercase leading-none mt-1">
            Infrastructure
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav
          className="hidden lg:flex items-center gap-9"
          aria-label="Main Navigation"
        >
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              end={link.path === "/"}
              className={({ isActive }) =>
                cn(
                  "font-montserrat text-[14px] tracking-normal transition-colors duration-200 relative py-2 font-medium",
                  isActive
                    ? "text-soft-charcoal font-semibold"
                    : "text-soft-charcoal/75 hover:text-soft-charcoal",
                )
              }
            >
              {({ isActive }) => (
                <>
                  <span>{link.name}</span>
                  {isActive && (
                    <motion.span
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-gold rounded-full"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                      aria-hidden="true"
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Action Button & Mobile Toggle */}
        <div className="flex items-center gap-4 z-50">
          <Link to="/contact" className="hidden sm:inline-block">
            <Button variant="primary" size="sm" withArrow>
              Get in Touch
            </Button>
          </Link>

          {/* Accessible Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation-drawer"
            aria-label={mobileMenuOpen ? "Close Menu" : "Open Menu"}
            className="lg:hidden p-2 -mr-2 text-soft-charcoal focus:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-control transition-colors"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-navigation-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation Menu"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="fixed inset-0 top-0 bg-ivory z-40 lg:hidden flex flex-col pt-24 px-6 pb-10"
          >
            <nav className="flex flex-col gap-6 items-center justify-center flex-1">
              {NAV_LINKS.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  end={link.path === "/"}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      "font-montserrat text-heading-sm font-semibold transition-colors duration-200 text-center",
                      isActive
                        ? "text-soft-charcoal"
                        : "text-stone-taupe hover:text-soft-charcoal",
                    )
                  }
                >
                  {link.name}
                </NavLink>
              ))}

              <div className="mt-8 w-full max-w-[240px]">
                <Link
                  to="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full"
                >
                  <Button
                    variant="primary"
                    size="md"
                    withArrow
                    className="w-full"
                  >
                    Get in Touch
                  </Button>
                </Link>
              </div>
            </nav>

            <div className="text-center pt-6 border-t border-stone-taupe/20 text-micro text-stone-taupe">
              Vandevi Infrastructure — Interior & Furniture Design
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

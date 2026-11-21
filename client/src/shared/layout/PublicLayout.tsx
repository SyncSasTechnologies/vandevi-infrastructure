import React from "react";
import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { useScrollToTop } from "../hooks/useScrollToTop";

export const PublicLayout: React.FC = () => {
  // Reset window scroll to top whenever navigation occurs
  useScrollToTop();

  return (
    <div className="min-h-screen flex flex-col bg-ivory text-soft-charcoal font-montserrat">
      {/* Shared Public Header */}
      <Header />

      {/* Main Content Area */}
      <main className="flex-1 pt-[76px] md:pt-[84px]">
        <Outlet />
      </main>

      {/* Shared Public Footer */}
      <Footer />
    </div>
  );
};

import React from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { useAuth } from '../../features/auth';
import { LogOut, LayoutDashboard, Shield, ExternalLink, FolderKanban } from 'lucide-react';
import { cn } from '../utils/cn';

export const AdminLayout: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-ivory flex flex-col font-montserrat">
      <SEO title="Studio Admin Workspace" noindex={true} />
      {/* Admin Top Navigation Bar */}
      <header className="bg-soft-charcoal text-ivory border-b border-stone-taupe/30 sticky top-0 z-40">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 h-18 flex items-center justify-between">
          {/* Brand & Workspace Indicator */}
          <div className="flex items-center gap-4">
            <Link to="/admin" className="flex flex-col">
              <span className="font-semibold text-[17px] tracking-[-0.02em] text-ivory">
                VANDEVI INFRASTRUCTURE
              </span>
              <span className="text-[10px] tracking-[0.2em] uppercase text-stone-taupe font-medium">
                Admin Workspace
              </span>
            </Link>

            <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-pill bg-gold/15 text-gold border border-gold/30 text-[11px] font-medium uppercase tracking-wider">
              <Shield className="w-3.5 h-3.5" />
              Secure
            </span>
          </div>

          {/* Quick Actions & User Context */}
          <div className="flex items-center gap-4 sm:gap-6">
            {/* View Live Public Site */}
            <Link
              to="/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center gap-1.5 text-xs text-stone-taupe hover:text-ivory transition-colors"
            >
              <span>View Live Website</span>
              <ExternalLink className="w-4 h-4" />
            </Link>

            {/* Admin User Info */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-sand-beige/20 text-gold flex items-center justify-center font-semibold text-xs border border-stone-taupe/30">
                {user?.fullName
                  ? user.fullName.charAt(0).toUpperCase()
                  : user?.email
                  ? user.email.charAt(0).toUpperCase()
                  : 'A'}
              </div>
              <div className="hidden sm:flex flex-col">
                <span className="text-xs text-ivory font-medium truncate max-w-[160px]">
                  {user?.fullName || user?.email || 'Administrator'}
                </span>
                <span className="text-[9px] uppercase tracking-wider text-gold font-semibold">
                  Super Admin
                </span>
              </div>
            </div>

            {/* Sign Out Button */}
            <button
              type="button"
              onClick={handleLogout}
              aria-label="Sign out of admin workspace"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-pill bg-white/5 hover:bg-white/10 text-ivory text-xs transition-colors border border-white/10 cursor-pointer"
            >
              <LogOut className="w-4 h-4 text-stone-taupe" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Sub Navigation Bar */}
      <div className="bg-sand-beige/25 border-b border-stone-taupe/20 px-6 md:px-10">
        <div className="max-w-[1440px] mx-auto flex items-center gap-8 h-12">
          <Link
            to="/admin"
            className={cn(
              'flex items-center gap-2 text-xs font-semibold tracking-wide uppercase transition-colors h-full border-b-2',
              location.pathname === '/admin' || location.pathname.startsWith('/admin/leads')
                ? 'border-soft-charcoal text-soft-charcoal'
                : 'border-transparent text-stone-taupe hover:text-soft-charcoal'
            )}
          >
            <LayoutDashboard className="w-4 h-4 text-gold" />
            <span>Enquiries &amp; Leads</span>
          </Link>

          <Link
            to="/admin/projects"
            className={cn(
              'flex items-center gap-2 text-xs font-semibold tracking-wide uppercase transition-colors h-full border-b-2',
              location.pathname.startsWith('/admin/projects')
                ? 'border-soft-charcoal text-soft-charcoal'
                : 'border-transparent text-stone-taupe hover:text-soft-charcoal'
            )}
          >
            <FolderKanban className="w-4 h-4 text-gold" />
            <span>Projects Portfolio</span>
          </Link>
        </div>
      </div>

      {/* Main Workspace Canvas */}
      <main className="flex-1 max-w-[1440px] mx-auto w-full px-6 md:px-10 py-8 md:py-10">
        <Outlet />
      </main>
    </div>
  );
};

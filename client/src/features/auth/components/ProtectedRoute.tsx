import React from 'react';
import { Navigate, useLocation, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Loader2 } from 'lucide-react';

export const ProtectedRoute: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-ivory flex flex-col items-center justify-center p-6">
        <div className="w-12 h-12 rounded-full border-2 border-stone-taupe/30 border-t-gold animate-spin flex items-center justify-center mb-4">
          <Loader2 className="w-6 h-6 text-gold animate-spin" />
        </div>
        <span className="font-montserrat text-xs tracking-widest uppercase font-semibold text-stone-taupe">
          Authenticating Workspace...
        </span>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return children ? <>{children}</> : <Outlet />;
};

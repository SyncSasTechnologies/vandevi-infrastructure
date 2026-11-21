import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { PublicLayout } from './shared/layout/PublicLayout';
import { AdminLayout } from './shared/layout/AdminLayout';
import { HomePage } from './pages/HomePage';
import { AboutUsPage } from './pages/AboutUsPage';
import { ServicesPage } from './pages/ServicesPage';
import { ServiceDetailPage } from './pages/ServiceDetailPage';
import { OurProjectsPage } from './pages/OurProjectsPage';
import { ContactUsPage } from './pages/ContactUsPage';
import { AdminLoginPage } from './pages/admin/AdminLoginPage';
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';
import { AdminLeadDetailPage } from './pages/admin/AdminLeadDetailPage';
import { AdminProjectsPage } from './pages/admin/AdminProjectsPage';
import { ProtectedRoute } from './features/auth';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* 1. Public Marketing Portal (Shared Header + Footer) */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutUsPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/services/:id" element={<ServiceDetailPage />} />
          <Route path="/projects" element={<OurProjectsPage />} />
          <Route path="/contact" element={<ContactUsPage />} />
        </Route>

        {/* 2. Public Admin Authentication Route */}
        <Route path="/admin/login" element={<AdminLoginPage />} />

        {/* 3. Protected Admin Workspace Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboardPage />} />
            <Route path="leads/:id" element={<AdminLeadDetailPage />} />
            <Route path="projects" element={<AdminProjectsPage />} />
          </Route>
        </Route>

        {/* 4. Catch-all fallback redirecting to Home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

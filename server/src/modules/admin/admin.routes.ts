import { Router } from 'express';
import { adminController } from './admin.controller.js';
import { leadController } from '../leads/lead.controller.js';
import { authGuard } from '../../shared/middleware/authGuard.js';
import { adminLimiter } from '../../shared/middleware/rateLimiter.js';

const router = Router();

// ==========================================
// 1. Public Setup Routes (One-Time Wizard)
// ==========================================
router.get('/setup/status', adminController.getSetupStatus.bind(adminController));
router.post('/setup/initialize', adminController.initializeSetup.bind(adminController));

// ==========================================
// 2. Protected Administrative Routes (Super-Admin Only)
// ==========================================
router.use(adminLimiter);
router.use(authGuard);

// Super-Admin Profile & Session
router.post('/auth/verify-session', adminController.verifySession.bind(adminController));
router.get('/auth/me', adminController.getProfile.bind(adminController));

// Leads Management
router.get('/leads/metrics', leadController.getMetrics.bind(leadController));
router.get('/leads', leadController.getLeads.bind(leadController));
router.get('/leads/export', adminController.exportLeads.bind(adminController));
router.get('/leads/:id', leadController.getLeadById.bind(leadController));
router.patch('/leads/:id/status', leadController.updateLeadStatus.bind(leadController));

export const adminRoutes = router;

import { Request, Response } from 'express';
import { adminService } from './admin.service.js';
import { ApiResponse } from '../../shared/utils/apiResponse.js';
import { setupInitialAdminSchema } from './admin.schema.js';

export class AdminController {
  /**
   * Public: Query whether initial super-admin creation is required.
   */
  async getSetupStatus(_req: Request, res: Response): Promise<void> {
    try {
      const status = await adminService.checkSetupStatus();
      ApiResponse.success(res, status, 'Setup status checked successfully');
    } catch (error: any) {
      console.error('Error checking setup status:', error);
      ApiResponse.error(res, error.message || 'Failed to check setup status', error.statusCode || 500);
    }
  }

  /**
   * Public (One-time): Initialize the single master super-admin account.
   */
  async initializeSetup(req: Request, res: Response): Promise<void> {
    try {
      const validation = setupInitialAdminSchema.safeParse(req.body);
      if (!validation.success) {
        const errorMsg = validation.error.issues[0]?.message || 'Validation failed';
        ApiResponse.error(res, errorMsg, 400, validation.error.issues);
        return;
      }

      const admin = await adminService.initializeSetup(validation.data);
      ApiResponse.created(
        res,
        admin,
        'Master super-administrator initialized successfully. You can now access the Studio Portal.'
      );
    } catch (error: any) {
      console.error('Error initializing setup:', error);
      ApiResponse.error(res, error.message || 'Failed to initialize administrator', error.statusCode || 500);
    }
  }

  /**
   * Protected: Validate active session and synchronize master admin state.
   */
  async verifySession(req: Request, res: Response): Promise<void> {
    try {
      if (!req.user || !req.user.uid || !req.user.email) {
        ApiResponse.error(res, 'Unauthorized session', 401);
        return;
      }

      const admin = await adminService.verifySession(
        req.user.uid,
        req.user.email,
        (req.body && req.body.displayName) || undefined
      );

      ApiResponse.success(res, admin, 'Admin session verified');
    } catch (error: any) {
      console.error('Error verifying session:', error);
      ApiResponse.error(res, error.message || 'Failed to verify session', error.statusCode || 500);
    }
  }

  /**
   * Protected: Get current authenticated super-admin profile.
   */
  async getProfile(req: Request, res: Response): Promise<void> {
    try {
      if (!req.user || !req.user.uid) {
        ApiResponse.error(res, 'Unauthorized', 401);
        return;
      }

      const profile = await adminService.getProfile(req.user.uid);
      ApiResponse.success(res, profile, 'Profile retrieved');
    } catch (error: any) {
      console.error('Error getting profile:', error);
      ApiResponse.error(res, error.message || 'Failed to get profile', error.statusCode || 500);
    }
  }

  /**
   * Protected: Export all leads as CSV file download.
   */
  async exportLeads(_req: Request, res: Response): Promise<void> {
    try {
      const csv = await adminService.exportLeadsCsv();
      const filename = `vandevi-leads-export-${new Date().toISOString().split('T')[0]}.csv`;

      res.setHeader('Content-Type', 'text/csv; charset=utf-8');
      res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
      res.status(200).send(csv);
    } catch (error: any) {
      console.error('Error exporting leads:', error);
      ApiResponse.error(res, error.message || 'Failed to export leads', error.statusCode || 500);
    }
  }
}

export const adminController = new AdminController();

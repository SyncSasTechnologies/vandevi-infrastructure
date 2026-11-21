import { apiClient } from '../../../shared/api/apiClient';
import { sendPasswordResetEmail as fbSendPasswordResetEmail } from 'firebase/auth';
import { auth, isFirebaseConfigured } from './firebase';

export interface SetupStatusResponse {
  isSetupRequired: boolean;
  adminCount: number;
}

export interface AdminProfile {
  id?: string;
  uid: string;
  email: string;
  fullName: string;
  role: 'superadmin';
  isActive: boolean;
  lastLoginAt?: string | null;
  createdAt?: string;
}

export interface InitializeAdminInput {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const authApi = {
  /**
   * Public check: Determines if the system requires initial super-admin provisioning.
   * Locked permanently once the master superadmin exists.
   */
  async checkSetupStatus(): Promise<SetupStatusResponse> {
    const response = await apiClient.get<{
      success: boolean;
      data: SetupStatusResponse;
    }>('/admin/setup/status');
    const data = response.data?.data || (response.data as any);
    return data;
  },

  /**
   * Public one-time setup: Provisions the single master super-admin account.
   */
  async initializeAdmin(data: InitializeAdminInput): Promise<{ admin: AdminProfile; message: string }> {
    const response = await apiClient.post<{
      success: boolean;
      message: string;
      data: AdminProfile;
    }>('/admin/setup/initialize', data);

    const admin = (response.data?.data as any)?.admin || response.data?.data || (response.data as any);
    return {
      admin,
      message: response.data?.message || 'Master super-administrator initialized successfully.'
    };
  },

  /**
   * Protected: Verifies active session token against MongoDB super-admin registry.
   */
  async verifySession(fullName?: string): Promise<AdminProfile> {
    const response = await apiClient.post<{
      success: boolean;
      data: AdminProfile;
    }>('/admin/auth/verify-session', { fullName });

    const admin = (response.data?.data as any)?.admin || response.data?.data || (response.data as any);
    if (!admin || !admin.uid) {
      throw new Error('Failed to retrieve verified administrator session payload.');
    }
    return admin;
  },

  /**
   * Protected: Retrieves the master super-admin profile.
   */
  async getProfile(): Promise<AdminProfile> {
    const response = await apiClient.get<{
      success: boolean;
      data: AdminProfile;
    }>('/admin/auth/me');

    const profile = (response.data?.data as any)?.admin || response.data?.data || (response.data as any);
    return profile;
  },

  /**
   * Triggers a Firebase password reset email to the registered super-admin.
   */
  async requestPasswordReset(email: string): Promise<void> {
    if (!isFirebaseConfigured || !auth) {
      throw new Error('Authentication service is not configured. Please contact support.');
    }
    await fbSendPasswordResetEmail(auth, email.trim().toLowerCase());
  }
};

import { adminRepository } from './admin.repository.js';
import { getFirebaseAdminAuth } from '../../shared/utils/firebaseAdmin.js';
import { SetupInitialAdminInput } from './admin.schema.js';
import { leadRepository } from '../leads/lead.repository.js';

export class AdminService {
  /**
   * Check if the application requires initial super-admin setup.
   * Only one superadmin account is permitted.
   */
  async checkSetupStatus(): Promise<{ isSetupRequired: boolean; adminCount: number }> {
    const adminCount = await adminRepository.countActiveAdmins();
    return {
      isSetupRequired: adminCount === 0,
      adminCount
    };
  }

  /**
   * One-time setup wizard: Provisions the sole super-admin account in Firebase and MongoDB.
   * Permanently locked once the super-admin account is created.
   */
  async initializeSetup(dto: SetupInitialAdminInput): Promise<{
    uid: string;
    email: string;
    fullName: string;
    role: string;
    isActive: boolean;
    lastLoginAt?: string | null;
  }> {
    const count = await adminRepository.countActiveAdmins();
    if (count > 0) {
      const error: any = new Error(
        'Setup has already been completed. Only one master super-administrator is permitted for this system.'
      );
      error.statusCode = 403;
      throw error;
    }

    const auth = getFirebaseAdminAuth();
    let uid: string;

    // 1. Create or synchronize Firebase super-admin user
    try {
      const existingUser = await auth.getUserByEmail(dto.email).catch(() => null);
      if (existingUser) {
        await auth.updateUser(existingUser.uid, {
          password: dto.password,
          displayName: dto.fullName,
          emailVerified: true
        });
        uid = existingUser.uid;
      } else {
        const newUser = await auth.createUser({
          email: dto.email,
          password: dto.password,
          displayName: dto.fullName,
          emailVerified: true
        });
        uid = newUser.uid;
      }

      // Assign Firebase custom claims for super-admin privileges
      await auth.setCustomUserClaims(uid, {
        role: 'superadmin',
        admin: true
      });
    } catch (fbError: any) {
      const error: any = new Error(`Firebase Auth provision failed: ${fbError.message || 'Unknown error'}`);
      error.statusCode = 400;
      throw error;
    }

    // 2. Persist single super-admin record in MongoDB
    const existingMongoAdmin = await adminRepository.findByUid(uid);
    let adminRecord;
    if (existingMongoAdmin) {
      existingMongoAdmin.fullName = dto.fullName;
      existingMongoAdmin.role = 'superadmin';
      existingMongoAdmin.isActive = true;
      existingMongoAdmin.lastLoginAt = new Date();
      adminRecord = await existingMongoAdmin.save();
    } else {
      adminRecord = await adminRepository.create({
        uid,
        email: dto.email,
        fullName: dto.fullName,
        role: 'superadmin',
        isActive: true
      });
    }

    return {
      uid: adminRecord.uid,
      email: adminRecord.email,
      fullName: adminRecord.fullName,
      role: adminRecord.role,
      isActive: adminRecord.isActive,
      lastLoginAt: adminRecord.lastLoginAt ? adminRecord.lastLoginAt.toISOString() : null
    };
  }

  /**
   * Verify authenticated session token and return database super-admin record.
   * Strictly enforces that only the registered super-admin can access the workspace.
   */
  async verifySession(
    uid: string,
    email: string,
    displayName?: string
  ): Promise<{
    uid: string;
    email: string;
    fullName: string;
    role: string;
    isActive: boolean;
    lastLoginAt?: string | null;
  }> {
    let admin = await adminRepository.findByUid(uid);

    if (!admin) {
      admin = await adminRepository.findByEmail(email);
      if (admin) {
        admin.uid = uid;
        await admin.save();
      }
    }

    if (!admin) {
      const error: any = new Error(
        'Access denied. Only the designated super-administrator is authorized to access this workspace.'
      );
      error.statusCode = 403;
      throw error;
    }

    if (!admin.isActive) {
      const error: any = new Error('Access denied. Administrator account has been deactivated.');
      error.statusCode = 403;
      throw error;
    }

    await adminRepository.updateLastLogin(uid);

    return {
      uid: admin.uid,
      email: admin.email,
      fullName: admin.fullName,
      role: admin.role,
      isActive: admin.isActive,
      lastLoginAt: new Date().toISOString()
    };
  }

  /**
   * Retrieve active admin profile.
   */
  async getProfile(uid: string) {
    const admin = await adminRepository.findByUid(uid);
    if (!admin) {
      const error: any = new Error('Super-administrator profile not found');
      error.statusCode = 404;
      throw error;
    }
    return {
      uid: admin.uid,
      email: admin.email,
      fullName: admin.fullName,
      role: admin.role,
      lastLoginAt: admin.lastLoginAt,
      createdAt: admin.createdAt
    };
  }

  /**
   * Export all leads to a formatted CSV file string.
   */
  async exportLeadsCsv(): Promise<string> {
    const result = await leadRepository.find({ limit: 5000 });
    const leads = result.leads;

    const headers = [
      'Lead ID',
      'Date Submitted',
      'Client Name',
      'Mobile Number',
      'Email Address',
      'Project Type',
      'Location of Project',
      'Services Required',
      'Status',
      'Project Description',
      'Internal Notes',
      'Source'
    ];

    const escapeCsv = (str: string | undefined | null) => {
      if (!str) return '""';
      let clean = String(str).replace(/"/g, '""');
      // Neutralize CSV / Formula Injection (CWE-1236) if cell begins with =, +, -, @, \t, or \r
      if (/^[=+\-@\t\r]/.test(clean)) {
        clean = `'${clean}`;
      }
      return `"${clean}"`;
    };

    const rows = leads.map((lead: any) => [
      escapeCsv(lead._id.toString()),
      escapeCsv(new Date(lead.createdAt).toISOString()),
      escapeCsv(lead.fullName),
      escapeCsv(lead.mobileNumber),
      escapeCsv(lead.emailAddress),
      escapeCsv(lead.projectType),
      escapeCsv(lead.locationOfProject),
      escapeCsv(Array.isArray(lead.servicesRequired) ? lead.servicesRequired.join(', ') : ''),
      escapeCsv(lead.status),
      escapeCsv(lead.projectDescription),
      escapeCsv(lead.adminNotes || ''),
      escapeCsv(lead.source)
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\r\n');
    return csvContent;
  }
}

export const adminService = new AdminService();

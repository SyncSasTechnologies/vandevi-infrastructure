import { AdminModel, IAdmin, AdminRole } from './admin.model.js';

export interface CreateAdminData {
  uid: string;
  email: string;
  fullName: string;
  role?: AdminRole;
  isActive?: boolean;
}

export class AdminRepository {
  async countActiveAdmins(): Promise<number> {
    return AdminModel.countDocuments({ isActive: true }).exec();
  }

  async findSuperAdmin(): Promise<IAdmin | null> {
    return AdminModel.findOne({ role: 'superadmin', isActive: true }).exec();
  }

  async findByUid(uid: string): Promise<IAdmin | null> {
    return AdminModel.findOne({ uid }).exec();
  }

  async findByEmail(email: string): Promise<IAdmin | null> {
    return AdminModel.findOne({ email: email.toLowerCase() }).exec();
  }

  async create(data: CreateAdminData): Promise<IAdmin> {
    const admin = new AdminModel({
      ...data,
      role: 'superadmin',
      email: data.email.toLowerCase(),
      isActive: data.isActive !== undefined ? data.isActive : true
    });
    return admin.save();
  }

  async updateLastLogin(uid: string): Promise<void> {
    await AdminModel.updateOne({ uid }, { $set: { lastLoginAt: new Date() } }).exec();
  }

  async updateProfile(uid: string, fullName: string): Promise<IAdmin | null> {
    return AdminModel.findOneAndUpdate(
      { uid },
      { $set: { fullName } },
      { new: true }
    ).exec();
  }
}

export const adminRepository = new AdminRepository();

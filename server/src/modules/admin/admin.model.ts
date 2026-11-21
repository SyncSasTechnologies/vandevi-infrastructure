import mongoose, { Schema, Document } from 'mongoose';

export type AdminRole = 'superadmin';

export interface IAdmin extends Document {
  uid: string; // Firebase Auth UID
  email: string;
  fullName: string;
  role: AdminRole;
  isActive: boolean;
  lastLoginAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const AdminSchema = new Schema<IAdmin>(
  {
    uid: {
      type: String,
      required: [true, 'Firebase UID is required'],
      unique: true,
      index: true
    },
    email: {
      type: String,
      required: [true, 'Admin email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      index: true
    },
    fullName: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true,
      maxlength: [100, 'Full name cannot exceed 100 characters']
    },
    role: {
      type: String,
      enum: ['superadmin'],
      default: 'superadmin',
      index: true
    },
    isActive: {
      type: Boolean,
      default: true,
      index: true
    },
    lastLoginAt: {
      type: Date
    }
  },
  {
    timestamps: true
  }
);

export const AdminModel = mongoose.model<IAdmin>('Admin', AdminSchema);

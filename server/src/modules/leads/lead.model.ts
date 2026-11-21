import mongoose, { Schema, Document } from 'mongoose';

export type ProjectType = 'Residential' | 'Commercial';
export type LeadStatus = 'New' | 'Contacted' | 'In Progress' | 'Converted' | 'Closed';

export interface ILead extends Document {
  fullName: string;
  mobileNumber: string;
  emailAddress: string;
  projectType: ProjectType;
  locationOfProject: string;
  servicesRequired: string[];
  projectDescription: string;
  source: 'Home' | 'Contact Page';
  status: LeadStatus;
  adminNotes?: string;
  ipAddress?: string;
  userAgent?: string;
  createdAt: Date;
  updatedAt: Date;
}

const LeadSchema = new Schema<ILead>(
  {
    fullName: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true,
      maxlength: [100, 'Full name cannot exceed 100 characters']
    },
    mobileNumber: {
      type: String,
      required: [true, 'Mobile number is required'],
      trim: true,
      maxlength: [20, 'Mobile number cannot exceed 20 characters'],
      index: true
    },
    emailAddress: {
      type: String,
      required: [true, 'Email address is required'],
      trim: true,
      lowercase: true,
      index: true
    },
    projectType: {
      type: String,
      enum: ['Residential', 'Commercial'],
      required: [true, 'Project type is required'],
      index: true
    },
    locationOfProject: {
      type: String,
      required: [true, 'Location of project is required'],
      trim: true,
      maxlength: [150, 'Location cannot exceed 150 characters']
    },
    servicesRequired: {
      type: [String],
      default: []
    },
    projectDescription: {
      type: String,
      required: [true, 'Project description is required'],
      trim: true,
      maxlength: [3000, 'Project description cannot exceed 3000 characters']
    },
    source: {
      type: String,
      enum: ['Home', 'Contact Page'],
      default: 'Contact Page'
    },
    status: {
      type: String,
      enum: ['New', 'Contacted', 'In Progress', 'Converted', 'Closed'],
      default: 'New',
      index: true
    },
    adminNotes: {
      type: String,
      default: ''
    },
    ipAddress: {
      type: String
    },
    userAgent: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

// Compound index for efficient administrative date & status queries
LeadSchema.index({ status: 1, createdAt: -1 });
LeadSchema.index({ createdAt: -1 });

export const LeadModel = mongoose.model<ILead>('Lead', LeadSchema);

import type { ContactFormData } from '../schemas/lead.schema';

export type SubmitLeadInput = ContactFormData;

export interface LeadSubmissionResponse {
  success: boolean;
  message: string;
  data: {
    id: string;
    fullName: string;
    status: string;
    createdAt: string;
  };
}

export type LeadStatus = 'New' | 'Contacted' | 'In Progress' | 'Converted' | 'Closed';
export type ProjectType = 'Residential' | 'Commercial';

export interface LeadDetail {
  _id: string;
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
  createdAt: string;
  updatedAt: string;
}

export interface LeadMetrics {
  total: number;
  new: number;
  contacted: number;
  inProgress: number;
  converted: number;
  closed: number;
}

export interface AdminLeadsResponse {
  leads: LeadDetail[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface GetAdminLeadsParams {
  status?: string;
  search?: string;
  page?: number;
  limit?: number;
}

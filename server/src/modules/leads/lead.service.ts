import { leadRepository, FindLeadsFilter } from './lead.repository.js';
import { SubmitLeadDTO } from './lead.schema.js';
import { sendLeadNotificationEmail } from '../../shared/utils/emailTransporter.js';
import { ILead, LeadStatus } from './lead.model.js';

export interface LeadRequestMetadata {
  ipAddress?: string;
  userAgent?: string;
}

export class LeadService {
  async processLeadSubmission(
    dto: SubmitLeadDTO,
    meta: LeadRequestMetadata = {}
  ): Promise<{ id: string; fullName: string; status: string; createdAt: Date }> {
    // 1. Create lead document in database
    const lead = await leadRepository.create({
      fullName: dto.fullName,
      mobileNumber: dto.mobileNumber,
      emailAddress: dto.emailAddress,
      projectType: dto.projectType,
      locationOfProject: dto.locationOfProject,
      servicesRequired: dto.servicesRequired,
      projectDescription: dto.projectDescription,
      source: dto.source,
      ipAddress: meta.ipAddress,
      userAgent: meta.userAgent
    });

    // 2. Dispatch async notification email to admin (does not block HTTP response)
    sendLeadNotificationEmail({
      fullName: lead.fullName,
      mobileNumber: lead.mobileNumber,
      emailAddress: lead.emailAddress,
      projectType: lead.projectType,
      locationOfProject: lead.locationOfProject,
      servicesRequired: lead.servicesRequired,
      projectDescription: lead.projectDescription,
      source: lead.source,
      createdAt: lead.createdAt
    }).catch((err) => {
      console.error('Async lead email dispatch error:', err);
    });

    return {
      id: lead._id.toString(),
      fullName: lead.fullName,
      status: lead.status,
      createdAt: lead.createdAt
    };
  }

  async getLeadById(id: string): Promise<ILead | null> {
    return await leadRepository.findById(id);
  }

  async getLeads(filter: FindLeadsFilter) {
    return await leadRepository.find(filter);
  }

  async updateLeadStatus(id: string, status: LeadStatus, notes?: string): Promise<ILead | null> {
    return await leadRepository.updateStatus(id, status, notes);
  }

  async getMetrics() {
    return await leadRepository.getStatusMetrics();
  }
}

export const leadService = new LeadService();


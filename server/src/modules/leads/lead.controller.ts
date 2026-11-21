import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { leadService } from './lead.service.js';
import { ApiResponse } from '../../shared/utils/apiResponse.js';
import { SubmitLeadDTO } from './lead.schema.js';
import { LeadStatus, ProjectType } from './lead.model.js';

export class LeadController {
  async submitLead(req: Request, res: Response): Promise<void> {
    try {
      const dto = req.body as SubmitLeadDTO;
      const ipAddress = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || req.ip;
      const userAgent = req.headers['user-agent'];

      const result = await leadService.processLeadSubmission(dto, {
        ipAddress: typeof ipAddress === 'string' ? ipAddress.split(',')[0].trim() : undefined,
        userAgent
      });

      ApiResponse.created(
        res,
        result,
        'Thank you for your enquiry. Vandevi Infrastructure will review your requirements and reach out to you shortly.'
      );
    } catch (error) {
      console.error('Error submitting lead:', error);
      ApiResponse.error(res, 'Failed to process your enquiry. Please try again or contact us directly.', 500);
    }
  }

  async getLeads(req: Request, res: Response): Promise<void> {
    try {
      const { status, projectType, search, page, limit } = req.query;

      const result = await leadService.getLeads({
        status: status as LeadStatus,
        projectType: projectType as ProjectType,
        search: typeof search === 'string' ? search : undefined,
        page: page ? parseInt(page as string, 10) : 1,
        limit: limit ? parseInt(limit as string, 10) : 20
      });

      ApiResponse.success(res, result, 'Leads retrieved successfully');
    } catch (error) {
      console.error('Error fetching leads:', error);
      ApiResponse.error(res, 'Failed to retrieve leads', 500);
    }
  }

  async getLeadById(req: Request, res: Response): Promise<void> {
    try {
      const id = String(req.params.id);
      if (!mongoose.Types.ObjectId.isValid(id)) {
        ApiResponse.error(res, 'Invalid lead ID format.', 400);
        return;
      }

      const lead = await leadService.getLeadById(id);

      if (!lead) {
        ApiResponse.error(res, 'Lead not found', 404);
        return;
      }

      ApiResponse.success(res, lead, 'Lead details retrieved successfully');
    } catch (error) {
      console.error('Error fetching lead details:', error);
      ApiResponse.error(res, 'Failed to retrieve lead details', 500);
    }
  }

  async updateLeadStatus(req: Request, res: Response): Promise<void> {
    try {
      const id = String(req.params.id);
      if (!mongoose.Types.ObjectId.isValid(id)) {
        ApiResponse.error(res, 'Invalid lead ID format.', 400);
        return;
      }

      const { status, adminNotes } = req.body;

      if (!status) {
        ApiResponse.error(res, 'Status is required', 400);
        return;
      }

      const updated = await leadService.updateLeadStatus(id, status as LeadStatus, adminNotes);

      if (!updated) {
        ApiResponse.error(res, 'Lead not found', 404);
        return;
      }

      ApiResponse.success(res, updated, 'Lead status updated successfully');
    } catch (error) {
      console.error('Error updating lead status:', error);
      ApiResponse.error(res, 'Failed to update lead status', 500);
    }
  }

  async getMetrics(_req: Request, res: Response): Promise<void> {
    try {
      const metrics = await leadService.getMetrics();
      ApiResponse.success(res, metrics, 'Lead metrics retrieved successfully');
    } catch (error) {
      console.error('Error fetching lead metrics:', error);
      ApiResponse.error(res, 'Failed to retrieve lead metrics', 500);
    }
  }
}

export const leadController = new LeadController();

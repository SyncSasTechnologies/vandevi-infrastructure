import { LeadModel, ILead, LeadStatus, ProjectType } from './lead.model.js';

export interface CreateLeadParams {
  fullName: string;
  mobileNumber: string;
  emailAddress: string;
  projectType: ProjectType;
  locationOfProject: string;
  servicesRequired: string[];
  projectDescription: string;
  source: 'Home' | 'Contact Page';
  ipAddress?: string;
  userAgent?: string;
}

export interface FindLeadsFilter {
  status?: LeadStatus;
  projectType?: ProjectType;
  search?: string;
  page?: number;
  limit?: number;
}

function escapeRegex(text: string): string {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

export class LeadRepository {
  async create(data: CreateLeadParams): Promise<ILead> {
    const lead = new LeadModel(data);
    return await lead.save();
  }

  async findById(id: string): Promise<ILead | null> {
    return await LeadModel.findById(id).exec();
  }

  async find(filter: FindLeadsFilter = {}) {
    const query: Record<string, any> = {};

    if (filter.status) {
      query.status = filter.status;
    }

    if (filter.projectType) {
      query.projectType = filter.projectType;
    }

    if (filter.search && filter.search.trim().length > 0) {
      const safeSearch = escapeRegex(filter.search.trim());
      const searchRegex = new RegExp(safeSearch, 'i');
      query.$or = [
        { fullName: searchRegex },
        { emailAddress: searchRegex },
        { mobileNumber: searchRegex },
        { locationOfProject: searchRegex }
      ];
    }

    const page = Math.max(1, filter.page || 1);
    const limit = Math.min(100, Math.max(1, filter.limit || 20));
    const skip = (page - 1) * limit;

    const [leads, total] = await Promise.all([
      LeadModel.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .exec(),
      LeadModel.countDocuments(query).exec()
    ]);

    return {
      leads,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    };
  }

  async updateStatus(
    id: string,
    status: LeadStatus,
    adminNotes?: string
  ): Promise<ILead | null> {
    const update: Record<string, any> = { status };
    if (adminNotes !== undefined) {
      update.adminNotes = adminNotes;
    }

    return await LeadModel.findByIdAndUpdate(id, { $set: update }, { new: true }).exec();
  }

  async getStatusMetrics() {
    const counts = await LeadModel.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    const result: Record<string, number> = {
      total: 0,
      new: 0,
      contacted: 0,
      inProgress: 0,
      converted: 0,
      closed: 0
    };

    counts.forEach((item) => {
      const count = item.count;
      result.total += count;
      if (item._id === 'New') result.new = count;
      if (item._id === 'Contacted') result.contacted = count;
      if (item._id === 'In Progress') result.inProgress = count;
      if (item._id === 'Converted') result.converted = count;
      if (item._id === 'Closed') result.closed = count;
    });

    return result;
  }
}

export const leadRepository = new LeadRepository();

import { apiClient } from '../../../shared/api/apiClient';
import type {
  SubmitLeadInput,
  LeadSubmissionResponse,
  LeadDetail,
  LeadMetrics,
  AdminLeadsResponse,
  GetAdminLeadsParams
} from '../types/lead.types';

export const leadApi = {
  /**
   * Public route: Submits a new project inquiry.
   */
  async submitLead(payload: SubmitLeadInput): Promise<LeadSubmissionResponse> {
    const response = await apiClient.post<LeadSubmissionResponse>('/leads/submit', payload);
    return response.data;
  },

  /**
   * Protected Admin route: Fetches lead status counters for dashboard metric cards.
   */
  async getMetrics(): Promise<LeadMetrics> {
    const response = await apiClient.get<{
      success: boolean;
      data: LeadMetrics;
    }>('/admin/leads/metrics');
    return response.data.data;
  },

  /**
   * Protected Admin route: Fetches paginated, searchable, status-filtered leads.
   */
  async getAdminLeads(params?: GetAdminLeadsParams): Promise<AdminLeadsResponse> {
    const queryParams: Record<string, string | number> = {};
    if (params?.status && params.status !== 'all') {
      queryParams.status = params.status;
    }
    if (params?.search && params.search.trim().length > 0) {
      queryParams.search = params.search.trim();
    }
    if (params?.page) {
      queryParams.page = params.page;
    }
    if (params?.limit) {
      queryParams.limit = params.limit;
    }

    const response = await apiClient.get<{
      success: boolean;
      data: AdminLeadsResponse;
    }>('/admin/leads', { params: queryParams });
    return response.data.data;
  },

  /**
   * Protected Admin route: Retrieves comprehensive details for a single lead.
   */
  async getLeadById(id: string): Promise<LeadDetail> {
    const response = await apiClient.get<{
      success: boolean;
      data: LeadDetail;
    }>(`/admin/leads/${id}`);
    return response.data.data;
  },

  /**
   * Protected Admin route: Updates lead status and internal follow-up remarks.
   */
  async updateLeadStatus(
    id: string,
    status: string,
    adminNotes?: string
  ): Promise<LeadDetail> {
    const response = await apiClient.patch<{
      success: boolean;
      data: LeadDetail;
    }>(`/admin/leads/${id}/status`, { status, adminNotes });
    return response.data.data;
  },

  /**
   * Protected Admin route: Downloads leads as an RFC-compliant CSV document.
   */
  async exportLeadsCsv(): Promise<void> {
    const response = await apiClient.get('/admin/leads/export', {
      responseType: 'blob'
    });
    const blob = new Blob([response.data], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute(
      'download',
      `vandevi_inquiries_${new Date().toISOString().split('T')[0]}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  }
};

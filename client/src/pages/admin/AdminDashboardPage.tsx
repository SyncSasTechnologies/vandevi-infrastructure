import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  useAdminMetrics,
  useAdminLeads,
  leadApi,
  LeadStatusBadge,
  type LeadStatus
} from '../../features/leads';
import {
  Search,
  Users,
  Sparkles,
  Clock,
  CheckCircle2,
  XCircle,
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  RefreshCw,
  FolderOpen,
  Download
} from 'lucide-react';
import { cn } from '../../shared/utils/cn';

const STATUS_FILTERS = [
  { id: 'all', label: 'All Enquiries' },
  { id: 'New', label: 'New' },
  { id: 'Contacted', label: 'Contacted' },
  { id: 'In Progress', label: 'In Progress' },
  { id: 'Converted', label: 'Converted' },
  { id: 'Closed', label: 'Closed' }
];

export const AdminDashboardPage: React.FC = () => {
  const [activeStatus, setActiveStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [isExporting, setIsExporting] = useState<boolean>(false);

  // Queries
  const { data: metrics, isLoading: isMetricsLoading, refetch: refetchMetrics } = useAdminMetrics();
  const {
    data: leadsData,
    isLoading: isLeadsLoading,
    isFetching: isLeadsFetching,
    refetch: refetchLeads
  } = useAdminLeads({
    status: activeStatus === 'all' ? undefined : activeStatus,
    search: searchTerm,
    page,
    limit: 15
  });

  const leads = leadsData?.leads || [];
  const pagination = leadsData?.pagination || { total: 0, page: 1, limit: 15, totalPages: 1 };

  const handleRefreshAll = () => {
    refetchMetrics();
    refetchLeads();
  };

  const handleExportCsv = async () => {
    try {
      setIsExporting(true);
      await leadApi.exportLeadsCsv();
    } catch (err: any) {
      console.error('Failed to export leads CSV:', err);
      alert(err.message || 'Failed to export CSV. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* 1. Header Title & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-semibold text-page-title text-soft-charcoal tracking-tight">
            Client Inquiries & Leads
          </h1>
          <p className="text-body-sm text-stone-taupe mt-1">
            Real-time pipeline monitoring and lead qualification
          </p>
        </div>

        <div className="flex items-center gap-2.5 self-start sm:self-auto">
          {/* Export CSV */}
          <button
            type="button"
            onClick={handleExportCsv}
            disabled={isExporting}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-pill bg-ivory border border-stone-taupe/30 hover:border-stone-taupe text-soft-charcoal text-xs font-semibold shadow-sm transition-all cursor-pointer disabled:opacity-50"
            title="Download all inquiries as an RFC-compliant CSV"
          >
            <Download className={cn('w-4 h-4 text-stone-taupe', isExporting ? 'animate-bounce' : '')} />
            <span>{isExporting ? 'Exporting...' : 'Export CSV'}</span>
          </button>

          {/* Refresh Data */}
          <button
            type="button"
            onClick={handleRefreshAll}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-pill bg-soft-charcoal text-ivory border border-soft-charcoal hover:bg-[#3d3d37] text-xs font-semibold shadow-sm transition-all cursor-pointer"
          >
            <RefreshCw className={cn('w-4 h-4 text-gold', isLeadsFetching ? 'animate-spin' : '')} />
            <span>Refresh Data</span>
          </button>
        </div>
      </div>

      {/* 2. Dynamic Summary Metric Cards (6 Cards) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {/* Total Leads */}
        <div className="bg-ivory border border-stone-taupe/25 rounded-[18px] p-5 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-semibold text-stone-taupe uppercase tracking-wider">
              Total
            </span>
            <Users className="w-5 h-5 text-stone-taupe" />
          </div>
          <span className="font-semibold text-[26px] text-soft-charcoal leading-none">
            {isMetricsLoading ? '—' : metrics?.total ?? 0}
          </span>
        </div>

        {/* New Leads (Highlighted with Gold accent) */}
        <div className="bg-ivory border border-gold/50 rounded-[18px] p-5 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-8 h-8 bg-gold/10 rounded-bl-[16px] flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-gold" />
          </div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-semibold text-gold uppercase tracking-wider">
              New
            </span>
          </div>
          <span className="font-semibold text-[26px] text-soft-charcoal leading-none">
            {isMetricsLoading ? '—' : metrics?.new ?? 0}
          </span>
        </div>

        {/* Contacted */}
        <div className="bg-ivory border border-stone-taupe/25 rounded-[18px] p-5 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-semibold text-stone-taupe uppercase tracking-wider">
              Contacted
            </span>
            <Phone className="w-5 h-5 text-blue-600" />
          </div>
          <span className="font-semibold text-[26px] text-soft-charcoal leading-none">
            {isMetricsLoading ? '—' : metrics?.contacted ?? 0}
          </span>
        </div>

        {/* In Progress */}
        <div className="bg-ivory border border-stone-taupe/25 rounded-[18px] p-5 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-semibold text-stone-taupe uppercase tracking-wider">
              In Progress
            </span>
            <Clock className="w-5 h-5 text-amber-600" />
          </div>
          <span className="font-semibold text-[26px] text-soft-charcoal leading-none">
            {isMetricsLoading ? '—' : metrics?.inProgress ?? 0}
          </span>
        </div>

        {/* Converted */}
        <div className="bg-ivory border border-stone-taupe/25 rounded-[18px] p-5 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-semibold text-stone-taupe uppercase tracking-wider">
              Converted
            </span>
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          </div>
          <span className="font-semibold text-[26px] text-soft-charcoal leading-none">
            {isMetricsLoading ? '—' : metrics?.converted ?? 0}
          </span>
        </div>

        {/* Closed */}
        <div className="bg-ivory border border-stone-taupe/25 rounded-[18px] p-5 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-semibold text-stone-taupe uppercase tracking-wider">
              Closed
            </span>
            <XCircle className="w-5 h-5 text-stone-taupe/70" />
          </div>
          <span className="font-semibold text-[26px] text-stone-taupe leading-none">
            {isMetricsLoading ? '—' : metrics?.closed ?? 0}
          </span>
        </div>
      </div>

      {/* 3. Filters & Search Bar */}
      <div className="bg-ivory border border-stone-taupe/25 rounded-[20px] p-4 sm:p-5 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Status Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2">
          {STATUS_FILTERS.map((tab) => {
            const isActive = activeStatus === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  setActiveStatus(tab.id);
                  setPage(1);
                }}
                className={cn(
                  'font-montserrat text-xs font-semibold px-4 py-2 rounded-pill transition-colors cursor-pointer border',
                  isActive
                    ? 'bg-soft-charcoal text-ivory border-soft-charcoal shadow-sm'
                    : 'bg-ivory text-soft-charcoal/80 border-stone-taupe/30 hover:border-stone-taupe'
                )}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-stone-taupe absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setPage(1);
            }}
            placeholder="Search name, email, phone..."
            className="w-full pl-10 pr-4 py-2 rounded-pill bg-sand-beige/20 border border-stone-taupe/30 text-xs font-montserrat text-soft-charcoal placeholder:text-stone-taupe focus:outline-none focus:border-stone-taupe"
          />
        </div>
      </div>

      {/* 4. Lead Data Table */}
      <div className="bg-ivory border border-stone-taupe/25 rounded-[20px] shadow-sm overflow-hidden">
        {isLeadsLoading ? (
          <div className="p-12 text-center">
            <div className="w-8 h-8 rounded-full border-2 border-stone-taupe/30 border-t-gold animate-spin mx-auto mb-3" />
            <span className="text-xs text-stone-taupe uppercase tracking-wider font-semibold">
              Loading client inquiries...
            </span>
          </div>
        ) : leads.length === 0 ? (
          <div className="p-16 text-center">
            <div className="w-12 h-12 rounded-full bg-sand-beige/30 flex items-center justify-center mx-auto mb-3 text-stone-taupe">
              <FolderOpen className="w-6 h-6 text-stone-taupe" />
            </div>
            <h3 className="font-semibold text-title text-soft-charcoal mb-1">
              No inquiries found
            </h3>
            <p className="text-xs text-stone-taupe max-w-sm mx-auto">
              {searchTerm || activeStatus !== 'all'
                ? 'No inquiries match the current search or status filter.'
                : 'No project inquiries have been submitted yet.'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-stone-taupe/20 bg-sand-beige/15 text-[11px] font-semibold text-stone-taupe uppercase tracking-wider">
                  <th className="py-3.5 px-6">Date</th>
                  <th className="py-3.5 px-6">Client Name</th>
                  <th className="py-3.5 px-6">Contact Details</th>
                  <th className="py-3.5 px-6">Project Type</th>
                  <th className="py-3.5 px-6">Location</th>
                  <th className="py-3.5 px-6">Status</th>
                  <th className="py-3.5 px-6 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-taupe/15 text-xs text-soft-charcoal font-medium">
                {leads.map((lead) => (
                  <tr
                    key={lead._id}
                    className="hover:bg-sand-beige/10 transition-colors group"
                  >
                    {/* Date */}
                    <td className="py-4 px-6 text-stone-taupe whitespace-nowrap">
                      {new Date(lead.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                      <span className="block text-[10px] text-stone-taupe/70">
                        {lead.source}
                      </span>
                    </td>

                    {/* Client Name */}
                    <td className="py-4 px-6 font-semibold whitespace-nowrap">
                      {lead.fullName}
                    </td>

                    {/* Contact Details */}
                    <td className="py-4 px-6">
                      <div className="flex flex-col gap-1">
                        <span className="inline-flex items-center gap-1.5 text-soft-charcoal whitespace-nowrap">
                          <Phone className="w-3.5 h-3.5 text-stone-taupe" />
                          {lead.mobileNumber}
                        </span>
                        <span className="inline-flex items-center gap-1.5 text-stone-taupe whitespace-nowrap">
                          <Mail className="w-3.5 h-3.5 text-stone-taupe" />
                          {lead.emailAddress}
                        </span>
                      </div>
                    </td>

                    {/* Project Type */}
                    <td className="py-4 px-6 whitespace-nowrap">
                      <span className="px-2.5 py-1 rounded-pill bg-sand-beige/30 text-[11px] font-semibold text-soft-charcoal">
                        {lead.projectType}
                      </span>
                    </td>

                    {/* Location */}
                    <td className="py-4 px-6 text-stone-taupe whitespace-nowrap">
                      <span className="inline-flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-stone-taupe/70" />
                        {lead.locationOfProject}
                      </span>
                    </td>

                    {/* Status Badge */}
                    <td className="py-4 px-6 whitespace-nowrap">
                      <LeadStatusBadge status={lead.status as LeadStatus} />
                    </td>

                    {/* Action */}
                    <td className="py-4 px-6 text-right whitespace-nowrap">
                      <Link
                        to={`/admin/leads/${lead._id}`}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold px-3.5 py-1.5 rounded-pill bg-soft-charcoal text-ivory hover:bg-soft-charcoal/90 transition-colors shadow-sm"
                      >
                        <span>Review Scope</span>
                        <ArrowRight className="w-3.5 h-3.5 text-gold" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* 5. Pagination Footer */}
        {pagination.totalPages > 1 && (
          <div className="p-4 px-6 border-t border-stone-taupe/20 bg-sand-beige/10 flex items-center justify-between text-xs text-stone-taupe">
            <span>
              Showing Page {pagination.page} of {pagination.totalPages} ({pagination.total} total inquiries)
            </span>

            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={pagination.page <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="px-3 py-1.5 rounded-pill border border-stone-taupe/30 hover:border-stone-taupe disabled:opacity-40 disabled:cursor-not-allowed bg-ivory text-soft-charcoal transition-colors cursor-pointer"
              >
                Previous
              </button>
              <button
                type="button"
                disabled={pagination.page >= pagination.totalPages}
                onClick={() => setPage((p) => Math.min(pagination.totalPages, p + 1))}
                className="px-3 py-1.5 rounded-pill border border-stone-taupe/30 hover:border-stone-taupe disabled:opacity-40 disabled:cursor-not-allowed bg-ivory text-soft-charcoal transition-colors cursor-pointer"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

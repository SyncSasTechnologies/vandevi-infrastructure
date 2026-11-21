import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAdminLead, useUpdateLeadStatus, LeadStatusBadge, type LeadStatus } from '../../features/leads';
import {
  ArrowLeft,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Save,
  CheckCircle2,
  Clock,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { Button } from '../../shared/components/Button';
import { cn } from '../../shared/utils/cn';

const ALL_STATUSES: LeadStatus[] = ['New', 'Contacted', 'In Progress', 'Converted', 'Closed'];

export const AdminLeadDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: lead, isLoading, isError } = useAdminLead(id);
  const updateMutation = useUpdateLeadStatus();

  const [selectedStatus, setSelectedStatus] = useState<LeadStatus>('New');
  const [adminNotes, setAdminNotes] = useState<string>('');
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);

  useEffect(() => {
    if (lead) {
      setSelectedStatus(lead.status);
      setAdminNotes(lead.adminNotes || '');
    }
  }, [lead]);

  const handleSaveStatusAndNotes = async () => {
    if (!id) return;
    try {
      await updateMutation.mutateAsync({
        id,
        status: selectedStatus,
        adminNotes
      });
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      console.error('Failed to update lead:', err);
    }
  };

  if (isLoading) {
    return (
      <div className="py-20 text-center">
        <div className="w-10 h-10 rounded-full border-2 border-stone-taupe/30 border-t-gold animate-spin mx-auto mb-4" />
        <span className="text-xs text-stone-taupe uppercase tracking-wider font-semibold">
          Loading inquiry details...
        </span>
      </div>
    );
  }

  if (isError || !lead) {
    return (
      <div className="bg-ivory border border-stone-taupe/30 rounded-panel p-12 text-center max-w-lg mx-auto">
        <AlertCircle className="w-10 h-10 text-red-500 mx-auto mb-4" />
        <h2 className="font-semibold text-heading text-soft-charcoal mb-2">
          Inquiry Not Found
        </h2>
        <p className="text-stone-taupe text-body-sm mb-6">
          The requested lead inquiry could not be retrieved or has been removed.
        </p>
        <Link to="/admin">
          <Button variant="primary" size="sm">
            Back to Dashboard
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8 font-montserrat">
      {/* 1. Back Navigation & Header */}
      <div>
        <button
          type="button"
          onClick={() => navigate('/admin')}
          className="inline-flex items-center gap-2 text-xs font-semibold text-stone-taupe hover:text-soft-charcoal mb-4 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Inquiries</span>
        </button>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-6 border-b border-stone-taupe/20">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="font-semibold text-[26px] sm:text-[32px] text-soft-charcoal tracking-tight">
                {lead.fullName}
              </h1>
              <LeadStatusBadge status={lead.status} />
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs text-stone-taupe">
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                Received on{' '}
                {new Date(lead.createdAt).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </span>
              <span>•</span>
              <span className="px-2 py-0.5 rounded-pill bg-sand-beige/30 text-soft-charcoal font-semibold text-[11px]">
                Source: {lead.source}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Detail Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column (8 cols): Client Info & Project Scope */}
        <div className="lg:col-span-8 space-y-6">
          {/* Client Contact Info */}
          <div className="bg-ivory border border-stone-taupe/25 rounded-[22px] p-6 sm:p-8 shadow-sm">
            <h3 className="font-semibold text-title text-soft-charcoal mb-5 pb-3 border-b border-stone-taupe/15">
              Client Contact Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs">
              <div>
                <span className="text-[11px] font-semibold text-stone-taupe uppercase tracking-wider block mb-1">
                  Mobile Number
                </span>
                <a
                  href={`tel:${lead.mobileNumber}`}
                  className="font-semibold text-soft-charcoal hover:text-gold transition-colors inline-flex items-center gap-1.5 text-body-sm"
                >
                  <Phone className="w-4 h-4 text-stone-taupe" />
                  {lead.mobileNumber}
                </a>
              </div>

              <div>
                <span className="text-[11px] font-semibold text-stone-taupe uppercase tracking-wider block mb-1">
                  Email Address
                </span>
                <a
                  href={`mailto:${lead.emailAddress}`}
                  className="font-semibold text-soft-charcoal hover:text-gold transition-colors inline-flex items-center gap-1.5 text-body-sm truncate max-w-full"
                >
                  <Mail className="w-4 h-4 text-stone-taupe" />
                  {lead.emailAddress}
                </a>
              </div>

              <div>
                <span className="text-[11px] font-semibold text-stone-taupe uppercase tracking-wider block mb-1">
                  Project Location
                </span>
                <span className="font-semibold text-soft-charcoal inline-flex items-center gap-1.5 text-body-sm">
                  <MapPin className="w-4 h-4 text-stone-taupe" />
                  {lead.locationOfProject}
                </span>
              </div>
            </div>
          </div>

          {/* Project Scope & Requirements */}
          <div className="bg-ivory border border-stone-taupe/25 rounded-[22px] p-6 sm:p-8 shadow-sm">
            <h3 className="font-semibold text-title text-soft-charcoal mb-5 pb-3 border-b border-stone-taupe/15">
              Project Scope & Requirements
            </h3>

            <div className="space-y-6">
              {/* Project Type */}
              <div>
                <span className="text-[11px] font-semibold text-stone-taupe uppercase tracking-wider block mb-2">
                  Discipline Category
                </span>
                <span className="px-3.5 py-1.5 rounded-pill bg-sand-beige/40 text-soft-charcoal text-xs font-semibold border border-stone-taupe/30">
                  {lead.projectType} Interior
                </span>
              </div>

              {/* Services Required Tags */}
              <div>
                <span className="text-[11px] font-semibold text-stone-taupe uppercase tracking-wider block mb-2.5">
                  Services Requested
                </span>
                <div className="flex flex-wrap gap-2">
                  {lead.servicesRequired && lead.servicesRequired.length > 0 ? (
                    lead.servicesRequired.map((srv, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 rounded-pill bg-sand-beige/25 border border-stone-taupe/25 text-xs text-soft-charcoal font-medium"
                      >
                        {srv}
                      </span>
                    ))
                  ) : (
                    <span className="text-xs text-stone-taupe italic">
                      General consultation requested
                    </span>
                  )}
                </div>
              </div>

              {/* Detailed Project Description */}
              <div>
                <span className="text-[11px] font-semibold text-stone-taupe uppercase tracking-wider block mb-2.5">
                  Project Description
                </span>
                <div className="bg-sand-beige/15 border border-stone-taupe/20 rounded-[16px] p-5">
                  <p className="text-body text-soft-charcoal leading-relaxed whitespace-pre-wrap">
                    {lead.projectDescription}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (4 cols): Status Transition & Internal Notes */}
        <div className="lg:col-span-4 space-y-6">
          {/* Status Progression Card */}
          <div className="bg-ivory border border-stone-taupe/25 rounded-[22px] p-6 shadow-sm">
            <h3 className="font-semibold text-[17px] text-soft-charcoal mb-4 pb-3 border-b border-stone-taupe/15 flex items-center justify-between">
              <span>Qualification Status</span>
              <Clock className="w-4 h-4 text-stone-taupe" />
            </h3>

            <div className="space-y-3 mb-6">
              {ALL_STATUSES.map((status) => {
                const isSelected = selectedStatus === status;
                return (
                  <button
                    key={status}
                    type="button"
                    onClick={() => setSelectedStatus(status)}
                    className={cn(
                      'w-full flex items-center justify-between px-4 py-2.5 rounded-pill text-xs font-semibold transition-all border cursor-pointer',
                      isSelected
                        ? 'bg-soft-charcoal text-ivory border-soft-charcoal shadow-sm'
                        : 'bg-ivory text-soft-charcoal/80 border-stone-taupe/30 hover:border-stone-taupe'
                    )}
                  >
                    <span>{status}</span>
                    {isSelected && (
                      <span className="w-2 h-2 rounded-full bg-gold" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Internal Admin Notes */}
            <div className="pt-4 border-t border-stone-taupe/15">
              <label className="text-[11px] font-semibold text-stone-taupe uppercase tracking-wider block mb-2">
                Internal Notes & Follow-up Remarks
              </label>
              <textarea
                value={adminNotes}
                onChange={(e) => setAdminNotes(e.target.value)}
                rows={4}
                placeholder="Log call summary, budget estimation, site visit schedule, or proposal remarks..."
                className="w-full p-3 rounded-[12px] bg-sand-beige/20 border border-stone-taupe/30 text-xs font-montserrat text-soft-charcoal placeholder:text-stone-taupe focus:outline-none focus:border-stone-taupe mb-4 resize-none"
              />

              {/* Save Button */}
              <Button
                variant="primary"
                size="md"
                disabled={updateMutation.isPending}
                onClick={handleSaveStatusAndNotes}
                className="w-full"
              >
                <Save className="w-4 h-4 mr-2 text-gold" />
                <span>{updateMutation.isPending ? 'Saving...' : 'Save Updates'}</span>
              </Button>

              {saveSuccess && (
                <div className="mt-3 p-2 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs text-center flex items-center justify-center gap-1.5 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Lead status and notes saved!</span>
                </div>
              )}
            </div>
          </div>

          {/* Submission Telemetry Card */}
          <div className="bg-sand-beige/20 border border-stone-taupe/20 rounded-[20px] p-5 text-xs text-stone-taupe space-y-2">
            <div className="flex items-center gap-2 font-semibold text-soft-charcoal mb-2">
              <ShieldCheck className="w-4 h-4 text-stone-taupe" />
              <span>Inquiry Audit Metadata</span>
            </div>
            <div>
              <span className="font-medium text-stone-taupe/80">Inquiry ID:</span>{' '}
              <span className="font-mono text-[11px] text-soft-charcoal">{lead._id}</span>
            </div>
            {lead.ipAddress && (
              <div>
                <span className="font-medium text-stone-taupe/80">IP Address:</span>{' '}
                <span className="font-mono text-[11px] text-soft-charcoal">{lead.ipAddress}</span>
              </div>
            )}
            {lead.userAgent && (
              <div className="truncate">
                <span className="font-medium text-stone-taupe/80">Client Agent:</span>{' '}
                <span className="text-[11px] text-soft-charcoal/80">{lead.userAgent}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

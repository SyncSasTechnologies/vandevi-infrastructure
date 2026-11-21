import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactFormSchema } from '../schemas/lead.schema';
import type { ContactFormData } from '../schemas/lead.schema';
import { useSubmitLead } from '../hooks/useSubmitLead';
import { Input } from '../../../shared/components/Input';
import { Textarea } from '../../../shared/components/Textarea';
import { Select } from '../../../shared/components/Select';
import { Button } from '../../../shared/components/Button';
import { CheckCircle2, AlertCircle } from 'lucide-react';

const SERVICE_OPTIONS = [
  'Residential Interiors',
  'Commercial Interiors',
  'Furniture & Material Selection',
  'Customize & Renovation'
];

export const ContactForm: React.FC = () => {
  const { submit, isLoading, isSuccess, isError, errorMessage, submittedName, reset } = useSubmitLead();

  const {
    register,
    handleSubmit,
    control,
    reset: resetForm,
    formState: { errors }
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      fullName: '',
      mobileNumber: '',
      emailAddress: '',
      projectType: 'Residential',
      locationOfProject: '',
      servicesRequired: [],
      projectDescription: '',
      source: 'Contact Page',
      website_url: ''
    }
  });

  const onSubmit = async (data: ContactFormData) => {
    const success = await submit(data);
    if (success) {
      resetForm();
    }
  };

  const handleStartNew = () => {
    reset();
    resetForm();
  };

  if (isSuccess) {
    return (
      <div className="bg-ivory border border-stone-taupe/30 rounded-panel p-8 sm:p-12 text-center flex flex-col items-center max-w-xl mx-auto shadow-sm">
        <div className="w-16 h-16 rounded-full bg-gold/15 flex items-center justify-center mb-6">
          <CheckCircle2 className="w-9 h-9 text-gold" aria-hidden="true" />
        </div>
        <span className="font-montserrat font-semibold text-micro uppercase tracking-widest text-gold mb-2">
          Enquiry Received
        </span>
        <h3 className="font-montserrat font-semibold text-heading sm:text-page-title text-soft-charcoal mb-4">
          Thank You{submittedName ? `, ${submittedName}` : ''}
        </h3>
        <p className="font-montserrat text-body text-stone-taupe leading-relaxed mb-8 max-w-md">
          Your project requirements have been successfully registered with our design studio. Our principal design team will review your details and reach out within 24 business hours.
        </p>
        <Button variant="secondary" size="md" onClick={handleStartNew}>
          Submit Another Enquiry
        </Button>
      </div>
    );
  }

  return (
    <div id="enquiry-form" className="bg-ivory border border-stone-taupe/25 rounded-[24px] p-6 sm:p-10 md:p-12 shadow-xs">
      <div className="mb-8">
        <h3 className="font-montserrat font-semibold text-heading-sm sm:text-subheading text-soft-charcoal tracking-tight mb-2">
          Project Enquiry Form
        </h3>
        <p className="font-montserrat text-body-sm text-stone-taupe leading-relaxed">
          Please provide your space and contact details. Our design team will review your requirements and coordinate an initial consultation.
        </p>
      </div>

      {/* Recoverable Server Error Banner */}
      {isError && errorMessage && (
        <div
          role="alert"
          aria-live="polite"
          className="mb-8 p-4 bg-red-50 border border-red-200 rounded-control flex items-start gap-3 text-red-800 text-body-sm font-montserrat"
        >
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <span className="font-semibold block mb-0.5">Submission Error</span>
            <span>{errorMessage}</span>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6" noValidate>
        {/* Off-screen Honeypot Anti-Spam Field */}
        <div
          aria-hidden="true"
          className="opacity-0 pointer-events-none absolute -left-[9999px] -top-[9999px] h-0 w-0 overflow-hidden"
          tabIndex={-1}
        >
          <label htmlFor="website_url">Do not fill this field</label>
          <input
            id="website_url"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            {...register('website_url')}
          />
        </div>

        {/* Row 1: Full Name & Mobile Number */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Input
            label="Full Name"
            placeholder="e.g. Rahul Sharma"
            required
            autoComplete="name"
            error={errors.fullName?.message}
            {...register('fullName')}
          />
          <Input
            label="Mobile Number"
            type="tel"
            placeholder="e.g. +91 xxxxxxxxxx"
            required
            autoComplete="tel"
            error={errors.mobileNumber?.message}
            {...register('mobileNumber')}
          />
        </div>

        {/* Row 2: Email Address & Project Type */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Input
            label="Email Address"
            type="email"
            placeholder="e.g. example@gmail.com"
            required
            autoComplete="email"
            error={errors.emailAddress?.message}
            {...register('emailAddress')}
          />
          <Select
            label="Project Type"
            required
            error={errors.projectType?.message}
            {...register('projectType')}
            options={[
              { value: 'Residential', label: 'Residential Project' },
              { value: 'Commercial', label: 'Commercial Project' }
            ]}
          />
        </div>

        {/* Row 3: Location of Project */}
        <Input
          label="Location of Project"
          placeholder="City or Area (e.g. South Delhi, Gurgaon, Mumbai)"
          required
          error={errors.locationOfProject?.message}
          {...register('locationOfProject')}
        />

        {/* Row 4: Services Required (Multi-Select Checklist) */}
        <div className="flex flex-col gap-2">
          <label className="font-montserrat font-medium text-[13px] text-soft-charcoal flex items-center justify-between">
            <span>
              Services Required <span className="text-gold">*</span>
            </span>
            <span className="text-micro text-stone-taupe font-normal">Select all that apply</span>
          </label>
          <Controller
            control={control}
            name="servicesRequired"
            render={({ field }) => (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                {SERVICE_OPTIONS.map((service) => {
                  const isChecked = field.value?.includes(service);
                  return (
                    <label
                      key={service}
                      className={`flex items-center gap-3 p-3.5 rounded-control border transition-colors text-body-sm font-montserrat text-soft-charcoal select-none cursor-pointer ${
                        isChecked
                          ? 'border-soft-charcoal bg-sand-beige/30'
                          : 'border-stone-taupe/30 bg-ivory/60 hover:border-stone-taupe'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => {
                          if (isChecked) {
                            field.onChange(field.value.filter((s: string) => s !== service));
                          } else {
                            field.onChange([...(field.value || []), service]);
                          }
                        }}
                        className="w-4 h-4 rounded text-soft-charcoal accent-gold cursor-pointer"
                      />
                      <span className="font-medium text-[13px]">{service}</span>
                    </label>
                  );
                })}
              </div>
            )}
          />
          {errors.servicesRequired && (
            <span className="font-montserrat text-micro text-red-600 font-medium">
              {errors.servicesRequired.message}
            </span>
          )}
        </div>

        {/* Row 5: Project Description */}
        <Textarea
          label="Project Description"
          placeholder="Tell us about your space, key requirements, preferred design character, and estimated timelines..."
          required
          error={errors.projectDescription?.message}
          {...register('projectDescription')}
        />

        {/* Form Action */}
        <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            withArrow
            isLoading={isLoading}
            disabled={isLoading}
          >
            {isLoading ? 'Submitting Enquiry...' : 'Submit Enquiry'}
          </Button>

          <span className="font-montserrat text-micro text-stone-taupe">
            By submitting, you agree to have our team contact you regarding your spatial inquiry.
          </span>
        </div>
      </form>
    </div>
  );
};

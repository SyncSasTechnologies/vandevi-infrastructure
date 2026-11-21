import { z } from 'zod';

const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]{6,15}$/;

// Full 7-field schema for Contact page lead capture
export const contactFormSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, 'Please enter your full name (minimum 2 characters)')
    .max(100, 'Full name cannot exceed 100 characters'),
  mobileNumber: z
    .string()
    .trim()
    .regex(phoneRegex, 'Please enter a valid mobile number (e.g. +91 98765 43210)')
    .max(20, 'Mobile number cannot exceed 20 characters'),
  emailAddress: z
    .string()
    .trim()
    .toLowerCase()
    .email('Please enter a valid email address'),
  projectType: z.enum(['Residential', 'Commercial']),
  locationOfProject: z
    .string()
    .trim()
    .min(2, 'Please enter the project location/city')
    .max(150, 'Location cannot exceed 150 characters'),
  servicesRequired: z
    .array(z.string())
    .min(1, 'Please select at least one required service'),
  projectDescription: z
    .string()
    .trim()
    .min(10, 'Please provide a brief project description (minimum 10 characters)')
    .max(3000, 'Project description cannot exceed 3000 characters'),
  source: z.literal('Contact Page'),
  // Honeypot anti-spam field (must remain empty)
  website_url: z.string().max(0).optional()
});

export type ContactFormData = z.infer<typeof contactFormSchema>;


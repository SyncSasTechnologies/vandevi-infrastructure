import nodemailer from 'nodemailer';
import { env } from '../../config/env.config.js';

let transporter: ReturnType<typeof nodemailer.createTransport> | null = null;

// Initialize Nodemailer if real SMTP credentials are present
if (
  env.SMTP_HOST &&
  env.SMTP_USER &&
  env.SMTP_PASS &&
  !env.SMTP_PASS.includes('your-app-specific-password')
) {
  transporter = nodemailer.createTransport({
    host: env.SMTP_HOST,
    port: env.SMTP_PORT,
    secure: env.SMTP_PORT === 465,
    auth: {
      user: env.SMTP_USER,
      pass: env.SMTP_PASS
    }
  });
}

export interface LeadEmailPayload {
  fullName: string;
  mobileNumber: string;
  emailAddress: string;
  projectType: string;
  locationOfProject: string;
  servicesRequired: string[];
  projectDescription: string;
  source: string;
  createdAt: Date;
}

// Enterprise Security: Escape HTML characters to prevent XSS / HTML Injection in email clients
function escapeHtml(input: unknown): string {
  if (input === null || input === undefined) return '';
  return String(input)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export async function sendLeadNotificationEmail(lead: LeadEmailPayload): Promise<void> {
  const safeName = escapeHtml(lead.fullName);
  const safePhone = escapeHtml(lead.mobileNumber);
  const safeEmail = escapeHtml(lead.emailAddress);
  const safeType = escapeHtml(lead.projectType);
  const safeLocation = escapeHtml(lead.locationOfProject);
  const safeServices = lead.servicesRequired && lead.servicesRequired.length > 0
    ? lead.servicesRequired.map(escapeHtml).join(', ')
    : 'Not specified';
  const safeDescription = escapeHtml(lead.projectDescription);
  const safeSource = escapeHtml(lead.source);

  const emailHtml = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #A8937A; border-radius: 12px; background-color: #F8F6F1;">
      <div style="border-bottom: 2px solid #D4AF37; padding-bottom: 12px; margin-bottom: 20px;">
        <span style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.2em; color: #D4AF37; font-weight: 600; display: block; margin-bottom: 4px;">
          New Client Enquiry
        </span>
        <h2 style="color: #2E2E2A; margin: 0; font-size: 22px; font-weight: 600;">
          Vandevi Infrastructure
        </h2>
      </div>

      <p style="color: #2E2E2A; font-size: 14px; line-height: 1.5;">
        A new prospective client enquiry has been submitted via <strong>${safeSource}</strong>.
      </p>

      <table style="width: 100%; border-collapse: collapse; margin-top: 16px; font-size: 14px;">
        <tr>
          <td style="padding: 10px 8px; font-weight: 600; color: #2E2E2A; border-bottom: 1px solid #DCC8B1; width: 35%;">Client Name:</td>
          <td style="padding: 10px 8px; color: #2E2E2A; border-bottom: 1px solid #DCC8B1;">${safeName}</td>
        </tr>
        <tr>
          <td style="padding: 10px 8px; font-weight: 600; color: #2E2E2A; border-bottom: 1px solid #DCC8B1;">Mobile Number:</td>
          <td style="padding: 10px 8px; color: #2E2E2A; border-bottom: 1px solid #DCC8B1;"><a href="tel:${encodeURIComponent(lead.mobileNumber)}" style="color: #2E2E2A; text-decoration: underline;">${safePhone}</a></td>
        </tr>
        <tr>
          <td style="padding: 10px 8px; font-weight: 600; color: #2E2E2A; border-bottom: 1px solid #DCC8B1;">Email Address:</td>
          <td style="padding: 10px 8px; color: #2E2E2A; border-bottom: 1px solid #DCC8B1;"><a href="mailto:${encodeURIComponent(lead.emailAddress)}" style="color: #2E2E2A; text-decoration: underline;">${safeEmail}</a></td>
        </tr>
        <tr>
          <td style="padding: 10px 8px; font-weight: 600; color: #2E2E2A; border-bottom: 1px solid #DCC8B1;">Project Type:</td>
          <td style="padding: 10px 8px; color: #2E2E2A; border-bottom: 1px solid #DCC8B1;">${safeType}</td>
        </tr>
        <tr>
          <td style="padding: 10px 8px; font-weight: 600; color: #2E2E2A; border-bottom: 1px solid #DCC8B1;">Location of Project:</td>
          <td style="padding: 10px 8px; color: #2E2E2A; border-bottom: 1px solid #DCC8B1;">${safeLocation}</td>
        </tr>
        <tr>
          <td style="padding: 10px 8px; font-weight: 600; color: #2E2E2A; border-bottom: 1px solid #DCC8B1;">Services Required:</td>
          <td style="padding: 10px 8px; color: #2E2E2A; border-bottom: 1px solid #DCC8B1;">${safeServices}</td>
        </tr>
      </table>

      <div style="margin-top: 20px; padding: 14px; background-color: #ffffff; border-radius: 8px; border: 1px solid #DCC8B1;">
        <strong style="color: #2E2E2A; font-size: 13px; text-transform: uppercase; letter-spacing: 0.1em; display: block; margin-bottom: 6px;">
          Project Description:
        </strong>
        <p style="color: #2E2E2A; white-space: pre-line; margin: 0; font-size: 14px; line-height: 1.6;">${safeDescription}</p>
      </div>

      <div style="margin-top: 24px; padding-top: 12px; border-top: 1px solid #DCC8B1; font-size: 11px; color: #A8937A; text-align: center;">
        Vandevi Infrastructure · Lead Generation & Management Engine · ${new Date().toLocaleDateString('en-US', { dateStyle: 'medium' })}
      </div>
    </div>
  `;

  if (!transporter) {
    console.log('📧 [DEV EMAIL SIMULATOR] Real SMTP not configured yet. Lead alert simulated:');
    console.log(`   To: ${env.ADMIN_ALERT_EMAIL}`);
    console.log(`   Client: ${lead.fullName} (${lead.mobileNumber}, ${lead.emailAddress})`);
    console.log(`   Type: ${lead.projectType} at ${lead.locationOfProject}`);
    console.log(`   Services: ${lead.servicesRequired.join(', ')}`);
    return;
  }

  try {
    await transporter.sendMail({
      from: `"Vandevi Infrastructure Inquiries" <${env.SMTP_USER}>`,
      to: env.ADMIN_ALERT_EMAIL,
      replyTo: lead.emailAddress,
      subject: `[New Lead] ${lead.projectType} Project - ${lead.fullName} (${lead.locationOfProject})`,
      html: emailHtml
    });
    console.log(`✉️ Email notification sent to ${env.ADMIN_ALERT_EMAIL}`);
  } catch (error) {
    console.error('⚠️ Failed to dispatch lead notification email:', error);
  }
}

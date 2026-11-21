import rateLimit from 'express-rate-limit';
import { Request, Response } from 'express';

export const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 150, // 150 requests per 15 minutes per IP
  standardHeaders: true,
  legacyHeaders: false,
  handler: (_req: Request, res: Response, _next, options) => {
    res.status(options.statusCode).json({
      success: false,
      message: 'Too many requests from this IP address, please try again after 15 minutes.',
      errors: [
        {
          field: 'rateLimit',
          message: 'Rate limit exceeded for general API endpoints.'
        }
      ]
    });
  }
});

export const leadSubmitLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // maximum 5 submissions per 15 minutes per IP to eliminate spam flooding
  standardHeaders: true,
  legacyHeaders: false,
  handler: (_req: Request, res: Response, _next, options) => {
    res.status(options.statusCode).json({
      success: false,
      message:
        'Too many project enquiries submitted from this network. Please wait 15 minutes before submitting again, or connect with us directly.',
      errors: [
        {
          field: 'rateLimit',
          message: 'Lead submission limit reached (max 5 per 15 minutes per IP).'
        }
      ]
    });
  }
});

export const adminLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 100 admin API requests per 15 minutes per IP
  standardHeaders: true,
  legacyHeaders: false,
  handler: (_req: Request, res: Response, _next, options) => {
    res.status(options.statusCode).json({
      success: false,
      message: 'Admin rate limit exceeded. Please wait 15 minutes before trying again.',
      errors: [
        {
          field: 'rateLimit',
          message: 'Admin rate limit reached.'
        }
      ]
    });
  }
});

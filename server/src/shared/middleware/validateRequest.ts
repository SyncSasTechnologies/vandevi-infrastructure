import { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError } from 'zod';
import { ApiResponse } from '../utils/apiResponse.js';

export function validateRequest(schema: ZodSchema) {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      // 1. Honeypot anti-spam check: if website_url is filled by a bot, silently intercept
      if (req.body.website_url && String(req.body.website_url).trim().length > 0) {
        console.warn(`🤖 Automated bot submission intercepted via honeypot from IP: ${req.ip}`);
        // Return 200/OK so bots believe they succeeded, but do not touch DB or email
        res.status(200).json({
          success: true,
          message: 'Enquiry received successfully'
        });
        return;
      }

      // 2. Validate and parse payload through Zod schema
      const parsed = (await schema.parseAsync(req.body)) as Record<string, any>;

      // Clean up honeypot artifact before forwarding to controller
      if (parsed && 'website_url' in parsed) {
        delete parsed.website_url;
      }

      req.body = parsed;
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const issues = (error as any).issues || (error as any).errors || [];
        const formattedErrors = issues.map((err: any) => ({
          field: Array.isArray(err.path) ? err.path.join('.') : 'field',
          message: err.message
        }));

        ApiResponse.error(
          res,
          'Validation failed. Please review your input fields.',
          400,
          formattedErrors
        );
        return;
      }

      ApiResponse.error(res, 'Internal validation error occurred', 500);
    }
  };
}

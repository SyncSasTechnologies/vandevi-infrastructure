import { Request, Response, NextFunction } from 'express';
import { ApiResponse } from '../utils/apiResponse.js';
import { env } from '../../config/env.config.js';

export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  console.error('Unhandled Application Error:', err);

  const statusCode = (err as any).statusCode || 500;
  const message = err.message || 'An unexpected server error occurred';

  ApiResponse.error(
    res,
    message,
    statusCode,
    env.NODE_ENV === 'development' ? { stack: err.stack } : undefined
  );
}


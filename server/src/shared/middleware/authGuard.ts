import { Request, Response, NextFunction } from 'express';
import { getFirebaseAdminAuth } from '../utils/firebaseAdmin.js';
import { adminRepository } from '../../modules/admin/admin.repository.js';
import { ApiResponse } from '../utils/apiResponse.js';

// Extend Express Request interface to hold authenticated user context
declare global {
  namespace Express {
    interface Request {
      user?: {
        uid: string;
        email?: string;
        role?: string;
      };
    }
  }
}

/**
 * Production-ready authentication guard middleware.
 * Strictly verifies JWT tokens via Firebase Admin SDK and validates active admin record in MongoDB.
 * Zero mock tokens or insecure bypasses in production code.
 */
export async function authGuard(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    ApiResponse.error(res, 'Authentication required. Authorization header missing or malformed.', 401);
    return;
  }

  const token = authHeader.split('Bearer ')[1]?.trim();

  if (!token) {
    ApiResponse.error(res, 'Authentication required. Bearer token is empty.', 401);
    return;
  }

  try {
    const auth = getFirebaseAdminAuth();
    const decodedToken = await auth.verifyIdToken(token);

    if (!decodedToken.uid) {
      ApiResponse.error(res, 'Unauthorized: Invalid token payload.', 401);
      return;
    }

    const email = decodedToken.email?.toLowerCase();

    // 1. Check if admin exists in database by Firebase UID
    let admin = await adminRepository.findByUid(decodedToken.uid);

    // 2. If not found by UID, check if registered by email (e.g. pre-provisioned)
    if (!admin && email) {
      admin = await adminRepository.findByEmail(email);
    }

    // 3. If no valid admin record found in database, deny access
    if (!admin) {
      ApiResponse.error(res, 'Access forbidden. Administrator privileges required.', 403);
      return;
    }

    // 5. Ensure admin account is active
    if (!admin.isActive) {
      ApiResponse.error(res, 'Access forbidden. Administrator account has been deactivated.', 403);
      return;
    }

    // Attach verified user context to request
    req.user = {
      uid: admin.uid,
      email: admin.email,
      role: admin.role
    };

    next();
  } catch (err: any) {
    const errorMessage = err?.message || 'Token verification failed';
    if (err?.code === 'auth/id-token-expired') {
      ApiResponse.error(res, 'Session expired. Please log in again.', 401);
      return;
    }
    console.warn('Authentication failure in authGuard:', errorMessage);
    ApiResponse.error(res, 'Unauthorized: Invalid or expired session token.', 401);
  }
}

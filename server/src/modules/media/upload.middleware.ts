import multer, { FileFilterCallback } from 'multer';
import { Request, Response, NextFunction } from 'express';
import { ApiResponse } from '../../shared/utils/apiResponse.js';

// Restrict uploads to memory storage to prevent unvalidated files from hitting disk
const storage = multer.memoryStorage();

// Allowed image MIME types for architectural photography
const ALLOWED_MIME_TYPES = new Set([
  'image/jpeg',
  'image/png',
  'image/webp'
]);

// 10 Megabyte payload cap per image
const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024;

const fileFilter = (
  _req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
): void => {
  if (ALLOWED_MIME_TYPES.has(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error(
        `Invalid file type (${file.mimetype}). Only JPEG, PNG, and WebP images are allowed.`
      )
    );
  }
};

const upload = multer({
  storage,
  limits: {
    fileSize: MAX_FILE_SIZE_BYTES,
    files: 1
  },
  fileFilter
});

/**
 * Express middleware wrapper around Multer single file upload.
 * Catches Multer errors (e.g. file size exceeded) and returns clean 400 responses.
 */
export function uploadProjectImage(req: Request, res: Response, next: NextFunction): void {
  const singleUpload = upload.single('image');

  singleUpload(req, res, (err: unknown) => {
    if (!err) {
      return next();
    }

    if (err instanceof multer.MulterError) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        ApiResponse.error(
          res,
          `File size exceeds maximum allowed limit of ${MAX_FILE_SIZE_BYTES / (1024 * 1024)}MB.`,
          400
        );
        return;
      }
      ApiResponse.error(res, `Upload error: ${err.message}`, 400);
      return;
    }

    if (err instanceof Error) {
      ApiResponse.error(res, err.message, 400);
      return;
    }

    ApiResponse.error(res, 'An unknown upload error occurred.', 500);
  });
}


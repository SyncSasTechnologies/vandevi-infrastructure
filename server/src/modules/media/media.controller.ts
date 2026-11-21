import { Request, Response, NextFunction } from 'express';
import { MediaService } from './media.service.js';
import { ApiResponse } from '../../shared/utils/apiResponse.js';

export class MediaController {
  static async uploadImage(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.file) {
        ApiResponse.error(res, 'No image file provided in form field "image".', 400);
        return;
      }

      const processed = await MediaService.processProjectImage(req.file.buffer);

      ApiResponse.created(
        res,
        processed,
        'Project image processed and saved as optimized WebP successfully.'
      );
    } catch (error) {
      next(error);
    }
  }
}


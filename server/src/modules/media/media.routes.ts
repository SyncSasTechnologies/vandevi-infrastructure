import { Router } from 'express';
import { MediaController } from './media.controller.js';
import { uploadProjectImage } from './upload.middleware.js';
import { authGuard } from '../../shared/middleware/authGuard.js';

const router = Router();

// Endpoint for processing and uploading project media (Strictly protected by Firebase authGuard)
router.post('/upload', authGuard, uploadProjectImage, MediaController.uploadImage);

export const mediaRoutes = router;

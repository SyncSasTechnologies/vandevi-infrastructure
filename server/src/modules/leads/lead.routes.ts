import { Router } from 'express';
import { leadController } from './lead.controller.js';
import { leadSubmitLimiter } from '../../shared/middleware/rateLimiter.js';
import { validateRequest } from '../../shared/middleware/validateRequest.js';
import { submitLeadSchema } from './lead.schema.js';

const router = Router();

// Public Lead Capture Route (Protected by Rate Limiter & Zod Schema Validation)
router.post(
  '/submit',
  leadSubmitLimiter,
  validateRequest(submitLeadSchema),
  leadController.submitLead.bind(leadController)
);

export const leadRoutes = router;

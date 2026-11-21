import express, { Express } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import mongoSanitize from 'express-mongo-sanitize';
import path from 'path';
import { fileURLToPath } from 'url';
import { env } from './config/env.config.js';
import { generalLimiter } from './shared/middleware/rateLimiter.js';
import { errorHandler } from './shared/middleware/errorHandler.js';
import { leadRoutes } from './modules/leads/lead.routes.js';
import { projectRoutes } from './modules/projects/project.routes.js';
import { mediaRoutes } from './modules/media/media.routes.js';
import { adminRoutes } from './modules/admin/admin.routes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function createApp(): Express {
  const app = express();

  // 1. Trust Reverse Proxy (For accurate rate-limiting when deployed behind Nginx / ALB)
  app.set('trust proxy', 1);

  // 2. Security Headers
  app.use(helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' }
  }));

  // 3. CORS Configuration (Multi-domain production support with strict dev separation)
  const configuredOrigins = (env.CLIENT_URL || '')
    .split(',')
    .map((url) => url.trim().replace(/\/$/, ''))
    .filter(Boolean);

  const allowedOrigins =
    env.NODE_ENV === 'production'
      ? configuredOrigins
      : Array.from(
          new Set([
            ...configuredOrigins,
            'http://localhost:5173',
            'http://127.0.0.1:5173'
          ])
        );

  app.use(
    cors({
      origin: (origin, callback) => {
        // Allow requests with no origin (e.g. mobile apps, curl, server-to-server) or matched origins
        if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true);
        } else {
          callback(null, false);
        }
      },
      credentials: true,
      methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization']
    })
  );

  // 4. Performance: Compression (Gzip / Deflate)
  app.use(compression());

  // 5. Body Parsing with Safe Payload Size Limits
  app.use(express.json({ limit: '1mb' }));
  app.use(express.urlencoded({ extended: true, limit: '1mb' }));

  // 6. NoSQL Injection Prevention: Strip dangerous $ and . from keys (Express 5 compatible in-place sanitization)
  app.use((req, _res, next) => {
    if (req.body) {
      mongoSanitize.sanitize(req.body);
    }
    if (req.params) {
      mongoSanitize.sanitize(req.params);
    }
    if (req.query) {
      mongoSanitize.sanitize(req.query);
    }
    next();
  });

  // 7. General API Rate Limiting
  app.use('/api', generalLimiter);

  // 8. Static File Delivery for Uploads (Immutable Cache Headers for performance)
  const uploadsDir = path.resolve(__dirname, '../uploads');
  app.use(
    '/uploads',
    express.static(uploadsDir, {
      maxAge: '1y',
      immutable: true,
      etag: true,
      dotfiles: 'ignore'
    })
  );

  // 9. Health Check Endpoint
  app.get('/api/health', (_req, res) => {
    res.json({
      status: 'healthy',
      service: 'Vandevi Infrastructure API',
      timestamp: new Date().toISOString()
    });
  });

  // 10. Modular Vertical Slice Routes
  app.use('/api/leads', leadRoutes);
  app.use('/api/projects', projectRoutes);
  app.use('/api/media', mediaRoutes);
  app.use('/api/admin', adminRoutes);

  // 11. Centralized Global Error Handler
  app.use(errorHandler);

  return app;
}


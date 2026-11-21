import { createApp } from './app.js';
import { connectDatabase } from './config/db.config.js';
import { env } from './config/env.config.js';

async function bootstrap() {
  // Connect to MongoDB
  await connectDatabase();

  const app = createApp();

  const server = app.listen(env.PORT, () => {
    console.log(`🚀 Server listening on port ${env.PORT} in ${env.NODE_ENV} mode`);
    console.log(`🔗 API Base: http://localhost:${env.PORT}/api`);
    console.log(`📁 Static Assets: http://localhost:${env.PORT}/uploads`);
  });

  // Graceful shutdown handling
  const shutdown = () => {
    console.log('🛑 Gracefully shutting down HTTP server...');
    server.close(() => {
      console.log('✅ HTTP server closed.');
      process.exit(0);
    });
  };

  process.on('SIGTERM', shutdown);
  process.on('SIGINT', shutdown);
}

bootstrap().catch((err) => {
  console.error('Fatal bootstrap error:', err);
  process.exit(1);
});

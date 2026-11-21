import mongoose from 'mongoose';
import { env } from './env.config.js';

export async function connectDatabase(): Promise<void> {
  try {
    const options: mongoose.ConnectOptions = {
      maxPoolSize: 20,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    };

    mongoose.connection.on('connected', () => {
      console.log('📦 Connected to MongoDB database successfully');
    });

    mongoose.connection.on('error', (err) => {
      console.error('❌ MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.warn('⚠️ MongoDB disconnected');
    });

    await mongoose.connect(env.MONGODB_URI, options);
  } catch (error) {
    console.error('❌ Failed to connect to MongoDB on startup:', error);
    // In development, do not crash process so routes/static files can still be developed
    if (env.NODE_ENV === 'production') {
      process.exit(1);
    }
  }
}


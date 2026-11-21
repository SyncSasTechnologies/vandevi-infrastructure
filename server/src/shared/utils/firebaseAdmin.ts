import { initializeApp, cert, getApps, type App } from 'firebase-admin/app';
import { getAuth, type Auth } from 'firebase-admin/auth';
import { env } from '../../config/env.config.js';

// Suppress harmless upstream Google Auth SDK deprecation warning for internal fromJSON usage
const originalEmitWarning = process.emitWarning;
process.emitWarning = (warning: any, ...args: any[]) => {
  const message = typeof warning === 'string' ? warning : warning?.message || '';
  if (message.includes('fromJSON') || message.includes('externally-sourced-credentials')) {
    return;
  }
  return (originalEmitWarning as any).call(process, warning, ...args);
};

let firebaseApp: App | null = null;
let firebaseAuth: Auth | null = null;

export function initFirebaseAdmin(): { app: App | null; auth: Auth | null } {
  if (firebaseAuth && firebaseApp) {
    return { app: firebaseApp, auth: firebaseAuth };
  }

  if (env.FIREBASE_PROJECT_ID && env.FIREBASE_CLIENT_EMAIL && env.FIREBASE_PRIVATE_KEY) {
    try {
      if (getApps().length === 0) {
        firebaseApp = initializeApp({
          credential: cert({
            projectId: env.FIREBASE_PROJECT_ID,
            clientEmail: env.FIREBASE_CLIENT_EMAIL,
            privateKey: env.FIREBASE_PRIVATE_KEY
          })
        });
      } else {
        firebaseApp = getApps()[0];
      }

      firebaseAuth = getAuth(firebaseApp);
      console.log('🔥 Firebase Admin SDK initialized successfully');
      return { app: firebaseApp, auth: firebaseAuth };
    } catch (error) {
      console.error('❌ Failed to initialize Firebase Admin SDK:', error);
      return { app: null, auth: null };
    }
  }

  console.warn('⚠️ Firebase Admin credentials not found in environment');
  return { app: null, auth: null };
}

export function getFirebaseAdminAuth(): Auth {
  const { auth } = initFirebaseAdmin();
  if (!auth) {
    throw new Error('Firebase Admin SDK is not initialized. Please verify FIREBASE_* environment variables.');
  }
  return auth;
}

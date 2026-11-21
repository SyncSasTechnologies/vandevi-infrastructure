import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  signInWithEmailAndPassword,
  signOut as fbSignOut,
  onAuthStateChanged,
  type User as FirebaseUser
} from 'firebase/auth';
import { auth, isFirebaseConfigured } from '../api/firebase';
import { apiClient } from '../../../shared/api/apiClient';
import { authApi, type InitializeAdminInput } from '../api/authApi';

export interface AuthUser {
  uid: string;
  email: string | null;
  fullName: string;
  role: 'superadmin';
  isActive: boolean;
  lastLoginAt?: string | null;
}

interface AuthContextType {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  setupInitialAdmin: (data: InitializeAdminInput) => Promise<void>;
  requestPasswordReset: (email: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const LOCAL_STORAGE_TOKEN_KEY = 'vandevi_admin_token';
const LOCAL_STORAGE_USER_KEY = 'vandevi_admin_user';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(() => {
    try {
      const savedUser = localStorage.getItem(LOCAL_STORAGE_USER_KEY);
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });
  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Sync active bearer token with Axios interceptor
  useEffect(() => {
    const interceptorId = apiClient.interceptors.request.use((config) => {
      const activeToken = token || localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
      if (activeToken) {
        config.headers.Authorization = `Bearer ${activeToken}`;
      }
      return config;
    });

    return () => {
      apiClient.interceptors.request.eject(interceptorId);
    };
  }, [token]);

  // Handle Firebase Auth state changes
  useEffect(() => {
    if (!isFirebaseConfigured || !auth) {
      console.warn('Firebase client SDK is not initialized. Please verify VITE_FIREBASE_* env variables.');
      setIsLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (fbUser: FirebaseUser | null) => {
      if (fbUser) {
        try {
          const idToken = await fbUser.getIdToken();
          setToken(idToken);
          localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, idToken);

          // Synchronize and verify against MongoDB admin registry
          apiClient.defaults.headers.common['Authorization'] = `Bearer ${idToken}`;
          const adminProfile = await authApi.verifySession(fbUser.displayName || undefined);

          if (!adminProfile || !adminProfile.uid) {
            throw new Error('Unable to retrieve administrator profile from server.');
          }

          const userData: AuthUser = {
            uid: adminProfile.uid,
            email: adminProfile.email,
            fullName: adminProfile.fullName,
            role: adminProfile.role || 'superadmin',
            isActive: adminProfile.isActive !== undefined ? adminProfile.isActive : true,
            lastLoginAt: adminProfile.lastLoginAt
          };

          setUser(userData);
          localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(userData));
        } catch (error: any) {
          console.error('Session verification failed on auth change:', error.message);
          // Account unauthorized or revoked in MongoDB
          setUser(null);
          setToken(null);
          delete apiClient.defaults.headers.common['Authorization'];
          localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY);
          localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
          if (auth) {
            await fbSignOut(auth).catch(() => {});
          }
        }
      } else {
        setUser(null);
        setToken(null);
        delete apiClient.defaults.headers.common['Authorization'];
        localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY);
        localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  /**
   * Enterprise Administrator Login
   * Strictly verifies credentials via Firebase Client SDK and validates against MongoDB.
   */
  const login = useCallback(async (email: string, password: string): Promise<void> => {
    if (!isFirebaseConfigured || !auth) {
      throw new Error('Authentication service unavailable. Please check system configuration.');
    }

    setIsLoading(true);
    try {
      const credential = await signInWithEmailAndPassword(auth, email.trim().toLowerCase(), password);
      const idToken = await credential.user.getIdToken(true);

      setToken(idToken);
      localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, idToken);
      apiClient.defaults.headers.common['Authorization'] = `Bearer ${idToken}`;

      // Verify active admin record in MongoDB
      const adminProfile = await authApi.verifySession(credential.user.displayName || undefined);

      if (!adminProfile || !adminProfile.uid) {
        throw new Error('Unable to retrieve administrator profile from server.');
      }

      const userData: AuthUser = {
        uid: adminProfile.uid,
        email: adminProfile.email,
        fullName: adminProfile.fullName,
        role: adminProfile.role || 'superadmin',
        isActive: adminProfile.isActive !== undefined ? adminProfile.isActive : true,
        lastLoginAt: adminProfile.lastLoginAt
      };

      setUser(userData);
      localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(userData));
    } catch (err: any) {
      // Map Firebase error codes to professional messages
      let message = 'Authentication failed. Please verify your administrator credentials.';
      if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
        message = 'Invalid administrator email or password.';
      } else if (err.code === 'auth/too-many-requests') {
        message = 'Access temporarily restricted due to consecutive failed attempts. Please try again later.';
      } else if (err.response?.data?.message) {
        message = err.response.data.message;
      } else if (err.message) {
        message = err.message;
      }
      throw new Error(message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * One-time Superadmin Provisioning Wizard Flow
   */
  const setupInitialAdmin = useCallback(async (data: InitializeAdminInput): Promise<void> => {
    setIsLoading(true);
    try {
      // 1. Call backend setup endpoint (creates Firebase user + MongoDB Superadmin)
      await authApi.initializeAdmin(data);

      // 2. Automatically log the newly created superadmin into the client
      if (auth) {
        await login(data.email, data.password);
      }
    } finally {
      setIsLoading(false);
    }
  }, [login]);

  /**
   * Password Reset Request via Firebase Auth
   */
  const requestPasswordReset = useCallback(async (email: string): Promise<void> => {
    await authApi.requestPasswordReset(email);
  }, []);

  /**
   * Refreshes the active admin's profile from the backend
   */
  const refreshProfile = useCallback(async (): Promise<void> => {
    try {
      const profile = await authApi.getProfile();
      setUser((prev) =>
        prev
          ? {
              ...prev,
              fullName: profile.fullName,
              role: profile.role,
              isActive: profile.isActive,
              lastLoginAt: profile.lastLoginAt
            }
          : null
      );
    } catch (err) {
      console.warn('Failed to refresh admin profile:', err);
    }
  }, []);

  /**
   * Signs out the administrator cleanly across Firebase, local storage, and Axios headers
   */
  const logout = useCallback(async (): Promise<void> => {
    setIsLoading(true);
    try {
      if (isFirebaseConfigured && auth) {
        await fbSignOut(auth);
      }
    } finally {
      setUser(null);
      setToken(null);
      delete apiClient.defaults.headers.common['Authorization'];
      localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY);
      localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
      setIsLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: Boolean(user && token),
        isLoading,
        login,
        setupInitialAdmin,
        requestPasswordReset,
        logout,
        refreshProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

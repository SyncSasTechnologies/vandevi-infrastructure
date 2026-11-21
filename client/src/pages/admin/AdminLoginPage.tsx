import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { SEO } from '../../shared/components/SEO';
import { useAuth, authApi } from '../../features/auth';
import { Input } from '../../shared/components/Input';
import { Button } from '../../shared/components/Button';
import { Eyebrow } from '../../shared/components/Eyebrow';
import {
  AlertCircle,
  CheckCircle2,
  KeyRound,
  Building2,
  Lock
} from 'lucide-react';

// ==========================================
// 1. Zod Validation Schemas
// ==========================================

const loginSchema = z.object({
  email: z.string().trim().email('Please enter a valid administrator email address.'),
  password: z.string().min(6, 'Password must be at least 6 characters.')
});

const setupWizardSchema = z
  .object({
    fullName: z
      .string()
      .trim()
      .min(3, 'Full name must contain at least 3 characters.')
      .max(80, 'Full name cannot exceed 80 characters.'),
    email: z.string().trim().email('Please enter a valid official email address.'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters long.')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter.')
      .regex(/[a-z]/, 'Password must contain at least one lowercase letter.')
      .regex(/[0-9]/, 'Password must contain at least one numerical digit.'),
    confirmPassword: z.string().min(1, 'Please confirm your master password.')
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match.',
    path: ['confirmPassword']
  });

const resetPasswordSchema = z.object({
  email: z.string().trim().email('Please enter your registered administrator email.')
});

type LoginFormData = z.infer<typeof loginSchema>;
type SetupFormData = z.infer<typeof setupWizardSchema>;
type ResetFormData = z.infer<typeof resetPasswordSchema>;

export const AdminLoginPage: React.FC = () => {
  const { login, setupInitialAdmin, requestPasswordReset } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Status & View State
  const [isCheckingSetup, setIsCheckingSetup] = useState<boolean>(true);
  const [viewMode, setViewMode] = useState<'login' | 'setup' | 'forgot_password'>('login');
  const [statusMessage, setStatusMessage] = useState<{ type: 'error' | 'success'; text: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const from = location.state?.from?.pathname || '/admin';

  // Check setup status on mount
  useEffect(() => {
    let isMounted = true;

    async function checkStatus() {
      try {
        const status = await authApi.checkSetupStatus();
        if (isMounted) {
          if (status.isSetupRequired) {
            setViewMode('setup');
          }
        }
      } catch (err) {
        console.warn('Unable to verify initial setup status from server:', err);
      } finally {
        if (isMounted) {
          setIsCheckingSetup(false);
        }
      }
    }

    checkStatus();

    return () => {
      isMounted = false;
    };
  }, []);

  // Form Handlers
  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' }
  });

  const setupForm = useForm<SetupFormData>({
    resolver: zodResolver(setupWizardSchema),
    defaultValues: { fullName: '', email: '', password: '', confirmPassword: '' }
  });

  const resetForm = useForm<ResetFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { email: '' }
  });

  // Handle Standard Sign In
  const onLoginSubmit = async (data: LoginFormData) => {
    setIsSubmitting(true);
    setStatusMessage(null);

    try {
      await login(data.email, data.password);
      navigate(from, { replace: true });
    } catch (err: any) {
      console.error('Sign-in error:', err);
      setStatusMessage({
        type: 'error',
        text: err.message || 'Authentication failed. Please verify your administrator credentials.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle Initial Superadmin Setup Wizard
  const onSetupSubmit = async (data: SetupFormData) => {
    setIsSubmitting(true);
    setStatusMessage(null);

    try {
      await setupInitialAdmin({
        fullName: data.fullName,
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword
      });
      navigate(from, { replace: true });
    } catch (err: any) {
      console.error('Initial setup error:', err);
      setStatusMessage({
        type: 'error',
        text: err.message || 'Failed to initialize administrator account. Please check your credentials.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle Password Reset Dispatch
  const onResetSubmit = async (data: ResetFormData) => {
    setIsSubmitting(true);
    setStatusMessage(null);

    try {
      await requestPasswordReset(data.email);
      setStatusMessage({
        type: 'success',
        text: `Password recovery instructions have been dispatched to ${data.email}. Check your inbox.`
      });
      resetForm.reset();
    } catch (err: any) {
      console.error('Password reset error:', err);
      setStatusMessage({
        type: 'error',
        text: err.message || 'Failed to dispatch password recovery email. Please verify your address.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Loading Screen while verifying portal security
  if (isCheckingSetup) {
    return (
      <div className="min-h-screen bg-ivory flex flex-col items-center justify-center p-6 font-montserrat">
        <div className="w-10 h-10 rounded-full border-2 border-stone-taupe/30 border-t-gold animate-spin mb-4" />
        <span className="text-xs uppercase tracking-widest text-stone-taupe font-semibold">
          Verifying Portal Security...
        </span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ivory flex flex-col justify-between p-6 sm:p-10 font-montserrat selection:bg-gold/20">
      <SEO title="Studio Portal Login" noindex={true} />
      {/* Top Architectural Header */}
      <div className="w-full max-w-6xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded-[8px] bg-soft-charcoal flex items-center justify-center text-ivory">
            <Building2 className="w-4 h-4 text-gold" />
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-sm tracking-tight text-soft-charcoal group-hover:text-gold transition-colors">
              VANDEVI INFRASTRUCTURE
            </span>
            <span className="text-[10px] tracking-[0.2em] uppercase text-stone-taupe">
              Studio Portal
            </span>
          </div>
        </Link>

      </div>

      {/* Main Centered Authentication Panel */}
      <div className="w-full max-w-[480px] mx-auto my-12">
        {/* VIEW 1: ONE-TIME SUPERADMIN SETUP WIZARD */}
        {viewMode === 'setup' && (
          <div className="bg-ivory border border-stone-taupe/25 rounded-card p-8 sm:p-10 shadow-sm relative overflow-hidden">
            {/* Top Gold Accent Bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-gold via-sand-beige to-gold" />

            <div className="text-center mb-8">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-pill bg-gold/15 text-gold border border-gold/30 text-[11px] font-semibold uppercase tracking-wider mb-3">
                <KeyRound className="w-3.5 h-3.5" />
                System Provisioning
              </span>
              <h1 className="font-semibold text-[24px] text-soft-charcoal tracking-tight">
                Establish Master Administrator
              </h1>
              <p className="text-body-sm text-stone-taupe mt-2 leading-relaxed">
                No active administrators detected. Create the primary superadmin account to unlock the workspace. This wizard locks permanently upon completion.
              </p>
            </div>

            {statusMessage && (
              <div
                role="alert"
                className={`p-3.5 mb-6 rounded-control text-xs flex items-start gap-2.5 border ${
                  statusMessage.type === 'error'
                    ? 'bg-red-50/80 border-red-200 text-red-800'
                    : 'bg-emerald-50/80 border-emerald-200 text-emerald-800'
                }`}
              >
                {statusMessage.type === 'error' ? (
                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                ) : (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                )}
                <span>{statusMessage.text}</span>
              </div>
            )}

            <form onSubmit={setupForm.handleSubmit(onSetupSubmit)} noValidate className="space-y-4">
              <Input
                label="Full Name"
                type="text"
                autoComplete="name"
                placeholder="e.g. Full Name"
                {...setupForm.register('fullName')}
                error={setupForm.formState.errors.fullName?.message}
                required
              />

              <Input
                label="Official Admin Email"
                type="email"
                autoComplete="email"
                placeholder=""
                {...setupForm.register('email')}
                error={setupForm.formState.errors.email?.message}
                required
              />

              <Input
                label="Master Password"
                type="password"
                autoComplete="new-password"
                placeholder="••••••••••••"
                hint="Minimum 8 characters with uppercase, lowercase, and a digit."
                {...setupForm.register('password')}
                error={setupForm.formState.errors.password?.message}
                required
              />

              <Input
                label="Confirm Master Password"
                type="password"
                autoComplete="new-password"
                placeholder="••••••••••••"
                {...setupForm.register('confirmPassword')}
                error={setupForm.formState.errors.confirmPassword?.message}
                required
              />

              <div className="pt-2">
                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  disabled={isSubmitting}
                  isLoading={isSubmitting}
                  className="w-full"
                >
                  {isSubmitting ? 'Provisioning Master Admin...' : 'Initialize Portal & Sign In'}
                </Button>
              </div>
            </form>
          </div>
        )}

        {/* VIEW 2: STANDARD DISCIPLINED SIGN IN */}
        {viewMode === 'login' && (
          <div className="bg-ivory border border-stone-taupe/25 rounded-card p-8 sm:p-10 shadow-sm relative overflow-hidden">
            <div className="text-center mb-8">

              <h1 className="font-semibold text-[24px] text-soft-charcoal tracking-tight">
                Studio Portal Sign-In
              </h1>
  
            </div>

            {statusMessage && (
              <div
                role="alert"
                className={`p-3.5 mb-6 rounded-control text-xs flex items-start gap-2.5 border ${
                  statusMessage.type === 'error'
                    ? 'bg-red-50/80 border-red-200 text-red-800'
                    : 'bg-emerald-50/80 border-emerald-200 text-emerald-800'
                }`}
              >
                {statusMessage.type === 'error' ? (
                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                ) : (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                )}
                <span>{statusMessage.text}</span>
              </div>
            )}

            <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} noValidate className="space-y-4">
              <Input
                label="Administrator Email"
                type="email"
                autoComplete="email"
                placeholder=""
                {...loginForm.register('email')}
                error={loginForm.formState.errors.email?.message}
                required
              />

              <div>
                <Input
                  label="Password"
                  type="password"
                  autoComplete="current-password"
                  placeholder="••••••••••••"
                  {...loginForm.register('password')}
                  error={loginForm.formState.errors.password?.message}
                  required
                />
                <div className="flex justify-end mt-1.5">
                  <button
                    type="button"
                    onClick={() => {
                      setStatusMessage(null);
                      setViewMode('forgot_password');
                    }}
                    className="text-micro font-medium text-stone-taupe hover:text-soft-charcoal transition-colors cursor-pointer"
                  >
                    Forgot Password?
                  </button>
                </div>
              </div>

              <div className="pt-2">
                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  disabled={isSubmitting}
                  isLoading={isSubmitting}
                  className="w-full"
                >
                  {isSubmitting ? 'Authenticating...' : 'Sign In to Portal'}
                </Button>
              </div>
            </form>
          </div>
        )}

        {/* VIEW 3: PASSWORD RECOVERY */}
        {viewMode === 'forgot_password' && (
          <div className="bg-ivory border border-stone-taupe/25 rounded-card p-8 sm:p-10 shadow-sm relative overflow-hidden">
            <div className="text-center mb-8">
              <Eyebrow color="taupe" className="mb-2">
                Security Recovery
              </Eyebrow>
              <h1 className="font-semibold text-[24px] text-soft-charcoal tracking-tight">
                Reset Password
              </h1>
              <p className="text-body-sm text-stone-taupe mt-1.5 leading-relaxed">
                Provide your registered administrator email address to receive password reset instructions.
              </p>
            </div>

            {statusMessage && (
              <div
                role="alert"
                className={`p-3.5 mb-6 rounded-control text-xs flex items-start gap-2.5 border ${
                  statusMessage.type === 'error'
                    ? 'bg-red-50/80 border-red-200 text-red-800'
                    : 'bg-emerald-50/80 border-emerald-200 text-emerald-800'
                }`}
              >
                {statusMessage.type === 'error' ? (
                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                ) : (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                )}
                <span>{statusMessage.text}</span>
              </div>
            )}

            <form onSubmit={resetForm.handleSubmit(onResetSubmit)} noValidate className="space-y-4">
              <Input
                label="Registered Email Address"
                type="email"
                autoComplete="email"
                placeholder=""
                {...resetForm.register('email')}
                error={resetForm.formState.errors.email?.message}
                required
              />

              <div className="pt-2">
                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  disabled={isSubmitting}
                  isLoading={isSubmitting}
                  className="w-full"
                >
                  {isSubmitting ? 'Sending Link...' : 'Dispatch Reset Link'}
                </Button>
              </div>

              <div className="pt-2 text-center">
                <button
                  type="button"
                  onClick={() => {
                    setStatusMessage(null);
                    setViewMode('login');
                  }}
                  className="text-xs text-stone-taupe hover:text-soft-charcoal transition-colors cursor-pointer"
                >
                  ← Return to Sign In
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Bottom Nav Helper */}
        <div className="text-center mt-6">
          <Link
            to="/"
            className="text-xs text-stone-taupe hover:text-soft-charcoal transition-colors underline underline-offset-4"
          >
            ← Return to Public Website
          </Link>
        </div>
      </div>

      {/* Footer Audit Notice */}
      <div className="w-full max-w-6xl mx-auto pt-6 border-t border-stone-taupe/15 flex flex-col sm:flex-row items-center justify-between gap-3 text-stone-taupe text-[11px]">
        <span>
          © {new Date().getFullYear()} Vandevi Infrastructure Pvt. Ltd. All rights reserved.
        </span>
        <span className="flex items-center gap-1.5">
          <Lock className="w-3 h-3 text-stone-taupe/70" />
          <span>Restricted to Authorized Personnel Only</span>
        </span>
      </div>
    </div>
  );
};

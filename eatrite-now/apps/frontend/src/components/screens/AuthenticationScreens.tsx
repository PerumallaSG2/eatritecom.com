/**
 * EatRite Authentication Screens
 * Premium login, signup, and password recovery interfaces
 */

import React, { useState } from 'react';
import { 
  EatRiteButton, 
  EatRiteInput, 
  EatRiteCard, 
  EatRiteIcon, 
  UserIcon, 
  SearchIcon 
} from '../eatrite/EatRiteComponentLibrary';
import { EatRiteDesignTokens } from '../../styles/design-system/eatrite-design-tokens';

// ============================================================================
// LOGIN SCREEN
// ============================================================================

interface LoginScreenProps {
  onLogin: (email: string, password: string) => void;
  onSignupClick: () => void;
  onForgotPasswordClick: () => void;
  loading?: boolean;
  error?: string;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({
  onLogin,
  onSignupClick,
  onForgotPasswordClick,
  loading = false,
  error
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(email, password);
  };

  const containerStyles: React.CSSProperties = {
    minHeight: '100vh',
    background: EatRiteDesignTokens.colors.gradients.surface,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: EatRiteDesignTokens.spacing['2xl'],
  };

  const cardStyles: React.CSSProperties = {
    width: '100%',
    maxWidth: '400px',
    textAlign: 'center',
  };

  const headerStyles: React.CSSProperties = {
    marginBottom: EatRiteDesignTokens.spacing['3xl'],
  };

  const logoStyles: React.CSSProperties = {
    marginBottom: EatRiteDesignTokens.spacing.xl,
  };

  const titleStyles: React.CSSProperties = {
    fontFamily: EatRiteDesignTokens.typography.fontFamilies.heading,
    fontSize: EatRiteDesignTokens.typography.scale.h2.size,
    fontWeight: EatRiteDesignTokens.typography.scale.h2.weight,
    background: EatRiteDesignTokens.colors.gradients.primary,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    marginBottom: EatRiteDesignTokens.spacing.sm,
  };

  const subtitleStyles: React.CSSProperties = {
    color: EatRiteDesignTokens.colors.text.secondary,
    fontSize: EatRiteDesignTokens.typography.scale.body.size,
  };

  const formStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: EatRiteDesignTokens.spacing.xl,
    marginBottom: EatRiteDesignTokens.spacing['2xl'],
  };

  const errorStyles: React.CSSProperties = {
    color: EatRiteDesignTokens.colors.semantic.error,
    fontSize: EatRiteDesignTokens.typography.scale.bodySmall.size,
    textAlign: 'center',
    marginBottom: EatRiteDesignTokens.spacing.lg,
  };

  const linksStyles: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: EatRiteDesignTokens.spacing.xl,
  };

  const linkStyles: React.CSSProperties = {
    color: EatRiteDesignTokens.colors.primary.gold,
    fontSize: EatRiteDesignTokens.typography.scale.bodySmall.size,
    textDecoration: 'none',
    cursor: 'pointer',
    transition: `color ${EatRiteDesignTokens.animations.duration.normal} ${EatRiteDesignTokens.animations.easing.easeOut}`,
  };

  const dividerStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    margin: `${EatRiteDesignTokens.spacing['2xl']} 0`,
    gap: EatRiteDesignTokens.spacing.lg,
  };

  const dividerLineStyles: React.CSSProperties = {
    flex: 1,
    height: '1px',
    background: 'rgba(212, 180, 106, 0.2)',
  };

  const dividerTextStyles: React.CSSProperties = {
    color: EatRiteDesignTokens.colors.text.tertiary,
    fontSize: EatRiteDesignTokens.typography.scale.bodySmall.size,
  };

  return (
    <div style={containerStyles}>
      <EatRiteCard variant="luxury" padding="xl" className="" style={cardStyles}>
        <div style={headerStyles}>
          <div style={logoStyles}>
            <EatRiteIcon size="xl" color="gold" />
          </div>
          <h1 style={titleStyles}>Welcome Back</h1>
          <p style={subtitleStyles}>
            Sign in to your EatRite wellness account
          </p>
        </div>

        {error && <div style={errorStyles}>{error}</div>}

        <form onSubmit={handleSubmit} style={formStyles}>
          <EatRiteInput
            label="Email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={setEmail}
            icon={<UserIcon size="sm" color="gold" />}
            iconPosition="left"
          />

          <EatRiteInput
            label="Password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={setPassword}
          />

          <EatRiteButton
            variant="primary"
            size="lg"
            loading={loading}
            style={{ width: '100%' }}
          >
            Sign In
          </EatRiteButton>
        </form>

        <div style={linksStyles}>
          <a style={linkStyles} onClick={onForgotPasswordClick}>
            Forgot password?
          </a>
          <a style={linkStyles} onClick={onSignupClick}>
            Create account
          </a>
        </div>

        <div style={dividerStyles}>
          <div style={dividerLineStyles} />
          <span style={dividerTextStyles}>or</span>
          <div style={dividerLineStyles} />
        </div>

        <EatRiteButton variant="outline" size="lg" style={{ width: '100%' }}>
          Continue with Google
        </EatRiteButton>
      </EatRiteCard>
    </div>
  );
};

// ============================================================================
// SIGNUP SCREEN
// ============================================================================

interface SignupScreenProps {
  onSignup: (data: { name: string; email: string; password: string }) => void;
  onLoginClick: () => void;
  loading?: boolean;
  error?: string;
}

export const SignupScreen: React.FC<SignupScreenProps> = ({
  onSignup,
  onLoginClick,
  loading = false,
  error
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    const errors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please enter a valid email';
    }
    
    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      errors.password = 'Password must be at least 8 characters';
    }
    
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    
    setFormErrors(errors);
    
    if (Object.keys(errors).length === 0) {
      onSignup({
        name: formData.name,
        email: formData.email,
        password: formData.password
      });
    }
  };

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (formErrors[field]) {
      setFormErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const containerStyles: React.CSSProperties = {
    minHeight: '100vh',
    background: EatRiteDesignTokens.colors.gradients.surface,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: EatRiteDesignTokens.spacing['2xl'],
  };

  const cardStyles: React.CSSProperties = {
    width: '100%',
    maxWidth: '420px',
    textAlign: 'center',
  };

  const headerStyles: React.CSSProperties = {
    marginBottom: EatRiteDesignTokens.spacing['3xl'],
  };

  const logoStyles: React.CSSProperties = {
    marginBottom: EatRiteDesignTokens.spacing.xl,
  };

  const titleStyles: React.CSSProperties = {
    fontFamily: EatRiteDesignTokens.typography.fontFamilies.heading,
    fontSize: EatRiteDesignTokens.typography.scale.h2.size,
    fontWeight: EatRiteDesignTokens.typography.scale.h2.weight,
    background: EatRiteDesignTokens.colors.gradients.primary,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    marginBottom: EatRiteDesignTokens.spacing.sm,
  };

  const subtitleStyles: React.CSSProperties = {
    color: EatRiteDesignTokens.colors.text.secondary,
    fontSize: EatRiteDesignTokens.typography.scale.body.size,
  };

  const formStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: EatRiteDesignTokens.spacing.xl,
    marginBottom: EatRiteDesignTokens.spacing['2xl'],
  };

  const errorStyles: React.CSSProperties = {
    color: EatRiteDesignTokens.colors.semantic.error,
    fontSize: EatRiteDesignTokens.typography.scale.bodySmall.size,
    textAlign: 'center',
    marginBottom: EatRiteDesignTokens.spacing.lg,
  };

  const linkStyles: React.CSSProperties = {
    color: EatRiteDesignTokens.colors.primary.gold,
    fontSize: EatRiteDesignTokens.typography.scale.bodySmall.size,
    textDecoration: 'none',
    cursor: 'pointer',
    transition: `color ${EatRiteDesignTokens.animations.duration.normal} ${EatRiteDesignTokens.animations.easing.easeOut}`,
  };

  const termsStyles: React.CSSProperties = {
    color: EatRiteDesignTokens.colors.text.tertiary,
    fontSize: EatRiteDesignTokens.typography.scale.caption.size,
    lineHeight: EatRiteDesignTokens.typography.scale.caption.lineHeight,
    marginTop: EatRiteDesignTokens.spacing.lg,
    textAlign: 'center',
  };

  return (
    <div style={containerStyles}>
      <EatRiteCard variant="luxury" padding="xl" className="" style={cardStyles}>
        <div style={headerStyles}>
          <div style={logoStyles}>
            <EatRiteIcon size="xl" color="gold" />
          </div>
          <h1 style={titleStyles}>Join EatRite</h1>
          <p style={subtitleStyles}>
            Start your premium wellness journey today
          </p>
        </div>

        {error && <div style={errorStyles}>{error}</div>}

        <form onSubmit={handleSubmit} style={formStyles}>
          <EatRiteInput
            label="Full Name"
            type="text"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={(value) => updateFormData('name', value)}
            error={formErrors.name}
            icon={<UserIcon size="sm" color="gold" />}
            iconPosition="left"
          />

          <EatRiteInput
            label="Email"
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={(value) => updateFormData('email', value)}
            error={formErrors.email}
          />

          <EatRiteInput
            label="Password"
            type="password"
            placeholder="Create a password"
            value={formData.password}
            onChange={(value) => updateFormData('password', value)}
            error={formErrors.password}
          />

          <EatRiteInput
            label="Confirm Password"
            type="password"
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChange={(value) => updateFormData('confirmPassword', value)}
            error={formErrors.confirmPassword}
          />

          <EatRiteButton
            variant="primary"
            size="lg"
            loading={loading}
            style={{ width: '100%' }}
          >
            Create Account
          </EatRiteButton>
        </form>

        <div style={{ textAlign: 'center', marginTop: EatRiteDesignTokens.spacing.xl }}>
          <span style={{ color: EatRiteDesignTokens.colors.text.secondary, marginRight: EatRiteDesignTokens.spacing.sm }}>
            Already have an account?
          </span>
          <a style={linkStyles} onClick={onLoginClick}>
            Sign in
          </a>
        </div>

        <p style={termsStyles}>
          By creating an account, you agree to our{' '}
          <span style={{ color: EatRiteDesignTokens.colors.primary.gold, cursor: 'pointer' }}>
            Terms of Service
          </span>{' '}
          and{' '}
          <span style={{ color: EatRiteDesignTokens.colors.primary.gold, cursor: 'pointer' }}>
            Privacy Policy
          </span>
        </p>
      </EatRiteCard>
    </div>
  );
};

// ============================================================================
// FORGOT PASSWORD SCREEN
// ============================================================================

interface ForgotPasswordScreenProps {
  onSubmit: (email: string) => void;
  onBackToLogin: () => void;
  loading?: boolean;
  success?: boolean;
  error?: string;
}

export const ForgotPasswordScreen: React.FC<ForgotPasswordScreenProps> = ({
  onSubmit,
  onBackToLogin,
  loading = false,
  success = false,
  error
}) => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      onSubmit(email);
    }
  };

  const containerStyles: React.CSSProperties = {
    minHeight: '100vh',
    background: EatRiteDesignTokens.colors.gradients.surface,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: EatRiteDesignTokens.spacing['2xl'],
  };

  const cardStyles: React.CSSProperties = {
    width: '100%',
    maxWidth: '400px',
    textAlign: 'center',
  };

  const headerStyles: React.CSSProperties = {
    marginBottom: EatRiteDesignTokens.spacing['3xl'],
  };

  const logoStyles: React.CSSProperties = {
    marginBottom: EatRiteDesignTokens.spacing.xl,
  };

  const titleStyles: React.CSSProperties = {
    fontFamily: EatRiteDesignTokens.typography.fontFamilies.heading,
    fontSize: EatRiteDesignTokens.typography.scale.h2.size,
    fontWeight: EatRiteDesignTokens.typography.scale.h2.weight,
    background: EatRiteDesignTokens.colors.gradients.primary,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    marginBottom: EatRiteDesignTokens.spacing.sm,
  };

  const subtitleStyles: React.CSSProperties = {
    color: EatRiteDesignTokens.colors.text.secondary,
    fontSize: EatRiteDesignTokens.typography.scale.body.size,
    lineHeight: EatRiteDesignTokens.typography.scale.body.lineHeight,
  };

  const formStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: EatRiteDesignTokens.spacing.xl,
    marginBottom: EatRiteDesignTokens.spacing['2xl'],
  };

  const messageStyles: React.CSSProperties = {
    color: success ? EatRiteDesignTokens.colors.semantic.success : EatRiteDesignTokens.colors.semantic.error,
    fontSize: EatRiteDesignTokens.typography.scale.bodySmall.size,
    textAlign: 'center',
    marginBottom: EatRiteDesignTokens.spacing.lg,
    padding: EatRiteDesignTokens.spacing.lg,
    backgroundColor: success 
      ? 'rgba(74, 124, 89, 0.1)' 
      : 'rgba(216, 91, 83, 0.1)',
    borderRadius: EatRiteDesignTokens.borderRadius.lg,
    border: `1px solid ${success ? EatRiteDesignTokens.colors.semantic.success : EatRiteDesignTokens.colors.semantic.error}`,
  };

  const linkStyles: React.CSSProperties = {
    color: EatRiteDesignTokens.colors.primary.gold,
    fontSize: EatRiteDesignTokens.typography.scale.bodySmall.size,
    textDecoration: 'none',
    cursor: 'pointer',
    transition: `color ${EatRiteDesignTokens.animations.duration.normal} ${EatRiteDesignTokens.animations.easing.easeOut}`,
  };

  return (
    <div style={containerStyles}>
      <EatRiteCard variant="luxury" padding="xl" className="" style={cardStyles}>
        <div style={headerStyles}>
          <div style={logoStyles}>
            <EatRiteIcon size="xl" color="gold" />
          </div>
          <h1 style={titleStyles}>Reset Password</h1>
          <p style={subtitleStyles}>
            {success 
              ? "We've sent password reset instructions to your email address."
              : "Enter your email address and we'll send you instructions to reset your password."
            }
          </p>
        </div>

        {(error || success) && (
          <div style={messageStyles}>
            {error || "Check your email for reset instructions. Don't forget to check your spam folder."}
          </div>
        )}

        {!success && (
          <form onSubmit={handleSubmit} style={formStyles}>
            <EatRiteInput
              label="Email"
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={setEmail}
              icon={<SearchIcon size="sm" color="gold" />}
              iconPosition="left"
            />

            <EatRiteButton
              variant="primary"
              size="lg"
              loading={loading}
              style={{ width: '100%' }}
            >
              Send Reset Instructions
            </EatRiteButton>
          </form>
        )}

        <div style={{ textAlign: 'center', marginTop: EatRiteDesignTokens.spacing.xl }}>
          <a style={linkStyles} onClick={onBackToLogin}>
            ← Back to Sign In
          </a>
        </div>
      </EatRiteCard>
    </div>
  );
};

export default {
  LoginScreen,
  SignupScreen,
  ForgotPasswordScreen,
};
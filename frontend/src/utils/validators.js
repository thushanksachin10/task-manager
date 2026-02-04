import { z } from 'zod';

// Auth validation schemas
export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

export const signupSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

// Task validation schemas
export const taskSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters').max(100),
  description: z.string().max(500).optional(),
  status: z.enum(['pending', 'in-progress', 'completed']),
  priority: z.enum(['low', 'medium', 'high']),
  dueDate: z.string().optional(),
});

// Profile validation schemas
export const profileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
});

export const passwordSchema = z.object({
  currentPassword: z.string().min(1, 'Current password is required'),
  newPassword: z.string().min(6, 'New password must be at least 6 characters'),
});

// Email validation helper
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Password strength validator
export const checkPasswordStrength = (password) => {
  const strength = {
    length: password.length >= 8,
    hasUpperCase: /[A-Z]/.test(password),
    hasLowerCase: /[a-z]/.test(password),
    hasNumber: /\d/.test(password),
    hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  };

  const score = Object.values(strength).filter(Boolean).length;

  return {
    ...strength,
    score,
    isStrong: score >= 4,
    label: score <= 2 ? 'Weak' : score === 3 ? 'Medium' : 'Strong',
  };
};

// Form field validators
export const validateField = (value, rules = {}) => {
  const errors = [];

  if (rules.required && !value) {
    errors.push('This field is required');
  }

  if (rules.minLength && value.length < rules.minLength) {
    errors.push(`Minimum ${rules.minLength} characters required`);
  }

  if (rules.maxLength && value.length > rules.maxLength) {
    errors.push(`Maximum ${rules.maxLength} characters allowed`);
  }

  if (rules.pattern && !rules.pattern.test(value)) {
    errors.push(rules.patternMessage || 'Invalid format');
  }

  return errors.length > 0 ? errors[0] : null;
};
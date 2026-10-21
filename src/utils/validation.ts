import { BespokeInquiry, ValidationResult } from '../types/fashion';

export function validateBespokeBooking(data: Partial<BespokeInquiry>): ValidationResult {
  const errors: Record<string, string> = {};

  if (!data.name || data.name.trim().length < 2) {
    errors.name = 'Please provide your full name (at least 2 characters).';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email || !emailRegex.test(data.email.trim())) {
    errors.email = 'Please provide a valid email address.';
  }

  const phoneDigits = (data.phone || '').replace(/\D/g, '');
  if (!data.phone || phoneDigits.length < 7) {
    errors.phone = 'Please provide a valid contact phone number.';
  }

  if (!data.collectionInterest || data.collectionInterest.trim().length === 0) {
    errors.collectionInterest = 'Please select a clothing line of interest.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

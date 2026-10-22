import type { RegisterOptions } from 'react-hook-form';

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

/**
 * Validation for the contact form with react-hook-form's built-in rules (no schema library: zod
 * added ~60 KB gzip to the home for three fields). Length rules skip empty fields, so each one is
 * also required. Messages are keys under site.contact.validation, translated by the form.
 */
export const contactFormRules = {
  name: {
    required: 'nameMin',
    minLength: { value: 2, message: 'nameMin' },
    maxLength: { value: 100, message: 'nameMax' },
  },
  email: {
    required: 'emailInvalid',
    pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'emailInvalid' },
  },
  message: {
    required: 'messageMin',
    minLength: { value: 10, message: 'messageMin' },
    maxLength: { value: 1000, message: 'messageMax' },
  },
} satisfies { [Field in keyof ContactFormData]: RegisterOptions<ContactFormData, Field> };

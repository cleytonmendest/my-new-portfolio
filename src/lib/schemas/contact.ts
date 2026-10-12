import { z } from 'zod';

export const contactFormSchema = z.object({
  name: z.string().min(2, 'nameMin').max(100, 'nameMax'),
  email: z.string().email('emailInvalid'),
  message: z.string().min(10, 'messageMin').max(1000, 'messageMax'),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

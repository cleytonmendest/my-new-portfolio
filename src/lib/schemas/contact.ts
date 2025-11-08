import { z } from 'zod';

export const contactFormSchema = z.object({
  name: z.string().min(2, 'nameMin').max(100),
  email: z.string().email('emailInvalid'),
  message: z.string().min(10, 'messageMin').max(1000),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

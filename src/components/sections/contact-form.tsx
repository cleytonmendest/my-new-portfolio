'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AlertCircle, Send } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { SentConfirmation } from '@/components/sections/sent-confirmation';
import { contactFormSchema, type ContactFormData } from '@/lib/schemas/contact';

// Loaded on demand by LazyContactForm: react-hook-form and zod are not needed until the
// visitor is near the contact section.
export default function ContactForm() {
  const t = useTranslations('contact');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Web3Forms is called straight from the browser; its access key is public by design.
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY,
          name: data.name,
          email: data.email,
          message: data.message,
          subject: `New contact form submission from ${data.name}`,
          from_name: 'Portfolio Contact Form',
          replyto: data.email,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Failed to send message');
      }

      setSubmitStatus('success');
      reset();
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
      toast.error(t('error'));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitStatus === 'success') {
    return <SentConfirmation title={t('sent')} message={t('success')} />;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
      <p className="text-sm text-muted-foreground">{t('form.description')}</p>

      <div className="space-y-2">
        <Label htmlFor="name">{t('form.name')}</Label>
        <Input
          id="name"
          autoComplete="name"
          placeholder={t('form.namePlaceholder')}
          aria-invalid={errors.name ? 'true' : undefined}
          {...register('name')}
        />
        {errors.name && (
          <p className="text-sm text-destructive">{t(`validation.${errors.name.message}`)}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">{t('form.email')}</Label>
        <Input
          id="email"
          type="email"
          autoComplete="email"
          placeholder={t('form.emailPlaceholder')}
          aria-invalid={errors.email ? 'true' : undefined}
          {...register('email')}
        />
        {errors.email && (
          <p className="text-sm text-destructive">{t(`validation.${errors.email.message}`)}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">{t('form.message')}</Label>
        <Textarea
          id="message"
          rows={6}
          placeholder={t('form.messagePlaceholder')}
          aria-invalid={errors.message ? 'true' : undefined}
          {...register('message')}
        />
        {errors.message && (
          <p className="text-sm text-destructive">{t(`validation.${errors.message.message}`)}</p>
        )}
      </div>

      <Button type="submit" size="lg" variant="accent" disabled={isSubmitting}>
        {isSubmitting ? (
          t('form.sending')
        ) : (
          <>
            <Send />
            {t('form.submit')}
          </>
        )}
      </Button>

      {submitStatus === 'error' && (
        <div
          role="alert"
          className="flex items-center gap-2 rounded-control border border-destructive p-4 text-sm text-destructive"
        >
          <AlertCircle className="size-5 shrink-0" />
          <p>{t('error')}</p>
        </div>
      )}
    </form>
  );
}

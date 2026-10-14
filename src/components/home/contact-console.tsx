'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { contactFormSchema, type ContactFormData } from '@/lib/schemas/contact';
import { CONTACT_EMAIL, GhostLink, Reveal, SectionHeading, getWhatsAppUrl } from '@/components/terminal';

type SubmitStatus = 'success' | 'error' | null;

const fieldClassName =
  'h-11 rounded-tag bg-console-black shadow-none transition-colors dark:bg-console-black hover:border-muted-ash focus-visible:border-cursor-green focus-visible:ring-1 focus-visible:ring-cursor-green';
const labelClassName = 'font-roboto-mono text-caption font-normal text-muted-ash';
const infoLabelClassName = 'font-roboto-mono text-caption text-muted-ash';

const fade = {
  initial: { opacity: 0, y: -4 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -4 },
  transition: { duration: 0.2 },
};

/** Validation message that fades in under its field and out once fixed. */
function FieldError({ id, message }: { id: string; message?: string }) {
  return (
    <AnimatePresence initial={false}>
      {message && (
        <motion.p id={id} {...fade} className="font-roboto-mono text-caption text-destructive">
          {message}
        </motion.p>
      )}
    </AnimatePresence>
  );
}

/** Contact details as key/value pairs next to the message form (sent through Web3Forms). */
export function ContactConsole() {
  const t = useTranslations('site.contact');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>(null);
  const [emailCopied, setEmailCopied] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const errorMessage = (field: keyof ContactFormData) => {
    const key = errors[field]?.message;
    return key ? t(`validation.${key}`) : undefined;
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2000);
    } catch {
      setEmailCopied(false);
    }
  };

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
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
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="scroll-mt-10 px-4 md:px-6">
      <div className="mx-auto max-w-[1200px]">
        <SectionHeading title={t('title')} description={t('description')} />

        <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-12">
          <Reveal className="self-start">
            <dl className="divide-y divide-border-smoke border-y border-border-smoke">
              <div className="py-5">
                <dt className={infoLabelClassName}>{t('info.email')}</dt>
                <dd className="mt-1 flex items-center gap-2">
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="text-body text-console-white transition-colors hover:text-cursor-green"
                  >
                    <span className="link-underline">{CONTACT_EMAIL}</span>
                  </a>
                  <button
                    type="button"
                    onClick={copyEmail}
                    aria-label={t('copyEmail')}
                    className="flex size-7 items-center justify-center rounded-tag text-muted-ash transition-colors hover:bg-card-graphite hover:text-console-white"
                  >
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.span
                        key={emailCopied ? 'copied' : 'copy'}
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        transition={{ duration: 0.15 }}
                      >
                        {emailCopied ? <Check className="size-3.5 text-cursor-green" /> : <Copy className="size-3.5" />}
                      </motion.span>
                    </AnimatePresence>
                  </button>
                  <span role="status" className="sr-only">
                    {emailCopied ? t('emailCopied') : ''}
                  </span>
                </dd>
              </div>
              <div className="py-5">
                <dt className={infoLabelClassName}>{t('info.location')}</dt>
                <dd className="mt-1 text-body text-console-white">{t('info.locationValue')}</dd>
              </div>
              <div className="py-5">
                <dt className={infoLabelClassName}>{t('info.status')}</dt>
                <dd className="mt-1 flex items-center gap-2 text-body text-console-white">
                  <span aria-hidden className="relative flex size-2">
                    <span className="absolute inline-flex size-full animate-ping rounded-full bg-cursor-green opacity-60 motion-reduce:animate-none" />
                    <span className="relative inline-flex size-2 rounded-full bg-cursor-green" />
                  </span>
                  {t('info.statusValue')}
                </dd>
              </div>
              <div className="py-5">
                <dt className={infoLabelClassName}>{t('info.whatsapp')}</dt>
                <dd className="mt-1">
                  <GhostLink href={getWhatsAppUrl(t('whatsappMessage'))} external arrow="up-right" className="text-body">
                    {t('info.whatsappValue')}
                  </GhostLink>
                </dd>
              </div>
            </dl>
          </Reveal>

          <Reveal delay={0.1}>
            <Card className="gap-0 rounded-card py-0 shadow-none">
              <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6 p-6 md:p-8">
                <div className="space-y-2">
                  <Label htmlFor="name" className={labelClassName}>
                    {t('form.name')}
                  </Label>
                  <Input
                    id="name"
                    autoComplete="name"
                    placeholder={t('form.namePlaceholder')}
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? 'name-error' : undefined}
                    className={fieldClassName}
                    {...register('name')}
                  />
                  <FieldError id="name-error" message={errorMessage('name')} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className={labelClassName}>
                    {t('form.email')}
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    autoComplete="email"
                    placeholder={t('form.emailPlaceholder')}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                    className={fieldClassName}
                    {...register('email')}
                  />
                  <FieldError id="email-error" message={errorMessage('email')} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className={labelClassName}>
                    {t('form.message')}
                  </Label>
                  <Textarea
                    id="message"
                    rows={6}
                    placeholder={t('form.messagePlaceholder')}
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? 'message-error' : undefined}
                    className={`${fieldClassName} h-auto min-h-36 py-3`}
                    {...register('message')}
                  />
                  <FieldError id="message-error" message={errorMessage('message')} />
                </div>

                <div>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="h-12 w-full rounded-tag text-base font-semibold hover:-translate-y-0.5 active:translate-y-0"
                  >
                    {isSubmitting ? (
                      <>
                        {t('form.sending')}
                        <span aria-hidden className="h-4 w-2 animate-blink bg-current motion-reduce:animate-none" />
                      </>
                    ) : (
                      t('form.submit')
                    )}
                  </Button>

                  <p role="status" className="mt-4 font-roboto-mono text-caption empty:mt-0">
                    <AnimatePresence mode="wait">
                      {submitStatus && (
                        <motion.span
                          key={submitStatus}
                          {...fade}
                          className={submitStatus === 'success' ? 'text-cursor-green' : 'text-destructive'}
                        >
                          {submitStatus === 'success'
                            ? `[ok] ${t('success')}`
                            : `[error] ${t('error', { email: CONTACT_EMAIL })}`}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </p>
                </div>
              </form>
            </Card>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

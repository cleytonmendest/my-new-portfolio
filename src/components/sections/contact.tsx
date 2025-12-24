'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { contactFormSchema, type ContactFormData } from '@/lib/schemas/contact';
import { Mail, MapPin, CheckCircle2, AlertCircle, Send, Copy, Check } from 'lucide-react';
import { FadeIn } from '@/components/fade-in';
import { toast } from 'sonner';

export function Contact() {
  const t = useTranslations('contact');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);
  const [emailCopied, setEmailCopied] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText('cleyton.mendest@gmail.com');
      setEmailCopied(true);
      toast.success('Email copied to clipboard!', {
        duration: 2000,
      });
      setTimeout(() => setEmailCopied(false), 2000);
    } catch {
      toast.error('Failed to copy email');
    }
  };

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to send message');
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
    <section className="py-20 px-4 bg-muted/30" id="contact">
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              {t('title')}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t('subtitle')}
            </p>
          </div>
        </FadeIn>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <FadeIn delay={0.2}>
            <div className="space-y-6">
              <Card>
              <CardHeader>
                <CardTitle className="text-xl">{t('info.title')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-accent mt-0.5 shrink-0" />
                  <div className="flex-1">
                    <p className="font-medium text-sm">{t('info.email')}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <p className="text-sm text-muted-foreground">
                        cleyton.mendest@gmail.com
                      </p>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 hover:bg-accent/10"
                        onClick={copyEmail}
                      >
                        {emailCopied ? (
                          <Check className="h-3 w-3 text-green-500" />
                        ) : (
                          <Copy className="h-3 w-3" />
                        )}
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-accent mt-0.5" />
                  <div>
                    <p className="font-medium text-sm">{t('info.location')}</p>
                    <p className="text-sm text-muted-foreground">
                      {t('info.locationValue')}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-accent mt-0.5" />
                  <div>
                    <p className="font-medium text-sm">{t('info.availability')}</p>
                    <p className="text-sm text-muted-foreground">
                      {t('info.availabilityValue')}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            </div>
          </FadeIn>

          {/* Contact Form */}
          <FadeIn delay={0.4} className="lg:col-span-2">
            <Card>
            <CardHeader>
              <CardTitle className="text-2xl">{t('form.submit')}</CardTitle>
              <CardDescription>
                Fill out the form below and I'll get back to you as soon as possible.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Name Field */}
                <div className="space-y-2">
                  <Label htmlFor="name">{t('form.name')}</Label>
                  <Input
                    id="name"
                    placeholder={t('form.namePlaceholder')}
                    {...register('name')}
                    className={errors.name ? 'border-destructive' : ''}
                  />
                  {errors.name && (
                    <p className="text-sm text-destructive">
                      {t(`validation.${errors.name.message}`)}
                    </p>
                  )}
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                  <Label htmlFor="email">{t('form.email')}</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder={t('form.emailPlaceholder')}
                    {...register('email')}
                    className={errors.email ? 'border-destructive' : ''}
                  />
                  {errors.email && (
                    <p className="text-sm text-destructive">
                      {t(`validation.${errors.email.message}`)}
                    </p>
                  )}
                </div>

                {/* Message Field */}
                <div className="space-y-2">
                  <Label htmlFor="message">{t('form.message')}</Label>
                  <Textarea
                    id="message"
                    rows={6}
                    placeholder={t('form.messagePlaceholder')}
                    {...register('message')}
                    className={errors.message ? 'border-destructive' : ''}
                  />
                  {errors.message && (
                    <p className="text-sm text-destructive">
                      {t(`validation.${errors.message.message}`)}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  size="lg"
                  className="w-full gap-2"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      {t('form.sending')}
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5" />
                      {t('form.submit')}
                    </>
                  )}
                </Button>

                {/* Status Messages */}
                {submitStatus === 'success' && (
                  <div className="flex items-center gap-2 p-4 rounded-md bg-green-500/10 border border-green-500/20">
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                    <p className="text-sm text-green-500">{t('success')}</p>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="flex items-center gap-2 p-4 rounded-md bg-destructive/10 border border-destructive/20">
                    <AlertCircle className="h-5 w-5 text-destructive" />
                    <p className="text-sm text-destructive">{t('error')}</p>
                  </div>
                )}
              </form>
            </CardContent>
          </Card>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

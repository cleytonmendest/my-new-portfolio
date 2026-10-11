import { useTranslations } from 'next-intl';
import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Section } from '@/components/layout/section';
import { CopyEmailButton } from '@/components/sections/copy-email-button';
import { LazyContactForm } from '@/components/sections/lazy-contact-form';
import { personalInfo } from '@/data/personal';

export function Contact() {
  const t = useTranslations('contact');
  const tInfo = useTranslations('contact.info');

  // wa.me wants the phone number as digits only, with the country code.
  const whatsappUrl = `https://wa.me/${personalInfo.phone.replace(/\D/g, '')}?text=${encodeURIComponent(
    t('whatsappMessage'),
  )}`;

  return (
    <Section id="contact" title={t('title')}>
      <div className="grid gap-12 md:grid-cols-5">
        <div className="space-y-8 md:col-span-2">
          <p className="font-serif text-xl leading-relaxed">{t('subtitle')}</p>

          <dl className="space-y-5 text-sm">
            <div className="space-y-1">
              <dt className="text-muted-foreground">{tInfo('email')}</dt>
              <dd className="flex items-center gap-1">
                {personalInfo.email}
                <CopyEmailButton email={personalInfo.email} />
              </dd>
            </div>
            <div className="space-y-1">
              <dt className="text-muted-foreground">{tInfo('location')}</dt>
              <dd>
                {personalInfo.location.city}, {personalInfo.location.state}. {tInfo('locationValue')}
              </dd>
            </div>
            <div className="space-y-1">
              <dt className="text-muted-foreground">{tInfo('availability')}</dt>
              <dd>{tInfo('availabilityValue')}</dd>
            </div>
          </dl>

          <Button asChild variant="outline">
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              <MessageCircle />
              {t('whatsapp')}
            </a>
          </Button>
        </div>

        <div className="md:col-span-3">
          <LazyContactForm />
        </div>
      </div>
    </Section>
  );
}

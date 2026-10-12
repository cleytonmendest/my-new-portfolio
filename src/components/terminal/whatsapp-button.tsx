import { useTranslations } from 'next-intl';
import { FaWhatsapp } from 'react-icons/fa';
import { getWhatsAppUrl } from './constants';

/** Floating WhatsApp shortcut, styled as a flat graphite tile. Fades in after the hero. */
export function WhatsAppButton() {
  const t = useTranslations('site.contact');

  return (
    <a
      href={getWhatsAppUrl(t('whatsappMessage'))}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t('whatsappLabel')}
      className="group fixed bottom-6 right-6 z-50 flex size-12 animate-fade-up items-center justify-center rounded-card border border-border-smoke bg-card-graphite text-cursor-green transition-[border-color,translate] duration-200 [animation-delay:1s] hover:-translate-y-0.5 hover:border-cursor-green motion-reduce:animate-none"
    >
      <FaWhatsapp className="size-6 transition-transform duration-200 group-hover:scale-110" aria-hidden />
    </a>
  );
}

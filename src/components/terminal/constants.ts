import { personalInfo } from '@/data/personal';

export const CONTACT_EMAIL = 'contato@cleyton-mendes.com';

/** Localized CV file served from /public. */
export function getCvFile(locale: string) {
  return {
    href: `/cleyton-mendes-${locale}.pdf`,
    filename: `Cleyton_Mendes_${locale === 'pt' ? 'PT' : 'EN'}.pdf`,
  };
}

export function getWhatsAppUrl(message: string) {
  const phone = personalInfo.phone.replace(/\D/g, '');
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

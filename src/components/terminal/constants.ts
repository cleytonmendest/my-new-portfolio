import { personalInfo } from '@/data/personal';

/** Shown in the contact section, the footer and the form's error message. */
export const CONTACT_EMAIL = personalInfo.email;

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

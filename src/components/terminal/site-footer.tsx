import { useTranslations } from 'next-intl';
import { ArrowUp } from 'lucide-react';
import { socialLinks } from '@/data/personal';
import { CONTACT_EMAIL } from './constants';

const FOOTER_LINKS = [
  ...socialLinks.map((link) => ({ label: link.platform.toLowerCase(), href: link.url })),
  { label: 'email', href: `mailto:${CONTACT_EMAIL}` },
];

/** Hairline footer with copyright, bracketed social links and a back-to-top link. */
export function SiteFooter() {
  const t = useTranslations('site.footer');

  return (
    <footer className="border-t border-border-smoke px-4 md:px-6">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-6 py-10 font-roboto-mono text-caption md:flex-row md:items-center md:justify-between">
        <p className="text-muted-ash">
          © {new Date().getFullYear()} Cleyton Mendes. {t('rights')}
        </p>
        <ul className="flex flex-wrap gap-x-2 gap-y-2">
          {FOOTER_LINKS.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="inline-block px-1 py-1 text-muted-ash transition-[color,translate] duration-200 hover:-translate-y-0.5 hover:text-cursor-green"
              >
                [{link.label}]
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#top"
          className="group inline-flex items-center gap-1 py-1 text-muted-ash transition-colors hover:text-console-white"
        >
          {t('backToTop')}
          <ArrowUp className="size-3.5 transition-transform duration-200 group-hover:-translate-y-0.5" aria-hidden />
        </a>
      </div>
    </footer>
  );
}

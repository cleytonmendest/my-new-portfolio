'use client';

import { useTranslations } from 'next-intl';
import { ArrowUp, Github, Linkedin, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { personalInfo, socialLinks } from '@/data/personal';

const socialIcons = { github: Github, linkedin: Linkedin } as const;

export function Footer() {
  const t = useTranslations('footer');

  const links = [
    ...socialLinks.map((link) => ({
      name: link.platform,
      href: link.url,
      Icon: socialIcons[link.icon as keyof typeof socialIcons],
    })),
    { name: 'Email', href: `mailto:${personalInfo.email}`, Icon: Mail },
  ];

  return (
    <footer className="border-t border-border py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} {personalInfo.name}. {t('copyright')}
        </p>

        <nav aria-label={t('social')} className="flex items-center gap-1">
          {links.map(({ name, href, Icon }) => (
            <Button key={name} variant="ghost" size="icon" asChild>
              <a
                href={href}
                aria-label={name}
                {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              >
                <Icon />
              </a>
            </Button>
          ))}
          <Button
            variant="link"
            className="text-muted-foreground"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            {t('backToTop')}
            <ArrowUp />
          </Button>
        </nav>
      </div>
    </footer>
  );
}

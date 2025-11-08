'use client';

import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Github, Linkedin, Mail, Heart, Code2, ArrowUp } from 'lucide-react';

export function Footer() {
  const t = useTranslations('footer');
  const tNav = useTranslations('nav');

  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: 'GitHub',
      icon: Github,
      href: 'https://github.com/cleytonmendest',
      ariaLabel: 'Visit GitHub profile',
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      href: 'https://www.linkedin.com/in/cleyton-mendes',
      ariaLabel: 'Visit LinkedIn profile',
    },
    {
      name: 'Email',
      icon: Mail,
      href: 'mailto:cleyton.mendest@gmail.com',
      ariaLabel: 'Send an email',
    },
  ];

  const quickLinks = [
    { label: tNav('home'), href: '#home' },
    { label: tNav('experience'), href: '#experience' },
    { label: tNav('projects'), href: '#projects' },
    { label: tNav('skills'), href: '#skills' },
    { label: tNav('contact'), href: '#contact' },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <footer className="bg-muted/30 border-t border-border">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-12 mb-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Code2 className="h-6 w-6 text-accent" />
              <span className="font-bold text-xl">Cleyton Mendes</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t('description')}
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-sm">{t('quickLinks')}</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-sm text-muted-foreground hover:text-accent transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-sm">{t('social')}</h3>
            <div className="flex gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <Button
                    key={social.name}
                    variant="outline"
                    size="icon"
                    asChild
                    aria-label={social.ariaLabel}
                  >
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:bg-accent hover:text-accent-foreground transition-colors"
                    >
                      <Icon className="h-5 w-5" />
                    </a>
                  </Button>
                );
              })}
            </div>
          </div>
        </div>

        <Separator className="mb-8" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>© {currentYear} Cleyton Mendes.</span>
            <span>{t('copyright')}</span>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>{t('madeWith')}</span>
            <Heart className="h-4 w-4 text-red-500 fill-red-500" />
            <span>{t('and')}</span>
            <Code2 className="h-4 w-4 text-accent" />
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={scrollToTop}
            className="gap-2 hover:text-accent"
          >
            {t('backToTop')}
            <ArrowUp className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </footer>
  );
}

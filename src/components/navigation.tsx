'use client';

import { useTranslations } from 'next-intl';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';
import { LanguageSwitcher } from '@/components/language-switcher';
import { Menu, X, Code2 } from 'lucide-react';
import { Link, usePathname } from '@/i18n/routing';

export function Navigation() {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // Every section lives on the home page; the links are anchors.
  const navItems = [
    { id: 'home', label: t('home'), href: '/#home' },
    { id: 'experience', label: t('experience'), href: '/#experience' },
    { id: 'projects', label: t('projects'), href: '/#projects' },
    { id: 'skills', label: t('skills'), href: '/#skills' },
    { id: 'certifications', label: t('certifications'), href: '/#certifications' },
    { id: 'contact', label: t('contact'), href: '/#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Only track sections on home page
      if (pathname === '/') {
        const sections = ['contact', 'certifications', 'skills', 'projects', 'experience', 'home'];
        const scrollPosition = window.scrollY + 150;

        for (const sectionId of sections) {
          const element = document.getElementById(sectionId);
          if (element && element.offsetTop <= scrollPosition) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    handleScroll(); // Call once on mount
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  // On the home page the active item follows the scroll position.
  const isActive = (item: (typeof navItems)[number]) =>
    pathname === '/' && activeSection === item.id;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-background/80 backdrop-blur-lg border-b border-border'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 font-bold text-xl hover:text-accent-ink transition-colors"
          >
            <Code2 className="h-6 w-6 text-accent-ink" />
            <span>CM</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className={`text-sm font-medium transition-colors hover:text-accent-ink ${
                  isActive(item)
                    ? 'text-accent-ink'
                    : 'text-muted-foreground'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Right side - Theme & Language */}
          <div className="hidden md:flex items-center gap-4">
            <LanguageSwitcher />
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? t('close') : t('menu')}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-lg">
          <div className="px-4 py-6 space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className={`block w-full text-left px-4 py-2 rounded-control transition-colors ${
                  isActive(item)
                    ? 'bg-accent text-accent-foreground'
                    : 'hover:bg-muted'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <div className="flex items-center justify-between pt-4 border-t border-border">
              <LanguageSwitcher />
              <ThemeToggle />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Download, Mail, ArrowRight } from 'lucide-react';

export function Hero() {
  const t = useTranslations('hero');

  const handleContactClick = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="max-w-6xl w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Text content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <p className="text-lg text-muted-foreground">
                {t('greeting')}
              </p>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
                {t('name')}
              </h1>
              <h2 className="text-3xl md:text-4xl font-semibold text-accent">
                {t('title')}
              </h2>
            </div>

            <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
              {t('description')}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="gap-2" asChild>
                <a href="/cleyton-mendes.pdf" download="Cleyton_Mendes.pdf">
                  <Download className="h-5 w-5" />
                  {t('cta.downloadCV')}
                </a>
              </Button>
              <Button size="lg" variant="outline" className="gap-2" onClick={handleContactClick}>
                <Mail className="h-5 w-5" />
                {t('cta.contact')}
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 pt-8">
              <Card>
                <CardContent className="pt-6">
                  <div className="text-3xl font-bold text-accent">
                    {t('yearsOfExperience')}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {t('experienceLabel')}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="text-3xl font-bold text-accent">
                    {t('projectsCompleted')}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {t('projectsLabel')}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Right side - Placeholder for photo/illustration */}
          <div className="hidden lg:flex items-center justify-center">
            <div className="relative">
              <div className="w-96 h-96 rounded-full bg-gradient-to-br from-accent/20 to-primary/10 flex items-center justify-center">
                <div className="w-80 h-80 rounded-full border-4 border-accent/20 flex items-center justify-center overflow-hidden bg-accent">
                  <Image
                    src="/cleyton-mende.png"
                    alt="Cleyton Mendes - Software Engineer"
                    width={320}
                    height={320}
                    className="absolute top-[-39px]"
                    priority
                  />
                </div>
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full bg-accent/20 animate-pulse" />
              <div className="absolute -bottom-4 -left-4 w-16 h-16 rounded-full bg-primary/20 animate-pulse delay-75" />
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="flex justify-center mt-16 lg:mt-24">
          <div className="flex flex-col items-center gap-2 text-muted-foreground animate-bounce">
            <span className="text-sm">Scroll down</span>
            <ArrowRight className="h-5 w-5 rotate-90" />
          </div>
        </div>
      </div>
    </section>
  );
}

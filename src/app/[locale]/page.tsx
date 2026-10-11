import { setRequestLocale } from 'next-intl/server';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { Hero } from '@/components/sections/hero';
import { Projects } from '@/components/sections/projects';
import { Experience } from '@/components/sections/experience';
import { Skills } from '@/components/sections/skills';
import { Certifications } from '@/components/sections/certifications';
import { About } from '@/components/sections/about';
import { Contact } from '@/components/sections/contact';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />

      <main id="main">
        <Hero />
        <Projects />
        <Experience />
        <Skills />
        <Certifications />
        <About />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}

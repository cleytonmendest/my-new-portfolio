import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { Hero } from '@/components/sections/hero';
import { ExperiencePreview } from '@/components/sections/experience-preview';
import { Projects } from '@/components/sections/projects';
import { Skills } from '@/components/sections/skills';
import { CertificationsPreview } from '@/components/sections/certifications-preview';
import { Contact } from '@/components/sections/contact';
import { Separator } from '@/components/ui/separator';
import { BackToTop } from '@/components/back-to-top';
import { ReadingProgress } from '@/components/reading-progress';
import { WhatsAppButton } from '@/components/whatsapp-button';

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <ReadingProgress />
      <Navigation />

      <main>
        <Hero />
        <Separator className="max-w-6xl mx-auto" />
        <ExperiencePreview />
        <Projects />
        <Skills />
        <CertificationsPreview />
        <Contact />
      </main>

      <Footer />
      <BackToTop />
      <WhatsAppButton />
    </div>
  );
}

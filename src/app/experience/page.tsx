import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { Experience } from '@/components/sections/experience';
import { BackToTop } from '@/components/back-to-top';

export default function ExperiencePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />
      <main className="pt-20">
        <Experience />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}

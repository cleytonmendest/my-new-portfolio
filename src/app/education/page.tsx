import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { Certifications } from '@/components/sections/certifications';
import { BackToTop } from '@/components/back-to-top';

export default function EducationPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />
      <main className="pt-20">
        <Certifications />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}

import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { Projects } from '@/components/sections/projects';
import { BackToTop } from '@/components/back-to-top';

export default function ProjectsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />
      <main className="pt-20">
        <Projects />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}

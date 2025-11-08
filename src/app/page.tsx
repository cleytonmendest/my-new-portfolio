import { Navigation } from '@/components/navigation';
import { Hero } from '@/components/sections/hero';
import { Experience } from '@/components/sections/experience';
import { Projects } from '@/components/sections/projects';
import { Skills } from '@/components/sections/skills';
import { Separator } from '@/components/ui/separator';

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />

      <main>
        <Hero />
        <Separator className="max-w-6xl mx-auto" />
        <Experience />
        <Projects />
        <Skills />
      </main>
    </div>
  );
}

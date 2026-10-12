import { setRequestLocale } from 'next-intl/server';
import {
  ContactConsole,
  EducationLog,
  ExperienceSteps,
  HomeHero,
  ProjectsGrid,
  StackPanel,
  StatsBand,
} from '@/components/home';

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  setRequestLocale((await params).locale);

  return (
    <main className="flex flex-1 flex-col gap-20 pb-20">
      <HomeHero />
      <StatsBand />
      <ExperienceSteps />
      <ProjectsGrid />
      <StackPanel />
      <EducationLog />
      <ContactConsole />
    </main>
  );
}

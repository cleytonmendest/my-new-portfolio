import {
  ContactConsole,
  EducationLog,
  ExperienceSteps,
  HomeHero,
  ProjectsGrid,
  StackPanel,
  StatsBand,
} from '@/components/home';

export default function HomePage() {
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

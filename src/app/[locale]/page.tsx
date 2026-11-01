import { setRequestLocale } from 'next-intl/server';
import { ProfilePageData } from '@/components/structured-data';
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
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="flex flex-1 flex-col gap-20 pb-20">
      <ProfilePageData locale={locale} />
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

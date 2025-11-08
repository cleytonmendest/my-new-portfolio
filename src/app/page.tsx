import { useTranslations } from 'next-intl';
import { ThemeToggle } from '@/components/theme-toggle';
import { LanguageSwitcher } from '@/components/language-switcher';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

export default function HomePage() {
  const t = useTranslations('nav');

  return (
    <div className="flex min-h-screen flex-col">
      <header className="fixed top-0 right-0 p-4 flex items-center gap-4 z-50">
        <LanguageSwitcher />
        <ThemeToggle />
      </header>

      <main className="flex flex-1 flex-col items-center justify-center gap-12 px-4 py-20">
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-bold tracking-tight">
            {t('home')}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Portfolio - Work in Progress
          </p>
        </div>

        <Separator className="max-w-xs" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl w-full">
          <Card>
            <CardHeader>
              <CardTitle>shadcn/ui Components</CardTitle>
              <CardDescription>Testing base components installation</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2 flex-wrap">
                <Badge>React</Badge>
                <Badge variant="secondary">TypeScript</Badge>
                <Badge variant="outline">Next.js</Badge>
              </div>
              <Button className="w-full">Primary Button</Button>
              <Button variant="outline" className="w-full">Outline Button</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Theme System</CardTitle>
              <CardDescription>Dark/Light mode support</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm text-muted-foreground">
                The theme system is working correctly with both light and dark modes.
              </p>
              <Badge variant="secondary" className="w-full justify-center py-2">
                Accent Color: #E6972E
              </Badge>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Internationalization</CardTitle>
              <CardDescription>EN/PT language support</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm text-muted-foreground">
                Cookie-based locale switching without URL changes.
              </p>
              <div className="flex gap-2">
                <Badge>English</Badge>
                <Badge>Português</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}

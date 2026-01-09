import Link from 'next/link';
import { ArrowLeft, Calendar, FileText } from 'lucide-react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { Separator } from '@/components/ui/separator';

interface LegalLayoutProps {
  children: React.ReactNode;
  title: string;
  lastUpdated: string;
  otherPageTitle: string;
  otherPageHref: string;
  tableOfContents?: React.ReactNode;
}

export function LegalLayout({
  children,
  title,
  lastUpdated,
  otherPageTitle,
  otherPageHref,
  tableOfContents,
}: LegalLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col mx-4">
      <Navigation />

      <main className="flex-1 mt-14 flex justify-center">
        <div className="container max-w-7xl py-8 md:py-12">
          {/* Breadcrumb */}
          <nav className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
            <Link
              href="/"
              className="hover:text-foreground transition-colors flex items-center gap-1"
            >
              <ArrowLeft className="h-4 w-4" />
              Início
            </Link>
            <span>/</span>
            <span>WhatsApp Bot</span>
            <span>/</span>
            <span className="text-foreground">{title}</span>
          </nav>

          {/* Header */}
          <header className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{title}</h1>

            <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>Última atualização: {lastUpdated}</span>
              </div>

              <Separator
                orientation="vertical"
                className="hidden sm:block h-4"
              />

              <Link
                href={otherPageHref}
                className="flex items-center gap-2 hover:text-foreground transition-colors"
              >
                <FileText className="h-4 w-4" />
                {otherPageTitle}
              </Link>
            </div>
          </header>

          <Separator className="mb-8" />

          {/* Content with TOC sidebar */}
          <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-8">
            {/* Table of Contents - Sidebar on desktop */}
            {tableOfContents && (
              <aside className="lg:order-1">
                {tableOfContents}
              </aside>
            )}

            {/* Main Content */}
            <article className="prose prose-neutral dark:prose-invert prose-headings:font-bold prose-h2:text-3xl prose-h3:text-2xl prose-p:text-base prose-li:text-base max-w-none lg:order-2">
              {children}
            </article>
          </div>

          {/* Footer Navigation */}
          <Separator className="my-8" />

          <nav className="flex flex-col sm:flex-row gap-4 justify-between">
            <Link
              href="/"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Voltar para o início
            </Link>

            <Link
              href={otherPageHref}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <FileText className="h-4 w-4" />
              Ver {otherPageTitle}
            </Link>
          </nav>

          {/* Contact */}
          <div className="mt-8 p-4 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground">
              <strong>Dúvidas sobre privacidade ou termos de uso?</strong>
              <br />
              Entre em contato conosco:{' '}
              <a
                href="mailto:contato@cleyton-mendes.com"
                className="text-primary hover:underline"
              >
                contato@cleyton-mendes.com
              </a>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

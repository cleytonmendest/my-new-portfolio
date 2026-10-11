import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';

export const metadata = {
  title: 'Ferramentas',
  robots: {
    index: false,
    follow: false,
  },
};

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />
      <main id="main" className="flex-1 container max-w-4xl mx-auto px-4 py-8">
        {children}
      </main>
      <Footer />
    </div>
  );
}

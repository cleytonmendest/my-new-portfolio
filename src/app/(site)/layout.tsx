import { Roboto, Roboto_Mono } from 'next/font/google';
import { MotionProvider, SiteFooter, SiteHeader, WhatsAppButton } from '@/components/terminal';

const roboto = Roboto({
  variable: '--font-terminal-sans',
  subsets: ['latin'],
});

const robotoMono = Roboto_Mono({
  variable: '--font-terminal-mono',
  subsets: ['latin'],
});

/**
 * Portfolio pages (home, experience, projects, education) in the terminal style: always dark,
 * scoped by `theme-terminal` so the tools and legal pages keep their own light/dark theme.
 */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      id="top"
      className={`${roboto.variable} ${robotoMono.variable} theme-terminal dark flex min-h-screen flex-col bg-console-black font-roboto text-console-white`}
    >
      <MotionProvider>
        <SiteHeader />
        {children}
        <SiteFooter />
        <WhatsAppButton />
      </MotionProvider>
    </div>
  );
}

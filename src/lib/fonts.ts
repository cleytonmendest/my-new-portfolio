import { Roboto, Roboto_Mono } from 'next/font/google';

/** Terminal design fonts, exposed as CSS variables read by `font-roboto` and `font-roboto-mono`. */
export const roboto = Roboto({
  variable: '--font-terminal-sans',
  subsets: ['latin'],
});

export const robotoMono = Roboto_Mono({
  variable: '--font-terminal-mono',
  subsets: ['latin'],
});

export const terminalFontVariables = `${roboto.variable} ${robotoMono.variable}`;

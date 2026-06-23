import type { Metadata } from 'next';
import { Barlow, Barlow_Condensed } from 'next/font/google';
import './globals.css';

const barlow = Barlow({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-barlow',
  display: 'swap',
});

const barlowCondensed = Barlow_Condensed({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-barlow-condensed',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Pump & Burn | Personal Trainer — Karachi',
    template: '%s | Pump & Burn',
  },
  description: 'Certified personal trainer and nutritionist based in Karachi, Pakistan. Transform your body with science-backed programs.',
  openGraph: {
    type: 'website',
    locale: 'en_PK',
    siteName: 'Pump & Burn',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${barlow.variable} ${barlowCondensed.variable}`}>{children}</body>
    </html>
  );
}

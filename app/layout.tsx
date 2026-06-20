import type { Metadata } from 'next';
import './globals.css';

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
      <body>{children}</body>
    </html>
  );
}

import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Alex Malik | Personal Trainer — Karachi',
  description: 'Certified personal trainer and nutritionist based in Karachi, Pakistan. Transform your body with science-backed programs.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

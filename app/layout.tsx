import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';

import { ActivityWrapper } from '@/components/activity-wrapper';
import { Sidebar } from '@/components/sidebar';
import { JotaiProvider } from '@/lib/providers';

import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Next.js Rendering Patterns Demo',
  description: 'Demonstrating different Next.js rendering patterns with professionals data',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <JotaiProvider>
          <div className="flex h-screen">
            <Sidebar />
            <main className="flex-1 overflow-hidden">
              <ActivityWrapper>{children}</ActivityWrapper>
            </main>
          </div>
        </JotaiProvider>
      </body>
    </html>
  );
}

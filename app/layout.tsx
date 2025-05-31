import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Provider } from 'jotai';
import { Sidebar } from '@/components/sidebar';
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Professionals Management",
  description: "A Next.js app for managing professionals data",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Provider>
          <div className="flex h-screen">
            <Sidebar />
            <main className="flex-1 overflow-hidden min-w-0">
              {children}
            </main>
          </div>
        </Provider>
      </body>
    </html>
  );
}

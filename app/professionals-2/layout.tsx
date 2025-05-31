import type { ReactNode } from 'react';

interface Professionals2LayoutProps {
  children: ReactNode;
}

export default function Professionals2Layout({ children }: Professionals2LayoutProps) {
  return (
    <div className="h-full overflow-auto">
      <div className="p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Professionals Page 2</h1>
            <p className="text-gray-600 mt-2">
              This page uses <strong>Static Site Generation (SSG)</strong> - data is fetched at build time and cached.
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Page revalidates every hour to ensure data freshness.
            </p>
          </div>
          
          <div className="w-full">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
} 
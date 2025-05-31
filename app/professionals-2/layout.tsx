import type { ReactNode } from 'react';

interface Professionals2LayoutProps {
  children: ReactNode;
}

export default function Professionals2Layout({ children }: Professionals2LayoutProps) {
  return (
    <div className="h-full overflow-auto">
      <div className="p-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Professionals Page 2</h1>
            <p className="mt-2 text-gray-600">
              This page uses <strong>Static Site Generation (SSG)</strong> - data is fetched at
              build time and cached.
            </p>
            <p className="mt-1 text-sm text-gray-500">
              Page revalidates every 5 minutes to ensure data freshness.
            </p>
          </div>

          <div className="w-full">{children}</div>
        </div>
      </div>
    </div>
  );
}

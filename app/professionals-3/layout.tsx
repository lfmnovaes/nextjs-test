import type { ReactNode } from 'react';

interface Professionals3LayoutProps {
  children: ReactNode;
}

export default function Professionals3Layout({ children }: Professionals3LayoutProps) {
  return (
    <div className="h-full overflow-auto">
      <div className="p-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Professionals Page 3</h1>
            <p className="mt-2 text-gray-600">
              This page uses <strong>Client-Side Rendering (CSR)</strong> - data is fetched in the
              browser using React hooks.
            </p>
            <p className="mt-1 text-sm text-gray-500">
              Data is managed with Jotai state management and cached in memory.
            </p>
          </div>

          <div className="w-full">{children}</div>
        </div>
      </div>
    </div>
  );
}

import type { ReactNode } from 'react';

interface Professionals1LayoutProps {
  children: ReactNode;
}

export default function Professionals1Layout({ children }: Professionals1LayoutProps) {
  return (
    <div className="h-full overflow-auto">
      <div className="p-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Professionals Page 1</h1>
            <p className="mt-2 text-gray-600">
              This page uses <strong>Server-Side Rendering (SSR)</strong> - data is fetched on each
              request.
            </p>
          </div>

          <div className="w-full">{children}</div>
        </div>
      </div>
    </div>
  );
}

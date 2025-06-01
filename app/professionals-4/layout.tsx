import type { ReactNode } from 'react';

interface Professionals4LayoutProps {
  children: ReactNode;
}

export default function Professionals4Layout({ children }: Professionals4LayoutProps) {
  return (
    <div className="h-full overflow-auto">
      <div className="p-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Professionals Page 4</h1>
            <p className="mt-2 text-gray-600">
              This page uses <strong>Partial Prerendering (PPR)</strong> - static shell with dynamic
              content streaming.
            </p>
            <p className="mt-1 text-sm text-gray-500">
              Static content loads instantly, dynamic content streams with fresh data.
            </p>
          </div>

          <div className="w-full">{children}</div>
        </div>
      </div>
    </div>
  );
}

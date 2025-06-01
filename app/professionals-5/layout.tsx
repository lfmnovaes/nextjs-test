import type { ReactNode } from 'react';

interface Professionals5LayoutProps {
  children: ReactNode;
}

export default function Professionals5Layout({ children }: Professionals5LayoutProps) {
  return (
    <div className="h-full overflow-auto">
      <div className="p-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Professionals Page 5</h1>
            <p className="mt-2 text-gray-600">
              This page uses <strong>React Activity API</strong> - preloading and state management
              for enhanced UX.
            </p>
            <p className="mt-1 text-sm text-gray-500">
              Demonstrates component preloading and state preservation patterns.
            </p>
          </div>

          <div className="w-full">{children}</div>
        </div>
      </div>
    </div>
  );
}

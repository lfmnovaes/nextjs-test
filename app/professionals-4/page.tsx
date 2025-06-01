import { Suspense } from 'react';

import { ProfessionalsTable } from '@/components/professionals-table';
import { fetchProfessionalsCached } from '@/lib/api';

// Enable PPR for this specific page
export const experimental_ppr = true;

// Dynamic component that will be streamed
async function DynamicProfessionalsContent() {
  // Using cached version with 5-minute revalidation for PPR
  const result = await fetchProfessionalsCached(undefined, 300);

  return result.match(
    (data) => (
      <div>
        <div className="mb-4 text-sm text-gray-600">
          <span className="rounded bg-purple-100 px-2 py-1 text-purple-800">
            {data.data.length} professionals loaded
          </span>
        </div>
        <ProfessionalsTable professionals={data.data} />
      </div>
    ),
    (error) => (
      <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-lg text-red-600">
        Error loading dynamic content: {error.message}
      </div>
    )
  );
}

// Loading skeleton for the dynamic content
function ProfessionalsTableSkeleton() {
  return (
    <div className="space-y-4">
      <div className="mb-4">
        <div className="h-6 w-48 animate-pulse rounded bg-gray-200"></div>
      </div>
      <div className="overflow-hidden rounded-lg border">
        <div className="bg-gray-50 p-4">
          <div className="grid grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-4 animate-pulse rounded bg-gray-200"></div>
            ))}
          </div>
        </div>
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="border-t p-4">
            <div className="grid grid-cols-4 gap-4">
              {Array.from({ length: 4 }).map((_, j) => (
                <div key={j} className="h-4 animate-pulse rounded bg-gray-100"></div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Professionals4() {
  return (
    <div>
      {/* Dynamic content - streamed */}
      <Suspense fallback={<ProfessionalsTableSkeleton />}>
        <DynamicProfessionalsContent />
      </Suspense>
    </div>
  );
}

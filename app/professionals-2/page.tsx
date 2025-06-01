import { ProfessionalsTable } from '@/components/professionals-table';
import { fetchProfessionalsCached } from '@/lib/api';

// This page uses Static Site Generation (SSG) with caching
// Data is fetched with a 5-minute cache revalidation
export const revalidate = 300; // 5 minutes

export default async function Professionals2() {
  // Using cached version with 5-minute revalidation
  const result = await fetchProfessionalsCached(undefined, 300);

  return result.match(
    (data) => (
      <div>
        <div className="mb-4 text-sm text-gray-600">
          <span className="rounded bg-green-100 px-2 py-1 text-green-800">
            {data.data.length} professionals loaded
          </span>
        </div>
        <ProfessionalsTable professionals={data.data} />
      </div>
    ),
    (error) => (
      <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-lg text-red-600">
        Error: {error.message}
      </div>
    )
  );
}

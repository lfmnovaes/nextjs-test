import { ProfessionalsTable } from '@/components/professionals-table';
import { fetchProfessionalsCached } from '@/lib/api';

// This page uses Static Site Generation (SSG) with caching
// Data is fetched with a 5-minute cache revalidation
export const revalidate = 300; // 5 minutes

export default async function Professionals2() {
  // Using cached version with 5-minute revalidation
  const result = await fetchProfessionalsCached(undefined, 300);

  return result.match(
    (data) => <ProfessionalsTable professionals={data.data} />,
    (error) => <div className="text-lg text-red-600">Error: {error.message}</div>
  );
}

import { ProfessionalsTable } from '@/components/professionals-table';
import { fetchProfessionals } from '@/lib/api';

// This page uses Static Site Generation (SSG)
// Data is fetched at build time and reused for each request
export const revalidate = 3600; // Revalidate every hour

export default async function Professionals2() {
  const result = await fetchProfessionals();
  
  return result.match(
    (data) => <ProfessionalsTable professionals={data.data} />,
    (error) => <div className="text-lg text-red-600">Error: {error.message}</div>
  );
} 
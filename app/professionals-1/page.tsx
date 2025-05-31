import { ProfessionalsTable } from '@/components/professionals-table';
import { fetchProfessionals } from '@/lib/api';

export default async function Professionals1() {
  // Server-side rendering - fetch data on each request
  const result = await fetchProfessionals();

  return result.match(
    (data) => <ProfessionalsTable professionals={data.data} />,
    (error) => <div className="text-lg text-red-600">Error: {error.message}</div>
  );
}

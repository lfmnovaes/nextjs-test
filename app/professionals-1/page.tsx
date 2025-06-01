import { ProfessionalsTable } from '@/components/professionals-table';
import { fetchProfessionals } from '@/lib/api';

export default async function Professionals1() {
  // Server-side rendering - fetch data on each request
  const result = await fetchProfessionals();

  return result.match(
    (data) => (
      <div>
        <div className="mb-4 text-sm text-gray-600">
          <span className="rounded bg-blue-100 px-2 py-1 text-blue-800">
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

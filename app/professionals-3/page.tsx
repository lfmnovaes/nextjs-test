'use client';

import { useEffect, useState } from 'react';

import { ProfessionalsTable } from '@/components/professionals-table';
import { fetchProfessionalsClient } from '@/lib/api';
import type { Professional } from '@/lib/types';

export default function Professionals3() {
  const [professionals, setProfessionals] = useState<Professional[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProfessionalsClient().then((result) => {
      result.match(
        (data) => {
          setProfessionals(data.data);
          setLoading(false);
        },
        (err) => {
          setError(err.message);
          setLoading(false);
        }
      );
    });
  }, []);

  if (loading) {
    return <div className="text-lg text-gray-600">Loading professionals...</div>;
  }

  if (error) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-lg text-red-600">
        Error: {error}
      </div>
    );
  }

  return (
    <div>
      <div className="mb-4 text-sm text-gray-600">
        <span className="rounded bg-orange-100 px-2 py-1 text-orange-800">
          {professionals.length} professionals loaded
        </span>
      </div>
      <ProfessionalsTable professionals={professionals} />
    </div>
  );
}

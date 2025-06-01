'use client';

import { useRef, useState } from 'react';

import { ProfessionalsTable } from '@/components/professionals-table';
import { fetchProfessionalsClient } from '@/lib/api';
import type { Professional } from '@/lib/types';

export default function Professionals5() {
  const [professionals, setProfessionals] = useState<Professional[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const hasStartedLoading = useRef(false);
  const hasLoggedDataLoad = useRef(false);
  const lastRenderState = useRef<{ loading: boolean; count: number }>({ loading: true, count: 0 });

  // Start loading immediately when component renders (works even when Activity is hidden)
  if (!hasStartedLoading.current && typeof window !== 'undefined') {
    hasStartedLoading.current = true;
    console.log('[Activity Page] Component rendered, starting data fetch...');

    fetchProfessionalsClient().then((result) => {
      result.match(
        (data) => {
          if (!hasLoggedDataLoad.current) {
            console.log(
              '[Activity Page] Data loaded successfully:',
              data.data.length,
              'professionals'
            );
            hasLoggedDataLoad.current = true;
          }
          setProfessionals(data.data);
          setLoading(false);
        },
        (err) => {
          console.error('[Activity Page] Data loading failed:', err.message);
          setError(err.message);
          setLoading(false);
        }
      );
    });
  }

  // Only log when state actually changes
  const currentState = { loading, count: professionals.length };
  if (
    currentState.loading !== lastRenderState.current.loading ||
    currentState.count !== lastRenderState.current.count
  ) {
    console.log(
      '[Activity Page] State changed - loading:',
      loading,
      'data count:',
      professionals.length
    );
    lastRenderState.current = currentState;
  }

  if (loading) {
    return (
      <div className="text-lg text-gray-600">
        <div className="flex items-center space-x-2">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-purple-600 border-t-transparent"></div>
          <span>Loading professionals (Activity pre-rendered)...</span>
        </div>
      </div>
    );
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
        <span className="rounded bg-purple-100 px-2 py-1 text-purple-800">
          {professionals.length} professionals loaded (Activity pre-rendered)
        </span>
      </div>
      <ProfessionalsTable professionals={professionals} />
    </div>
  );
}

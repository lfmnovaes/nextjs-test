'use client';

import { useEffect } from 'react';

import { ProfessionalsTable } from '@/components/professionals-table';
import { useProfessionals } from '@/lib/hooks/use-professionals';

export default function Professionals3() {
  const { professionals, loading, error, loadProfessionals } = useProfessionals();

  useEffect(() => {
    loadProfessionals();
  }, [loadProfessionals]);

  if (loading) {
    return <div className="text-lg">Loading professionals...</div>;
  }

  if (error) {
    return <div className="text-lg text-red-600">Error: {error}</div>;
  }

  return <ProfessionalsTable professionals={professionals} />;
}

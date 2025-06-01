import { useAtom } from 'jotai';

import { useCallback, useEffect, useRef } from 'react';

import { fetchProfessionalsClient } from '@/lib/api';
import {
  professionalsArrayAtom,
  professionalsErrorAtom,
  professionalsLoadingAtom,
  setErrorAtom,
  setLoadingAtom,
  setProfessionalsAtom,
} from '@/lib/store';

// Global flag to prevent duplicate API calls
let isLoadingGlobally = false;

export function useProfessionals() {
  const [professionals] = useAtom(professionalsArrayAtom);
  const [loading] = useAtom(professionalsLoadingAtom);
  const [error] = useAtom(professionalsErrorAtom);
  const [, setProfessionals] = useAtom(setProfessionalsAtom);
  const [, setLoading] = useAtom(setLoadingAtom);
  const [, setError] = useAtom(setErrorAtom);
  const componentId = useRef(Math.random().toString(36).substr(2, 9));

  // Debug state changes
  useEffect(() => {
    console.log(`[useProfessionals:${componentId.current}] State changed:`, {
      professionalsCount: professionals.length,
      loading,
      error,
    });
  }, [professionals.length, loading, error]);

  const loadProfessionals = useCallback(async () => {
    // Prevent duplicate calls
    if (isLoadingGlobally || loading || professionals.length > 0) {
      console.log(
        `[useProfessionals:${componentId.current}] Skipping load - already loading or data exists`
      );
      return;
    }

    console.log(`[useProfessionals:${componentId.current}] Starting to load professionals...`);
    isLoadingGlobally = true;
    setLoading(true);
    setError(null);

    try {
      const result = await fetchProfessionalsClient();

      result.match(
        (data) => {
          console.log(
            `[useProfessionals:${componentId.current}] Successfully loaded`,
            data.data.length,
            'professionals'
          );
          setProfessionals(data.data);
        },
        (error) => {
          console.error(
            `[useProfessionals:${componentId.current}] Failed to load professionals:`,
            error.message
          );
          setError(error.message);
        }
      );
    } finally {
      setLoading(false);
      isLoadingGlobally = false;
    }
  }, [setProfessionals, setLoading, setError, loading, professionals.length]);

  return {
    professionals,
    loading,
    error,
    loadProfessionals,
  };
}

import { useAtom } from 'jotai';
import { useCallback } from 'react';
import { fetchProfessionalsClient } from '@/lib/api';
import {
  professionalsArrayAtom,
  professionalsLoadingAtom,
  professionalsErrorAtom,
  setProfessionalsAtom,
  setLoadingAtom,
  setErrorAtom,
} from '@/lib/store';

export function useProfessionals() {
  const [professionals] = useAtom(professionalsArrayAtom);
  const [loading] = useAtom(professionalsLoadingAtom);
  const [error] = useAtom(professionalsErrorAtom);
  const [, setProfessionals] = useAtom(setProfessionalsAtom);
  const [, setLoading] = useAtom(setLoadingAtom);
  const [, setError] = useAtom(setErrorAtom);

  const loadProfessionals = useCallback(async () => {
    setLoading(true);
    setError(null);

    const result = await fetchProfessionalsClient();

    result.match(
      (data) => {
        setProfessionals(data.data);
      },
      (error) => {
        setError(error.message);
      }
    );

    setLoading(false);
  }, [setProfessionals, setLoading, setError]);

  return {
    professionals,
    loading,
    error,
    loadProfessionals,
  };
} 
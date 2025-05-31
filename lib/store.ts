import { atom } from 'jotai';
import type { Professional } from '@/lib/types';

// Atom to store professionals as a Map (id -> Professional)
export const professionalsMapAtom = atom<Map<string, Professional>>(new Map());

// Derived atom to get all professionals as an array
export const professionalsArrayAtom = atom((get) => {
  const professionalsMap = get(professionalsMapAtom);
  return Array.from(professionalsMap.values());
});

// Derived atom to get a specific professional by id
export const getProfessionalByIdAtom = atom(
  null,
  (get, set, id: string) => {
    const professionalsMap = get(professionalsMapAtom);
    return professionalsMap.get(id);
  }
);

// Atom to track loading state
export const professionalsLoadingAtom = atom<boolean>(false);

// Atom to track error state
export const professionalsErrorAtom = atom<string | null>(null);

// Action atom to set professionals data
export const setProfessionalsAtom = atom(
  null,
  (get, set, professionals: Professional[]) => {
    const newMap = new Map<string, Professional>();
    professionals.forEach(professional => {
      newMap.set(professional.id, professional);
    });
    set(professionalsMapAtom, newMap);
    set(professionalsErrorAtom, null);
  }
);

// Action atom to set loading state
export const setLoadingAtom = atom(
  null,
  (get, set, loading: boolean) => {
    set(professionalsLoadingAtom, loading);
  }
);

// Action atom to set error state
export const setErrorAtom = atom(
  null,
  (get, set, error: string | null) => {
    set(professionalsErrorAtom, error);
  }
); 
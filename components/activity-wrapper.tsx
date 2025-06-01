'use client';

import { unstable_Activity as Activity } from 'react';
import { useEffect, useRef } from 'react';

import { usePathname } from 'next/navigation';

import Professionals5Layout from '@/app/professionals-5/layout';
import Professionals5Page from '@/app/professionals-5/page';

interface ActivityWrapperProps {
  children: React.ReactNode;
}

export function ActivityWrapper({ children }: ActivityWrapperProps) {
  const pathname = usePathname();
  const isOnProfessionals5 = pathname === '/professionals-5';
  const lastLoggedState = useRef<{ pathname: string; mode: string }>({ pathname: '', mode: '' });

  useEffect(() => {
    const currentMode = isOnProfessionals5 ? 'visible' : 'hidden';

    // Only log when pathname or mode actually changes
    if (
      pathname !== lastLoggedState.current.pathname ||
      currentMode !== lastLoggedState.current.mode
    ) {
      console.log('[Activity] Pathname changed to:', pathname);
      console.log('[Activity] Mode:', currentMode);
      lastLoggedState.current = { pathname, mode: currentMode };
    }
  }, [pathname, isOnProfessionals5]);

  return (
    <>
      {/* Render normal routes when not on professionals-5 */}
      {!isOnProfessionals5 && children}

      {/* Single Activity component that transitions between hidden/visible */}
      <Activity mode={isOnProfessionals5 ? 'visible' : 'hidden'}>
        <Professionals5Layout>
          <Professionals5Page />
        </Professionals5Layout>
      </Activity>
    </>
  );
}

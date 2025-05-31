'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';

import { Button } from './ui/button';

const navigationItems = [
  { href: '/', label: 'Main Page' },
  { href: '/professionals-1', label: 'Professionals Page 1' },
  { href: '/professionals-2', label: 'Professionals Page 2' },
  { href: '/professionals-3', label: 'Professionals Page 3' },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="h-screen w-64 max-w-64 min-w-48 flex-shrink-0 border-r border-gray-200 bg-gray-50 p-4">
      <div className="space-y-2">
        <h2 className="mb-4 text-lg font-semibold text-gray-900">Navigation</h2>
        {navigationItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.href} href={item.href} className="block">
              <Button
                variant={isActive ? 'default' : 'ghost'}
                className={cn(
                  'w-full justify-start text-sm',
                  isActive && 'bg-primary text-primary-foreground'
                )}
              >
                {item.label}
              </Button>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

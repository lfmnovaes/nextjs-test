'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';

const navigationItems = [
  { href: '/', label: 'Main Page' },
  { href: '/professionals-1', label: 'Professionals Page 1' },
  { href: '/professionals-2', label: 'Professionals Page 2' },
  { href: '/professionals-3', label: 'Professionals Page 3' },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 min-w-48 max-w-64 bg-gray-50 border-r border-gray-200 h-screen p-4 flex-shrink-0">
      <div className="space-y-2">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Navigation</h2>
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
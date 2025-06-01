'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import type { Professional } from '@/lib/types';

interface ProfessionalsTableProps {
  professionals: Professional[];
}

export function ProfessionalsTable({ professionals }: ProfessionalsTableProps) {
  if (!professionals || professionals.length === 0) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-lg text-gray-500">No professionals found.</div>
      </div>
    );
  }

  const formatExperience = (years: number | null): string => {
    if (years === null || years === undefined) return 'N/A';
    return years === 1 ? '1 year' : `${years} years`;
  };

  const formatServices = (services: Professional['services']): string => {
    if (!services || services.length === 0) return 'No services';

    const firstService = services[0].name;
    const additionalCount = services.length - 1;

    if (additionalCount === 0) {
      return firstService;
    }

    return `${firstService} +${additionalCount}`;
  };

  return (
    <div className="w-full overflow-auto">
      <div className="min-w-[800px] rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-16">Avatar</TableHead>
              <TableHead className="min-w-[150px]">Name</TableHead>
              <TableHead className="min-w-[100px]">Type</TableHead>
              <TableHead className="min-w-[200px]">Email</TableHead>
              <TableHead className="min-w-[120px]">Phone</TableHead>
              <TableHead className="min-w-[100px]">Experience</TableHead>
              <TableHead className="min-w-[200px]">Services</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {professionals.map((professional) => (
              <TableRow key={professional.id}>
                <TableCell>
                  <Avatar>
                    <AvatarImage src={professional.photo || undefined} alt={professional.name} />
                    <AvatarFallback>{professional.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell className="font-medium">{professional.name}</TableCell>
                <TableCell>{professional.type}</TableCell>
                <TableCell>{professional.email}</TableCell>
                <TableCell>{professional.phoneNumber}</TableCell>
                <TableCell>{formatExperience(professional.yearsOfExperience)}</TableCell>
                <TableCell>
                  <div className="inline-block rounded bg-gray-100 px-2 py-1 text-sm">
                    {formatServices(professional.services)}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

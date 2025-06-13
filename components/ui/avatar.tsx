'use client';

import * as AvatarPrimitive from '@radix-ui/react-avatar';

import * as React from 'react';

import Image from 'next/image';

import { cn } from '@/lib/utils';

function Avatar({ className, ...props }: React.ComponentProps<typeof AvatarPrimitive.Root>) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      className={cn('relative flex size-8 shrink-0 overflow-hidden rounded-full', className)}
      {...props}
    />
  );
}

interface AvatarImageProps extends Omit<React.ComponentProps<typeof AvatarPrimitive.Image>, 'src'> {
  src?: string | null;
  alt?: string;
}

function AvatarImage({ className, src, alt, onLoadingStatusChange, ...props }: AvatarImageProps) {
  const isValidSrc = src && typeof src === 'string' && src.trim() !== '';

  if (isValidSrc) {
    return (
      <Image
        src={src}
        alt={alt || ''}
        fill
        sizes="64px"
        quality={95}
        className={cn('object-cover', className)}
        onError={() => onLoadingStatusChange?.('error')}
        onLoad={() => onLoadingStatusChange?.('loaded')}
      />
    );
  }

  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn('size-full object-cover', className)}
      src={isValidSrc ? src : undefined}
      alt={alt}
      onLoadingStatusChange={onLoadingStatusChange}
      {...props}
    />
  );
}

function AvatarFallback({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Fallback>) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn('bg-muted flex size-full items-center justify-center rounded-full', className)}
      {...props}
    />
  );
}

export { Avatar, AvatarImage, AvatarFallback };

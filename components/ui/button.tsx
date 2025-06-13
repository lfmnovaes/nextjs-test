import { Slot } from '@radix-ui/react-slot';
import { type VariantProps, cva } from 'class-variance-authority';

import * as React from 'react';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  "focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive relative inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-md text-sm font-medium whitespace-nowrap transition-all duration-150 outline-none focus-visible:ring-[3px] active:scale-95 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-xs',
        destructive:
          'bg-destructive hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60 text-white shadow-xs',
        outline:
          'bg-background hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 border shadow-xs',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-xs',
        ghost: 'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-9 px-4 py-2 has-[>svg]:px-3',
        sm: 'h-8 gap-1.5 rounded-md px-3 has-[>svg]:px-2.5',
        lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
        icon: 'size-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

interface RippleProps {
  x: number;
  y: number;
  variant: string;
}

function Ripple({ x, y, variant }: RippleProps) {
  const rippleColor = React.useMemo(() => {
    switch (variant) {
      case 'default':
        return 'bg-primary-foreground/30';
      case 'destructive':
        return 'bg-white/30';
      case 'outline':
        return 'bg-accent-foreground/20';
      case 'secondary':
        return 'bg-secondary-foreground/30';
      case 'ghost':
        return 'bg-accent-foreground/20';
      case 'link':
        return 'bg-primary/20';
      default:
        return 'bg-white/30';
    }
  }, [variant]);

  return (
    <span
      className={cn('pointer-events-none absolute animate-ping rounded-full', rippleColor)}
      style={{
        left: x - 10,
        top: y - 10,
        width: 20,
        height: 20,
        animationDuration: '600ms',
        animationIterationCount: 1,
      }}
    />
  );
}

function Button({
  className,
  variant = 'default',
  size,
  asChild = false,
  onClick,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const [ripples, setRipples] = React.useState<RippleProps[]>([]);
  const buttonRef = React.useRef<HTMLButtonElement>(null);

  const handleClick = React.useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      if (buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const newRipple: RippleProps = {
          x,
          y,
          variant: variant || 'default',
        };

        setRipples((prev) => [...prev, newRipple]);

        // Remove ripple after animation
        setTimeout(() => {
          setRipples((prev) => prev.slice(1));
        }, 600);
      }

      onClick?.(event);
    },
    [onClick, variant]
  );

  const Comp = asChild ? Slot : 'button';

  if (asChild) {
    return (
      <Comp
        data-slot="button"
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      />
    );
  }

  return (
    <Comp
      ref={buttonRef}
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      onClick={handleClick}
      {...props}
    >
      {props.children}
      {ripples.map((ripple, index) => (
        <Ripple key={index} {...ripple} />
      ))}
    </Comp>
  );
}

export { Button, buttonVariants };

// =============================================================================
// Badge Component - DaisyUI Badge wrapper
// =============================================================================

import React from 'react';
import { cn } from '@/lib/utils';

type BadgeVariant =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'accent'
  | 'info'
  | 'success'
  | 'warning'
  | 'error'
  | 'ghost'
  | 'outline';

type BadgeSize = 'xs' | 'sm' | 'md' | 'lg';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  outline?: boolean;
  className?: string;
}

const variantClasses: Record<BadgeVariant, string> = {
  default: 'badge-neutral',
  primary: 'badge-primary',
  secondary: 'badge-secondary',
  accent: 'badge-accent',
  info: 'badge-info',
  success: 'badge-success',
  warning: 'badge-warning',
  error: 'badge-error',
  ghost: 'badge-ghost',
  outline: 'badge-outline',
};

const sizeClasses: Record<BadgeSize, string> = {
  xs: 'badge-xs',
  sm: 'badge-sm',
  md: 'badge-md',
  lg: 'badge-lg',
};

export function Badge({
  children,
  variant = 'default',
  size = 'md',
  outline = false,
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        'badge',
        variantClasses[variant],
        sizeClasses[size],
        outline && 'badge-outline',
        className
      )}
    >
      {children}
    </span>
  );
}

export default Badge;

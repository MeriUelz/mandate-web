import React from 'react';
import { cn } from '~/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  children: React.ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: ButtonProps) {
  const baseClasses = 'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-neutral-900 text-white hover:bg-neutral-800 focus:ring-neutral-600 shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-[0.98]',
    secondary: 'bg-neutral-50 text-neutral-900 hover:bg-neutral-100 focus:ring-neutral-500 shadow-sm border border-neutral-200 hover:shadow-md hover:scale-[1.02] active:scale-[0.98]',
    outline: 'border border-neutral-300 text-neutral-800 hover:bg-neutral-50 focus:ring-neutral-500 hover:shadow-sm hover:scale-[1.02] active:scale-[0.98]',
    ghost: 'text-neutral-700 hover:text-neutral-900 hover:bg-neutral-50 focus:ring-neutral-500 hover:scale-[1.02] active:scale-[0.98]'
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2.5 text-sm',
    lg: 'px-6 py-3 text-base',
    xl: 'px-8 py-4 text-lg'
  };

  return (
    <button
      className={cn(
        baseClasses,
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

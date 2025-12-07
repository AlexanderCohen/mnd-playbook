import * as React from 'react';
import { cn } from '@/lib/utils/cn';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          // Base styles
          'inline-flex items-center justify-center rounded-xl font-semibold transition-all',
          // Focus states - larger ring for eye gaze visibility
          'focus:outline-none focus-visible:ring-4 focus-visible:ring-offset-2',
          // Disabled states
          'disabled:pointer-events-none disabled:opacity-50',
          // Active state feedback
          'active:scale-[0.98]',
          // Variant styles
          {
            'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 focus-visible:ring-blue-300':
              variant === 'primary',
            'bg-gray-100 text-gray-900 hover:bg-gray-200 active:bg-gray-300 focus-visible:ring-gray-300':
              variant === 'secondary',
            'hover:bg-gray-100 active:bg-gray-200 focus-visible:ring-gray-300':
              variant === 'ghost',
          },
          // Size styles - larger minimum sizes for eye gaze accessibility
          {
            'h-10 min-w-[44px] px-4 text-sm': size === 'sm',
            'h-12 min-w-[48px] px-5 text-base': size === 'md',
            'h-14 min-w-[56px] px-6 text-lg': size === 'lg',
          },
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

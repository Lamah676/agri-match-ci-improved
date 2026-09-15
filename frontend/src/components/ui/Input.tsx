import React from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helpText?: string;
}

export function Input({
  label,
  error,
  helpText,
  className,
  id,
  ...props
}: InputProps) {
  const inputId = id || `input-${Math.random()}`;

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={cn(
          'w-full px-4 py-2 border rounded-lg',
          'dark:bg-gray-700 dark:border-gray-600 dark:text-white',
          'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent',
          'transition-all duration-200',
          error ? 'border-danger focus:ring-danger' : 'border-gray-300',
          className
        )}
        {...props}
      />
      {error && <p className="text-sm text-danger mt-1">{error}</p>}
      {helpText && <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{helpText}</p>}
    </div>
  );
}

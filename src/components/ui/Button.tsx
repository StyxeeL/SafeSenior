import type { ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-primary text-white hover:bg-primary-dark focus:ring-primary-dark',
  secondary:
    'bg-success text-white hover:opacity-90 focus:ring-success',
  outline:
    'border-2 border-primary text-primary bg-transparent hover:bg-primary-light focus:ring-primary',
  danger:
    'bg-danger text-white hover:opacity-90 focus:ring-danger',
  ghost:
    'bg-transparent text-primary hover:bg-primary-light focus:ring-primary',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'min-h-touch px-4 py-2 text-base rounded-xl',
  md: 'min-h-touch px-5 py-2.5 text-lg rounded-2xl',
  lg: 'min-h-[64px] px-6 py-3 text-lg rounded-2xl',
};

export function Button({
  children,
  variant = 'primary',
  size = 'lg',
  fullWidth = false,
  leftIcon,
  rightIcon,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={[
        'inline-flex items-center justify-center gap-3 font-semibold',
        'transition-colors duration-200',
        'focus:outline-none focus:ring-4 focus:ring-opacity-50',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        variantClasses[variant],
        sizeClasses[size],
        fullWidth ? 'w-full' : '',
        className,
      ].join(' ')}
      disabled={disabled}
      {...props}
    >
      {leftIcon && <span aria-hidden="true">{leftIcon}</span>}
      {children}
      {rightIcon && <span aria-hidden="true">{rightIcon}</span>}
    </button>
  );
}

import type { ButtonHTMLAttributes, ReactNode } from 'react';

/**
 * C2 · Botones de la guía de estilo v2
 * - primary: oscuro (Tinta)
 * - outline: secundario con borde
 * - safe: verde seguro («Salir seguro», confirmar una salida)
 * - danger: solo para acciones de peligro
 * - Bloqueado: borde punteado; el texto debe explicar por qué (D5)
 * Altura 60 dp (lg) o 56 dp (md/sm).
 */
type ButtonVariant = 'primary' | 'secondary' | 'safe' | 'outline' | 'danger' | 'ghost';
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
  primary: 'bg-primary text-white border-2 border-primary hover:bg-primary-dark',
  secondary: 'bg-success text-white border-2 border-success hover:brightness-110',
  safe: 'bg-success text-white border-2 border-success hover:brightness-110',
  outline: 'bg-surface text-text border-2 border-gray-300 hover:border-primary hover:bg-primary-light',
  danger: 'bg-danger text-white border-2 border-danger hover:brightness-110',
  ghost: 'bg-transparent text-text border-2 border-transparent hover:bg-primary-light',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'min-h-touch px-4 py-2 text-base rounded-xl',
  md: 'min-h-touch px-5 py-2.5 text-lg rounded-2xl',
  lg: 'min-h-btn px-6 py-3 text-lg rounded-2xl',
};

const disabledClasses =
  'disabled:bg-gray-100 disabled:text-text-muted disabled:border-dashed disabled:border-gray-400 disabled:cursor-not-allowed disabled:hover:brightness-100';

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
        'inline-flex items-center justify-center gap-3 font-bold text-center',
        'transition-colors duration-200',
        'focus:outline-none focus-visible:ring-4 focus-visible:ring-info/40',
        variantClasses[variant],
        sizeClasses[size],
        disabledClasses,
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

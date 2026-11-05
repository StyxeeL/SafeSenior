type BadgeVariant = 'default' | 'success' | 'warning' | 'danger' | 'info';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
}

// Colores con significado fijo (guía de estilo v2)
const variantClasses: Record<BadgeVariant, string> = {
  default: 'bg-gray-100 text-text',
  success: 'bg-success-light text-success',
  warning: 'bg-warning-light text-warning',
  danger: 'bg-danger-light text-danger',
  info: 'bg-info-light text-info',
};

export function Badge({ children, variant = 'default' }: BadgeProps) {
  return (
    <span
      className={[
        'inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-bold',
        variantClasses[variant],
      ].join(' ')}
    >
      {children}
    </span>
  );
}

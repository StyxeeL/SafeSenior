type BadgeVariant = 'default' | 'success' | 'warning' | 'danger' | 'info';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
}

const variantClasses: Record<BadgeVariant, string> = {
  default: 'bg-gray-100 text-text',
  success: 'bg-green-100 text-success',
  warning: 'bg-yellow-100 text-warning',
  danger: 'bg-red-100 text-danger',
  info: 'bg-blue-100 text-primary',
};

export function Badge({ children, variant = 'default' }: BadgeProps) {
  return (
    <span
      className={[
        'inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold',
        variantClasses[variant],
      ].join(' ')}
    >
      {children}
    </span>
  );
}

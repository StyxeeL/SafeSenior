import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  role?: string;
  ariaLabel?: string;
}

export function Card({
  children,
  className = '',
  onClick,
  role,
  ariaLabel,
}: CardProps) {
  const isClickable = typeof onClick === 'function';

  return (
    <div
      className={[
        'bg-surface rounded-2xl p-5 shadow-card',
        'border border-transparent',
        isClickable
          ? 'cursor-pointer hover:shadow-lg hover:border-primary/20 active:scale-[0.99] transition-all duration-200'
          : '',
        className,
      ].join(' ')}
      onClick={onClick}
      role={isClickable ? role || 'button' : role}
      aria-label={ariaLabel}
      tabIndex={isClickable ? 0 : undefined}
      onKeyDown={
        isClickable
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onClick();
              }
            }
          : undefined
      }
    >
      {children}
    </div>
  );
}

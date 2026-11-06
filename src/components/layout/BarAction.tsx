import type { LucideIcon } from 'lucide-react';

interface BarActionProps {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
  /** 'safe' = verde seguro, solo para «Salir seguro» */
  tone?: 'neutral' | 'safe';
  pressed?: boolean;
  ariaLabel?: string;
  /** Color del ícono en estado normal (p. ej. 'text-info') */
  iconClass?: string;
}

/**
 * Botón de la barra superior (C1). Siempre ícono + texto (CQ5) y
 * al menos 56 × 56 dp (CQ3).
 */
export function BarAction({
  icon: Icon,
  label,
  onClick,
  tone = 'neutral',
  pressed,
  ariaLabel,
  iconClass = '',
}: BarActionProps) {
  const isSafe = tone === 'safe';
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      aria-pressed={pressed}
      className={[
        'shrink-0 min-h-touch min-w-[56px] px-2.5 py-1.5 rounded-2xl',
        'flex items-center justify-center gap-1.5 font-bold leading-tight',
        'focus:outline-none focus-visible:ring-4 focus-visible:ring-info/40 transition-colors',
        isSafe
          ? 'bg-success text-white hover:brightness-110 shadow-sm'
          : pressed
          ? 'bg-primary text-white border-2 border-primary'
          : 'bg-surface text-text border-2 border-gray-200 hover:border-primary',
        isSafe ? 'flex-row text-sm' : 'flex-col text-xs',
      ].join(' ')}
    >
      <Icon size={22} strokeWidth={2.4} aria-hidden="true" className={!isSafe && !pressed ? iconClass : ''} />
      <span className={isSafe ? 'text-left max-w-[4.2rem]' : ''}>{label}</span>
    </button>
  );
}

import { AlertTriangle, Check } from 'lucide-react';

interface PistaTagProps {
  number: number;
  label: string;
  reviewed: boolean;
  /** Si no hay onClick, la etiqueta solo se muestra (paso Decidir) */
  onClick?: () => void;
}

/**
 * C4 · Etiqueta de pista: ⚠ + número + texto en ámbar; pasa a verde con ✓
 * cuando se revisa (D6). Tocable de al menos 48 dp de alto.
 */
export function PistaTag({ number, label, reviewed, onClick }: PistaTagProps) {
  const classes = [
    'inline-flex items-center gap-1.5 rounded-full border-2 font-bold text-sm px-3',
    onClick ? 'min-h-[48px]' : 'min-h-[36px]',
    reviewed
      ? 'bg-success-light border-success text-success'
      : 'bg-warning-light border-warning text-warning',
    onClick ? 'hover:brightness-95 focus:outline-none focus-visible:ring-4 focus-visible:ring-info/40' : '',
  ].join(' ');

  const content = (
    <>
      {reviewed ? (
        <Check size={18} strokeWidth={3} aria-hidden="true" />
      ) : (
        <AlertTriangle size={18} aria-hidden="true" />
      )}
      <span className="tabular-nums">{number}</span>
      <span>{label}</span>
      {reviewed && <span className="sr-only">(revisada)</span>}
    </>
  );

  if (!onClick) return <span className={classes}>{content}</span>;
  return (
    <button type="button" className={classes} onClick={onClick} aria-pressed={reviewed}>
      {content}
    </button>
  );
}

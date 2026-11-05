import { CheckCircle2, XCircle } from 'lucide-react';

interface OptionCardProps {
  letter: string;
  label: string;
  selected: boolean;
  /** Después de confirmar: muestra si era la opción segura */
  result?: 'correct' | 'incorrect' | 'safe-answer';
  disabled?: boolean;
  onSelect: () => void;
}

/**
 * C3 · Opción de respuesta: toda la tarjeta es tocable (≥ 72 dp), letra
 * A/B/C en azul información y texto en negrita. Se puede cambiar antes de
 * confirmar (D4, CQ8).
 */
export function OptionCard({ letter, label, selected, result, disabled, onSelect }: OptionCardProps) {
  const tone =
    result === 'correct' || result === 'safe-answer'
      ? 'border-success bg-success-light'
      : result === 'incorrect'
      ? 'border-danger bg-danger-light'
      : selected
      ? 'border-primary bg-primary-light ring-2 ring-primary'
      : 'border-gray-200 bg-surface hover:border-primary';

  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      disabled={disabled}
      onClick={onSelect}
      className={[
        'w-full min-h-[72px] text-left rounded-2xl border-2 p-3 flex items-center gap-3 transition-colors',
        'focus:outline-none focus-visible:ring-4 focus-visible:ring-info/40 disabled:cursor-default',
        tone,
      ].join(' ')}
    >
      <span
        className={[
          'shrink-0 w-11 h-11 rounded-xl flex items-center justify-center font-bold text-lg',
          selected && !result ? 'bg-primary text-white' : 'bg-info-light text-info',
        ].join(' ')}
        aria-hidden="true"
      >
        {letter}
      </span>
      <span className="flex-1 font-bold text-base text-text">{label}</span>
      {(result === 'correct' || result === 'safe-answer') && (
        <CheckCircle2 size={28} className="text-success shrink-0" aria-label="Opción segura" />
      )}
      {result === 'incorrect' && <XCircle size={28} className="text-danger shrink-0" aria-label="Opción peligrosa" />}
    </button>
  );
}

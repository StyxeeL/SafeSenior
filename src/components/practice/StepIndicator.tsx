import { Check } from 'lucide-react';

export const PRACTICE_STEPS = ['Mirar', 'Pista', 'Decidir'] as const;

interface StepIndicatorProps {
  /** 0 = Mirar, 1 = Pista, 2 = Decidir */
  current: number;
  /** Fondo del paso actual: el color del tema que se practica */
  activeClass?: string;
}

/**
 * C5 · Indicador de pasos: los mismos tres verbos en todas las prácticas
 * (D9) y el paso actual siempre visible (CQ7).
 */
export function StepIndicator({ current, activeClass = 'bg-primary border-primary text-white' }: StepIndicatorProps) {
  return (
    <ol className="flex items-center w-full py-3" aria-label={`Paso ${current + 1} de 3`}>
      {PRACTICE_STEPS.map((label, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <li key={label} className={`flex items-center ${i < PRACTICE_STEPS.length - 1 ? 'flex-1' : ''}`}>
            <div className="flex items-center gap-2" aria-current={active ? 'step' : undefined}>
              <span
                className={[
                  'w-9 h-9 rounded-full flex items-center justify-center font-bold shrink-0 border-2',
                  done
                    ? 'bg-success border-success text-white'
                    : active
                    ? activeClass
                    : 'bg-surface border-gray-400 text-text-muted',
                ].join(' ')}
              >
                {done ? <Check size={20} strokeWidth={3} aria-hidden="true" /> : i + 1}
              </span>
              <span className={`font-bold ${active ? 'text-text' : 'text-text-muted'}`}>
                {label}
                {done && <span className="sr-only"> (hecho)</span>}
              </span>
            </div>
            {i < PRACTICE_STEPS.length - 1 && (
              <span
                className={`flex-1 h-1 mx-2 rounded-full ${done ? 'bg-success' : 'bg-gray-300'}`}
                aria-hidden="true"
              />
            )}
          </li>
        );
      })}
    </ol>
  );
}

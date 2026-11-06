import { ChevronLeft, LogOut, Volume2, Square } from 'lucide-react';
import { BarAction } from '@/components/layout/BarAction';

interface PracticeTopBarProps {
  step: number;
  speaking: boolean;
  canSpeak: boolean;
  onBack: () => void;
  onListen: () => void;
  onSafeExit: () => void;
}

/**
 * C1 · Barra superior de la práctica. Siempre igual en todas las prácticas:
 * «Volver» a la izquierda; el paso al centro; «Escuchar» y «Salir seguro»
 * (verde, D1) a la derecha. El título del caso va debajo, en la pantalla.
 */
export function PracticeTopBar({ step, speaking, canSpeak, onBack, onListen, onSafeExit }: PracticeTopBarProps) {
  return (
    <header className="sticky top-0 z-30 -mx-4 sm:-mx-6 px-3 sm:px-6 bg-background/95 backdrop-blur border-b border-gray-200">
      <div className="h-20 flex items-center gap-1.5">
        <BarAction icon={ChevronLeft} label="Volver" onClick={onBack} ariaLabel="Volver al paso anterior" />
        {/* En celulares angostos el paso se lee en el indicador de pasos, justo debajo */}
        <div className="flex-1 min-w-0 leading-tight text-center px-1">
          <p className="hidden min-[420px]:block text-base font-bold text-text whitespace-nowrap">
            Paso {step + 1} de 3
          </p>
          <p className="hidden min-[420px]:block text-xs text-text-muted truncate">Práctica segura</p>
          <span className="sr-only min-[420px]:hidden">Práctica segura, paso {step + 1} de 3</span>
        </div>
        {canSpeak && (
          <BarAction
            icon={speaking ? Square : Volume2}
            label={speaking ? 'Detener' : 'Escuchar'}
            pressed={speaking}
            onClick={onListen}
            iconClass="text-info"
            ariaLabel={speaking ? 'Detener la lectura' : 'Escuchar esta pantalla'}
          />
        )}
        <BarAction icon={LogOut} label="Salir seguro" tone="safe" onClick={onSafeExit} />
      </div>
    </header>
  );
}

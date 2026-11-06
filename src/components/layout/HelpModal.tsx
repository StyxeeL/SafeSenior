import { LogOut, Volume2, Eye, Search, CheckCircle2, Type } from 'lucide-react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const steps = [
  { icon: Eye, title: 'Mirar', text: 'Mira con calma la llamada o el mensaje.', color: 'bg-info' },
  { icon: Search, title: 'Pista', text: 'Toca cada pista para saber por qué es sospechosa.', color: 'bg-warning' },
  { icon: CheckCircle2, title: 'Decidir', text: 'Elige qué harías y confirma tu respuesta.', color: 'bg-success' },
];

/** Ayuda breve y contextual (Gomez-Hernandez et al., 2023): siempre con texto. */
export function HelpModal({ isOpen, onClose }: HelpModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="¿Cómo funciona?"
      footer={
        <Button fullWidth onClick={onClose}>
          Entendido
        </Button>
      }
    >
      <div className="space-y-4" data-escuchar>
        <p className="text-base">Cada práctica tiene siempre los mismos 3 pasos:</p>
        <ol className="space-y-3">
          {steps.map((s, i) => (
            <li key={s.title} className="flex items-start gap-3">
              <span className={`shrink-0 w-10 h-10 rounded-full ${s.color} text-white font-bold flex items-center justify-center`}>
                {i + 1}
              </span>
              <div>
                <p className="font-bold flex items-center gap-1.5">
                  <s.icon size={20} aria-hidden="true" /> {s.title}
                </p>
                <p className="text-text-muted text-sm">{s.text}</p>
              </div>
            </li>
          ))}
        </ol>
        <ul className="space-y-2 text-sm border-t border-gray-200 pt-4">
          <li className="flex items-start gap-2">
            <LogOut size={20} className="text-success shrink-0 mt-0.5" aria-hidden="true" />
            <span>
              Para dejar una práctica, toca <strong className="text-success">Salir seguro</strong> (botón
              verde, arriba a la derecha). Tu avance se guarda solo.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <Volume2 size={20} className="shrink-0 mt-0.5" aria-hidden="true" />
            <span>
              Toca <strong>Escuchar</strong> para oír lo que dice la pantalla.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <Type size={20} className="shrink-0 mt-0.5" aria-hidden="true" />
            <span>
              Puedes agrandar la letra en <strong>Configuración</strong>.
            </span>
          </li>
        </ul>
        <p className="text-sm text-text-muted">
          Todo es una práctica: no se usa tu dinero ni tus datos.
        </p>
      </div>
    </Modal>
  );
}

import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';

interface InstallHelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Se muestra cuando el navegador no ofrece instalar con un toque
 * (por ejemplo, Safari en iPhone): explica cómo hacerlo a mano.
 */
export function InstallHelpModal({ isOpen, onClose }: InstallHelpModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Instalar SABIA en tu celular"
      footer={
        <Button fullWidth onClick={onClose}>
          Entendido
        </Button>
      }
    >
      <div className="space-y-4" data-escuchar>
        <p>Así la tendrás en tu pantalla de inicio, como cualquier otra app, y funcionará sin internet.</p>
        <div className="rounded-2xl bg-sms-light p-3">
          <p className="font-bold text-sms mb-1">En Android (Chrome)</p>
          <ol className="list-decimal list-inside space-y-1 text-sm">
            <li>Toca los tres puntos ⋮ arriba a la derecha.</li>
            <li>Elige «Instalar aplicación» o «Agregar a pantalla principal».</li>
            <li>Confirma con «Instalar».</li>
          </ol>
        </div>
        <div className="rounded-2xl bg-call-light p-3">
          <p className="font-bold text-call mb-1">En iPhone (Safari)</p>
          <ol className="list-decimal list-inside space-y-1 text-sm">
            <li>Toca el botón Compartir (cuadro con flecha hacia arriba).</li>
            <li>Elige «Agregar a pantalla de inicio».</li>
            <li>Confirma con «Agregar».</li>
          </ol>
        </div>
      </div>
    </Modal>
  );
}

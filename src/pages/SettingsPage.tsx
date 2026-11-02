import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Toggle } from '@/components/ui/Toggle';
import { Modal } from '@/components/ui/Modal';
import { useSettings } from '@/hooks/useSettings';
import { useProgress } from '@/hooks/useProgress';
import { useSpeech } from '@/hooks/useSpeech';
import { useInstallPrompt } from '@/hooks/useInstallPrompt';
import { InstallButton } from '@/components/pwa/InstallButton';
import { Type, HelpCircle, Trash2, Volume2, VolumeX, Download } from 'lucide-react';
import type { FontSize } from '@/types';

const fontSizeOptions: { value: FontSize; label: string }[] = [
  { value: 'normal', label: 'Normal' },
  { value: 'large', label: 'Grande' },
  { value: 'xlarge', label: 'Muy grande' },
];

const faqs = [
  {
    question: '¿SafeSenior realiza llamadas o envía mensajes reales?',
    answer:
      'No. Todos los ejercicios son simulaciones educativas ficticias. No se realizan llamadas, mensajes ni transferencias reales.',
  },
  {
    question: '¿Mis datos están seguros?',
    answer:
      'Sí. La aplicación no solicita contraseñas, códigos OTP ni datos bancarios reales. Tu progreso se guarda solo en tu dispositivo.',
  },
  {
    question: '¿Puedo repetir los ejercicios?',
    answer:
      'Sí, puedes repetir todos los ejercicios y evaluaciones las veces que quieras. No hay penalizaciones.',
  },
  {
    question: '¿La aplicación funciona sin internet?',
    answer:
      'En una fase posterior se implementará el funcionamiento offline como aplicación web progresiva (PWA).',
  },
];

export function SettingsPage() {
  const {
    settings,
    setFontSize,
    toggleHighContrast,
    toggleSound,
    toggleAudioInstructions,
  } = useSettings();

  const { resetProgress } = useProgress();
  const { supported: speechSupported, speak, cancel } = useSpeech();
  const { isSupported, isInstalled } = useInstallPrompt();
  const [showResetModal, setShowResetModal] = useState(false);

  return (
    <div className="space-y-6">
      <section>
        <h2 className="page-title mb-2">Configuración y ayuda</h2>
        <p className="page-subtitle">
          Adapta la aplicación a tus necesidades y encuentra asistencia.
        </p>
      </section>

      <Card>
        <h3 className="text-xl font-bold text-text mb-4 flex items-center gap-2">
          <Type size={24} aria-hidden="true" />
          Tamaño de letra
        </h3>
        <div className="flex flex-wrap gap-3">
          {fontSizeOptions.map((option) => (
            <Button
              key={option.value}
              variant={settings.fontSize === option.value ? 'primary' : 'outline'}
              size="md"
              onClick={() => setFontSize(option.value)}
              aria-pressed={settings.fontSize === option.value}
            >
              {option.label}
            </Button>
          ))}
        </div>
      </Card>

      <Card className="space-y-6">
        <h3 className="text-xl font-bold text-text">Opciones de accesibilidad</h3>
        <Toggle
          label="Alto contraste"
          description="Aumenta el contraste de colores para una lectura más clara."
          checked={settings.highContrast}
          onChange={toggleHighContrast}
        />
        <hr className="border-gray-200" />
        <Toggle
          label="Sonido de retroalimentación"
          description="Emite un sonido breve al responder."
          checked={settings.sound}
          onChange={toggleSound}
        />
        <hr className="border-gray-200" />
        <Toggle
          label="Instrucciones por audio"
          description="Lee en voz alta las instrucciones cuando estén disponibles."
          checked={settings.audioInstructions}
          onChange={toggleAudioInstructions}
        />
        {settings.audioInstructions && (
          <div className="flex flex-wrap gap-3 pt-2">
            {speechSupported ? (
              <Button
                variant="outline"
                size="md"
                leftIcon={<Volume2 size={20} />}
                onClick={() =>
                  speak(
                    'Has activado las instrucciones por audio. SafeSenior te ayudará a reconocer estafas digitales.'
                  )
                }
              >
                Probar audio
              </Button>
            ) : (
              <p className="text-text-muted">
                Tu navegador no permite reproducción de audio.
              </p>
            )}
            <Button
              variant="ghost"
              size="md"
              leftIcon={<VolumeX size={20} />}
              onClick={cancel}
            >
              Detener audio
            </Button>
          </div>
        )}
      </Card>

      <Card>
        <h3 className="text-xl font-bold text-text mb-4 flex items-center gap-2">
          <Trash2 size={24} aria-hidden="true" />
          Progreso
        </h3>
        <Button variant="danger" fullWidth onClick={() => setShowResetModal(true)}>
          Borrar mi progreso
        </Button>
      </Card>

      {isSupported && !isInstalled && (
        <Card className="bg-primary-light border-primary/20">
          <h3 className="text-xl font-bold text-primary mb-2 flex items-center gap-2">
            <Download size={24} aria-hidden="true" />
            Instalar SafeSenior
          </h3>
          <p className="text-text mb-4">
            Instala la aplicación en tu dispositivo para acceder más rápido y usarla sin internet.
          </p>
          <InstallButton variant="primary" />
        </Card>
      )}

      <Card className="bg-primary-light border-primary/20">
        <h3 className="text-xl font-bold text-primary mb-2 flex items-center gap-2">
          <HelpCircle size={24} aria-hidden="true" />
          Preguntas frecuentes
        </h3>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index}>
              <p className="font-bold text-text">{faq.question}</p>
              <p className="text-text-muted mt-1">{faq.answer}</p>
            </div>
          ))}
        </div>
      </Card>

      <Modal
        isOpen={showResetModal}
        onClose={() => setShowResetModal(false)}
        title="¿Borrar progreso?"
        footer={
          <>
            <Button variant="outline" onClick={() => setShowResetModal(false)}>
              Cancelar
            </Button>
            <Button
              variant="danger"
              onClick={() => {
                resetProgress();
                setShowResetModal(false);
              }}
            >
              Sí, borrar
            </Button>
          </>
        }
      >
        <p className="text-text">
          Esta acción eliminará todo tu progreso de ejercicios y evaluaciones. No se puede deshacer.
        </p>
      </Modal>
    </div>
  );
}

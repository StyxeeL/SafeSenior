import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Toggle } from '@/components/ui/Toggle';
import { useSettings } from '@/hooks/useSettings';
import { Type, HelpCircle } from 'lucide-react';
import type { FontSize } from '@/types';

const fontSizeOptions: { value: FontSize; label: string }[] = [
  { value: 'normal', label: 'Normal' },
  { value: 'large', label: 'Grande' },
  { value: 'xlarge', label: 'Muy grande' },
];

export function SettingsPage() {
  const {
    settings,
    setFontSize,
    toggleHighContrast,
    toggleSound,
    toggleAudioInstructions,
  } = useSettings();

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
      </Card>

      <Card className="bg-primary-light border-primary/20">
        <h3 className="text-xl font-bold text-primary mb-2 flex items-center gap-2">
          <HelpCircle size={24} aria-hidden="true" />
          ¿Necesitas ayuda?
        </h3>
        <p className="text-text mb-4">
          SafeSenior es una aplicación educativa. Los ejercicios son simulaciones
          ficticias. No realizamos llamadas, mensajes ni transferencias reales.
        </p>
        <Button variant="outline" fullWidth>
          Ver preguntas frecuentes
        </Button>
      </Card>
    </div>
  );
}

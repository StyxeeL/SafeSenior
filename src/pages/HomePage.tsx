import { Card } from '@/components/ui/Card';
import { Download, ShieldCheck } from 'lucide-react';
import { useInstallPrompt } from '@/hooks/useInstallPrompt';
import { InstallButton } from '@/components/pwa/InstallButton';
import { LearningPathMap } from '@/components/learning/LearningPathMap';

export function HomePage() {
  const { isSupported, isInstalled } = useInstallPrompt();

  return (
    <div className="space-y-6">
      {/* Menú de situaciones (v2) + camino guiado paso a paso */}
      <LearningPathMap />

      {isSupported && !isInstalled && (
        <Card className="border-2 border-gray-200">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-primary rounded-2xl shrink-0 text-white">
              <Download size={28} aria-hidden="true" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-1">¿Quieres tener SafeSenior en tu celular?</h3>
              <p className="text-text-muted mb-4">Instálalo para abrirlo rápido y usarlo sin internet.</p>
              <InstallButton />
            </div>
          </div>
        </Card>
      )}

      <Card className="border-2 border-success bg-success-light">
        <div className="flex items-start gap-3" data-escuchar>
          <ShieldCheck size={28} className="text-success shrink-0 mt-0.5" aria-hidden="true" />
          <div>
            <h3 className="text-lg font-bold mb-1">La regla de oro</h3>
            <p>
              Ningún banco, familiar real ni empresa seria te pedirá claves o códigos por llamada, SMS o
              WhatsApp. Ante la duda: cuelga y verifica tú mismo.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}

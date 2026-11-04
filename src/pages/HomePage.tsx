import { Card } from '@/components/ui/Card';
import { Shield, Download, Lightbulb } from 'lucide-react';
import { useInstallPrompt } from '@/hooks/useInstallPrompt';
import { InstallButton } from '@/components/pwa/InstallButton';
import { LearningPathMap } from '@/components/learning/LearningPathMap';

export function HomePage() {
  const { isSupported, isInstalled } = useInstallPrompt();

  return (
    <div className="space-y-6">
      {/* Encabezado Principal */}
      <section className="text-center py-4">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-primary-light rounded-full mb-3 shadow-inner">
          <Shield size={44} className="text-primary" aria-hidden="true" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-text mb-1 tracking-tight">
          Tu Camino Seguro
        </h2>
        <p className="text-base sm:text-lg text-text-muted max-w-lg mx-auto leading-relaxed">
          Aprende a reconocer estafas paso a paso: lee la explicación, resuelve los casos prácticos y supera los retos sin presiones.
        </p>
      </section>

      {/* PWA Prompt si aplica */}
      {isSupported && !isInstalled && (
        <Card className="bg-primary-light border-primary/20">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-primary rounded-2xl shrink-0 text-white">
              <Download size={28} aria-hidden="true" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-primary mb-1">
                ¿Quieres tener SafeSenior en tu pantalla?
              </h3>
              <p className="text-text mb-4 text-base">
                Instálalo en tu celular para abrirlo rápido y usarlo incluso sin internet.
              </p>
              <InstallButton />
            </div>
          </div>
        </Card>
      )}

      {/* Mapa de Ruta Lineal Estilo Duolingo */}
      <LearningPathMap />

      {/* Consejo de Seguridad */}
      <Card className="bg-amber-50 border-2 border-amber-200">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-amber-200 text-amber-800 rounded-xl shrink-0 mt-0.5">
            <Lightbulb size={24} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-amber-900 mb-1">Consejo de oro para tu seguridad</h3>
            <p className="text-amber-950 text-base leading-relaxed">
              Ningún banco, familiar real ni empresa confiable te exigirá contraseñas, claves secretas o códigos de verificación por llamada, mensaje de texto o WhatsApp. Ante la duda, ¡cuelga o borra el mensaje!
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}

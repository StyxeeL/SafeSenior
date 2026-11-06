import { Card } from '@/components/ui/Card';
import { ShieldCheck } from 'lucide-react';
import { LearningPathMap } from '@/components/learning/LearningPathMap';

export function HomePage() {
  return (
    <div className="space-y-6">
      {/* Menú de situaciones (v2) + camino guiado paso a paso. «Instalar» está en la barra superior. */}
      <LearningPathMap />

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

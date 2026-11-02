import { Card } from '@/components/ui/Card';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { BarChart3, Award } from 'lucide-react';

export function ProgressPage() {
  return (
    <div className="space-y-6">
      <section>
        <h2 className="page-title mb-2">Mi progreso</h2>
        <p className="page-subtitle">
          Aquí verás tus avances y los temas en los que puedes reforzar.
        </p>
      </section>

      <div className="grid gap-4 sm:grid-cols-2">
        <Card className="flex flex-col items-center text-center gap-2">
          <BarChart3 size={32} className="text-primary" aria-hidden="true" />
          <p className="text-text-muted">Ejercicios realizados</p>
          <p className="text-3xl font-bold text-text">0</p>
        </Card>
        <Card className="flex flex-col items-center text-center gap-2">
          <Award size={32} className="text-success" aria-hidden="true" />
          <p className="text-text-muted">Respuestas correctas</p>
          <p className="text-3xl font-bold text-text">0%</p>
        </Card>
      </div>

      <Card>
        <h3 className="text-xl font-bold text-text mb-4">Progreso por categoría</h3>
        <div className="space-y-4">
          <ProgressBar value={0} label="Llamadas falsas" />
          <ProgressBar value={0} label="SMS falsos" />
          <ProgressBar value={0} label="WhatsApp falsos" />
          <ProgressBar value={0} label="Correos falsos" />
        </div>
      </Card>

      <Card>
        <h3 className="text-xl font-bold text-text mb-2">Temas para reforzar</h3>
        <p className="text-text-muted">
          Completa algunos ejercicios para recibir recomendaciones personalizadas.
        </p>
      </Card>
    </div>
  );
}

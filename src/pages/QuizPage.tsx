import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { ClipboardCheck, Info } from 'lucide-react';

export function QuizPage() {
  return (
    <div className="space-y-6">
      <section>
        <h2 className="page-title mb-2">Evalúate</h2>
        <p className="page-subtitle">
          Responde situaciones reales simuladas y descubre qué tan preparado estás.
        </p>
      </section>

      <Card className="flex items-start gap-4 bg-primary-light border-primary/20">
        <Info size={28} className="text-primary shrink-0 mt-1" aria-hidden="true" />
        <div>
          <h3 className="text-xl font-bold text-primary mb-1">¿Cómo funciona?</h3>
          <ul className="list-disc list-inside text-text space-y-1">
            <li>Verás situaciones de llamadas, SMS, WhatsApp y correos.</li>
            <li>Elige la acción más segura.</li>
            <li>Recibe retroalimentación inmediata.</li>
            <li>Puedes repetir la evaluación las veces que quieras.</li>
          </ul>
        </div>
      </Card>

      <Button fullWidth leftIcon={<ClipboardCheck size={24} />}>
        Comenzar evaluación
      </Button>
    </div>
  );
}

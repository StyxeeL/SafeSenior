import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Award, RotateCcw, Home } from 'lucide-react';

interface QuizResultState {
  score: number;
  total: number;
}

export function QuizResultPage() {
  const location = useLocation();
  const state = location.state as QuizResultState | null;

  if (!state) {
    return (
      <div className="text-center py-12 space-y-6">
        <h2 className="page-title">No hay resultado disponible</h2>
        <Link to="/evaluame">
          <Button>Ir a Evalúate</Button>
        </Link>
      </div>
    );
  }

  const { score, total } = state;
  const percentage = Math.round((score / total) * 100);

  let message = '¡Buen trabajo! Sigue practicando para reforzar lo aprendido.';
  if (percentage >= 80) {
    message = '¡Excelente! Tienes una buena capacidad para reconocer estafas.';
  } else if (percentage < 50) {
    message = 'No te preocupes. Repasa los contenidos y vuelve a intentarlo.';
  }

  return (
    <div className="space-y-6">
      <section className="text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-primary-light rounded-full mb-4">
          <Award size={40} className="text-primary" aria-hidden="true" />
        </div>
        <h2 className="page-title mb-2">Resultado de tu evaluación</h2>
        <p className="page-subtitle">{message}</p>
      </section>

      <Card className="text-center">
        <p className="text-text-muted mb-2">Respuestas correctas</p>
        <p className="text-4xl font-bold text-text mb-4">
          {score} <span className="text-2xl text-text-muted">/ {total}</span>
        </p>
        <ProgressBar value={percentage} label="Puntuación" variant={percentage >= 50 ? 'success' : 'warning'} />
      </Card>

      <div className="grid gap-3">
        <Link to="/evaluame">
          <Button fullWidth leftIcon={<RotateCcw size={24} />}>
            Repetir evaluación
          </Button>
        </Link>
        <Link to="/progreso">
          <Button variant="outline" fullWidth leftIcon={<Home size={24} />}>
            Ver mi progreso
          </Button>
        </Link>
      </div>
    </div>
  );
}

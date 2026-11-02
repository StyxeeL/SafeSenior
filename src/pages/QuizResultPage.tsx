import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Award, RotateCcw, BookOpen, Gamepad2 } from 'lucide-react';

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
  let recommendation = 'Te recomendamos repasar los temas en los que tuviste dudas y practicar los escenarios nuevamente.';
  if (percentage >= 80) {
    message = '¡Excelente! Tienes una buena capacidad para reconocer estafas.';
    recommendation = 'Continúa practicando de vez en cuando para mantenerte alerta y ayuda a tus familiares a reconocer estas situaciones.';
  } else if (percentage < 50) {
    message = 'No te preocupes. Repasa los contenidos y vuelve a intentarlo.';
    recommendation = 'Te sugerimos leer la sección Aprende y practicar cada escenario con calma. No hay prisa ni penalizaciones.';
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
        <ProgressBar
          value={percentage}
          label="Puntuación"
          variant={percentage >= 50 ? 'success' : 'warning'}
        />
      </Card>

      <Card>
        <h3 className="text-xl font-bold text-text mb-3">Recomendaciones</h3>
        <p className="text-text leading-relaxed">{recommendation}</p>
      </Card>

      <div className="grid gap-3">
        <Link to="/evaluame">
          <Button fullWidth leftIcon={<RotateCcw size={24} />}>
            Repetir evaluación
          </Button>
        </Link>
        <Link to="/aprende">
          <Button variant="outline" fullWidth leftIcon={<BookOpen size={24} />}>
            Repasar contenidos
          </Button>
        </Link>
        <Link to="/practica">
          <Button variant="outline" fullWidth leftIcon={<Gamepad2 size={24} />}>
            Seguir practicando
          </Button>
        </Link>
        <Link to="/progreso">
          <Button variant="ghost" fullWidth>
            Ver mi progreso
          </Button>
        </Link>
      </div>
    </div>
  );
}

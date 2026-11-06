import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Award, RotateCcw, MapPin, Trophy, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface QuizResultState {
  score: number;
  total: number;
  quizId?: string;
  moduleId?: string;
}

export function QuizResultPage() {
  const location = useLocation();
  const state = location.state as QuizResultState | null;

  if (!state) {
    return (
      <div className="text-center py-12 space-y-6">
        <h2 className="page-title">No hay resultado disponible</h2>
        <Link to="/">
          <Button>Volver al camino principal</Button>
        </Link>
      </div>
    );
  }

  const { score, total, quizId, moduleId } = state;
  const percentage = Math.round((score / total) * 100);
  const isFinal = quizId === 'quiz-final';

  let message = '¡Buen trabajo! Sigue practicando para reforzar lo aprendido.';
  let recommendation =
    'Te recomendamos repasar los temas en los que tuviste dudas y practicar los escenarios nuevamente.';
  if (percentage >= 80) {
    message = '¡Excelente! Demuestras una gran capacidad para reconocer estafas y protegerte.';
    recommendation =
      'Continúa completando el camino y comparte estos consejos con tus amigos y familiares.';
  } else if (percentage < 50) {
    message = 'No te preocupes. Todo es parte del aprendizaje.';
    recommendation =
      'Puedes volver a revisar la lección o repetir el reto cuando quieras. No pierdes nada por equivocarte.';
  }

  const repeatLink = moduleId ? `/evaluame?module=${moduleId}` : '/evaluame';

  return (
    <div className="space-y-6">
      <section className="text-center">
        <div
          className={`inline-flex items-center justify-center w-24 h-24 rounded-full mb-4 ${
            isFinal ? 'bg-amber-100 text-amber-600' : 'bg-primary-light text-primary'
          }`}
        >
          {isFinal ? <Trophy size={48} aria-hidden="true" /> : <Award size={48} aria-hidden="true" />}
        </div>
        <h2 className="page-title mb-2">
          {isFinal ? '¡Felicitaciones, te has graduado!' : '¡Reto completado!'}
        </h2>
        <p className="page-subtitle max-w-md mx-auto">{message}</p>
      </section>

      {/* Diploma conmemorativo para el examen final */}
      {isFinal && percentage >= 50 && (
        <Card className="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-300 p-6 text-center space-y-4 shadow-md">
          <div className="flex justify-center">
            <div className="p-3 bg-amber-500 text-white rounded-full">
              <ShieldCheck size={36} aria-hidden="true" />
            </div>
          </div>
          <div>
            <p className="text-sm uppercase tracking-wider text-amber-800 font-bold">
              Certificado de Reconocimiento
            </p>
            <h3 className="text-2xl font-bold text-amber-950 mt-1">
              Protector Digital SABIA
            </h3>
            <p className="text-amber-900 mt-2 text-base leading-relaxed">
              Has completado satisfactoriamente los 4 módulos de SABIA: SMS, WhatsApp, Llamadas y Correos.
              ¡Tu perseverancia mantiene seguros tus datos y tu bienestar!
            </p>
          </div>
          <div className="pt-2 border-t border-amber-200 flex items-center justify-center gap-2 text-amber-800 font-medium">
            <CheckCircle2 size={20} className="text-green-600" />
            <span>Módulos 100% completados con éxito</span>
          </div>
        </Card>
      )}

      <Card className="text-center">
        <p className="text-text-muted mb-2 text-lg">Puntuación alcanzada</p>
        <p className="text-5xl font-bold text-text mb-4">
          {score} <span className="text-2xl text-text-muted">/ {total}</span>
        </p>
        <ProgressBar
          value={percentage}
          label="Aciertos"
          variant={percentage >= 50 ? 'success' : 'warning'}
        />
      </Card>

      <Card>
        <h3 className="text-xl font-bold text-text mb-3">Recomendaciones</h3>
        <p className="text-text leading-relaxed text-lg">{recommendation}</p>
      </Card>

      <div className="grid gap-3 pt-2">
        <Link to="/">
          <Button fullWidth size="lg" leftIcon={<MapPin size={24} />}>
            Continuar en mi camino
          </Button>
        </Link>
        <Link to={repeatLink}>
          <Button variant="outline" fullWidth leftIcon={<RotateCcw size={24} />}>
            Repetir este reto
          </Button>
        </Link>
      </div>
    </div>
  );
}

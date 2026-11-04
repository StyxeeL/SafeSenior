import { useState, useCallback, useMemo } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Info, CheckCircle2, XCircle, ArrowLeft, Trophy } from 'lucide-react';
import { quizQuestions } from '@/data/quizQuestions';
import { useProgress } from '@/hooks/useProgress';
import { useSettings } from '@/hooks/useSettings';
import { playFeedbackSound } from '@/utils/sound';
import { QuizVisual } from '@/components/quiz/QuizVisual';

const MODULE_TITLES: Record<string, { title: string; subtitle: string }> = {
  smishing: {
    title: 'Reto: Mensajes SMS',
    subtitle: 'Comprueba si puedes detectar un SMS falso y proteger tu información.',
  },
  whatsapp: {
    title: 'Reto: WhatsApp Seguro',
    subtitle: 'Demuestra cómo actuar ante mensajes extraños y comprobantes falsos.',
  },
  vishing: {
    title: 'Reto: Llamadas Falsas',
    subtitle: 'Pon a prueba tu reacción ante llamadas intimidantes o sospechosas.',
  },
  phishing: {
    title: 'Reto: Correos Falsos',
    subtitle: 'Verifica si sabes distinguir correos legítimos de trampas digitales.',
  },
  final: {
    title: '🏆 Gran Reto: Graduación SafeSenior',
    subtitle: 'Evaluación final con situaciones de los 4 módulos. ¡Asegura tu certificado!',
  },
};

export function QuizPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const moduleParam = searchParams.get('module');
  const { recordQuizResult } = useProgress();
  const { settings } = useSettings();

  const filteredQuestions = useMemo(() => {
    if (!moduleParam || moduleParam === 'final') {
      return quizQuestions;
    }
    const filtered = quizQuestions.filter((q) => q.moduleId === moduleParam);
    return filtered.length > 0 ? filtered : quizQuestions;
  }, [moduleParam]);

  const quizId = useMemo(() => {
    if (!moduleParam) return 'initial-quiz';
    if (moduleParam === 'final') return 'quiz-final';
    return `quiz-${moduleParam}`;
  }, [moduleParam]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const question = filteredQuestions[currentIndex] || quizQuestions[0];
  const totalQuestions = filteredQuestions.length;

  const currentChoiceIsCorrect = selectedChoice
    ? question.choices.find((c) => c.id === selectedChoice)?.isCorrect ?? false
    : false;

  const handleChoice = useCallback(
    (choiceId: string) => {
      if (showFeedback) return;
      setSelectedChoice(choiceId);
      setShowFeedback(true);

      const choice = question.choices.find((c) => c.id === choiceId);
      if (choice) {
        if (settings.sound) {
          playFeedbackSound(choice.isCorrect);
        }
        if (choice.isCorrect) {
          setScore((prev) => prev + 1);
        }
      }
    },
    [question, showFeedback, settings.sound]
  );

  const handleNext = useCallback(() => {
    const finalScore = score + (currentChoiceIsCorrect ? 1 : 0);

    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedChoice(null);
      setShowFeedback(false);
    } else {
      setFinished(true);
      recordQuizResult(quizId, finalScore, totalQuestions);
      navigate('/evaluame/resultado', {
        state: { score: finalScore, total: totalQuestions, quizId, moduleId: moduleParam },
      });
    }
  }, [
    currentIndex,
    totalQuestions,
    score,
    currentChoiceIsCorrect,
    navigate,
    recordQuizResult,
    quizId,
    moduleParam,
  ]);

  if (finished) {
    return null;
  }

  const moduleInfo = (moduleParam && MODULE_TITLES[moduleParam]) || {
    title: 'Evalúate',
    subtitle: 'Responde situaciones reales simuladas y descubre qué tan preparado estás.',
  };

  return (
    <div className="space-y-6">
      <Link to="/" className="inline-flex items-center gap-2 text-primary font-semibold text-lg">
        <ArrowLeft size={24} aria-hidden="true" />
        Volver a mi camino
      </Link>

      <section>
        <div className="flex items-center gap-3 mb-2">
          {moduleParam === 'final' ? (
            <div className="p-3 bg-amber-100 rounded-2xl text-amber-700">
              <Trophy size={32} aria-hidden="true" />
            </div>
          ) : null}
          <div>
            <h2 className="page-title">{moduleInfo.title}</h2>
            <p className="page-subtitle">{moduleInfo.subtitle}</p>
          </div>
        </div>
      </section>

      <div className="flex items-center justify-between">
        <Badge variant="info">
          Pregunta {currentIndex + 1} de {totalQuestions}
        </Badge>
        <span className="text-text-muted text-base font-medium">
          Aciertos: {score} de {currentIndex + (showFeedback && currentChoiceIsCorrect ? 1 : 0)}
        </span>
      </div>

      <QuizVisual type={question.visualType} data={question.visualData} />

      <Card>
        <p className="text-text font-semibold text-xl">{question.question}</p>
      </Card>

      <div className="space-y-3">
        {question.choices.map((choice) => {
          const isSelected = selectedChoice === choice.id;
          const showResult = showFeedback && isSelected;
          const correctSelected = showFeedback && choice.isCorrect;

          return (
            <button
              key={choice.id}
              onClick={() => handleChoice(choice.id)}
              disabled={showFeedback}
              className={[
                'w-full text-left p-5 rounded-2xl border-2 font-medium transition-colors text-lg',
                'focus:outline-none focus:ring-4 focus:ring-primary/30',
                showResult && choice.isCorrect
                  ? 'bg-green-100 border-success text-success font-bold'
                  : showResult && !choice.isCorrect
                  ? 'bg-red-100 border-danger text-danger font-bold'
                  : correctSelected
                  ? 'bg-green-100 border-success text-success font-bold'
                  : 'bg-surface border-gray-200 hover:border-primary text-text',
              ].join(' ')}
              aria-pressed={isSelected}
            >
              <div className="flex items-center gap-3">
                {showResult && choice.isCorrect && <CheckCircle2 size={26} aria-hidden="true" />}
                {showResult && !choice.isCorrect && <XCircle size={26} aria-hidden="true" />}
                <span>{choice.label}</span>
              </div>
            </button>
          );
        })}
      </div>

      {showFeedback && (
        <Card
          className={
            currentChoiceIsCorrect ? 'bg-green-50 border-success' : 'bg-red-50 border-danger'
          }
        >
          <div className="flex items-start gap-3">
            {currentChoiceIsCorrect ? (
              <CheckCircle2 size={32} className="text-success shrink-0 mt-1" aria-hidden="true" />
            ) : (
              <XCircle size={32} className="text-danger shrink-0 mt-1" aria-hidden="true" />
            )}
            <div>
              <h4 className="text-xl font-bold text-text mb-1">
                {currentChoiceIsCorrect ? '¡Respuesta correcta!' : 'No es la mejor opción'}
              </h4>
              <p className="text-text text-lg leading-relaxed">{question.explanation}</p>
            </div>
          </div>
        </Card>
      )}

      {showFeedback && (
        <Button fullWidth size="lg" onClick={handleNext}>
          {currentIndex < totalQuestions - 1 ? 'Siguiente pregunta 👉' : 'Ver resultado 🎉'}
        </Button>
      )}

      {!showFeedback && (
        <Card className="flex items-start gap-4 bg-primary-light border-primary/20">
          <Info size={28} className="text-primary shrink-0 mt-1" aria-hidden="true" />
          <div>
            <h3 className="text-xl font-bold text-primary mb-1">¿Cómo responder?</h3>
            <ul className="list-disc list-inside text-text space-y-1 text-base">
              <li>Observa con atención la imagen simulada arriba.</li>
              <li>Toca la opción que consideres más segura.</li>
              <li>Aprenderás con la explicación sin importar si aciertas o fallas.</li>
            </ul>
          </div>
        </Card>
      )}
    </div>
  );
}

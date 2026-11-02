import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Info, CheckCircle2, XCircle } from 'lucide-react';
import { quizQuestions } from '@/data/quizQuestions';
import { useProgress } from '@/hooks/useProgress';
import { useSettings } from '@/hooks/useSettings';
import { playFeedbackSound } from '@/utils/sound';
import { QuizVisual } from '@/components/quiz/QuizVisual';

export function QuizPage() {
  const navigate = useNavigate();
  const { recordQuizResult } = useProgress();
  const { settings } = useSettings();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const question = quizQuestions[currentIndex];
  const totalQuestions = quizQuestions.length;

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
    [question, showFeedback]
  );

  const handleNext = useCallback(() => {
    const finalScore = score + (currentChoiceIsCorrect ? 1 : 0);

    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedChoice(null);
      setShowFeedback(false);
    } else {
      setFinished(true);
      recordQuizResult('initial-quiz', finalScore, totalQuestions);
      navigate('/evaluame/resultado', {
        state: { score: finalScore, total: totalQuestions },
      });
    }
  }, [currentIndex, totalQuestions, score, currentChoiceIsCorrect, navigate, recordQuizResult]);

  if (finished) {
    return null;
  }

  return (
    <div className="space-y-6">
      <section>
        <h2 className="page-title mb-2">Evalúate</h2>
        <p className="page-subtitle">
          Responde situaciones reales simuladas y descubre qué tan preparado estás.
        </p>
      </section>

      <div className="flex items-center justify-between">
        <Badge variant="info">
          Pregunta {currentIndex + 1} de {totalQuestions}
        </Badge>
      </div>

      <QuizVisual type={question.visualType} data={question.visualData} />

      <Card>
        <p className="text-text font-semibold text-lg">{question.question}</p>
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
                'w-full text-left p-4 rounded-2xl border-2 font-medium transition-colors',
                'focus:outline-none focus:ring-4 focus:ring-primary/30',
                showResult && choice.isCorrect
                  ? 'bg-green-100 border-success text-success'
                  : showResult && !choice.isCorrect
                  ? 'bg-red-100 border-danger text-danger'
                  : correctSelected
                  ? 'bg-green-100 border-success text-success'
                  : 'bg-surface border-gray-200 hover:border-primary text-text',
              ].join(' ')}
              aria-pressed={isSelected}
            >
              <div className="flex items-center gap-3">
                {showResult && choice.isCorrect && <CheckCircle2 size={24} aria-hidden="true" />}
                {showResult && !choice.isCorrect && <XCircle size={24} aria-hidden="true" />}
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
              <CheckCircle2 size={28} className="text-success shrink-0 mt-1" aria-hidden="true" />
            ) : (
              <XCircle size={28} className="text-danger shrink-0 mt-1" aria-hidden="true" />
            )}
            <div>
              <h4 className="text-lg font-bold text-text mb-1">
                {currentChoiceIsCorrect ? '¡Respuesta correcta!' : 'No es la mejor opción'}
              </h4>
              <p className="text-text">{question.explanation}</p>
            </div>
          </div>
        </Card>
      )}

      {showFeedback && (
        <Button fullWidth onClick={handleNext}>
          {currentIndex < totalQuestions - 1 ? 'Siguiente pregunta' : 'Ver resultado'}
        </Button>
      )}

      {!showFeedback && (
        <Card className="flex items-start gap-4 bg-primary-light border-primary/20">
          <Info size={28} className="text-primary shrink-0 mt-1" aria-hidden="true" />
          <div>
            <h3 className="text-xl font-bold text-primary mb-1">¿Cómo funciona?</h3>
            <ul className="list-disc list-inside text-text space-y-1">
              <li>Observa la situación simulada.</li>
              <li>Elige la opción más segura.</li>
              <li>Recibirás una explicación después de responder.</li>
              <li>Puedes repetir la evaluación las veces que quieras.</li>
            </ul>
          </div>
        </Card>
      )}
    </div>
  );
}

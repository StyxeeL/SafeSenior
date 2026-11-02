import { useState } from 'react';
import { PhoneOff, Phone, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import type { VishingContent } from '@/data/practiceScenarios';

interface PhoneCallProps {
  content: VishingContent;
  onComplete: (correct: boolean) => void;
  onRestart: () => void;
}

type ScreenState = 'incoming' | 'call' | 'feedback';

export function PhoneCall({ content, onComplete, onRestart }: PhoneCallProps) {
  const [screen, setScreen] = useState<ScreenState>('incoming');
  const [lineIndex, setLineIndex] = useState(0);
  const [feedbackCorrect, setFeedbackCorrect] = useState<boolean | null>(null);

  const handleAnswer = () => {
    setScreen('call');
    setLineIndex(0);
  };

  const handleHangUp = () => {
    setFeedbackCorrect(true);
    setScreen('feedback');
    onComplete(true);
  };

  const handleNextLine = () => {
    if (lineIndex < content.script.length - 1) {
      setLineIndex((prev) => prev + 1);
    }
  };

  const handleChoice = (isCorrect: boolean) => {
    setFeedbackCorrect(isCorrect);
    setScreen('feedback');
    onComplete(isCorrect);
  };

  if (screen === 'feedback' && feedbackCorrect !== null) {
    const feedbackText = feedbackCorrect ? content.feedback.correct : content.feedback.incorrect;
    return (
      <Card className={feedbackCorrect ? 'bg-green-50 border-success' : 'bg-red-50 border-danger'}>
        <div className="text-center py-4">
          <p className={`text-2xl font-bold mb-3 ${feedbackCorrect ? 'text-success' : 'text-danger'}`}>
            {feedbackCorrect ? '¡Buena decisión!' : 'Cuidado con esta situación'}
          </p>
          <p className="text-text text-lg mb-6">{feedbackText}</p>
          <Button onClick={onRestart} leftIcon={<RefreshCw size={24} />}>
            Repetir ejercicio
          </Button>
        </div>
      </Card>
    );
  }

  if (screen === 'incoming') {
    return (
      <div className="max-w-sm mx-auto bg-gray-900 rounded-[2.5rem] overflow-hidden shadow-2xl text-white p-6">
        <div className="text-center mt-12 mb-8">
          <p className="text-lg text-gray-300 mb-2">Llamada entrante</p>
          <div className="w-24 h-24 mx-auto bg-gray-700 rounded-full flex items-center justify-center mb-4">
            <span className="text-3xl font-bold">{content.avatarInitial}</span>
          </div>
          <h3 className="text-2xl font-bold">{content.callerName}</h3>
          <p className="text-gray-400 text-lg">{content.callerNumber}</p>
        </div>

        <div className="grid grid-cols-2 gap-6 mt-16 mb-8">
          <button
            onClick={handleHangUp}
            className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-red-600 hover:bg-red-700 active:bg-red-800 transition-colors focus:outline-none focus:ring-4 focus:ring-red-400"
            aria-label="Colgar llamada"
          >
            <PhoneOff size={32} aria-hidden="true" />
            <span className="font-semibold">Colgar</span>
          </button>
          <button
            onClick={handleAnswer}
            className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-green-600 hover:bg-green-700 active:bg-green-800 transition-colors focus:outline-none focus:ring-4 focus:ring-green-400"
            aria-label="Contestar llamada"
          >
            <Phone size={32} aria-hidden="true" />
            <span className="font-semibold">Contestar</span>
          </button>
        </div>
      </div>
    );
  }

  const visibleLines = content.script.slice(0, lineIndex + 1);
  const atEndOfScript = lineIndex >= content.script.length - 1;

  return (
    <div className="max-w-sm mx-auto bg-white rounded-[2.5rem] overflow-hidden shadow-2xl border border-gray-200">
      <div className="bg-gray-100 p-4 flex items-center gap-3 border-b border-gray-200">
        <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold">
          {content.avatarInitial}
        </div>
        <div>
          <p className="font-bold text-text">{content.callerName}</p>
          <p className="text-sm text-text-muted">{content.callerNumber}</p>
        </div>
        <div className="ml-auto flex items-center gap-1 text-success font-semibold">
          <span className="w-2 h-2 bg-success rounded-full animate-pulse" aria-hidden="true" />
          00:{String(lineIndex + 1).padStart(2, '0')}
        </div>
      </div>

      <div className="p-4 min-h-[320px] bg-gray-50">
        <div className="space-y-3">
          {visibleLines.map((line, index) => (
            <div
              key={index}
              className={`flex ${line.speaker === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={[
                  'max-w-[85%] p-3 rounded-2xl text-base',
                  line.speaker === 'user'
                    ? 'bg-primary text-white rounded-br-none'
                    : 'bg-white border border-gray-200 text-text rounded-bl-none',
                ].join(' ')}
              >
                {line.speaker === 'caller' && (
                  <p className="text-xs font-semibold text-text-muted mb-1">{content.callerName}</p>
                )}
                <p>{line.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-4 bg-white border-t border-gray-200">
        {!atEndOfScript ? (
          <Button fullWidth onClick={handleNextLine}>
            Siguiente
          </Button>
        ) : (
          <div className="space-y-3">
            <p className="text-center font-semibold text-text mb-2">¿Qué decides?</p>
            {content.choices.map((choice) => (
              <button
                key={choice.id}
                onClick={() => handleChoice(choice.isCorrect)}
                className="w-full text-left p-4 rounded-2xl border-2 border-gray-200 bg-surface text-text font-medium hover:border-primary hover:bg-primary-light transition-colors focus:outline-none focus:ring-4 focus:ring-primary/30"
              >
                {choice.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

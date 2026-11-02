import { useState } from 'react';
import { RefreshCw, User } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { useSettings } from '@/hooks/useSettings';
import { playFeedbackSound } from '@/utils/sound';
import type { SmishingContent } from '@/data/practiceScenarios';

interface SMSMessageProps {
  content: SmishingContent;
  onComplete: (correct: boolean) => void;
  onRestart: () => void;
}

type ScreenState = 'messages' | 'feedback';

export function SMSMessage({ content, onComplete, onRestart }: SMSMessageProps) {
  const [screen, setScreen] = useState<ScreenState>('messages');
  const [feedbackCorrect, setFeedbackCorrect] = useState<boolean | null>(null);
  const { settings } = useSettings();

  const handleChoice = (isCorrect: boolean) => {
    if (settings.sound) playFeedbackSound(isCorrect);
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
            {feedbackCorrect ? '¡Buena decisión!' : 'Cuidado con este mensaje'}
          </p>
          <p className="text-text text-lg mb-6">{feedbackText}</p>
          <Button onClick={onRestart} leftIcon={<RefreshCw size={24} />}>
            Repetir ejercicio
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <div className="max-w-sm mx-auto bg-white rounded-[2.5rem] overflow-hidden shadow-2xl border border-gray-200">
      <div className="bg-warning p-4 flex items-center gap-3 border-b border-gray-200">
        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
          <User size={24} className="text-warning" aria-hidden="true" />
        </div>
        <div>
          <p className="font-bold text-white">{content.senderName}</p>
          <p className="text-sm text-white/90">{content.senderNumber}</p>
        </div>
      </div>

      <div className="p-4 min-h-[320px] bg-gray-100">
        <div className="space-y-3">
          {content.messages.map((message, index) => (
            <div key={index} className="flex justify-start">
              <div className="max-w-[90%] bg-white p-3 rounded-2xl rounded-tl-none shadow-sm border border-gray-200">
                <p className="text-text">
                  {message.isLink ? (
                    <span className="text-primary underline break-all">{message.text}</span>
                  ) : (
                    message.text
                  )}
                </p>
                <p className="text-xs text-text-muted mt-1 text-right">Ahora</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-4 bg-white border-t border-gray-200">
        <p className="text-center font-semibold text-text mb-3">¿Qué haces?</p>
        <div className="space-y-3">
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
      </div>
    </div>
  );
}

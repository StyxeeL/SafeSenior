import { useState } from 'react';
import { RefreshCw, Paperclip, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { useSettings } from '@/hooks/useSettings';
import { playFeedbackSound } from '@/utils/sound';
import type { EmailContent } from '@/data/practiceScenarios';

interface EmailViewerProps {
  content: EmailContent;
  onComplete: (correct: boolean) => void;
  onRestart: () => void;
}

type ScreenState = 'email' | 'feedback';

export function EmailViewer({ content, onComplete, onRestart }: EmailViewerProps) {
  const [screen, setScreen] = useState<ScreenState>('email');
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
            {feedbackCorrect ? '¡Buena decisión!' : 'Cuidado con este correo'}
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
    <div className="max-w-2xl mx-auto bg-white rounded-2xl overflow-hidden shadow-2xl border border-gray-200">
      <div className="bg-red-600 text-white px-4 py-2 flex items-center gap-2">
        <AlertTriangle size={20} aria-hidden="true" />
        <span className="font-bold text-sm">SIMULACIÓN EDUCATIVA — ESTE CORREO NO ES REAL</span>
      </div>

      <div className="p-4 sm:p-6 border-b border-gray-200">
        <div className="flex items-start gap-3 mb-4">
          <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold text-lg shrink-0">
            {content.fromName.charAt(0)}
          </div>
          <div className="min-w-0">
            <p className="font-bold text-text truncate">{content.fromName}</p>
            <p className="text-sm text-text-muted truncate">&lt;{content.fromEmail}&gt;</p>
          </div>
        </div>

        <h2 className="text-xl font-bold text-text mb-2">{content.subject}</h2>
        <div className="text-sm text-text-muted space-y-1">
          <p><span className="font-semibold">Para:</span> usted@ejemplo.pe</p>
          <p><span className="font-semibold">Fecha:</span> Hoy, 10:30 a. m.</p>
        </div>
      </div>

      <div className="p-4 sm:p-6 min-h-[200px]">
        <div className="space-y-4 text-text text-lg leading-relaxed">
          {content.body.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        {content.linkText && (
          <div className="mt-6">
            <button
              className="px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary-dark transition-colors focus:outline-none focus:ring-4 focus:ring-primary/30"
              disabled
            >
              {content.linkText}
            </button>
          </div>
        )}

        {content.attachmentName && (
          <div className="mt-6 flex items-center gap-3 p-3 border border-gray-200 rounded-xl bg-gray-50 max-w-sm">
            <Paperclip size={24} className="text-text-muted" aria-hidden="true" />
            <div className="min-w-0">
              <p className="font-semibold text-text truncate">{content.attachmentName}</p>
              <p className="text-sm text-text-muted">Archivo adjunto</p>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 sm:p-6 bg-gray-50 border-t border-gray-200">
        <p className="text-center font-semibold text-text mb-3">¿Qué haces?</p>
        <div className="space-y-3">
          {content.choices.map((choice) => (
            <button
              key={choice.id}
              onClick={() => handleChoice(choice.isCorrect)}
              className="w-full text-left p-4 rounded-2xl border-2 border-gray-200 bg-white text-text font-medium hover:border-primary hover:bg-primary-light transition-colors focus:outline-none focus:ring-4 focus:ring-primary/30"
            >
              {choice.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { RefreshCw, User, CheckCheck } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import type { WhatsAppContent } from '@/data/practiceScenarios';

interface WhatsAppChatProps {
  content: WhatsAppContent;
  onComplete: (correct: boolean) => void;
  onRestart: () => void;
}

type ScreenState = 'chat' | 'feedback';

function ReceiptBubble({
  amount,
  service,
}: {
  amount: string;
  service: string;
}) {
  return (
    <div className="relative overflow-hidden rounded-xl bg-green-50 border border-green-200 p-4 max-w-[85%]">
      <div className="absolute top-0 left-0 right-0 bg-green-600 text-white text-xs font-bold px-3 py-1 flex items-center gap-1">
        <span>SIMULACIÓN EDUCATIVA</span>
      </div>
      <div className="pt-5">
        <p className="text-xs text-text-muted font-semibold uppercase tracking-wide">{service}</p>
        <p className="text-2xl font-bold text-text">{amount}</p>
        <p className="text-sm text-text-muted mt-1">Comprobante de pago</p>
        <p className="text-xs text-danger font-bold mt-2">NO ES REAL</p>
      </div>
    </div>
  );
}

export function WhatsAppChat({ content, onComplete, onRestart }: WhatsAppChatProps) {
  const [screen, setScreen] = useState<ScreenState>('chat');
  const [feedbackCorrect, setFeedbackCorrect] = useState<boolean | null>(null);

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
      <div className="bg-[#075E54] p-4 flex items-center gap-3">
        <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
          <User size={24} className="text-[#075E54]" aria-hidden="true" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-bold text-white truncate">{content.contactName}</p>
          <p className="text-sm text-white/80 truncate">{content.contactNumber}</p>
        </div>
      </div>

      <div className="p-4 min-h-[320px] bg-[#E5DDD5]">
        <div className="space-y-3">
          {content.messages.map((message, index) => {
            if (message.isReceipt) {
              return (
                <div key={index} className="flex justify-start">
                  <ReceiptBubble
                    amount={message.receiptAmount || ''}
                    service={message.receiptService || ''}
                  />
                </div>
              );
            }

            return (
              <div
                key={index}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={[
                    'max-w-[85%] p-3 rounded-lg text-base shadow-sm relative',
                    message.sender === 'user'
                      ? 'bg-[#DCF8C6] text-text rounded-br-none'
                      : 'bg-white text-text rounded-bl-none',
                  ].join(' ')}
                >
                  <p>{message.text}</p>
                  <div className="flex items-center justify-end gap-1 mt-1">
                    <span className="text-[10px] text-text-muted">Ahora</span>
                    {message.sender === 'user' && <CheckCheck size={14} className="text-blue-500" aria-hidden="true" />}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="p-4 bg-[#F0F0F0] border-t border-gray-200">
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

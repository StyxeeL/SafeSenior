import { useState } from 'react';
import {
  Phone,
  PhoneOff,
  MicOff,
  Volume2,
  Grid,
  MessageSquare,
} from 'lucide-react';
import { PhoneFrame } from './PhoneFrame';
import type { VishingContent } from '@/data/practiceScenarios';

interface PhoneCallProps {
  content: VishingContent;
  onHangUpDirectly?: () => void;
}

export function PhoneCall({ content, onHangUpDirectly }: PhoneCallProps) {
  const [callState, setCallState] = useState<'incoming' | 'connected' | 'ended'>('incoming');
  const [scriptIndex, setScriptIndex] = useState(0);

  const handleAnswer = () => {
    setCallState('connected');
    setScriptIndex(0);
  };

  const handleHangUp = () => {
    setCallState('ended');
    onHangUpDirectly?.();
  };

  const handleNextDialogue = () => {
    if (scriptIndex < content.script.length - 1) {
      setScriptIndex((prev) => prev + 1);
    }
  };

  return (
    <PhoneFrame theme="dark">
      <div className="flex-1 bg-gradient-to-b from-gray-950 via-slate-900 to-black text-white p-4 flex flex-col justify-between">
        {/* Pantalla 1: Llamada Entrante */}
        {callState === 'incoming' && (
          <div className="flex-1 flex flex-col justify-between text-center py-4">
            <div className="space-y-1">
              <span className="text-xs uppercase tracking-wider text-gray-400 font-bold bg-white/10 px-3 py-1 rounded-full inline-block">
                Llamada entrante • SIM 1
              </span>
            </div>

            <div className="my-auto space-y-3">
              {/* Avatar con efecto de pulso */}
              <div className="relative inline-block">
                <div className="w-24 h-24 bg-gradient-to-br from-gray-700 to-gray-800 rounded-full flex items-center justify-center text-3xl font-bold text-white shadow-xl mx-auto border-2 border-white/20">
                  {content.avatarInitial}
                </div>
                <div className="absolute inset-0 rounded-full ring-4 ring-white/10 animate-ping opacity-25" />
              </div>

              <div>
                <h3 className="text-2xl font-bold text-white tracking-tight">
                  {content.callerName}
                </h3>
                <p className="text-base text-gray-300 font-medium mt-0.5">
                  {content.callerNumber}
                </p>
                <p className="text-xs text-gray-400 mt-1">Lima, Perú</p>
              </div>
            </div>

            {/* Botones de Rechazar / Contestar */}
            <div className="pt-4 flex items-center justify-around px-2">
              <div className="flex flex-col items-center gap-1.5">
                <button
                  type="button"
                  onClick={handleHangUp}
                  className="w-16 h-16 rounded-full bg-red-600 hover:bg-red-700 active:scale-95 flex items-center justify-center text-white shadow-lg transition-transform focus:outline-none focus:ring-4 focus:ring-red-400"
                  aria-label="Rechazar llamada"
                >
                  <PhoneOff size={28} />
                </button>
                <span className="text-xs text-gray-300 font-bold">Rechazar</span>
              </div>

              <div className="flex flex-col items-center gap-1.5">
                <button
                  type="button"
                  onClick={handleAnswer}
                  className="w-16 h-16 rounded-full bg-green-500 hover:bg-green-600 active:scale-95 flex items-center justify-center text-white shadow-lg transition-transform ring-4 ring-green-400/40 animate-pulse focus:outline-none focus:ring-4 focus:ring-green-400"
                  aria-label="Contestar llamada"
                >
                  <Phone size={28} />
                </button>
                <span className="text-xs text-green-400 font-bold">Contestar</span>
              </div>
            </div>
          </div>
        )}

        {/* Pantalla 2: En Llamada Conectada */}
        {callState === 'connected' && (
          <div className="flex-1 flex flex-col justify-between py-2 text-center">
            {/* Cabecera de llamada en curso */}
            <div className="space-y-0.5 border-b border-white/10 pb-2">
              <p className="text-xs text-green-400 font-bold flex items-center justify-center gap-1">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" /> En llamada (Altavoz activo) • 00:24
              </p>
              <h4 className="text-lg font-bold text-white">{content.callerName}</h4>
              <p className="text-xs text-gray-400">{content.callerNumber}</p>
            </div>

            {/* Transcripción simulada de la voz en tiempo real */}
            <div className="my-auto py-2">
              <div className="bg-gray-800/90 border border-gray-700 rounded-2xl p-3 text-left shadow-lg space-y-2">
                <div className="flex items-center gap-1.5 text-xs text-amber-400 font-bold">
                  <MessageSquare size={14} />
                  <span>Voz del llamante en el altavoz:</span>
                </div>
                <p className="text-sm text-gray-100 leading-relaxed font-medium">
                  "{content.script[scriptIndex]?.text}"
                </p>
                {scriptIndex < content.script.length - 1 && (
                  <button
                    type="button"
                    onClick={handleNextDialogue}
                    className="w-full text-xs font-bold text-primary-light bg-primary/30 hover:bg-primary/50 py-1.5 px-2 rounded-xl transition-colors"
                  >
                    Escuchar siguiente frase del llamante 👉
                  </button>
                )}
              </div>
            </div>

            {/* Matriz de controles de llamada Android */}
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-2 text-gray-400">
                <div className="flex flex-col items-center gap-1">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                    <MicOff size={18} />
                  </div>
                  <span className="text-xs">Silenciar</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                    <Grid size={18} />
                  </div>
                  <span className="text-xs">Teclado</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <div className="w-10 h-10 rounded-full bg-primary/40 text-primary-light flex items-center justify-center border border-primary/50">
                    <Volume2 size={18} />
                  </div>
                  <span className="text-xs text-primary-light font-bold">Altavoz</span>
                </div>
              </div>

              {/* Botón de Colgar */}
              <div className="flex justify-center pt-1">
                <button
                  type="button"
                  onClick={handleHangUp}
                  className="w-14 h-14 rounded-full bg-red-600 hover:bg-red-700 active:scale-95 flex items-center justify-center text-white shadow-lg transition-transform focus:outline-none focus:ring-4 focus:ring-red-400"
                  aria-label="Finalizar llamada"
                >
                  <PhoneOff size={26} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Pantalla 3: Llamada Finalizada */}
        {callState === 'ended' && (
          <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-red-600/20 text-red-400 border border-red-500/30 flex items-center justify-center">
              <PhoneOff size={32} />
            </div>
            <div>
              <h4 className="text-xl font-bold text-white">Llamada finalizada</h4>
              <p className="text-sm text-gray-400 mt-1">Has colgado la llamada con {content.callerName}.</p>
            </div>
            <button
              type="button"
              onClick={() => setCallState('incoming')}
              className="text-xs text-primary-light bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-full font-bold transition-colors"
            >
              Volver a ver llamada entrante
            </button>
          </div>
        )}
      </div>
    </PhoneFrame>
  );
}

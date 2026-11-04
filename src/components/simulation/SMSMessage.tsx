import {
  ArrowLeft,
  Phone,
  Search,
  MoreVertical,
  Plus,
  Smile,
  Send,
  User,
  ExternalLink,
} from 'lucide-react';
import { PhoneFrame } from './PhoneFrame';
import type { SmishingContent } from '@/data/practiceScenarios';

interface SMSMessageProps {
  content: SmishingContent;
}

export function SMSMessage({ content }: SMSMessageProps) {
  return (
    <PhoneFrame theme="light">
      {/* Encabezado de Google Mensajes / SMS Android */}
      <div className="bg-white border-b border-gray-200 px-3 py-2 flex items-center justify-between shadow-xs shrink-0">
        <div className="flex items-center gap-2.5 min-w-0">
          <ArrowLeft size={20} className="text-gray-700 shrink-0" />
          <div className="w-9 h-9 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-bold text-sm shrink-0 border border-blue-200">
            {content.senderName ? content.senderName.charAt(0).toUpperCase() : <User size={18} />}
          </div>
          <div className="min-w-0 leading-tight">
            <p className="font-bold text-sm text-gray-900 truncate">{content.senderName}</p>
            <p className="text-[11px] text-gray-500 truncate">{content.senderNumber}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 text-gray-600 shrink-0">
          <Phone size={18} />
          <Search size={18} />
          <MoreVertical size={18} />
        </div>
      </div>

      {/* Área de mensajes SMS */}
      <div className="flex-1 bg-[#F8F9FA] p-3 flex flex-col justify-between overflow-y-auto space-y-3">
        {/* Separador de Fecha y Canal */}
        <div className="text-center my-1 space-y-0.5">
          <span className="text-[11px] font-semibold text-gray-500 bg-gray-200/80 px-2.5 py-0.5 rounded-full">
            Hoy • 11:15 a. m.
          </span>
          <p className="text-[10px] text-gray-400">Mensaje de texto (SMS) • Entel</p>
        </div>

        {/* Burbujas de SMS */}
        <div className="space-y-3">
          {content.messages.map((message, index) => (
            <div key={index} className="flex justify-start">
              <div className="max-w-[88%] bg-[#E8F0FE] text-gray-900 p-3.5 rounded-2xl rounded-tl-sm border border-blue-200/60 shadow-xs">
                <p className="text-[14px] leading-relaxed">
                  {message.isLink ? (
                    <span className="space-y-2 block">
                      <span>{message.text}</span>
                      <span className="mt-2 p-2 bg-white rounded-xl border border-blue-300/80 flex items-center gap-1.5 text-xs text-blue-700 font-bold break-all">
                        <ExternalLink size={14} className="shrink-0" />
                        <span>Enlace sospechoso recibido</span>
                      </span>
                    </span>
                  ) : (
                    message.text
                  )}
                </p>
                <div className="flex items-center justify-between gap-2 mt-2 pt-1 border-t border-blue-200/40 text-[10px] text-gray-500">
                  <span>Vía SMS</span>
                  <span>11:15 a. m.</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Barra Inferior Simulada de Google Mensajes */}
      <div className="p-2 bg-white border-t border-gray-200 flex items-center gap-2 shrink-0">
        <button
          type="button"
          tabIndex={-1}
          aria-hidden="true"
          className="w-8 h-8 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center shrink-0"
        >
          <Plus size={18} />
        </button>

        <div className="flex-1 bg-gray-100 rounded-full px-3 py-1.5 flex items-center justify-between text-xs text-gray-400 border border-gray-200">
          <span>Mensaje de texto</span>
          <Smile size={16} className="text-gray-400" />
        </div>

        <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-xs shrink-0">
          <Send size={15} />
        </div>
      </div>
    </PhoneFrame>
  );
}

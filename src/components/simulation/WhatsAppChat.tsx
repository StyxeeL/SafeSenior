import {
  ArrowLeft,
  Phone,
  Video,
  MoreVertical,
  Smile,
  Paperclip,
  Camera,
  Mic,
  Lock,
  User,
  CheckCheck,
} from 'lucide-react';
import { PhoneFrame } from './PhoneFrame';
import type { WhatsAppContent } from '@/data/practiceScenarios';

interface WhatsAppChatProps {
  content: WhatsAppContent;
}

interface ReceiptProps {
  amount: string;
  service: string;
  date?: string;
  code?: string;
  operation?: string;
}

// Los datos coinciden con las pistas del paso «Pista» (Monto, Fecha, Código, N.° de operación).
function YapeReceipt({ amount, service, date, code, operation }: ReceiptProps) {
  const isYape = service.toLowerCase().includes('yape');
  return (
    <div className="rounded-2xl overflow-hidden bg-white shadow-md border border-purple-200 text-left max-w-[90%] my-1">
      <div className={`${isYape ? 'bg-[#742284]' : 'bg-gray-800'} text-white p-3 flex items-center justify-between`}>
        <div className="flex items-center gap-2">
          {isYape && (
            <div className="w-6 h-6 bg-[#00D3B8] rounded-full flex items-center justify-center font-bold text-xs text-[#742284]">
              Y
            </div>
          )}
          <span className="font-bold text-sm tracking-wide">{isYape ? '¡Yapeaste!' : 'Transferencia exitosa'}</span>
        </div>
      </div>

      <div className="p-3 bg-purple-50/40 text-center border-b border-purple-100">
        <p className="text-xs text-gray-600 font-semibold">Monto</p>
        <p className="text-3xl font-bold text-gray-900 mt-0.5">{amount}</p>
      </div>

      <div className="p-3 text-xs text-gray-700 space-y-1.5 bg-white">
        <div className="flex justify-between gap-2">
          <span className="text-gray-600">Fecha:</span>
          <span className="font-semibold text-gray-800 text-right">{date ?? 'Hoy'}</span>
        </div>
        {isYape && (
          <div className="flex justify-between gap-2">
            <span className="text-gray-600">Código de seguridad:</span>
            <span className="font-semibold text-gray-800">{code ?? '—'}</span>
          </div>
        )}
        <div className="flex justify-between gap-2">
          <span className="text-gray-600">N.° de operación:</span>
          <span className="font-mono text-gray-800">{operation ?? '—'}</span>
        </div>
        <p className="text-gray-600 text-center pt-1 border-t border-gray-100">Práctica: no es un comprobante real</p>
      </div>
    </div>
  );
}

export function WhatsAppChat({ content }: WhatsAppChatProps) {
  return (
    <PhoneFrame theme="whatsapp">
      {/* Encabezado superior de WhatsApp */}
      <div className="bg-[#075E54] text-white px-3 py-2 flex items-center justify-between shadow-md shrink-0">
        <div className="flex items-center gap-2 min-w-0">
          <ArrowLeft size={20} className="shrink-0 text-white/90" />
          <div className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center shrink-0 border border-white/30">
            <User size={20} className="text-white" />
          </div>
          <div className="min-w-0 leading-tight">
            <p className="font-bold text-sm text-white truncate">{content.contactName}</p>
            <p className="text-xs text-[#A2E6D8] truncate font-medium">
              {content.contactNumber} • en línea
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0 text-white/90 pl-1">
          <Video size={19} />
          <Phone size={18} />
          <MoreVertical size={19} />
        </div>
      </div>

      {/* Área del Chat con fondo característico de WhatsApp */}
      <div className="flex-1 bg-[#EFEAE2] p-3 flex flex-col justify-between overflow-y-auto space-y-3">
        {/* Banner de Cifrado */}
        <div className="bg-[#FFEECD] text-[#54656F] text-xs p-2 rounded-xl text-center shadow-xs border border-amber-200/60 flex items-center justify-center gap-1.5 leading-snug">
          <Lock size={12} className="shrink-0 text-amber-700" />
          <span>Los mensajes en este chat están protegidos con cifrado de extremo a extremo.</span>
        </div>

        {/* Separador de Fecha */}
        <div className="text-center my-1">
          <span className="bg-white/90 shadow-xs text-gray-600 text-xs font-bold px-3 py-1 rounded-lg uppercase tracking-wider">
            HOY
          </span>
        </div>

        {/* Burbujas de Mensajes */}
        <div className="space-y-2.5">
          {content.messages.map((message, index) => {
            const isUser = message.sender === 'user';

            return (
              <div key={index} className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
                {message.isReceipt && message.receiptAmount && message.receiptService ? (
                  <YapeReceipt
                    amount={message.receiptAmount}
                    service={message.receiptService}
                    date={message.receiptDate}
                    code={message.receiptCode}
                    operation={message.receiptOperation}
                  />
                ) : (
                  <div
                    className={[
                      'max-w-[88%] p-3 rounded-2xl text-base leading-relaxed shadow-sm relative',
                      isUser
                        ? 'bg-[#D9FDD3] text-[#111B21] rounded-tr-none ml-6'
                        : 'bg-white text-[#111B21] rounded-tl-none mr-6 border border-gray-200/60',
                    ].join(' ')}
                  >
                    <p>{message.text}</p>
                    <div className="flex items-center justify-end gap-1 mt-1 text-xs text-gray-600">
                      <span>10:42 a. m.</span>
                      {isUser && <CheckCheck size={14} className="text-[#53BDEB]" />}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Barra Inferior Simulada de WhatsApp (Teclado/Input) */}
      <div className="p-2 bg-[#F0F2F5] border-t border-gray-200/80 flex items-center gap-2 shrink-0">
        <div className="flex-1 bg-white rounded-full px-3 py-1.5 flex items-center gap-2 border border-gray-300/80 shadow-xs">
          <Smile size={18} className="text-gray-600" />
          <span className="text-gray-600 text-xs flex-1">Mensaje</span>
          <Paperclip size={18} className="text-gray-600" />
          <Camera size={18} className="text-gray-600" />
        </div>
        <div className="w-9 h-9 bg-[#00A884] text-white rounded-full flex items-center justify-center shadow-md shrink-0">
          <Mic size={18} />
        </div>
      </div>
    </PhoneFrame>
  );
}

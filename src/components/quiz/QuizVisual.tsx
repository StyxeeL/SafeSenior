import { User, Paperclip, AlertTriangle, CheckCheck } from 'lucide-react';
import type { QuizVisualType, QuizVisualData } from '@/data/quizQuestions';

interface QuizVisualProps {
  type: QuizVisualType;
  data: QuizVisualData;
}

export function QuizVisual({ type, data }: QuizVisualProps) {
  if (type === 'phone') {
    return (
      <div className="max-w-sm mx-auto bg-gray-900 rounded-[2.5rem] overflow-hidden shadow-2xl text-white p-6">
        <div className="text-center mt-10 mb-10">
          <p className="text-lg text-gray-300 mb-2">Llamada entrante</p>
          <div className="w-24 h-24 mx-auto bg-gray-700 rounded-full flex items-center justify-center mb-4">
            <span className="text-3xl font-bold">{data.avatarInitial}</span>
          </div>
          <h3 className="text-2xl font-bold">{data.callerName}</h3>
          <p className="text-gray-400 text-lg">{data.callerNumber}</p>
        </div>
      </div>
    );
  }

  if (type === 'sms') {
    return (
      <div className="max-w-sm mx-auto bg-white rounded-[2.5rem] overflow-hidden shadow-2xl border border-gray-200">
        <div className="bg-warning p-4 flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
            <User size={24} className="text-warning" aria-hidden="true" />
          </div>
          <div>
            <p className="font-bold text-white">{data.senderName}</p>
            <p className="text-sm text-white/90">{data.senderNumber}</p>
          </div>
        </div>
        <div className="p-4 min-h-[180px] bg-gray-100">
          {data.messages?.map((message, index) => (
            <div key={index} className="flex justify-start mb-2">
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
    );
  }

  if (type === 'whatsapp') {
    return (
      <div className="max-w-sm mx-auto bg-white rounded-[2.5rem] overflow-hidden shadow-2xl border border-gray-200">
        <div className="bg-[#075E54] p-4 flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
            <User size={24} className="text-[#075E54]" aria-hidden="true" />
          </div>
          <div className="min-w-0">
            <p className="font-bold text-white truncate">{data.contactName}</p>
            <p className="text-sm text-white/80 truncate">{data.contactNumber}</p>
          </div>
        </div>
        <div className="p-4 min-h-[180px] bg-[#E5DDD5]">
          {data.messages?.map((message, index) => {
            if (message.isReceipt) {
              return (
                <div key={index} className="flex justify-start mb-2">
                  <div className="relative overflow-hidden rounded-xl bg-green-50 border border-green-200 p-3 max-w-[85%]">
                    <div className="absolute top-0 left-0 right-0 bg-green-600 text-white text-[10px] font-bold px-2 py-0.5">
                      SIMULACIÓN
                    </div>
                    <div className="pt-4">
                      <p className="text-[10px] text-text-muted font-semibold uppercase">{message.receiptService}</p>
                      <p className="text-xl font-bold text-text">{message.receiptAmount}</p>
                      <p className="text-xs text-danger font-bold">NO ES REAL</p>
                    </div>
                  </div>
                </div>
              );
            }
            return (
              <div key={index} className={`flex mb-2 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={[
                    'max-w-[85%] p-3 rounded-lg text-base shadow-sm',
                    message.sender === 'user'
                      ? 'bg-[#DCF8C6] text-text rounded-br-none'
                      : 'bg-white text-text rounded-bl-none',
                  ].join(' ')}
                >
                  <p>{message.text}</p>
                  <div className="flex items-center justify-end gap-1 mt-1">
                    <span className="text-[10px] text-text-muted">Ahora</span>
                    {message.sender === 'user' && <CheckCheck size={12} className="text-blue-500" aria-hidden="true" />}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  if (type === 'email') {
    return (
      <div className="max-w-2xl mx-auto bg-white rounded-2xl overflow-hidden shadow-2xl border border-gray-200">
        <div className="bg-red-600 text-white px-4 py-2 flex items-center gap-2">
          <AlertTriangle size={18} aria-hidden="true" />
          <span className="font-bold text-xs">SIMULACIÓN EDUCATIVA — ESTE CORREO NO ES REAL</span>
        </div>
        <div className="p-4 sm:p-5 border-b border-gray-200">
          <div className="flex items-start gap-3 mb-3">
            <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold text-lg shrink-0">
              {data.fromName?.charAt(0)}
            </div>
            <div className="min-w-0">
              <p className="font-bold text-text truncate">{data.fromName}</p>
              <p className="text-sm text-text-muted truncate">&lt;{data.fromEmail}&gt;</p>
            </div>
          </div>
          <h2 className="text-lg font-bold text-text">{data.subject}</h2>
        </div>
        <div className="p-4 sm:p-5 min-h-[140px]">
          <div className="space-y-3 text-text">
            {data.body?.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
          {data.linkText && (
            <div className="mt-4">
              <span className="inline-block px-4 py-2 bg-primary text-white rounded-lg font-semibold opacity-75">
                {data.linkText}
              </span>
            </div>
          )}
          {data.attachmentName && (
            <div className="mt-4 flex items-center gap-3 p-2 border border-gray-200 rounded-xl bg-gray-50 max-w-sm">
              <Paperclip size={20} className="text-text-muted" aria-hidden="true" />
              <div className="min-w-0">
                <p className="font-semibold text-text text-sm truncate">{data.attachmentName}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return null;
}

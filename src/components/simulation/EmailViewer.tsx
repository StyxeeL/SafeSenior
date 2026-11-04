import {
  ArrowLeft,
  Archive,
  Trash2,
  Mail,
  MoreVertical,
  Paperclip,
  Reply,
  Forward,
  Star,
  ExternalLink,
} from 'lucide-react';
import { PhoneFrame } from './PhoneFrame';
import type { EmailContent } from '@/data/practiceScenarios';

interface EmailViewerProps {
  content: EmailContent;
}

export function EmailViewer({ content }: EmailViewerProps) {
  const senderInitial = content.fromName ? content.fromName.charAt(0).toUpperCase() : 'B';

  return (
    <PhoneFrame theme="light">
      {/* Barra Superior estilo Gmail Mobile */}
      <div className="bg-white border-b border-gray-200 px-3 py-2 flex items-center justify-between text-gray-700 shrink-0">
        <ArrowLeft size={20} className="text-gray-700" />
        <div className="flex items-center gap-3">
          <Archive size={18} />
          <Trash2 size={18} />
          <Mail size={18} />
          <MoreVertical size={18} />
        </div>
      </div>

      {/* Contenido del Correo Electrónico */}
      <div className="flex-1 bg-white p-3.5 overflow-y-auto space-y-3 text-left">
        {/* Asunto y Etiqueta */}
        <div>
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-base font-extrabold text-gray-900 leading-snug">
              {content.subject}
            </h3>
            <Star size={18} className="text-gray-300 shrink-0 mt-0.5" />
          </div>
          <span className="inline-block mt-1 text-[10px] font-bold bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
            Recibidos
          </span>
        </div>

        {/* Fila del Remitente */}
        <div className="flex items-start gap-2.5 pt-1 border-t border-gray-100">
          <div className="w-9 h-9 bg-red-600 text-white rounded-full flex items-center justify-center font-bold text-sm shrink-0 shadow-xs">
            {senderInitial}
          </div>
          <div className="min-w-0 flex-1 leading-tight">
            <div className="flex items-center justify-between">
              <p className="font-bold text-sm text-gray-900 truncate">{content.fromName}</p>
              <span className="text-[11px] text-gray-400">10:30 a. m.</span>
            </div>
            <p className="text-[11px] text-gray-500 truncate font-mono mt-0.5">
              {content.fromEmail}
            </p>
            <p className="text-[10px] text-gray-400 mt-0.5">para mí ▼</p>
          </div>
        </div>

        {/* Cuerpo del Correo */}
        <div className="pt-2 pb-3 space-y-2.5 border-t border-gray-100 text-gray-800 text-[13px] leading-relaxed">
          {content.body.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}

          {/* Botón de acción engañoso dentro del correo */}
          {content.linkText && (
            <div className="my-3 text-center">
              <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white rounded-xl font-bold text-xs shadow-xs border border-blue-700">
                <span>{content.linkText}</span>
                <ExternalLink size={12} />
              </span>
              <p className="text-[10px] text-red-600 font-semibold mt-1">
                ⚠️ Enlace sospechoso dentro del correo
              </p>
            </div>
          )}

          {/* Archivo adjunto simulado */}
          {content.attachmentName && (
            <div className="mt-3 p-2.5 bg-gray-50 rounded-xl border border-gray-200 flex items-center gap-2">
              <div className="p-1.5 bg-red-100 text-red-600 rounded-lg">
                <Paperclip size={16} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold text-gray-900 truncate">
                  {content.attachmentName}
                </p>
                <p className="text-[10px] text-gray-500">Archivo adjunto • 340 KB</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Acciones rápidas de pie de Gmail */}
      <div className="p-2 bg-white border-t border-gray-200 flex items-center justify-around text-xs text-gray-600 shrink-0">
        <div className="flex items-center gap-1 font-semibold">
          <Reply size={14} /> Responder
        </div>
        <div className="flex items-center gap-1 font-semibold">
          <Forward size={14} /> Reenviar
        </div>
      </div>
    </PhoneFrame>
  );
}

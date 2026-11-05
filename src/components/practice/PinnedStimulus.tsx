import type { ReactNode } from 'react';
import { Phone, User, MessageSquare, Mail, Paperclip, ExternalLink } from 'lucide-react';
import type { Pista, PistaTarget, ScenarioContent } from '@/data/practiceScenarios';
import { PistaTag } from './PistaTag';

interface PinnedStimulusProps {
  content: ScenarioContent;
  pistas: Pista[];
  reviewed: Set<number>;
  /** En el paso «Pista» las etiquetas se pueden tocar; en «Decidir» solo se muestran */
  onPistaClick?: (index: number) => void;
}

/**
 * D7 · Mensaje fijado: el contenido de la llamada o el mensaje queda visible
 * mientras el usuario revisa pistas y decide, con cada pista debajo del
 * mensaje que la contiene. Texto de 18 px y alto contraste.
 */
export function PinnedStimulus({ content, pistas, reviewed, onPistaClick }: PinnedStimulusProps) {
  const tagsFor = (target: PistaTarget): ReactNode => {
    const items = pistas.map((p, i) => ({ p, i })).filter(({ p }) => p.target === target);
    if (items.length === 0) return null;
    return (
      <div className="mt-2 space-y-2">
        <div className="flex flex-wrap gap-2">
          {items.map(({ p, i }) => (
            <PistaTag
              key={i}
              number={i + 1}
              label={p.label}
              reviewed={reviewed.has(i)}
              onClick={onPistaClick ? () => onPistaClick(i) : undefined}
            />
          ))}
        </div>
        {items
          .filter(({ i }) => reviewed.has(i))
          .map(({ p, i }) => (
            <p
              key={i}
              className="text-sm text-text bg-surface border-l-4 border-success rounded-r-xl px-3 py-2"
              aria-live="polite"
            >
              <strong className="text-success">Pista {i + 1}:</strong> {p.detail}
            </p>
          ))}
      </div>
    );
  };

  if (content.type === 'whatsapp') {
    return (
      <div className="rounded-3xl overflow-hidden border border-gray-200 shadow-card" data-escuchar>
        <div className="bg-[#075E54] text-white px-4 py-3">
          <div className="flex items-center gap-3">
            <span className="w-11 h-11 rounded-full bg-white/20 flex items-center justify-center shrink-0">
              <User size={24} aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <p className="font-bold text-lg truncate">{content.contactNumber}</p>
              <p className="text-sm text-white/90 truncate">Dice ser: {content.contactName} · número no guardado</p>
            </div>
          </div>
          {tagsFor('sender')}
        </div>
        <div className="bg-[#EFEAE2] p-3 space-y-3">
          {content.messages.map((msg, idx) => (
            <div key={idx} className="bg-surface rounded-2xl rounded-tl-md p-3 shadow-sm max-w-[95%]">
              {msg.isReceipt ? (
                <ReceiptCard
                  service={msg.receiptService ?? 'Yape'}
                  amount={msg.receiptAmount ?? ''}
                  date={msg.receiptDate}
                  code={msg.receiptCode}
                  operation={msg.receiptOperation}
                  tagsFor={tagsFor}
                />
              ) : (
                <p className="text-base text-text">«{msg.text}»</p>
              )}
              {tagsFor(`m${idx}`)}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (content.type === 'smishing') {
    return (
      <div className="rounded-3xl overflow-hidden border border-gray-200 shadow-card bg-surface" data-escuchar>
        <div className="px-4 py-3 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <span className="w-11 h-11 rounded-full bg-info-light text-info flex items-center justify-center shrink-0">
              <MessageSquare size={22} aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <p className="font-bold text-lg truncate">SMS de «{content.senderName}»</p>
              <p className="text-sm text-text-muted truncate">Remitente: {content.senderNumber}</p>
            </div>
          </div>
          {tagsFor('sender')}
        </div>
        <div className="p-3 space-y-3 bg-gray-50">
          {content.messages.map((msg, idx) => (
            <div key={idx} className="bg-surface border border-gray-200 rounded-2xl p-3">
              <p className="text-base text-text">«{msg.text}»</p>
              {tagsFor(`m${idx}`)}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (content.type === 'vishing') {
    return (
      <div className="rounded-3xl overflow-hidden border border-gray-800 shadow-card bg-gray-900 text-white" data-escuchar>
        <div className="px-4 py-3 border-b border-white/10">
          <div className="flex items-center gap-3">
            <span className="w-11 h-11 rounded-full bg-white/15 flex items-center justify-center shrink-0">
              <Phone size={22} aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <p className="font-bold text-lg truncate">Llamada de «{content.callerName}»</p>
              <p className="text-sm text-gray-300 truncate">{content.callerNumber}</p>
            </div>
          </div>
          {tagsFor('sender')}
        </div>
        <div className="p-3 space-y-3">
          <p className="text-sm text-gray-300">Lo que te dijo:</p>
          {content.script.map((line, idx) => (
            <div key={idx} className="bg-white/10 rounded-2xl p-3">
              <p className="text-base text-white">«{line.text}»</p>
              {tagsFor(`m${idx}`)}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Correo electrónico
  return (
    <div className="rounded-3xl overflow-hidden border border-gray-200 shadow-card bg-surface" data-escuchar>
      <div className="px-4 py-3 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <span className="w-11 h-11 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
            <Mail size={22} aria-hidden="true" />
          </span>
          <div className="min-w-0">
            <p className="font-bold text-lg truncate">{content.fromName}</p>
            <p className="text-sm text-text-muted break-all">{content.fromEmail}</p>
          </div>
        </div>
        {tagsFor('sender')}
      </div>
      <div className="p-4 space-y-3">
        <div>
          <p className="text-sm text-text-muted">Asunto</p>
          <p className="font-bold text-base">{content.subject}</p>
          {tagsFor('subject')}
        </div>
        {content.body.map((para, idx) => (
          <div key={idx}>
            <p className="text-base">{para}</p>
            {tagsFor(`m${idx}`)}
          </div>
        ))}
        {content.linkText && (
          <div>
            <span className="inline-flex items-center gap-2 bg-info-light text-info font-bold rounded-xl px-4 py-2">
              <ExternalLink size={18} aria-hidden="true" /> {content.linkText}
            </span>
            {tagsFor('link')}
          </div>
        )}
        {content.attachmentName && (
          <div>
            <span className="inline-flex items-center gap-2 bg-gray-100 rounded-xl px-4 py-2 font-bold">
              <Paperclip size={18} aria-hidden="true" /> {content.attachmentName}
            </span>
            {tagsFor('attachment')}
          </div>
        )}
      </div>
    </div>
  );
}

interface ReceiptCardProps {
  service: string;
  amount: string;
  date?: string;
  code?: string;
  operation?: string;
  tagsFor: (target: PistaTarget) => ReactNode;
}

function ReceiptCard({ service, amount, date, code, operation, tagsFor }: ReceiptCardProps) {
  const isYape = service.toLowerCase().includes('yape');
  const rows: { label: string; value?: string; target: PistaTarget }[] = [
    { label: 'Fecha', value: date, target: 'receipt-date' },
    { label: 'Código de seguridad', value: code, target: 'receipt-code' },
    { label: 'N.° de operación', value: operation, target: 'receipt-op' },
  ];
  return (
    <div className="rounded-2xl border-2 border-gray-200 overflow-hidden">
      <div className={`${isYape ? 'bg-[#742284]' : 'bg-primary'} text-white px-3 py-2 font-bold`}>
        {isYape ? '¡Yapeaste!' : service} · captura recibida
      </div>
      <div className="p-3 space-y-3">
        <div>
          <p className="text-sm text-text-muted">Monto</p>
          <p className="text-2xl font-bold">{amount}</p>
          {tagsFor('receipt-amount')}
        </div>
        {rows
          .filter((r) => r.value)
          .map((r) => (
            <div key={r.target}>
              <p className="text-sm text-text-muted">{r.label}</p>
              <p className="text-base font-bold">{r.value}</p>
              {tagsFor(r.target)}
            </div>
          ))}
      </div>
    </div>
  );
}

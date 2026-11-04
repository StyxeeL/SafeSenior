import type { ReactNode } from 'react';
import { Wifi, Battery } from 'lucide-react';

interface PhoneFrameProps {
  children: ReactNode;
  theme?: 'dark' | 'light' | 'whatsapp';
  currentTime?: string;
}

export function PhoneFrame({
  children,
  theme = 'light',
  currentTime = '10:42',
}: PhoneFrameProps) {
  const isDark = theme === 'dark';
  const isWhatsApp = theme === 'whatsapp';

  const statusBarBg = isWhatsApp
    ? 'bg-[#054c44] text-white'
    : isDark
    ? 'bg-black text-white'
    : 'bg-white text-gray-800 border-b border-gray-100';

  return (
    <div className="w-full max-w-[360px] mx-auto select-none">
      {/* Marco Exterior del Smartphone (Bisel físico) */}
      <div className="relative bg-gray-900 rounded-[3rem] p-3 shadow-2xl border-4 border-gray-800 ring-1 ring-white/10">
        {/* Altavoz frontal físico del teléfono */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-16 h-1.5 bg-gray-700 rounded-full z-30" />

        {/* Pantalla del Teléfono */}
        <div className="relative rounded-[2.2rem] overflow-hidden bg-white flex flex-col min-h-[460px] max-h-[580px] shadow-inner">
          {/* Barra de Estado de Android (Status Bar) */}
          <div
            className={`h-7 px-5 flex items-center justify-between text-xs font-semibold shrink-0 z-20 ${statusBarBg}`}
          >
            {/* Hora */}
            <span>{currentTime}</span>

            {/* Cámara frontal Punch-hole */}
            <div className="w-3.5 h-3.5 bg-black rounded-full ring-1 ring-gray-700 shrink-0" />

            {/* Iconos de conectividad y batería */}
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-bold">4G</span>
              <Wifi size={13} strokeWidth={2.5} />
              <div className="flex items-center gap-0.5">
                <span className="text-[10px]">85%</span>
                <Battery size={14} strokeWidth={2.5} className="rotate-90" />
              </div>
            </div>
          </div>

          {/* Contenido de la Aplicación Simulada */}
          <div className="flex-1 overflow-y-auto flex flex-col">{children}</div>

          {/* Barra de Navegación Inferior de Android (Línea Home) */}
          <div className="h-5 bg-black/90 flex items-center justify-center shrink-0 z-20">
            <div className="w-28 h-1 bg-white/70 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}


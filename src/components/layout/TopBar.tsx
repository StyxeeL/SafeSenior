import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Shield, Volume2, Square, HelpCircle } from 'lucide-react';
import { BarAction } from './BarAction';
import { HelpModal } from './HelpModal';
import { useReadAloud } from '@/hooks/useReadAloud';

const titles: Record<string, { title: string; subtitle: string }> = {
  '/': { title: 'SafeSenior', subtitle: 'Práctica segura contra estafas' },
  '/progreso': { title: 'Mi avance', subtitle: 'Lo que ya practicaste' },
  '/configuracion': { title: 'Configuración', subtitle: 'Letra, sonido y contraste' },
};

function getTitle(pathname: string) {
  if (titles[pathname]) return titles[pathname];
  if (pathname.startsWith('/aprende/')) return { title: 'Aprende', subtitle: 'Lee o escucha con calma' };
  if (pathname.startsWith('/evaluame/resultado')) return { title: 'Resultado', subtitle: 'Así te fue en el reto' };
  if (pathname.startsWith('/evaluame')) return { title: 'Reto', subtitle: 'Pon a prueba lo aprendido' };
  return titles['/'];
}

/**
 * C1 · Barra superior general. Una sola navegación (D10): la barra inferior
 * lleva a las secciones; aquí solo están «Escuchar» y «Ayuda», con texto.
 */
export function TopBar() {
  const location = useLocation();
  const { title, subtitle } = getTitle(location.pathname);
  const { supported, speaking, toggleRead } = useReadAloud();
  const [helpOpen, setHelpOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-30 bg-background/95 backdrop-blur border-b border-gray-200">
      <div className="max-w-3xl mx-auto h-20 px-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <span className="hidden min-[400px]:flex shrink-0 w-11 h-11 rounded-xl bg-primary text-white items-center justify-center">
            <Shield size={24} aria-hidden="true" />
          </span>
          <div className="min-w-0 leading-tight">
            <h1 className="text-xl font-bold text-text truncate">{title}</h1>
            <p className="text-xs text-text-muted truncate">{subtitle}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {supported && (
            <BarAction
              icon={speaking ? Square : Volume2}
              label={speaking ? 'Detener' : 'Escuchar'}
              pressed={speaking}
              onClick={() => toggleRead()}
              ariaLabel={speaking ? 'Detener la lectura' : 'Escuchar esta pantalla'}
            />
          )}
          <BarAction icon={HelpCircle} label="Ayuda" onClick={() => setHelpOpen(true)} />
        </div>
      </div>
      <HelpModal isOpen={helpOpen} onClose={() => setHelpOpen(false)} />
    </header>
  );
}

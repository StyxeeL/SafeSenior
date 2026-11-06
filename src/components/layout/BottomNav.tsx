import { Link, useLocation } from 'react-router-dom';
import { Map, BarChart3, Settings } from 'lucide-react';

// Vocabulario único (guía de estilo): «Mi avance», no «Mi progreso».
const navItems = [
  { to: '/', label: 'Mi camino', icon: Map, on: 'bg-sms text-white', off: 'text-sms' },
  { to: '/progreso', label: 'Mi avance', icon: BarChart3, on: 'bg-success text-white', off: 'text-success' },
  { to: '/configuracion', label: 'Configuración', icon: Settings, on: 'bg-call text-white', off: 'text-call' },
];

export function BottomNav() {
  const location = useLocation();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-30 bg-surface border-t border-gray-200 shadow-[0_-2px_12px_rgba(0,0,0,0.06)]"
      aria-label="Navegación principal"
    >
      <div className="max-w-2xl mx-auto px-2">
        <ul className="flex items-stretch justify-around h-20 py-2 gap-1">
          {navItems.map((item) => {
            const isActive =
              item.to === '/' ? location.pathname === '/' : location.pathname.startsWith(item.to);
            return (
              <li key={item.to} className="flex-1 max-w-[180px]">
                <Link
                  to={item.to}
                  className={[
                    'flex flex-col items-center justify-center gap-1 w-full h-full rounded-2xl',
                    'text-xs font-bold transition-colors duration-200',
                    'focus:outline-none focus-visible:ring-4 focus-visible:ring-info/40',
                    isActive ? item.on : 'text-text hover:bg-gray-100',
                  ].join(' ')}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <item.icon size={26} strokeWidth={isActive ? 2.6 : 2.2} aria-hidden="true" className={isActive ? '' : item.off} />
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}

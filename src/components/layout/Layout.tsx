import type { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { TopBar } from './TopBar';
import { BottomNav } from './BottomNav';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { pathname } = useLocation();
  // Dentro de una práctica la pantalla tiene su propia barra (con «Salir seguro»)
  // y se ocultan las salidas laterales para no distraer (flujo lineal).
  const inPractice = pathname.startsWith('/practica/');

  return (
    <div className="min-h-screen bg-background">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 bg-primary text-white px-4 py-2 rounded-xl font-bold"
      >
        Saltar al contenido principal
      </a>
      {!inPractice && <TopBar />}
      <main
        id="main-content"
        className={[
          'max-w-3xl mx-auto px-4 sm:px-6',
          inPractice ? 'pt-0 pb-10' : 'pt-24 pb-32',
        ].join(' ')}
        tabIndex={-1}
      >
        {children}
      </main>
      {!inPractice && <BottomNav />}
    </div>
  );
}

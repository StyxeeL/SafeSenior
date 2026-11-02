import type { ReactNode } from 'react';
import { TopBar } from './TopBar';
import { BottomNav } from './BottomNav';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 bg-primary text-white px-4 py-2 rounded-xl font-semibold"
      >
        Saltar al contenido principal
      </a>
      <TopBar />
      <main id="main-content" className="max-w-3xl mx-auto pt-20 pb-24 px-4 sm:px-6" tabIndex={-1}>
        {children}
      </main>
      <BottomNav />
    </div>
  );
}

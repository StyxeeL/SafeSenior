import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { HomePage } from '@/pages/HomePage';
import { LearnPage } from '@/pages/LearnPage';
import { PracticePage } from '@/pages/PracticePage';
import { QuizPage } from '@/pages/QuizPage';
import { ProgressPage } from '@/pages/ProgressPage';
import { SettingsPage } from '@/pages/SettingsPage';
import { NotFoundPage } from '@/pages/NotFoundPage';

export function AppRouter() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/aprende" element={<LearnPage />} />
          <Route path="/practica" element={<PracticePage />} />
          <Route path="/evaluame" element={<QuizPage />} />
          <Route path="/progreso" element={<ProgressPage />} />
          <Route path="/configuracion" element={<SettingsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

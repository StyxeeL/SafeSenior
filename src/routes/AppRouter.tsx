import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { HomePage } from '@/pages/HomePage';
import { LearnTopicPage } from '@/pages/LearnTopicPage';
import { ScenarioPage } from '@/pages/ScenarioPage';
import { QuizPage } from '@/pages/QuizPage';
import { QuizResultPage } from '@/pages/QuizResultPage';
import { ProgressPage } from '@/pages/ProgressPage';
import { SettingsPage } from '@/pages/SettingsPage';
import { NotFoundPage } from '@/pages/NotFoundPage';

export function AppRouter() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          {/* El Camino Principal */}
          <Route path="/" element={<HomePage />} />

          {/* Rutas individuales invocadas desde los nodos del camino */}
          <Route path="/aprende/:topicId" element={<LearnTopicPage />} />
          <Route path="/practica/:moduleId/:scenarioId" element={<ScenarioPage />} />
          <Route path="/evaluame" element={<QuizPage />} />
          <Route path="/evaluame/resultado" element={<QuizResultPage />} />

          {/* Vistas principales complementarias */}
          <Route path="/progreso" element={<ProgressPage />} />
          <Route path="/configuracion" element={<SettingsPage />} />

          {/* Redirecciones de las antiguas secciones que ahora viven en el camino */}
          <Route path="/aprende" element={<Navigate to="/" replace />} />
          <Route path="/practica" element={<Navigate to="/" replace />} />
          <Route path="/practica/:moduleId" element={<Navigate to="/" replace />} />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

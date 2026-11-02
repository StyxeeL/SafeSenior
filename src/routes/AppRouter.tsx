import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { HomePage } from '@/pages/HomePage';
import { LearnPage } from '@/pages/LearnPage';
import { LearnTopicPage } from '@/pages/LearnTopicPage';
import { PracticePage } from '@/pages/PracticePage';
import { ModulePage } from '@/pages/ModulePage';
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
          <Route path="/" element={<HomePage />} />
          <Route path="/aprende" element={<LearnPage />} />
          <Route path="/aprende/:topicId" element={<LearnTopicPage />} />
          <Route path="/practica" element={<PracticePage />} />
          <Route path="/practica/:moduleId" element={<ModulePage />} />
          <Route path="/practica/:moduleId/:scenarioId" element={<ScenarioPage />} />
          <Route path="/evaluame" element={<QuizPage />} />
          <Route path="/evaluame/resultado" element={<QuizResultPage />} />
          <Route path="/progreso" element={<ProgressPage />} />
          <Route path="/configuracion" element={<SettingsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

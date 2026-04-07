import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import AppShell from './layouts/AppShell';
import ModulePage from './pages/ModulePage';
import EducationCrudPage from './pages/EducationCrudPage';
import TrackerCrudPage from './pages/TrackerCrudPage';
import CommunityCrudPage from './pages/CommunityCrudPage';
import { workspaceModules } from './lib/module-catalog';

const App = () => {
  const modulesWithoutDashboard = workspaceModules.filter((module) => module.id !== 'beranda');

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppShell />}>
          <Route path="/" element={<DashboardPage />} />
          {modulesWithoutDashboard.map((module) => (
            <Route
              key={module.id}
              path={module.route}
              element={
                module.id === 'edukasi' ? (
                  <EducationCrudPage />
                ) : module.id === 'tracker' ? (
                  <TrackerCrudPage />
                ) : module.id === 'komunitas' ? (
                  <CommunityCrudPage />
                ) : (
                  <ModulePage module={module} />
                )
              }
            />
          ))}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;

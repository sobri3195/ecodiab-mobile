import { Outlet, useLocation } from 'react-router-dom';
import BottomNav from '../components/BottomNav';
import AppHeader from '../components/layout/AppHeader';
import { workspaceModules } from '../lib/module-catalog';

const AppShell = () => {
  const location = useLocation();
  const currentModule = workspaceModules.find((module) => module.route === location.pathname);

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <div className="mx-auto min-h-screen w-full max-w-md bg-slate-50 shadow-[0_0_0_1px_rgba(148,163,184,0.2)]">
        <AppHeader title={currentModule?.name ?? 'Dashboard'} />
        <main className="px-4 pb-28 pt-4">
          <Outlet />
        </main>
        <BottomNav />
      </div>
    </div>
  );
};

export default AppShell;

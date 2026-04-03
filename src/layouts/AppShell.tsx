import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import AppHeader from '../components/layout/AppHeader';
import AppSidebar from '../components/layout/AppSidebar';
import { workspaceModules } from '../lib/module-catalog';

const AppShell = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const currentModule = workspaceModules.find((module) => module.route === location.pathname);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="flex min-h-screen">
        <AppSidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />

        <div className="flex min-h-screen min-w-0 flex-1 flex-col">
          <AppHeader onOpenMenu={() => setMobileOpen(true)} title={currentModule?.name ?? 'Dashboard'} />
          <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6 lg:px-8">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default AppShell;

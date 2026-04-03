import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AlertCenterProvider } from './contexts/alert-center-context';
import AppShell from './layouts/AppShell';

const Screen = ({ title }: { title: string }) => (
  <section className="space-y-3">
    <header>
      <h1 className="text-2xl font-semibold tracking-tight text-slate-900">{title}</h1>
      <p className="text-sm text-slate-500">Monitor and manage your clinical workflow from this page.</p>
    </header>
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <p className="text-sm text-slate-600">
        This module is ready. Use the bottom navigation to switch quickly between key tasks.
      </p>
    </div>
  </section>
);

const App = () => {
  return (
    <AlertCenterProvider value={{ unresolvedCount: 3 }}>
      <BrowserRouter>
        <Routes>
          <Route element={<AppShell />}>
            <Route path="/" element={<Screen title="Dashboard" />} />
            <Route path="/patients" element={<Screen title="Patients" />} />
            <Route path="/alerts" element={<Screen title="Alerts" />} />
            <Route path="/education" element={<Screen title="Education" />} />
            <Route path="/analytics" element={<Screen title="Analytics" />} />
            <Route path="/scheduling" element={<Screen title="Scheduling" />} />
            <Route path="/reports" element={<Screen title="Reports" />} />
            <Route path="/settings" element={<Screen title="Settings" />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AlertCenterProvider>
  );
};

export default App;

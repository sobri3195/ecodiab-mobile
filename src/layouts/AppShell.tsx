import { Outlet } from 'react-router-dom';
import BottomNav from '../components/BottomNav';
import Sidebar from '../components/Sidebar';

const AppShell = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto flex min-h-screen max-w-screen-2xl">
        <Sidebar />
        <main className="flex-1 p-4 pb-24 md:pb-4">
          <Outlet />
        </main>
      </div>
      <BottomNav />
    </div>
  );
};

export default AppShell;

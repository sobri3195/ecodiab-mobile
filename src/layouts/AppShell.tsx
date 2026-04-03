import { Outlet } from 'react-router-dom';
import BottomNav from '../components/BottomNav';
import Sidebar from '../components/Sidebar';

const AppShell = () => {
  return (
    <div className="app-shell">
      <div className="app-shell-content">
        <Sidebar />
        <main className="app-main">
          <Outlet />
        </main>
      </div>
      <BottomNav />
    </div>
  );
};

export default AppShell;

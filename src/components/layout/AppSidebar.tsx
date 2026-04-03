import { X } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { workspaceModules } from '../../lib/module-catalog';

type AppSidebarProps = {
  mobileOpen: boolean;
  onClose: () => void;
};

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  [
    'group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition',
    isActive
      ? 'bg-sky-50 text-sky-700 ring-1 ring-sky-100'
      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900',
  ].join(' ');

const AppSidebar = ({ mobileOpen, onClose }: AppSidebarProps) => {
  return (
    <>
      <aside className="hidden lg:flex lg:w-72 lg:flex-col lg:border-r lg:border-slate-200 lg:bg-white lg:px-5 lg:py-6">
        <div className="mb-8 flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-sky-500 to-emerald-500 text-white">
            EA
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Clinical Platform</p>
            <h1 className="text-lg font-semibold text-slate-900">EcoDiab AI</h1>
          </div>
        </div>
        <nav className="space-y-1" aria-label="Primary navigation">
          {workspaceModules.map((module) => {
            const Icon = module.icon;
            return (
              <NavLink key={module.id} to={module.route} className={navLinkClass}>
                <Icon size={18} className="text-slate-400 group-hover:text-slate-500" />
                <span>{module.name}</span>
              </NavLink>
            );
          })}
        </nav>
      </aside>

      <div className={`fixed inset-0 z-50 lg:hidden ${mobileOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}>
        <button
          type="button"
          aria-label="Close menu"
          onClick={onClose}
          className={`absolute inset-0 bg-slate-900/40 transition ${mobileOpen ? 'opacity-100' : 'opacity-0'}`}
        />
        <aside
          className={`absolute left-0 top-0 h-full w-72 bg-white p-4 shadow-2xl transition-transform duration-200 ${
            mobileOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-base font-semibold text-slate-900">EcoDiab AI</h2>
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100"
            >
              <X size={18} />
            </button>
          </div>
          <nav className="space-y-1" aria-label="Mobile navigation">
            {workspaceModules.map((module) => {
              const Icon = module.icon;
              return (
                <NavLink key={module.id} to={module.route} className={navLinkClass} onClick={onClose}>
                  <Icon size={18} className="text-slate-400" />
                  <span>{module.name}</span>
                </NavLink>
              );
            })}
          </nav>
        </aside>
      </div>
    </>
  );
};

export default AppSidebar;

import { NavLink } from 'react-router-dom';
import { workspaceModules } from '../lib/module-catalog';

const Sidebar = () => {
  return (
    <aside className="hidden w-64 shrink-0 border-r border-slate-200 bg-white p-4 md:block">
      <nav aria-label="Sidebar navigation" className="space-y-1">
        {workspaceModules.map((module) => (
          <NavLink
            key={module.id}
            to={module.route}
            className={({ isActive }) =>
              `block rounded-md px-3 py-2 text-sm transition-colors ${
                isActive ? 'bg-slate-100 font-medium text-slate-900' : 'text-slate-600 hover:bg-slate-50'
              }`
            }
          >
            {module.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;

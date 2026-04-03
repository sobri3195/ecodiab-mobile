import { NavLink } from 'react-router-dom';
import { workspaceModules } from '../lib/module-catalog';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <nav aria-label="Sidebar navigation" className="sidebar-nav">
        {workspaceModules.map((module) => (
          <NavLink
            key={module.id}
            to={module.route}
            className={({ isActive }) => `sidebar-link ${isActive ? 'sidebar-link-active' : ''}`.trim()}
          >
            {module.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;

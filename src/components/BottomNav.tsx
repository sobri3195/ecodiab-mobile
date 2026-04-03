import { useEffect, useMemo, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAlertCenter } from '../contexts/alert-center-context';
import { bottomSheetModules, primaryTabs } from '../lib/bottom-nav-config';

const isRouteActive = (pathname: string, route: string): boolean => {
  if (route === '/') {
    return pathname === '/';
  }

  return pathname === route || pathname.startsWith(`${route}/`);
};

const tabIcons: Record<string, string> = {
  dashboard: '🏠',
  patients: '🧑‍⚕️',
  alerts: '🔔',
  education: '📚',
  analytics: '📈',
  scheduling: '📅',
  reports: '🧾',
  settings: '⚙️',
};

const BottomNav = () => {
  const { pathname } = useLocation();
  const { unresolvedCount } = useAlertCenter();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [query, setQuery] = useState('');

  useEffect(() => {
    setIsSheetOpen(false);
    setQuery('');
  }, [pathname]);

  const filteredModules = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    if (!normalized) {
      return bottomSheetModules;
    }

    return bottomSheetModules.filter((module) =>
      [module.name, module.description, module.route].some((value) =>
        value?.toLowerCase().includes(normalized),
      ),
    );
  }, [query]);

  return (
    <>
      <div className="bottom-nav-wrap" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
        <nav aria-label="Mobile bottom navigation" className="bottom-nav">
          <ul className="bottom-nav-list">
            {primaryTabs.map((tab) => {
              const active = isRouteActive(pathname, tab.route);

              return (
                <li key={tab.id}>
                  <NavLink
                    to={tab.route}
                    aria-label={`Go to ${tab.name}`}
                    aria-current={active ? 'page' : undefined}
                    className={`bottom-nav-item ${active ? 'bottom-nav-item-active' : ''}`.trim()}
                  >
                    <span aria-hidden="true" className="bottom-nav-icon">
                      {tabIcons[tab.id] ?? '•'}
                    </span>
                    <span>{tab.name}</span>
                    {tab.id === 'alerts' && unresolvedCount > 0 ? (
                      <span
                        aria-label={`${unresolvedCount} unresolved alerts`}
                        className="bottom-nav-badge"
                      >
                        {unresolvedCount > 99 ? '99+' : unresolvedCount}
                      </span>
                    ) : null}
                  </NavLink>
                </li>
              );
            })}
            <li>
              <button
                type="button"
                aria-label="Open more modules"
                aria-expanded={isSheetOpen}
                aria-controls="more-modules-sheet"
                onClick={() => setIsSheetOpen((open) => !open)}
                className={`bottom-nav-item bottom-nav-button ${isSheetOpen ? 'bottom-nav-item-active' : ''}`.trim()}
              >
                <span aria-hidden="true" className="bottom-nav-icon">
                  ☰
                </span>
                <span>More</span>
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {isSheetOpen ? (
        <>
          <button
            type="button"
            aria-label="Close more modules sheet"
            className="bottom-sheet-overlay"
            onClick={() => setIsSheetOpen(false)}
          />
          <section
            id="more-modules-sheet"
            aria-label="More modules"
            className="bottom-sheet"
            style={{ paddingBottom: 'calc(env(safe-area-inset-bottom) + 1rem)' }}
          >
            <div className="bottom-sheet-grabber" aria-hidden="true">
              <span />
            </div>
            <label htmlFor="module-search" className="sr-only">
              Search modules
            </label>
            <input
              id="module-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search modules"
              className="bottom-sheet-search"
            />

            <ul className="bottom-sheet-list">
              {filteredModules.map((module) => (
                <li key={module.id}>
                  <NavLink
                    to={module.route}
                    aria-label={`Go to ${module.name}`}
                    className="bottom-sheet-link"
                    onClick={() => setIsSheetOpen(false)}
                  >
                    <span className="bottom-sheet-link-icon" aria-hidden="true">
                      {tabIcons[module.id] ?? '📦'}
                    </span>
                    <div>
                      <div className="bottom-sheet-link-title">{module.name}</div>
                      {module.description ? (
                        <p className="bottom-sheet-link-description">{module.description}</p>
                      ) : null}
                    </div>
                  </NavLink>
                </li>
              ))}
              {filteredModules.length === 0 ? (
                <li className="bottom-sheet-empty">No modules found.</li>
              ) : null}
            </ul>
          </section>
        </>
      ) : null}
    </>
  );
};

export default BottomNav;

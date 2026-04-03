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
      <div className="md:hidden" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
        <nav
          aria-label="Mobile bottom navigation"
          className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200/90 bg-white/95 px-2 pb-[env(safe-area-inset-bottom)] pt-2 backdrop-blur-lg"
        >
          <ul className="grid grid-cols-5 gap-2">
            {primaryTabs.map((tab) => {
              const active = isRouteActive(pathname, tab.route);

              return (
                <li key={tab.id}>
                  <NavLink
                    to={tab.route}
                    aria-label={`Go to ${tab.name}`}
                    aria-current={active ? 'page' : undefined}
                    className={`relative flex min-h-[54px] flex-col items-center justify-center rounded-xl px-1 text-[11px] leading-tight transition-all duration-200 ${
                      active
                        ? 'bg-slate-900 text-white shadow-lg'
                        : 'text-slate-500 hover:bg-slate-100 hover:text-slate-800'
                    }`}
                  >
                    <span aria-hidden="true" className="text-base">
                      {tabIcons[tab.id] ?? '•'}
                    </span>
                    <span>{tab.name}</span>
                    {tab.id === 'alerts' && unresolvedCount > 0 ? (
                      <span
                        aria-label={`${unresolvedCount} unresolved alerts`}
                        className="absolute right-1 top-1 inline-flex min-w-[18px] items-center justify-center rounded-full bg-rose-500 px-1 text-[10px] font-semibold text-white"
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
                className={`flex min-h-[54px] w-full flex-col items-center justify-center rounded-xl px-1 text-[11px] leading-tight transition-all duration-200 ${
                  isSheetOpen
                    ? 'bg-slate-900 text-white shadow-lg'
                    : 'text-slate-500 hover:bg-slate-100 hover:text-slate-800'
                }`}
              >
                <span aria-hidden="true" className="text-base">
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
            className="fixed inset-0 z-40 bg-slate-900/40 md:hidden"
            onClick={() => setIsSheetOpen(false)}
          />
          <section
            id="more-modules-sheet"
            aria-label="More modules"
            className="fixed inset-x-0 bottom-0 z-50 max-h-[75vh] rounded-t-3xl bg-white p-4 shadow-2xl md:hidden"
            style={{ paddingBottom: 'calc(env(safe-area-inset-bottom) + 1rem)' }}
          >
            <div className="mb-3 flex justify-center" aria-hidden="true">
              <span className="h-1.5 w-12 rounded-full bg-slate-300" />
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
              className="mb-3 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm"
            />

            <ul className="space-y-1 overflow-auto">
              {filteredModules.map((module) => (
                <li key={module.id}>
                  <NavLink
                    to={module.route}
                    aria-label={`Go to ${module.name}`}
                    className="flex items-start gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-700 transition-colors hover:bg-slate-50"
                    onClick={() => setIsSheetOpen(false)}
                  >
                    <span className="pt-0.5 text-base" aria-hidden="true">
                      {tabIcons[module.id] ?? '📦'}
                    </span>
                    <div>
                      <div className="font-medium">{module.name}</div>
                      {module.description ? (
                        <p className="text-xs text-slate-500">{module.description}</p>
                      ) : null}
                    </div>
                  </NavLink>
                </li>
              ))}
              {filteredModules.length === 0 ? (
                <li className="rounded-xl bg-slate-50 px-3 py-2 text-sm text-slate-500">
                  No modules found.
                </li>
              ) : null}
            </ul>
          </section>
        </>
      ) : null}
    </>
  );
};

export default BottomNav;

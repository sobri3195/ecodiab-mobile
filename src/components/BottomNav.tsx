import { useMemo, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAlertCenter } from '../contexts/alert-center-context';
import { bottomSheetModules, primaryTabs } from '../lib/bottom-nav-config';

const isRouteActive = (pathname: string, route: string): boolean => {
  if (route === '/') {
    return pathname === '/';
  }

  return pathname === route || pathname.startsWith(`${route}/`);
};

const BottomNav = () => {
  const { pathname } = useLocation();
  const { unresolvedCount } = useAlertCenter();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [query, setQuery] = useState('');

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
          className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 px-1 pb-[env(safe-area-inset-bottom)] pt-1 backdrop-blur"
        >
          <ul className="grid grid-cols-5 gap-1">
            {primaryTabs.map((tab) => {
              const active = isRouteActive(pathname, tab.route);

              return (
                <li key={tab.id}>
                  <NavLink
                    to={tab.route}
                    aria-label={`Go to ${tab.name}`}
                    aria-current={active ? 'page' : undefined}
                    className={`relative flex min-h-[44px] flex-col items-center justify-center rounded-md px-1 text-xs transition-all duration-200 ${
                      active
                        ? 'bg-slate-100 text-slate-900 shadow-[inset_0_-2px_0_0_rgb(15_23_42)]'
                        : 'text-slate-500 hover:bg-slate-50'
                    }`}
                  >
                    <span>{tab.name}</span>
                    {tab.id === 'alerts' && unresolvedCount > 0 ? (
                      <span
                        aria-label={`${unresolvedCount} unresolved alerts`}
                        className="absolute right-2 top-1 inline-flex min-w-[18px] items-center justify-center rounded-full bg-rose-500 px-1 text-[10px] font-semibold text-white"
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
                onClick={() => setIsSheetOpen((open) => !open)}
                className={`flex min-h-[44px] w-full flex-col items-center justify-center rounded-md px-1 text-xs transition-all duration-200 ${
                  isSheetOpen ? 'bg-slate-100 text-slate-900' : 'text-slate-500 hover:bg-slate-50'
                }`}
              >
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
            className="fixed inset-0 z-40 bg-slate-900/30 md:hidden"
            onClick={() => setIsSheetOpen(false)}
          />
          <section
            aria-label="More modules"
            className="fixed inset-x-0 bottom-0 z-50 max-h-[70vh] rounded-t-2xl bg-white p-4 shadow-2xl md:hidden"
            style={{ paddingBottom: 'calc(env(safe-area-inset-bottom) + 1rem)' }}
          >
            <label htmlFor="module-search" className="sr-only">
              Search modules
            </label>
            <input
              id="module-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search modules"
              className="mb-3 w-full rounded-md border border-slate-200 px-3 py-2 text-sm"
            />

            <ul className="space-y-1 overflow-auto">
              {filteredModules.map((module) => (
                <li key={module.id}>
                  <NavLink
                    to={module.route}
                    aria-label={`Go to ${module.name}`}
                    className="block rounded-md px-3 py-2 text-sm text-slate-700 transition-colors hover:bg-slate-50"
                    onClick={() => setIsSheetOpen(false)}
                  >
                    <div className="font-medium">{module.name}</div>
                    {module.description ? (
                      <p className="text-xs text-slate-500">{module.description}</p>
                    ) : null}
                  </NavLink>
                </li>
              ))}
              {filteredModules.length === 0 ? (
                <li className="px-3 py-2 text-sm text-slate-500">No modules found.</li>
              ) : null}
            </ul>
          </section>
        </>
      ) : null}
    </>
  );
};

export default BottomNav;

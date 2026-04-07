import { useEffect, useMemo, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Ellipsis, Plus } from 'lucide-react';
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
      <div
        className="pointer-events-none fixed inset-x-0 bottom-0 z-40 px-3 pb-3"
        style={{ paddingBottom: 'calc(env(safe-area-inset-bottom) + 0.75rem)' }}
      >
        <div className="pointer-events-auto mx-auto mb-2 flex w-full max-w-md justify-center">
          <button
            type="button"
            className="flex items-center gap-1 rounded-full bg-emerald-500 px-4 py-2 text-xs font-semibold text-white shadow-lg shadow-emerald-500/30"
          >
            <Plus size={14} />
            Tambah Log Cepat
          </button>
        </div>

        <nav
          aria-label="Mobile bottom navigation"
          className="pointer-events-auto mx-auto w-full max-w-md rounded-3xl border border-slate-200 bg-white/95 p-1.5 shadow-[0_8px_24px_rgba(15,23,42,0.12)] backdrop-blur"
        >
          <ul className="grid grid-cols-5 gap-1">
            {primaryTabs.map((tab) => {
              const Icon = tab.icon;
              const active = isRouteActive(pathname, tab.route);

              return (
                <li key={tab.id}>
                  <NavLink
                    to={tab.route}
                    aria-label={`Go to ${tab.name}`}
                    aria-current={active ? 'page' : undefined}
                    className={`relative flex min-h-14 flex-col items-center justify-center gap-1 rounded-2xl text-[11px] font-medium transition ${
                      active ? 'bg-emerald-50 text-emerald-700' : 'text-slate-500'
                    }`}
                  >
                    <Icon size={16} />
                    <span>{tab.name}</span>
                    {tab.id === 'komunitas' && unresolvedCount > 0 ? (
                      <span
                        aria-label={`${unresolvedCount} unread community notifications`}
                        className="absolute right-2 top-1.5 grid h-4 min-w-4 place-items-center rounded-full bg-rose-500 px-1 text-[10px] font-semibold text-white"
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
                className={`flex min-h-14 w-full flex-col items-center justify-center gap-1 rounded-2xl text-[11px] font-medium transition ${
                  isSheetOpen ? 'bg-emerald-50 text-emerald-700' : 'text-slate-500'
                }`}
              >
                <Ellipsis size={16} />
                <span>Lainnya</span>
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
            className="fixed inset-0 z-40 bg-slate-900/40"
            onClick={() => setIsSheetOpen(false)}
          />
          <section
            id="more-modules-sheet"
            aria-label="More modules"
            className="fixed inset-x-0 bottom-0 z-50 mx-auto w-full max-w-md rounded-t-3xl border border-slate-200 bg-white p-4 shadow-2xl"
            style={{ paddingBottom: 'calc(env(safe-area-inset-bottom) + 1rem)' }}
          >
            <div className="mx-auto mb-3 h-1.5 w-12 rounded-full bg-slate-200" aria-hidden="true" />
            <label htmlFor="module-search" className="sr-only">
              Search modules
            </label>
            <input
              id="module-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Cari modul"
              className="mb-3 h-10 w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 text-sm text-slate-700 outline-none focus:border-emerald-200 focus:ring-2 focus:ring-emerald-100"
            />

            <ul className="space-y-2">
              {filteredModules.map((module) => {
                const Icon = module.icon;
                return (
                  <li key={module.id}>
                    <NavLink
                      to={module.route}
                      aria-label={`Go to ${module.name}`}
                      className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-3"
                      onClick={() => setIsSheetOpen(false)}
                    >
                      <span className="grid h-9 w-9 place-items-center rounded-xl bg-emerald-50 text-emerald-700">
                        <Icon size={16} />
                      </span>
                      <div>
                        <div className="text-sm font-semibold text-slate-800">{module.name}</div>
                        <p className="text-xs text-slate-500">{module.description}</p>
                      </div>
                    </NavLink>
                  </li>
                );
              })}
              {filteredModules.length === 0 ? (
                <li className="rounded-2xl bg-slate-50 p-3 text-sm text-slate-500">Modul tidak ditemukan.</li>
              ) : null}
            </ul>
          </section>
        </>
      ) : null}
    </>
  );
};

export default BottomNav;

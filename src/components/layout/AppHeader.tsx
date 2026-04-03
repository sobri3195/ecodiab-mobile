import { Bell, Menu, Search } from 'lucide-react';

type AppHeaderProps = {
  onOpenMenu: () => void;
  title: string;
};

const AppHeader = ({ onOpenMenu, title }: AppHeaderProps) => {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onOpenMenu}
              className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 lg:hidden"
            >
              <Menu size={18} />
            </button>
            <h2 className="text-xl font-semibold text-slate-900">{title}</h2>
          </div>
          <p className="text-sm text-slate-500">Welcome back, Dr. Alicia Chen · Care Operations</p>
        </div>

        <div className="flex items-center gap-3">
          <label className="relative hidden md:block">
            <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="search"
              placeholder="Search patients, alerts, reports..."
              className="h-10 w-72 rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-3 text-sm text-slate-700 outline-none ring-sky-200 transition focus:border-sky-200 focus:ring"
            />
          </label>

          <button type="button" className="relative rounded-xl border border-slate-200 bg-white p-2 text-slate-500 hover:bg-slate-50">
            <Bell size={18} />
            <span className="absolute right-1 top-1 h-2.5 w-2.5 rounded-full bg-emerald-500" />
          </button>

          <button type="button" className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-2 py-1.5 hover:bg-slate-50">
            <div className="grid h-8 w-8 place-items-center rounded-full bg-sky-100 text-sm font-semibold text-sky-700">AC</div>
            <span className="hidden text-sm font-medium text-slate-700 sm:inline">Admin</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;

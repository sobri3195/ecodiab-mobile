import { Bell, ChevronDown, HeartPulse, UserRound } from 'lucide-react';

type AppHeaderProps = {
  title: string;
};

const AppHeader = ({ title }: AppHeaderProps) => {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/95 backdrop-blur">
      <div className="px-4 pb-3 pt-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-2xl bg-gradient-to-br from-sky-600 to-emerald-500 text-white shadow-sm">
              <HeartPulse size={18} />
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">EcoDiab AI</p>
              <p className="text-sm font-semibold text-slate-900">Clinical Operations</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Notifications"
              className="relative grid h-10 w-10 place-items-center rounded-2xl border border-slate-200 bg-white text-slate-600"
            >
              <Bell size={18} />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-emerald-500" />
            </button>
            <button
              type="button"
              aria-label="Open profile"
              className="flex h-10 items-center gap-1 rounded-2xl border border-slate-200 bg-white px-2.5"
            >
              <span className="grid h-7 w-7 place-items-center rounded-full bg-sky-100 text-sky-700">
                <UserRound size={14} />
              </span>
              <ChevronDown size={14} className="text-slate-400" />
            </button>
          </div>
        </div>
        <div className="mt-3">
          <h1 className="text-xl font-semibold tracking-tight text-slate-900">{title}</h1>
          <p className="text-sm text-slate-500">Assigned region: North Bay Clinics</p>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;

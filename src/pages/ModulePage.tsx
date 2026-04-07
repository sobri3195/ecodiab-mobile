import { ChevronRight } from 'lucide-react';
import type { WorkspaceModule } from '../lib/module-catalog';
import { moduleDetailMap } from '../lib/mock-data';

type ModulePageProps = {
  module: WorkspaceModule;
};

const ModulePage = ({ module }: ModulePageProps) => {
  const Icon = module.icon;
  const moduleDetail = moduleDetailMap[module.id];

  return (
    <section className="space-y-4">
      <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-3 flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-2xl bg-sky-50 text-sky-700">
            <Icon size={18} />
          </div>
          <h2 className="text-lg font-semibold text-slate-900">{module.name}</h2>
        </div>
        <p className="text-sm text-slate-600">{module.description}</p>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
        <h3 className="text-sm font-semibold text-slate-900">{moduleDetail?.heading ?? 'Rencana pengembangan modul'}</h3>
        <ul className="mt-3 space-y-2.5">
          {(moduleDetail?.points ?? ['Konten detail modul sedang disiapkan.']).map((point) => (
            <li key={point} className="flex items-start gap-2 rounded-2xl bg-slate-50 p-3 text-xs text-slate-600">
              <ChevronRight size={14} className="mt-0.5 text-sky-600" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default ModulePage;

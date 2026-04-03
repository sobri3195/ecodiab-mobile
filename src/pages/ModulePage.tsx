import type { WorkspaceModule } from '../lib/module-catalog';

type ModulePageProps = {
  module: WorkspaceModule;
};

const ModulePage = ({ module }: ModulePageProps) => {
  const Icon = module.icon;

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-3 flex items-center gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-2xl bg-sky-50 text-sky-700">
          <Icon size={18} />
        </div>
        <h2 className="text-lg font-semibold text-slate-900">{module.name}</h2>
      </div>
      <p className="text-sm text-slate-600">{module.description}</p>
      <div className="mt-4 rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-4 text-xs text-slate-500">
        This module is scaffolded for mobile clinical workflows and ready for feature implementation.
      </div>
    </section>
  );
};

export default ModulePage;

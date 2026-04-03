import type { WorkspaceModule } from '../lib/module-catalog';

type ModulePageProps = {
  module: WorkspaceModule;
};

const ModulePage = ({ module }: ModulePageProps) => {
  const Icon = module.icon;

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
      <div className="mb-3 flex items-center gap-3">
        <div className="rounded-xl bg-sky-50 p-2 text-sky-700">
          <Icon size={20} />
        </div>
        <h2 className="text-xl font-semibold text-slate-900">{module.name}</h2>
      </div>
      <p className="max-w-2xl text-slate-600">{module.description}</p>
      <div className="mt-6 rounded-xl border border-dashed border-slate-200 bg-slate-50 p-5 text-sm text-slate-500">
        This workspace is ready for feature implementation with the shared EcoDiab AI layout system.
      </div>
    </section>
  );
};

export default ModulePage;

import type { ReactNode } from 'react';

type SectionCardProps = {
  title: string;
  subtitle?: string;
  actionLabel?: string;
  children: ReactNode;
};

const SectionCard = ({ title, subtitle, actionLabel, children }: SectionCardProps) => {
  return (
    <section className="rounded-3xl border border-slate-200/90 bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between gap-3">
        <div>
          <h2 className="text-base font-semibold text-slate-900">{title}</h2>
          {subtitle ? <p className="text-xs text-slate-500">{subtitle}</p> : null}
        </div>
        {actionLabel ? (
          <button type="button" className="text-xs font-semibold text-sky-700">
            {actionLabel}
          </button>
        ) : null}
      </div>
      {children}
    </section>
  );
};

export default SectionCard;

type StatCardProps = {
  label: string;
  value: string;
  meta: string;
};

const StatCard = ({ label, value, meta }: StatCardProps) => {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
      <p className="text-xs font-medium text-slate-500">{label}</p>
      <p className="mt-1 text-2xl font-semibold tracking-tight text-slate-900">{value}</p>
      <p className="mt-1 text-[11px] text-slate-500">{meta}</p>
    </article>
  );
};

export default StatCard;

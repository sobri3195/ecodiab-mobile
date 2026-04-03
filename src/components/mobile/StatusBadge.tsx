type Variant = 'critical' | 'medium' | 'low' | 'highRisk' | 'moderate' | 'stable' | 'synced' | 'pending' | 'overdue';

type StatusBadgeProps = {
  label: string;
  variant: Variant;
};

const variantStyles: Record<Variant, string> = {
  critical: 'bg-rose-50 text-rose-700 ring-rose-200',
  medium: 'bg-amber-50 text-amber-700 ring-amber-200',
  low: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
  highRisk: 'bg-rose-50 text-rose-700 ring-rose-200',
  moderate: 'bg-amber-50 text-amber-700 ring-amber-200',
  stable: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
  synced: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
  pending: 'bg-sky-50 text-sky-700 ring-sky-200',
  overdue: 'bg-rose-50 text-rose-700 ring-rose-200',
};

const StatusBadge = ({ label, variant }: StatusBadgeProps) => (
  <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ring-1 ${variantStyles[variant]}`}>
    {label}
  </span>
);

export default StatusBadge;

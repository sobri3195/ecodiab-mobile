import { ArrowUpRight, Sparkles } from 'lucide-react';
import StatCard from '../components/dashboard/StatCard';
import SectionCard from '../components/mobile/SectionCard';
import StatusBadge from '../components/mobile/StatusBadge';
import {
  actionPlans,
  dailySignals,
  deepDiveMetrics,
  heroInsight,
  knowledgeHighlights,
  progressTimeline,
} from '../lib/mock-data';

const signalVariantMap: Record<string, 'critical' | 'medium' | 'low'> = {
  'Perlu perhatian': 'critical',
  Membaik: 'medium',
  Stabil: 'low',
};

const DashboardPage = () => {
  return (
    <div className="space-y-4 pb-2">
      <section className="rounded-3xl bg-gradient-to-br from-emerald-500 via-teal-500 to-sky-600 p-4 text-white shadow-lg shadow-emerald-500/25">
        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-emerald-100">EcoDiab Insight</p>
        <h2 className="mt-2 text-xl font-bold leading-tight">{heroInsight.title}</h2>
        <p className="mt-2 text-sm text-emerald-50/95">{heroInsight.tagline}</p>
        <div className="mt-4 grid grid-cols-2 gap-2">
          <button type="button" className="rounded-2xl bg-white px-3 py-2 text-xs font-semibold text-teal-700">
            {heroInsight.ctaPrimary}
          </button>
          <button type="button" className="rounded-2xl border border-white/60 px-3 py-2 text-xs font-semibold text-white">
            {heroInsight.ctaSecondary}
          </button>
        </div>
      </section>

      <div className="grid grid-cols-2 gap-3">
        {deepDiveMetrics.map((metric) => (
          <StatCard key={metric.label} label={metric.label} value={metric.value} meta={metric.trend} />
        ))}
      </div>

      <SectionCard title="Analisa Detail & Mendalam" subtitle="Interpretasi insight personal berbasis pola 7 hari">
        <ul className="space-y-2.5">
          {deepDiveMetrics.map((metric) => (
            <li key={metric.label} className="rounded-2xl bg-slate-50 p-3 text-xs text-slate-600">
              <p className="text-sm font-semibold text-slate-900">{metric.label}</p>
              <p className="mt-1">{metric.interpretation}</p>
            </li>
          ))}
        </ul>
      </SectionCard>

      <SectionCard title="Sinyal Harian" subtitle="Prioritas aksi yang paling berdampak hari ini" actionLabel="Perbarui">
        <ul className="space-y-2.5">
          {dailySignals.map((signal) => (
            <li key={signal.title} className="rounded-2xl border border-slate-200/80 p-3">
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm font-semibold text-slate-900">{signal.title}</p>
                <StatusBadge label={signal.level} variant={signalVariantMap[signal.level]} />
              </div>
              <p className="mt-1.5 text-xs text-slate-600">{signal.detail}</p>
            </li>
          ))}
        </ul>
      </SectionCard>

      <SectionCard title="Rencana Tindak Lanjut" subtitle="Checklist sederhana untuk 24 jam ke depan">
        <ol className="space-y-2.5">
          {actionPlans.map((plan, index) => (
            <li key={plan} className="flex items-start gap-2 rounded-2xl bg-slate-50 p-3 text-xs text-slate-600">
              <span className="mt-0.5 grid h-5 w-5 flex-none place-items-center rounded-full bg-sky-100 text-[11px] font-semibold text-sky-700">
                {index + 1}
              </span>
              <span>{plan}</span>
            </li>
          ))}
        </ol>
      </SectionCard>

      <SectionCard title="Materi Unggulan" subtitle="Konten edukasi pilihan sesuai kondisi" actionLabel="Lihat semua">
        <ul className="space-y-2.5">
          {knowledgeHighlights.map((item) => (
            <li key={item.title} className="rounded-2xl border border-slate-200/80 p-3">
              <p className="text-sm font-semibold text-slate-900">{item.title}</p>
              <p className="mt-1 text-xs text-slate-600">{item.summary}</p>
              <div className="mt-2 flex items-center justify-between text-xs">
                <span className="font-medium text-teal-700">{item.duration}</span>
                <ArrowUpRight size={14} className="text-slate-400" />
              </div>
            </li>
          ))}
        </ul>
      </SectionCard>

      <SectionCard title="Timeline Progres" subtitle="Ringkasan aktivitas penting hari ini">
        <ol className="space-y-2.5">
          {progressTimeline.map((event) => (
            <li key={event} className="rounded-2xl bg-slate-50 px-3 py-2.5 text-xs text-slate-600">
              {event}
            </li>
          ))}
        </ol>
        <div className="mt-3 flex items-center gap-2 rounded-2xl border border-emerald-100 bg-emerald-50 px-3 py-2 text-xs text-emerald-700">
          <Sparkles size={14} />
          Insight AI diperbarui otomatis setiap ada data baru.
        </div>
      </SectionCard>
    </div>
  );
};

export default DashboardPage;

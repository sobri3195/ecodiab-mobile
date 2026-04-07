import { ArrowUpRight, Sparkles } from 'lucide-react';
import { FormEvent, useEffect, useMemo, useState } from 'react';
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

type QuickLog = {
  id: string;
  glucoseLevel: string;
  note: string;
  createdAt: string;
};

const QUICK_LOG_STORAGE_KEY = 'ecodiab-quick-logs';

const DashboardPage = () => {
  const [glucoseLevel, setGlucoseLevel] = useState('');
  const [note, setNote] = useState('');
  const [quickLogs, setQuickLogs] = useState<QuickLog[]>([]);
  const [editingLogId, setEditingLogId] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const savedLogs = window.localStorage.getItem(QUICK_LOG_STORAGE_KEY);
    if (!savedLogs) {
      return;
    }

    try {
      const parsed = JSON.parse(savedLogs) as QuickLog[];
      if (Array.isArray(parsed)) {
        setQuickLogs(parsed);
      }
    } catch {
      window.localStorage.removeItem(QUICK_LOG_STORAGE_KEY);
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    window.localStorage.setItem(QUICK_LOG_STORAGE_KEY, JSON.stringify(quickLogs));
  }, [quickLogs]);

  const latestLogs = useMemo(() => quickLogs.slice(0, 5), [quickLogs]);

  const handleQuickLogSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedGlucose = glucoseLevel.trim();
    const trimmedNote = note.trim();

    if (!trimmedGlucose || !trimmedNote) {
      return;
    }

    if (editingLogId) {
      setQuickLogs((prev) =>
        prev.map((log) =>
          log.id === editingLogId
            ? {
                ...log,
                glucoseLevel: trimmedGlucose,
                note: trimmedNote,
              }
            : log,
        ),
      );
      setEditingLogId(null);
    } else {
      const newLog: QuickLog = {
        id: crypto.randomUUID(),
        glucoseLevel: trimmedGlucose,
        note: trimmedNote,
        createdAt: new Date().toISOString(),
      };

      setQuickLogs((prev) => [newLog, ...prev]);
    }

    setGlucoseLevel('');
    setNote('');
  };

  const handleEditLog = (log: QuickLog) => {
    setEditingLogId(log.id);
    setGlucoseLevel(log.glucoseLevel);
    setNote(log.note);
  };

  const handleDeleteLog = (logId: string) => {
    setQuickLogs((prev) => prev.filter((log) => log.id !== logId));

    if (editingLogId === logId) {
      setEditingLogId(null);
      setGlucoseLevel('');
      setNote('');
    }
  };

  const handleCancelEdit = () => {
    setEditingLogId(null);
    setGlucoseLevel('');
    setNote('');
  };

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

      <SectionCard
        title={editingLogId ? 'Edit Log Cepat' : 'Tambah Log Cepat'}
        subtitle="Input data harian Anda, otomatis tersimpan di perangkat."
      >
        <form className="space-y-2.5" onSubmit={handleQuickLogSubmit}>
          <div>
            <label htmlFor="glucoseLevel" className="text-xs font-medium text-slate-700">
              Gula darah (mg/dL)
            </label>
            <input
              id="glucoseLevel"
              name="glucoseLevel"
              type="number"
              inputMode="numeric"
              min="0"
              className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none ring-sky-500 transition focus:ring-2"
              placeholder="Contoh: 120"
              value={glucoseLevel}
              onChange={(event) => setGlucoseLevel(event.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="quickNote" className="text-xs font-medium text-slate-700">
              Catatan
            </label>
            <textarea
              id="quickNote"
              name="quickNote"
              rows={2}
              className="mt-1 w-full resize-none rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none ring-sky-500 transition focus:ring-2"
              placeholder="Contoh: Setelah sarapan"
              value={note}
              onChange={(event) => setNote(event.target.value)}
              required
            />
          </div>

          <div className="flex items-center gap-2">
            <button
              type="submit"
              className="w-full rounded-2xl bg-sky-600 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-white"
            >
              {editingLogId ? 'Perbarui Log' : 'Simpan Log'}
            </button>
            {editingLogId && (
              <button
                type="button"
                onClick={handleCancelEdit}
                className="rounded-2xl border border-slate-300 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-slate-700"
              >
                Batal
              </button>
            )}
          </div>
        </form>

        <div className="mt-3 space-y-2">
          {latestLogs.length > 0 ? (
            latestLogs.map((log) => (
              <div key={log.id} className="rounded-2xl bg-slate-50 p-3 text-xs text-slate-600">
                <p className="text-sm font-semibold text-slate-900">{log.glucoseLevel} mg/dL</p>
                <p className="mt-1">{log.note}</p>
                <p className="mt-1 text-[11px] text-slate-400">{new Date(log.createdAt).toLocaleString('id-ID')}</p>
                <div className="mt-2 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleEditLog(log)}
                    className="rounded-xl bg-sky-100 px-2.5 py-1 text-[11px] font-semibold text-sky-700"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteLog(log.id)}
                    className="rounded-xl bg-rose-100 px-2.5 py-1 text-[11px] font-semibold text-rose-700"
                  >
                    Hapus
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="rounded-2xl bg-slate-50 p-3 text-xs text-slate-500">Belum ada log. Mulai isi data pertama Anda.</p>
          )}
        </div>
      </SectionCard>

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

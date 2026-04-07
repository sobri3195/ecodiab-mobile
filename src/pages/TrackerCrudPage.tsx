import { useEffect, useMemo, useState } from 'react';
import { ChartNoAxesCombined, Pencil, Trash2 } from 'lucide-react';

type TrackerItem = {
  id: string;
  metric: string;
  value: string;
  note: string;
  trackedAt: string;
  createdAt: string;
  updatedAt: string;
};

const STORAGE_KEY = 'ecodiab.tracker.items';

const createId = () => `${Date.now()}-${Math.random().toString(16).slice(2)}`;

const TrackerCrudPage = () => {
  const [items, setItems] = useState<TrackerItem[]>([]);
  const [metric, setMetric] = useState('Gula Darah');
  const [value, setValue] = useState('');
  const [note, setNote] = useState('');
  const [trackedAt, setTrackedAt] = useState(() => new Date().toISOString().slice(0, 16));
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return;

      const parsed = JSON.parse(stored) as TrackerItem[];
      if (Array.isArray(parsed)) {
        setItems(parsed);
      }
    } catch (error) {
      console.error('Gagal memuat data tracker dari localStorage', error);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const sortedItems = useMemo(
    () => [...items].sort((a, b) => new Date(b.trackedAt).getTime() - new Date(a.trackedAt).getTime()),
    [items],
  );

  const resetForm = () => {
    setMetric('Gula Darah');
    setValue('');
    setNote('');
    setTrackedAt(new Date().toISOString().slice(0, 16));
    setEditingId(null);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const cleanValue = value.trim();
    if (!cleanValue) return;

    if (editingId) {
      setItems((current) =>
        current.map((item) =>
          item.id === editingId
            ? {
                ...item,
                metric,
                value: cleanValue,
                note: note.trim(),
                trackedAt,
                updatedAt: new Date().toISOString(),
              }
            : item,
        ),
      );
    } else {
      const timestamp = new Date().toISOString();
      setItems((current) => [
        ...current,
        {
          id: createId(),
          metric,
          value: cleanValue,
          note: note.trim(),
          trackedAt,
          createdAt: timestamp,
          updatedAt: timestamp,
        },
      ]);
    }

    resetForm();
  };

  const handleEdit = (item: TrackerItem) => {
    setEditingId(item.id);
    setMetric(item.metric);
    setValue(item.value);
    setNote(item.note);
    setTrackedAt(item.trackedAt);
  };

  const handleDelete = (id: string) => {
    setItems((current) => current.filter((item) => item.id !== id));
    if (editingId === id) {
      resetForm();
    }
  };

  return (
    <section className="space-y-4">
      <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-3 flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-2xl bg-sky-50 text-sky-700">
            <ChartNoAxesCombined size={18} />
          </div>
          <h2 className="text-lg font-semibold text-slate-900">Tracker (CRUD + LocalStorage)</h2>
        </div>
        <p className="text-sm text-slate-600">Catat metrik kesehatan harian, ubah data, dan hapus data yang tidak relevan.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
        <h3 className="text-sm font-semibold text-slate-900">{editingId ? 'Edit Catatan Tracker' : 'Tambah Catatan Tracker'}</h3>

        <select
          value={metric}
          onChange={(event) => setMetric(event.target.value)}
          className="h-11 w-full rounded-2xl border border-slate-200 px-3 text-sm outline-none focus:border-emerald-200 focus:ring-2 focus:ring-emerald-100"
        >
          <option>Gula Darah</option>
          <option>Tekanan Darah</option>
          <option>Berat Badan</option>
          <option>Aktivitas</option>
        </select>

        <input
          type="text"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder="Nilai (contoh: 126 mg/dL)"
          className="h-11 w-full rounded-2xl border border-slate-200 px-3 text-sm outline-none focus:border-emerald-200 focus:ring-2 focus:ring-emerald-100"
          required
        />

        <input
          type="datetime-local"
          value={trackedAt}
          onChange={(event) => setTrackedAt(event.target.value)}
          className="h-11 w-full rounded-2xl border border-slate-200 px-3 text-sm outline-none focus:border-emerald-200 focus:ring-2 focus:ring-emerald-100"
          required
        />

        <textarea
          value={note}
          onChange={(event) => setNote(event.target.value)}
          rows={3}
          placeholder="Catatan tambahan"
          className="w-full rounded-2xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-emerald-200 focus:ring-2 focus:ring-emerald-100"
        />

        <div className="flex gap-2">
          <button type="submit" className="rounded-2xl bg-emerald-500 px-4 py-2 text-sm font-semibold text-white">
            {editingId ? 'Simpan Perubahan' : 'Tambah Catatan'}
          </button>
          {editingId ? (
            <button
              type="button"
              onClick={resetForm}
              className="rounded-2xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600"
            >
              Batal
            </button>
          ) : null}
        </div>
      </form>

      <div className="space-y-3 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
        <h3 className="text-sm font-semibold text-slate-900">Riwayat Tracker ({items.length})</h3>
        {sortedItems.length === 0 ? (
          <p className="rounded-2xl bg-slate-50 p-3 text-sm text-slate-500">Belum ada data tracker.</p>
        ) : (
          <ul className="space-y-2.5">
            {sortedItems.map((item) => (
              <li key={item.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-sky-700">{item.metric}</p>
                    <h4 className="text-sm font-semibold text-slate-900">{item.value}</h4>
                    <p className="mt-1 text-xs text-slate-500">{new Date(item.trackedAt).toLocaleString('id-ID')}</p>
                    {item.note ? <p className="mt-1 text-sm text-slate-600">{item.note}</p> : null}
                  </div>
                  <div className="flex shrink-0 gap-1">
                    <button
                      type="button"
                      onClick={() => handleEdit(item)}
                      className="rounded-xl border border-slate-200 bg-white p-2 text-slate-600"
                      aria-label={`Edit ${item.metric}`}
                    >
                      <Pencil size={14} />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(item.id)}
                      className="rounded-xl border border-rose-200 bg-white p-2 text-rose-500"
                      aria-label={`Hapus ${item.metric}`}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};

export default TrackerCrudPage;

import { useEffect, useMemo, useState } from 'react';
import { Flame, Pencil, Trash2 } from 'lucide-react';

type ChallengeItem = {
  id: string;
  title: string;
  frequency: string;
  target: string;
  startDate: string;
  createdAt: string;
  updatedAt: string;
};

const STORAGE_KEY = 'ecodiab.tantangan.items';

const createId = () => `${Date.now()}-${Math.random().toString(16).slice(2)}`;

const ChallengeCrudPage = () => {
  const [items, setItems] = useState<ChallengeItem[]>([]);
  const [title, setTitle] = useState('');
  const [frequency, setFrequency] = useState('Harian');
  const [target, setTarget] = useState('');
  const [startDate, setStartDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return;

      const parsed = JSON.parse(stored) as ChallengeItem[];
      if (Array.isArray(parsed)) {
        setItems(parsed);
      }
    } catch (error) {
      console.error('Gagal memuat data tantangan dari localStorage', error);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const sortedItems = useMemo(
    () => [...items].sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()),
    [items],
  );

  const resetForm = () => {
    setTitle('');
    setFrequency('Harian');
    setTarget('');
    setStartDate(new Date().toISOString().slice(0, 10));
    setEditingId(null);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const cleanTitle = title.trim();
    const cleanTarget = target.trim();

    if (!cleanTitle || !cleanTarget) return;

    if (editingId) {
      setItems((current) =>
        current.map((item) =>
          item.id === editingId
            ? {
                ...item,
                title: cleanTitle,
                frequency,
                target: cleanTarget,
                startDate,
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
          title: cleanTitle,
          frequency,
          target: cleanTarget,
          startDate,
          createdAt: timestamp,
          updatedAt: timestamp,
        },
      ]);
    }

    resetForm();
  };

  const handleEdit = (item: ChallengeItem) => {
    setEditingId(item.id);
    setTitle(item.title);
    setFrequency(item.frequency);
    setTarget(item.target);
    setStartDate(item.startDate);
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
            <Flame size={18} />
          </div>
          <h2 className="text-lg font-semibold text-slate-900">Tantangan (CRUD + LocalStorage)</h2>
        </div>
        <p className="text-sm text-slate-600">Buat misi kebiasaan sehat, ubah target, dan hapus tantangan yang sudah tidak aktif.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
        <h3 className="text-sm font-semibold text-slate-900">{editingId ? 'Edit Tantangan' : 'Tambah Tantangan'}</h3>

        <input
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Nama tantangan"
          className="h-11 w-full rounded-2xl border border-slate-200 px-3 text-sm outline-none focus:border-emerald-200 focus:ring-2 focus:ring-emerald-100"
          required
        />

        <select
          value={frequency}
          onChange={(event) => setFrequency(event.target.value)}
          className="h-11 w-full rounded-2xl border border-slate-200 px-3 text-sm outline-none focus:border-emerald-200 focus:ring-2 focus:ring-emerald-100"
        >
          <option>Harian</option>
          <option>Mingguan</option>
          <option>Bulanan</option>
        </select>

        <input
          type="text"
          value={target}
          onChange={(event) => setTarget(event.target.value)}
          placeholder="Target (contoh: jalan 30 menit/hari)"
          className="h-11 w-full rounded-2xl border border-slate-200 px-3 text-sm outline-none focus:border-emerald-200 focus:ring-2 focus:ring-emerald-100"
          required
        />

        <input
          type="date"
          value={startDate}
          onChange={(event) => setStartDate(event.target.value)}
          className="h-11 w-full rounded-2xl border border-slate-200 px-3 text-sm outline-none focus:border-emerald-200 focus:ring-2 focus:ring-emerald-100"
          required
        />

        <div className="flex gap-2">
          <button type="submit" className="rounded-2xl bg-emerald-500 px-4 py-2 text-sm font-semibold text-white">
            {editingId ? 'Simpan Perubahan' : 'Tambah Tantangan'}
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
        <h3 className="text-sm font-semibold text-slate-900">Daftar Tantangan ({items.length})</h3>
        {sortedItems.length === 0 ? (
          <p className="rounded-2xl bg-slate-50 p-3 text-sm text-slate-500">Belum ada tantangan.</p>
        ) : (
          <ul className="space-y-2.5">
            {sortedItems.map((item) => (
              <li key={item.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-sky-700">{item.frequency}</p>
                    <h4 className="text-sm font-semibold text-slate-900">{item.title}</h4>
                    <p className="mt-1 text-sm text-slate-600">{item.target}</p>
                    <p className="mt-1 text-xs text-slate-500">Mulai: {new Date(item.startDate).toLocaleDateString('id-ID')}</p>
                  </div>
                  <div className="flex shrink-0 gap-1">
                    <button
                      type="button"
                      onClick={() => handleEdit(item)}
                      className="rounded-xl border border-slate-200 bg-white p-2 text-slate-600"
                      aria-label={`Edit tantangan ${item.title}`}
                    >
                      <Pencil size={14} />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(item.id)}
                      className="rounded-xl border border-rose-200 bg-white p-2 text-rose-500"
                      aria-label={`Hapus tantangan ${item.title}`}
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

export default ChallengeCrudPage;

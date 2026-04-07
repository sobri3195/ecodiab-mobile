import { useEffect, useMemo, useState } from 'react';
import { Handshake, Pencil, Trash2 } from 'lucide-react';

type ConsultationItem = {
  id: string;
  patientName: string;
  specialist: string;
  concern: string;
  scheduleAt: string;
  createdAt: string;
  updatedAt: string;
};

const STORAGE_KEY = 'ecodiab.konsultasi.items';

const createId = () => `${Date.now()}-${Math.random().toString(16).slice(2)}`;

const ConsultationCrudPage = () => {
  const [items, setItems] = useState<ConsultationItem[]>([]);
  const [patientName, setPatientName] = useState('');
  const [specialist, setSpecialist] = useState('Dokter Umum');
  const [concern, setConcern] = useState('');
  const [scheduleAt, setScheduleAt] = useState(() => new Date().toISOString().slice(0, 16));
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return;

      const parsed = JSON.parse(stored) as ConsultationItem[];
      if (Array.isArray(parsed)) {
        setItems(parsed);
      }
    } catch (error) {
      console.error('Gagal memuat data konsultasi dari localStorage', error);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const sortedItems = useMemo(
    () => [...items].sort((a, b) => new Date(a.scheduleAt).getTime() - new Date(b.scheduleAt).getTime()),
    [items],
  );

  const resetForm = () => {
    setPatientName('');
    setSpecialist('Dokter Umum');
    setConcern('');
    setScheduleAt(new Date().toISOString().slice(0, 16));
    setEditingId(null);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const cleanPatientName = patientName.trim();
    const cleanConcern = concern.trim();

    if (!cleanPatientName || !cleanConcern) return;

    if (editingId) {
      setItems((current) =>
        current.map((item) =>
          item.id === editingId
            ? {
                ...item,
                patientName: cleanPatientName,
                specialist,
                concern: cleanConcern,
                scheduleAt,
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
          patientName: cleanPatientName,
          specialist,
          concern: cleanConcern,
          scheduleAt,
          createdAt: timestamp,
          updatedAt: timestamp,
        },
      ]);
    }

    resetForm();
  };

  const handleEdit = (item: ConsultationItem) => {
    setEditingId(item.id);
    setPatientName(item.patientName);
    setSpecialist(item.specialist);
    setConcern(item.concern);
    setScheduleAt(item.scheduleAt);
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
            <Handshake size={18} />
          </div>
          <h2 className="text-lg font-semibold text-slate-900">Konsultasi (CRUD + LocalStorage)</h2>
        </div>
        <p className="text-sm text-slate-600">Kelola jadwal konsultasi, update keluhan, dan hapus data dengan penyimpanan lokal browser.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
        <h3 className="text-sm font-semibold text-slate-900">{editingId ? 'Edit Jadwal Konsultasi' : 'Tambah Jadwal Konsultasi'}</h3>

        <input
          type="text"
          value={patientName}
          onChange={(event) => setPatientName(event.target.value)}
          placeholder="Nama pasien"
          className="h-11 w-full rounded-2xl border border-slate-200 px-3 text-sm outline-none focus:border-emerald-200 focus:ring-2 focus:ring-emerald-100"
          required
        />

        <select
          value={specialist}
          onChange={(event) => setSpecialist(event.target.value)}
          className="h-11 w-full rounded-2xl border border-slate-200 px-3 text-sm outline-none focus:border-emerald-200 focus:ring-2 focus:ring-emerald-100"
        >
          <option>Dokter Umum</option>
          <option>Dokter Penyakit Dalam</option>
          <option>Ahli Gizi</option>
          <option>Edukator Diabetes</option>
        </select>

        <input
          type="datetime-local"
          value={scheduleAt}
          onChange={(event) => setScheduleAt(event.target.value)}
          className="h-11 w-full rounded-2xl border border-slate-200 px-3 text-sm outline-none focus:border-emerald-200 focus:ring-2 focus:ring-emerald-100"
          required
        />

        <textarea
          value={concern}
          onChange={(event) => setConcern(event.target.value)}
          rows={3}
          placeholder="Keluhan / tujuan konsultasi"
          className="w-full rounded-2xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-emerald-200 focus:ring-2 focus:ring-emerald-100"
          required
        />

        <div className="flex gap-2">
          <button type="submit" className="rounded-2xl bg-emerald-500 px-4 py-2 text-sm font-semibold text-white">
            {editingId ? 'Simpan Perubahan' : 'Tambah Jadwal'}
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
        <h3 className="text-sm font-semibold text-slate-900">Daftar Konsultasi ({items.length})</h3>
        {sortedItems.length === 0 ? (
          <p className="rounded-2xl bg-slate-50 p-3 text-sm text-slate-500">Belum ada jadwal konsultasi.</p>
        ) : (
          <ul className="space-y-2.5">
            {sortedItems.map((item) => (
              <li key={item.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-sky-700">{item.specialist}</p>
                    <h4 className="text-sm font-semibold text-slate-900">{item.patientName}</h4>
                    <p className="mt-1 text-xs text-slate-500">{new Date(item.scheduleAt).toLocaleString('id-ID')}</p>
                    <p className="mt-1 text-sm text-slate-600">{item.concern}</p>
                  </div>
                  <div className="flex shrink-0 gap-1">
                    <button
                      type="button"
                      onClick={() => handleEdit(item)}
                      className="rounded-xl border border-slate-200 bg-white p-2 text-slate-600"
                      aria-label={`Edit konsultasi ${item.patientName}`}
                    >
                      <Pencil size={14} />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(item.id)}
                      className="rounded-xl border border-rose-200 bg-white p-2 text-rose-500"
                      aria-label={`Hapus konsultasi ${item.patientName}`}
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

export default ConsultationCrudPage;

import { useEffect, useMemo, useState } from 'react';
import { Pencil, Trash2, UserRound } from 'lucide-react';

type ProfileItem = {
  id: string;
  name: string;
  age: string;
  diabetesType: string;
  goal: string;
  createdAt: string;
  updatedAt: string;
};

const STORAGE_KEY = 'ecodiab.profil.items';

const createId = () => `${Date.now()}-${Math.random().toString(16).slice(2)}`;

const ProfileCrudPage = () => {
  const [items, setItems] = useState<ProfileItem[]>([]);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [diabetesType, setDiabetesType] = useState('Tipe 2');
  const [goal, setGoal] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return;

      const parsed = JSON.parse(stored) as ProfileItem[];
      if (Array.isArray(parsed)) {
        setItems(parsed);
      }
    } catch (error) {
      console.error('Gagal memuat data profil dari localStorage', error);
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
    setName('');
    setAge('');
    setDiabetesType('Tipe 2');
    setGoal('');
    setEditingId(null);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const cleanName = name.trim();
    const cleanGoal = goal.trim();
    const cleanAge = age.trim();

    if (!cleanName || !cleanGoal || !cleanAge) return;

    if (editingId) {
      setItems((current) =>
        current.map((item) =>
          item.id === editingId
            ? {
                ...item,
                name: cleanName,
                age: cleanAge,
                diabetesType,
                goal: cleanGoal,
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
          name: cleanName,
          age: cleanAge,
          diabetesType,
          goal: cleanGoal,
          createdAt: timestamp,
          updatedAt: timestamp,
        },
      ]);
    }

    resetForm();
  };

  const handleEdit = (item: ProfileItem) => {
    setEditingId(item.id);
    setName(item.name);
    setAge(item.age);
    setDiabetesType(item.diabetesType);
    setGoal(item.goal);
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
            <UserRound size={18} />
          </div>
          <h2 className="text-lg font-semibold text-slate-900">Profil (CRUD + LocalStorage)</h2>
        </div>
        <p className="text-sm text-slate-600">Atur data profil kesehatan, ubah target pribadi, dan simpan semuanya di localStorage.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
        <h3 className="text-sm font-semibold text-slate-900">{editingId ? 'Edit Profil' : 'Tambah Profil'}</h3>

        <input
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Nama"
          className="h-11 w-full rounded-2xl border border-slate-200 px-3 text-sm outline-none focus:border-emerald-200 focus:ring-2 focus:ring-emerald-100"
          required
        />

        <input
          type="number"
          value={age}
          onChange={(event) => setAge(event.target.value)}
          placeholder="Usia"
          min={1}
          className="h-11 w-full rounded-2xl border border-slate-200 px-3 text-sm outline-none focus:border-emerald-200 focus:ring-2 focus:ring-emerald-100"
          required
        />

        <select
          value={diabetesType}
          onChange={(event) => setDiabetesType(event.target.value)}
          className="h-11 w-full rounded-2xl border border-slate-200 px-3 text-sm outline-none focus:border-emerald-200 focus:ring-2 focus:ring-emerald-100"
        >
          <option>Tipe 1</option>
          <option>Tipe 2</option>
          <option>Prediabetes</option>
          <option>Gestasional</option>
        </select>

        <textarea
          value={goal}
          onChange={(event) => setGoal(event.target.value)}
          rows={3}
          placeholder="Target kesehatan"
          className="w-full rounded-2xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-emerald-200 focus:ring-2 focus:ring-emerald-100"
          required
        />

        <div className="flex gap-2">
          <button type="submit" className="rounded-2xl bg-emerald-500 px-4 py-2 text-sm font-semibold text-white">
            {editingId ? 'Simpan Perubahan' : 'Tambah Profil'}
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
        <h3 className="text-sm font-semibold text-slate-900">Data Profil ({items.length})</h3>
        {sortedItems.length === 0 ? (
          <p className="rounded-2xl bg-slate-50 p-3 text-sm text-slate-500">Belum ada data profil.</p>
        ) : (
          <ul className="space-y-2.5">
            {sortedItems.map((item) => (
              <li key={item.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-sky-700">{item.diabetesType}</p>
                    <h4 className="text-sm font-semibold text-slate-900">{item.name}</h4>
                    <p className="mt-1 text-xs text-slate-500">Usia: {item.age} tahun</p>
                    <p className="mt-1 text-sm text-slate-600">{item.goal}</p>
                  </div>
                  <div className="flex shrink-0 gap-1">
                    <button
                      type="button"
                      onClick={() => handleEdit(item)}
                      className="rounded-xl border border-slate-200 bg-white p-2 text-slate-600"
                      aria-label={`Edit profil ${item.name}`}
                    >
                      <Pencil size={14} />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(item.id)}
                      className="rounded-xl border border-rose-200 bg-white p-2 text-rose-500"
                      aria-label={`Hapus profil ${item.name}`}
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

export default ProfileCrudPage;

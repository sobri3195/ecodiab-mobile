import { useEffect, useMemo, useState } from 'react';
import { BookOpen, Pencil, Trash2 } from 'lucide-react';

type EducationItem = {
  id: string;
  title: string;
  category: string;
  content: string;
  createdAt: string;
  updatedAt: string;
};

const STORAGE_KEY = 'ecodiab.edukasi.items';

const createId = () => `${Date.now()}-${Math.random().toString(16).slice(2)}`;

const EducationCrudPage = () => {
  const [items, setItems] = useState<EducationItem[]>([]);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Nutrisi');
  const [content, setContent] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return;

      const parsed = JSON.parse(stored) as EducationItem[];
      if (Array.isArray(parsed)) {
        setItems(parsed);
      }
    } catch (error) {
      console.error('Gagal memuat data edukasi dari localStorage', error);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const isEditing = editingId !== null;

  const sortedItems = useMemo(
    () => [...items].sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()),
    [items],
  );

  const resetForm = () => {
    setTitle('');
    setCategory('Nutrisi');
    setContent('');
    setEditingId(null);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const cleanTitle = title.trim();
    const cleanContent = content.trim();

    if (!cleanTitle || !cleanContent) {
      return;
    }

    if (editingId) {
      setItems((current) =>
        current.map((item) =>
          item.id === editingId
            ? {
                ...item,
                title: cleanTitle,
                category,
                content: cleanContent,
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
          category,
          content: cleanContent,
          createdAt: timestamp,
          updatedAt: timestamp,
        },
      ]);
    }

    resetForm();
  };

  const handleEdit = (item: EducationItem) => {
    setEditingId(item.id);
    setTitle(item.title);
    setCategory(item.category);
    setContent(item.content);
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
            <BookOpen size={18} />
          </div>
          <h2 className="text-lg font-semibold text-slate-900">Edukasi (CRUD + LocalStorage)</h2>
        </div>
        <p className="text-sm text-slate-600">
          Tambah, ubah, dan hapus materi edukasi langsung dari aplikasi. Data tersimpan di localStorage browser.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
        <h3 className="text-sm font-semibold text-slate-900">{isEditing ? 'Edit Materi' : 'Tambah Materi Baru'}</h3>
        <input
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Judul materi"
          className="h-11 w-full rounded-2xl border border-slate-200 px-3 text-sm outline-none focus:border-emerald-200 focus:ring-2 focus:ring-emerald-100"
          required
        />
        <select
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          className="h-11 w-full rounded-2xl border border-slate-200 px-3 text-sm outline-none focus:border-emerald-200 focus:ring-2 focus:ring-emerald-100"
        >
          <option>Nutrisi</option>
          <option>Aktivitas</option>
          <option>Obat</option>
          <option>Gaya Hidup</option>
        </select>
        <textarea
          value={content}
          onChange={(event) => setContent(event.target.value)}
          rows={4}
          placeholder="Isi ringkas materi edukasi"
          className="w-full rounded-2xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-emerald-200 focus:ring-2 focus:ring-emerald-100"
          required
        />

        <div className="flex gap-2">
          <button
            type="submit"
            className="rounded-2xl bg-emerald-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20"
          >
            {isEditing ? 'Simpan Perubahan' : 'Tambah Materi'}
          </button>
          {isEditing ? (
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
        <h3 className="text-sm font-semibold text-slate-900">Daftar Materi ({items.length})</h3>
        {sortedItems.length === 0 ? (
          <p className="rounded-2xl bg-slate-50 p-3 text-sm text-slate-500">Belum ada materi. Silakan tambah materi baru.</p>
        ) : (
          <ul className="space-y-2.5">
            {sortedItems.map((item) => (
              <li key={item.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-sky-700">{item.category}</p>
                    <h4 className="text-sm font-semibold text-slate-900">{item.title}</h4>
                    <p className="mt-1 text-sm text-slate-600">{item.content}</p>
                  </div>
                  <div className="flex shrink-0 gap-1">
                    <button
                      type="button"
                      onClick={() => handleEdit(item)}
                      className="rounded-xl border border-slate-200 bg-white p-2 text-slate-600"
                      aria-label={`Edit ${item.title}`}
                    >
                      <Pencil size={14} />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(item.id)}
                      className="rounded-xl border border-rose-200 bg-white p-2 text-rose-500"
                      aria-label={`Hapus ${item.title}`}
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

export default EducationCrudPage;

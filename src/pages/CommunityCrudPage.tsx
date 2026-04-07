import { useEffect, useMemo, useState } from 'react';
import { MessageCircleHeart, Pencil, Trash2 } from 'lucide-react';

type CommunityPost = {
  id: string;
  title: string;
  topic: string;
  message: string;
  createdAt: string;
  updatedAt: string;
};

const STORAGE_KEY = 'ecodiab.komunitas.posts';

const createId = () => `${Date.now()}-${Math.random().toString(16).slice(2)}`;

const CommunityCrudPage = () => {
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [title, setTitle] = useState('');
  const [topic, setTopic] = useState('Dukungan Harian');
  const [message, setMessage] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return;

      const parsed = JSON.parse(stored) as CommunityPost[];
      if (Array.isArray(parsed)) {
        setPosts(parsed);
      }
    } catch (error) {
      console.error('Gagal memuat posting komunitas dari localStorage', error);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
  }, [posts]);

  const sortedPosts = useMemo(
    () => [...posts].sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()),
    [posts],
  );

  const resetForm = () => {
    setTitle('');
    setTopic('Dukungan Harian');
    setMessage('');
    setEditingId(null);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const cleanTitle = title.trim();
    const cleanMessage = message.trim();

    if (!cleanTitle || !cleanMessage) {
      return;
    }

    if (editingId) {
      setPosts((current) =>
        current.map((post) =>
          post.id === editingId
            ? {
                ...post,
                title: cleanTitle,
                topic,
                message: cleanMessage,
                updatedAt: new Date().toISOString(),
              }
            : post,
        ),
      );
    } else {
      const timestamp = new Date().toISOString();
      setPosts((current) => [
        ...current,
        {
          id: createId(),
          title: cleanTitle,
          topic,
          message: cleanMessage,
          createdAt: timestamp,
          updatedAt: timestamp,
        },
      ]);
    }

    resetForm();
  };

  const handleEdit = (post: CommunityPost) => {
    setEditingId(post.id);
    setTitle(post.title);
    setTopic(post.topic);
    setMessage(post.message);
  };

  const handleDelete = (id: string) => {
    setPosts((current) => current.filter((post) => post.id !== id));
    if (editingId === id) {
      resetForm();
    }
  };

  return (
    <section className="space-y-4">
      <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-3 flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-2xl bg-sky-50 text-sky-700">
            <MessageCircleHeart size={18} />
          </div>
          <h2 className="text-lg font-semibold text-slate-900">Komunitas (CRUD + LocalStorage)</h2>
        </div>
        <p className="text-sm text-slate-600">Buat posting, edit pembaruan, dan hapus topik dengan penyimpanan lokal di browser.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
        <h3 className="text-sm font-semibold text-slate-900">{editingId ? 'Edit Postingan' : 'Buat Postingan Baru'}</h3>
        <input
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Judul postingan"
          className="h-11 w-full rounded-2xl border border-slate-200 px-3 text-sm outline-none focus:border-emerald-200 focus:ring-2 focus:ring-emerald-100"
          required
        />
        <select
          value={topic}
          onChange={(event) => setTopic(event.target.value)}
          className="h-11 w-full rounded-2xl border border-slate-200 px-3 text-sm outline-none focus:border-emerald-200 focus:ring-2 focus:ring-emerald-100"
        >
          <option>Dukungan Harian</option>
          <option>Nutrisi</option>
          <option>Olahraga</option>
          <option>Motivasi</option>
        </select>
        <textarea
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          rows={4}
          placeholder="Isi postingan"
          className="w-full rounded-2xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-emerald-200 focus:ring-2 focus:ring-emerald-100"
          required
        />

        <div className="flex gap-2">
          <button type="submit" className="rounded-2xl bg-emerald-500 px-4 py-2 text-sm font-semibold text-white">
            {editingId ? 'Simpan Perubahan' : 'Kirim Postingan'}
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
        <h3 className="text-sm font-semibold text-slate-900">Feed Komunitas ({posts.length})</h3>
        {sortedPosts.length === 0 ? (
          <p className="rounded-2xl bg-slate-50 p-3 text-sm text-slate-500">Belum ada posting komunitas.</p>
        ) : (
          <ul className="space-y-2.5">
            {sortedPosts.map((post) => (
              <li key={post.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-sky-700">{post.topic}</p>
                    <h4 className="text-sm font-semibold text-slate-900">{post.title}</h4>
                    <p className="mt-1 text-sm text-slate-600">{post.message}</p>
                  </div>
                  <div className="flex shrink-0 gap-1">
                    <button
                      type="button"
                      onClick={() => handleEdit(post)}
                      className="rounded-xl border border-slate-200 bg-white p-2 text-slate-600"
                      aria-label={`Edit ${post.title}`}
                    >
                      <Pencil size={14} />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(post.id)}
                      className="rounded-xl border border-rose-200 bg-white p-2 text-rose-500"
                      aria-label={`Hapus ${post.title}`}
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

export default CommunityCrudPage;

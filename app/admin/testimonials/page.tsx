'use client';

import AdminGuard from '@/components/admin/AdminGuard';
import { useEffect, useState } from 'react';

const empty = { name: '', role: '', text: '', rating: 5, photo: '', active: true, order: 0 };

export default function AdminTestimonialsPage() {
  const [items, setItems] = useState<any[]>([]);
  const [form, setForm] = useState(empty);
  const [editing, setEditing] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const fetch_ = () =>
    fetch('/api/testimonials').then(r => r.json()).then(setItems);

  useEffect(() => { fetch_(); }, []);

  const startEdit = (item: any) => {
    setEditing(item._id);
    setForm({ name: item.name, role: item.role, text: item.text, rating: item.rating, photo: item.photo || '', active: item.active, order: item.order });
  };

  const reset = () => { setEditing(null); setForm(empty); setError(''); };

  const save = async () => {
    setSaving(true); setError('');
    const res = await fetch(editing ? `/api/testimonials/${editing}` : '/api/testimonials', {
      method: editing ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    setSaving(false);
    if (res.ok) { fetch_(); reset(); }
    else { const d = await res.json(); setError(d.error || 'Error'); }
  };

  const del = async (id: string) => {
    if (!confirm('Delete?')) return;
    await fetch(`/api/testimonials/${id}`, { method: 'DELETE' });
    fetch_();
  };

  return (
    <AdminGuard>
      <div className="p-8 max-w-4xl">
        <h1 className="font-display text-2xl font-bold text-white mb-8">Testimonials</h1>

        {/* Form */}
        <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 mb-8">
          <h2 className="text-sm font-bold text-stone-400 uppercase tracking-wider mb-5">
            {editing ? 'Edit Testimonial' : 'Add Testimonial'}
          </h2>
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="admin-label">Client Name</label>
              <input className="admin-field" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="John Doe" />
            </div>
            <div>
              <label className="admin-label">Role / Description</label>
              <input className="admin-field" value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} placeholder="Lost 12kg in 3 months" />
            </div>
          </div>
          <div className="mb-4">
            <label className="admin-label">Testimonial Text</label>
            <textarea className="admin-field resize-none" rows={3} value={form.text} onChange={e => setForm({ ...form, text: e.target.value })} placeholder="What the client said..." />
          </div>
          <div className="grid md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="admin-label">Photo URL (optional)</label>
              <input className="admin-field" value={form.photo} onChange={e => setForm({ ...form, photo: e.target.value })} placeholder="https://..." />
            </div>
            <div>
              <label className="admin-label">Rating (1–5)</label>
              <input type="number" min={1} max={5} className="admin-field" value={form.rating} onChange={e => setForm({ ...form, rating: +e.target.value })} />
            </div>
            <div>
              <label className="admin-label">Order</label>
              <input type="number" className="admin-field" value={form.order} onChange={e => setForm({ ...form, order: +e.target.value })} />
            </div>
          </div>
          {error && <p className="text-red-400 text-sm mb-3">{error}</p>}
          <div className="flex gap-3">
            <button onClick={save} disabled={saving} className="px-5 py-2.5 bg-accent text-stone-950 rounded-full text-sm font-bold hover:bg-accent-light transition-colors disabled:opacity-50">
              {saving ? 'Saving…' : editing ? 'Update' : 'Add'}
            </button>
            {editing && (
              <button onClick={reset} className="px-5 py-2.5 border border-stone-700 text-stone-300 rounded-full text-sm font-medium hover:border-stone-500 transition-colors">
                Cancel
              </button>
            )}
          </div>
        </div>

        {/* List */}
        <div className="space-y-3">
          {items.map(item => (
            <div key={item._id} className="bg-stone-900 border border-stone-800 rounded-xl p-4 flex items-start gap-4">
              {item.photo && <img src={item.photo} alt={item.name} className="w-10 h-10 rounded-full object-cover flex-shrink-0" />}
              {!item.photo && <div className="w-10 h-10 rounded-full bg-stone-700 flex-shrink-0" />}
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-white text-sm">{item.name} <span className="text-stone-500 font-normal">— {item.role}</span></p>
                <p className="text-stone-400 text-sm mt-0.5 line-clamp-2">{item.text}</p>
                <p className="text-accent text-xs mt-1">{'★'.repeat(item.rating)}{'☆'.repeat(5 - item.rating)}</p>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <button onClick={() => startEdit(item)} className="text-accent text-xs hover:underline">Edit</button>
                <button onClick={() => del(item._id)} className="text-red-400 text-xs hover:underline">Delete</button>
              </div>
            </div>
          ))}
          {items.length === 0 && <p className="text-stone-500 text-sm text-center py-10">No testimonials yet.</p>}
        </div>
      </div>
    </AdminGuard>
  );
}

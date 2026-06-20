'use client';

import AdminGuard from '@/components/admin/AdminGuard';
import ImageUpload from '@/components/admin/ImageUpload';
import { useEffect, useState } from 'react';

const empty = { beforeImage: '', afterImage: '', clientName: '', duration: '', description: '', active: true, order: 0 };

export default function AdminGalleryPage() {
  const [items, setItems] = useState<any[]>([]);
  const [form, setForm] = useState(empty);
  const [editing, setEditing] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const fetch_ = () =>
    fetch('/api/gallery').then(r => r.json()).then(setItems);

  useEffect(() => { fetch_(); }, []);

  const startEdit = (item: any) => {
    setEditing(item._id);
    setForm({ beforeImage: item.beforeImage, afterImage: item.afterImage, clientName: item.clientName || '', duration: item.duration || '', description: item.description || '', active: item.active, order: item.order });
  };

  const reset = () => { setEditing(null); setForm(empty); setError(''); };

  const save = async () => {
    setSaving(true); setError('');
    const res = await fetch(editing ? `/api/gallery/${editing}` : '/api/gallery', {
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
    await fetch(`/api/gallery/${id}`, { method: 'DELETE' });
    fetch_();
  };

  return (
    <AdminGuard>
      <div className="p-8 max-w-4xl">
        <h1 className="font-display text-2xl font-bold text-white mb-8">Before / After Gallery</h1>

        {/* Form */}
        <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 mb-8">
          <h2 className="text-sm font-bold text-stone-400 uppercase tracking-wider mb-5">
            {editing ? 'Edit Entry' : 'Add Entry'}
          </h2>
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <ImageUpload label="Before Image" value={form.beforeImage} onChange={url => setForm({ ...form, beforeImage: url })} />
            <ImageUpload label="After Image" value={form.afterImage} onChange={url => setForm({ ...form, afterImage: url })} />
          </div>
          <div className="grid md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="admin-label">Client Name (optional)</label>
              <input className="admin-field" value={form.clientName} onChange={e => setForm({ ...form, clientName: e.target.value })} placeholder="Ahmed K." />
            </div>
            <div>
              <label className="admin-label">Duration</label>
              <input className="admin-field" value={form.duration} onChange={e => setForm({ ...form, duration: e.target.value })} placeholder="3 months" />
            </div>
            <div>
              <label className="admin-label">Order</label>
              <input type="number" className="admin-field" value={form.order} onChange={e => setForm({ ...form, order: +e.target.value })} />
            </div>
          </div>
          <div className="mb-4">
            <label className="admin-label">Description (optional)</label>
            <input className="admin-field" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="Lost 15kg, gained muscle..." />
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
        <div className="grid md:grid-cols-2 gap-4">
          {items.map(item => (
            <div key={item._id} className="bg-stone-900 border border-stone-800 rounded-xl p-4">
              <div className="grid grid-cols-2 gap-2 mb-3">
                <div>
                  <p className="text-xs text-stone-500 mb-1">Before</p>
                  <img src={item.beforeImage} alt="before" className="w-full h-24 object-cover rounded-lg" />
                </div>
                <div>
                  <p className="text-xs text-stone-500 mb-1">After</p>
                  <img src={item.afterImage} alt="after" className="w-full h-24 object-cover rounded-lg" />
                </div>
              </div>
              <p className="text-white text-sm font-medium">{item.clientName || 'Anonymous'} <span className="text-stone-500 font-normal">· {item.duration}</span></p>
              {item.description && <p className="text-stone-400 text-xs mt-0.5">{item.description}</p>}
              <div className="flex gap-2 mt-3">
                <button onClick={() => startEdit(item)} className="text-accent text-xs hover:underline">Edit</button>
                <button onClick={() => del(item._id)} className="text-red-400 text-xs hover:underline">Delete</button>
              </div>
            </div>
          ))}
          {items.length === 0 && <p className="text-stone-500 text-sm text-center py-10 col-span-2">No gallery entries yet.</p>}
        </div>
      </div>
    </AdminGuard>
  );
}

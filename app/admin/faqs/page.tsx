'use client';

import AdminGuard from '@/components/admin/AdminGuard';
import { useEffect, useState } from 'react';

const empty = { question: '', answer: '', active: true, order: 0 };

export default function AdminFaqsPage() {
  const [items, setItems] = useState<any[]>([]);
  const [form, setForm] = useState(empty);
  const [editing, setEditing] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const fetch_ = () =>
    fetch('/api/faqs').then(r => r.json()).then(setItems);

  useEffect(() => { fetch_(); }, []);

  const startEdit = (item: any) => {
    setEditing(item._id);
    setForm({ question: item.question, answer: item.answer, active: item.active, order: item.order });
  };

  const reset = () => { setEditing(null); setForm(empty); setError(''); };

  const save = async () => {
    setSaving(true); setError('');
    const res = await fetch(editing ? `/api/faqs/${editing}` : '/api/faqs', {
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
    await fetch(`/api/faqs/${id}`, { method: 'DELETE' });
    fetch_();
  };

  return (
    <AdminGuard>
      <div className="p-8 max-w-3xl">
        <h1 className="font-display text-2xl font-bold text-white mb-8">FAQs</h1>

        {/* Form */}
        <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 mb-8">
          <h2 className="text-sm font-bold text-stone-400 uppercase tracking-wider mb-5">
            {editing ? 'Edit FAQ' : 'Add FAQ'}
          </h2>
          <div className="mb-4">
            <label className="admin-label">Question</label>
            <input className="admin-field" value={form.question} onChange={e => setForm({ ...form, question: e.target.value })} placeholder="How many sessions per week?" />
          </div>
          <div className="mb-4">
            <label className="admin-label">Answer</label>
            <textarea className="admin-field resize-none" rows={3} value={form.answer} onChange={e => setForm({ ...form, answer: e.target.value })} placeholder="Typically 3–5 sessions per week depending on your goals..." />
          </div>
          <div className="mb-4">
            <label className="admin-label">Order</label>
            <input type="number" className="admin-field w-24" value={form.order} onChange={e => setForm({ ...form, order: +e.target.value })} />
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
            <div key={item._id} className="bg-stone-900 border border-stone-800 rounded-xl p-4">
              <p className="font-semibold text-white text-sm mb-1">{item.question}</p>
              <p className="text-stone-400 text-sm">{item.answer}</p>
              <div className="flex gap-2 mt-3">
                <button onClick={() => startEdit(item)} className="text-accent text-xs hover:underline">Edit</button>
                <button onClick={() => del(item._id)} className="text-red-400 text-xs hover:underline">Delete</button>
              </div>
            </div>
          ))}
          {items.length === 0 && <p className="text-stone-500 text-sm text-center py-10">No FAQs yet.</p>}
        </div>
      </div>
    </AdminGuard>
  );
}

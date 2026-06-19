'use client';

import AdminGuard from '@/components/admin/AdminGuard';
import { useEffect, useState } from 'react';

const emptyPkg = {
  name: '',
  tagline: '',
  price: '',
  currency: 'PKR',
  duration: '/month',
  features: '',
  highlighted: false,
  active: true,
  order: 0,
};

export default function AdminPackagesPage() {
  const [packages, setPackages] = useState<any[]>([]);
  const [form, setForm] = useState<any>(emptyPkg);
  const [editId, setEditId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const fetchPackages = () => {
    fetch('/api/packages?admin=1').then(r => r.json()).then(setPackages);
  };

  useEffect(() => { fetchPackages(); }, []);

  const handleEdit = (pkg: any) => {
    setEditId(pkg._id);
    setForm({ ...pkg, features: pkg.features.join('\n') });
  };

  const handleNew = () => {
    setEditId(null);
    setForm(emptyPkg);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this package?')) return;
    await fetch(`/api/packages/${id}`, { method: 'DELETE' });
    fetchPackages();
  };

  const handleSave = async () => {
    setSaving(true);
    setError('');
    const payload = {
      ...form,
      price: Number(form.price),
      features: form.features.split('\n').map((f: string) => f.trim()).filter(Boolean),
    };

    const res = await fetch(editId ? `/api/packages/${editId}` : '/api/packages', {
      method: editId ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    setSaving(false);
    if (res.ok) {
      fetchPackages();
      handleNew();
    } else {
      const d = await res.json();
      setError(d.error || 'Something went wrong');
    }
  };

  const field = (label: string, key: string, type = 'text', placeholder = '') => (
    <div>
      <label className="block admin-label">{label}</label>
      <input
        type={type}
        value={form[key]}
        onChange={e => setForm({ ...form, [key]: e.target.value })}
        className="admin-field"
        placeholder={placeholder}
      />
    </div>
  );

  return (
    <AdminGuard>
      <div className="p-8 grid md:grid-cols-2 gap-8">
        {/* List */}
        <div>
          <div className="flex items-center justify-between mb-5">
            <h1 className="font-display text-2xl font-bold text-white">Packages</h1>
            <button
              onClick={handleNew}
              className="px-4 py-2 bg-accent text-stone-950 text-sm font-bold rounded-full hover:bg-accent-light transition-colors"
            >
              + New
            </button>
          </div>

          <div className="space-y-3">
            {packages.map((pkg) => (
              <div key={pkg._id} className="bg-stone-900 border border-stone-800 rounded-xl p-4 flex items-center justify-between">
                <div>
                  <p className="font-medium text-white text-sm">{pkg.name}</p>
                  <p className="text-xs text-stone-400">PKR {pkg.price?.toLocaleString()} {pkg.duration}</p>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${pkg.active ? 'bg-green-50 text-green-700' : 'bg-stone-100 text-stone-400'}`}>
                    {pkg.active ? 'Active' : 'Hidden'}
                  </span>
                </div>
                <div className="flex gap-3">
                  <button onClick={() => handleEdit(pkg)} className="text-accent text-xs hover:underline">Edit</button>
                  <button onClick={() => handleDelete(pkg._id)} className="text-red-400 text-xs hover:underline">Delete</button>
                </div>
              </div>
            ))}
            {packages.length === 0 && <p className="text-stone-400 text-sm">No packages yet.</p>}
          </div>
        </div>

        {/* Form */}
        <div>
          <h2 className="font-display text-lg font-bold text-white mb-5">
            {editId ? 'Edit Package' : 'New Package'}
          </h2>
          <div className="bg-stone-900 border border-stone-800 rounded-xl p-6 space-y-4">
            {field('Name', 'name', 'text', 'e.g. Starter')}
            {field('Tagline', 'tagline', 'text', 'Short description')}
            <div className="grid grid-cols-2 gap-3">
              {field('Price', 'price', 'number', '15000')}
              {field('Currency', 'currency', 'text', 'PKR')}
            </div>
            {field('Duration', 'duration', 'text', '/month')}
            <div>
              <label className="block admin-label">
                Features (one per line)
              </label>
              <textarea
                value={form.features}
                onChange={e => setForm({ ...form, features: e.target.value })}
                rows={5}
                className="admin-field resize-none"
                placeholder="3x sessions per week&#10;Nutrition plan&#10;Weekly check-in"
              />
            </div>
            {field('Display Order', 'order', 'number', '0')}
            <div className="flex gap-6">
              <label className="flex items-center gap-2 text-sm text-stone-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.highlighted}
                  onChange={e => setForm({ ...form, highlighted: e.target.checked })}
                  className="rounded"
                />
                Highlighted (Most Popular)
              </label>
              <label className="flex items-center gap-2 text-sm text-stone-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.active}
                  onChange={e => setForm({ ...form, active: e.target.checked })}
                  className="rounded"
                />
                Active (visible on site)
              </label>
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              onClick={handleSave}
              disabled={saving}
              className="w-full py-3 bg-accent text-stone-950 rounded-full text-sm font-bold hover:bg-accent-light transition-colors disabled:opacity-50"
            >
              {saving ? 'Saving…' : editId ? 'Update Package' : 'Create Package'}
            </button>
          </div>
        </div>
      </div>
    </AdminGuard>
  );
}

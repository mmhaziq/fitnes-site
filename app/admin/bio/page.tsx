'use client';

import AdminGuard from '@/components/admin/AdminGuard';
import { useEffect, useState } from 'react';

const empty = {
  name: '', title: '', tagline: '', about: '',
  profileImage: '', location: 'Karachi, Pakistan',
  phone: '', email: '', instagram: '', facebook: '', whatsapp: '',
  certifications: [{ title: '', issuer: '', year: '' }],
  stats: [{ label: '', value: '' }],
};

export default function AdminBioPage() {
  const [form, setForm] = useState<any>(empty);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/bio').then(r => r.json()).then(data => {
      if (data._id) setForm({ ...data, certifications: data.certifications || [], stats: data.stats || [] });
    });
  }, []);

  const handleSave = async () => {
    setSaving(true); setError(''); setSuccess(false);
    const res = await fetch('/api/bio', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    setSaving(false);
    if (res.ok) setSuccess(true);
    else { const d = await res.json(); setError(d.error || 'Error'); }
  };

  const field = (label: string, key: string, type = 'text', rows?: number) => (
    <div>
      <label className="block text-xs font-semibold text-stone-400 uppercase tracking-wider mb-1.5">{label}</label>
      {rows ? (
        <textarea
          value={form[key] || ''}
          onChange={e => setForm({ ...form, [key]: e.target.value })}
          rows={rows}
          className="w-full admin-field focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent/60 resize-none"
        />
      ) : (
        <input
          type={type}
          value={form[key] || ''}
          onChange={e => setForm({ ...form, [key]: e.target.value })}
          className="w-full admin-field focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent/60"
        />
      )}
    </div>
  );

  const updateCert = (i: number, key: string, val: string) => {
    const certs = [...form.certifications];
    certs[i] = { ...certs[i], [key]: val };
    setForm({ ...form, certifications: certs });
  };

  const updateStat = (i: number, key: string, val: string) => {
    const stats = [...form.stats];
    stats[i] = { ...stats[i], [key]: val };
    setForm({ ...form, stats });
  };

  return (
    <AdminGuard>
      <div className="p-8 max-w-2xl">
        <h1 className="font-display text-2xl font-bold text-white mb-8">Bio / Profile</h1>

        <div className="space-y-6">
          <div className="bg-stone-900 border border-stone-800 rounded-xl p-6 space-y-4">
            <h2 className="font-semibold text-stone-300 text-sm">Basic Info</h2>
            {field('Full Name', 'name')}
            {field('Title / Role', 'title', 'text')}
            {field('Tagline (Hero)', 'tagline')}
            {field('About (long bio)', 'about', 'text', 5)}
            {field('Profile Image URL', 'profileImage', 'url')}
            {field('Location', 'location')}
          </div>

          <div className="bg-stone-900 border border-stone-800 rounded-xl p-6 space-y-4">
            <h2 className="font-semibold text-stone-300 text-sm">Contact & Social</h2>
            {field('Email', 'email', 'email')}
            {field('Phone', 'phone', 'tel')}
            {field('WhatsApp Link', 'whatsapp', 'url')}
            {field('Instagram URL', 'instagram', 'url')}
            {field('Facebook URL', 'facebook', 'url')}
          </div>

          <div className="bg-stone-900 border border-stone-800 rounded-xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-stone-300 text-sm">Certifications</h2>
              <button
                onClick={() => setForm({ ...form, certifications: [...form.certifications, { title: '', issuer: '', year: '' }] })}
                className="text-xs text-accent hover:underline"
              >+ Add</button>
            </div>
            {form.certifications?.map((c: any, i: number) => (
              <div key={i} className="grid grid-cols-3 gap-2">
                <input placeholder="Title" value={c.title} onChange={e => updateCert(i, 'title', e.target.value)}
                  className="px-3 py-2 bg-stone-800 border border-stone-700 rounded-lg text-xs text-white placeholder-stone-500 focus:outline-none focus:border-accent/60" />
                <input placeholder="Issuer" value={c.issuer} onChange={e => updateCert(i, 'issuer', e.target.value)}
                  className="px-3 py-2 bg-stone-800 border border-stone-700 rounded-lg text-xs text-white placeholder-stone-500 focus:outline-none focus:border-accent/60" />
                <input placeholder="Year" value={c.year} onChange={e => updateCert(i, 'year', e.target.value)}
                  className="px-3 py-2 bg-stone-800 border border-stone-700 rounded-lg text-xs text-white placeholder-stone-500 focus:outline-none focus:border-accent/60" />
              </div>
            ))}
          </div>

          <div className="bg-stone-900 border border-stone-800 rounded-xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-stone-300 text-sm">Stats (Hero numbers)</h2>
              <button
                onClick={() => setForm({ ...form, stats: [...form.stats, { label: '', value: '' }] })}
                className="text-xs text-accent hover:underline"
              >+ Add</button>
            </div>
            {form.stats?.map((s: any, i: number) => (
              <div key={i} className="grid grid-cols-2 gap-2">
                <input placeholder="Label (e.g. Clients Trained)" value={s.label} onChange={e => updateStat(i, 'label', e.target.value)}
                  className="px-3 py-2 bg-stone-800 border border-stone-700 rounded-lg text-xs text-white placeholder-stone-500 focus:outline-none focus:border-accent/60" />
                <input placeholder="Value (e.g. 500+)" value={s.value} onChange={e => updateStat(i, 'value', e.target.value)}
                  className="px-3 py-2 bg-stone-800 border border-stone-700 rounded-lg text-xs text-white placeholder-stone-500 focus:outline-none focus:border-accent/60" />
              </div>
            ))}
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}
          {success && <p className="text-green-600 text-sm">✓ Saved successfully</p>}

          <button
            onClick={handleSave}
            disabled={saving}
            className="w-full py-3 bg-stone-900 text-stone-50 rounded-full font-medium text-sm hover:bg-accent transition-colors disabled:opacity-50"
          >
            {saving ? 'Saving…' : 'Save Changes'}
          </button>
        </div>
      </div>
    </AdminGuard>
  );
}

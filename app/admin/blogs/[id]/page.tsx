'use client';

import AdminGuard from '@/components/admin/AdminGuard';
import RichEditor from '@/components/admin/RichEditor';
import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';

const empty = {
  title: '',
  excerpt: '',
  content: '',
  coverImage: '',
  tags: '',
  published: false,
};

export default function BlogEditorPage() {
  const router = useRouter();
  const params = useParams();
  const isNew = params?.id === 'new';
  const id = isNew ? null : params?.id as string;

  const [form, setForm] = useState(empty);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;
    fetch(`/api/blogs/${id}`)
      .then(r => r.json())
      .then(data => {
        setForm({
          title: data.title || '',
          excerpt: data.excerpt || '',
          content: data.content || '',
          coverImage: data.coverImage || '',
          tags: (data.tags || []).join(', '),
          published: data.published || false,
        });
      });
  }, [id]);

  const handleSave = async (publish?: boolean) => {
    setSaving(true);
    setError('');
    const payload = {
      ...form,
      tags: form.tags.split(',').map(t => t.trim()).filter(Boolean),
      published: publish !== undefined ? publish : form.published,
    };

    const res = await fetch(id ? `/api/blogs/${id}` : '/api/blogs', {
      method: id ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    setSaving(false);
    if (res.ok) {
      router.push('/admin/blogs');
    } else {
      const d = await res.json();
      setError(d.error || 'Something went wrong');
    }
  };

  return (
    <AdminGuard>
      <div className="p-8 max-w-3xl">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/admin/blogs" className="text-stone-400 hover:text-white transition-colors">
            ← Back
          </Link>
          <h1 className="font-display text-2xl font-bold text-white">
            {isNew ? 'New Post' : 'Edit Post'}
          </h1>
        </div>

        <div className="space-y-5">
          <div>
            <label className="admin-label">Title</label>
            <input
              type="text"
              value={form.title}
              onChange={e => setForm({ ...form, title: e.target.value })}
              className="admin-field"
              placeholder="Post title"
            />
          </div>

          <div>
            <label className="admin-label">Excerpt</label>
            <textarea
              value={form.excerpt}
              onChange={e => setForm({ ...form, excerpt: e.target.value })}
              rows={2}
              className="admin-field resize-none"
              placeholder="Short description (shown on blog list)"
            />
          </div>

          <div>
            <label className="admin-label">Cover Image URL</label>
            <input
              type="url"
              value={form.coverImage}
              onChange={e => setForm({ ...form, coverImage: e.target.value })}
              className="admin-field"
              placeholder="https://..."
            />
          </div>

          <div>
            <label className="admin-label">Tags (comma-separated)</label>
            <input
              type="text"
              value={form.tags}
              onChange={e => setForm({ ...form, tags: e.target.value })}
              className="admin-field"
              placeholder="Nutrition, Training, Mindset"
            />
          </div>

          <div>
            <label className="admin-label">Content</label>
            <RichEditor
              content={form.content}
              onChange={html => setForm({ ...form, content: html })}
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div className="flex gap-3 pt-2">
            <button
              onClick={() => handleSave(false)}
              disabled={saving}
              className="px-5 py-2.5 border border-stone-700 text-stone-300 rounded-full text-sm font-medium hover:border-stone-500 transition-colors disabled:opacity-50"
            >
              Save as Draft
            </button>
            <button
              onClick={() => handleSave(true)}
              disabled={saving}
              className="px-5 py-2.5 bg-accent text-stone-950 rounded-full text-sm font-bold hover:bg-accent-light transition-colors disabled:opacity-50"
            >
              {saving ? 'Saving…' : 'Publish'}
            </button>
          </div>
        </div>
      </div>
    </AdminGuard>
  );
}

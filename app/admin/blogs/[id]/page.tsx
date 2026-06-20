'use client';

import AdminGuard from '@/components/admin/AdminGuard';
import RichEditor from '@/components/admin/RichEditor';
import ImageUpload from '@/components/admin/ImageUpload';
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
  const [preview, setPreview] = useState(false);

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
      {/* Preview Modal */}
      {preview && (
        <div className="fixed inset-0 z-50 bg-stone-950 overflow-y-auto">
          <div className="max-w-2xl mx-auto px-6 pt-28 pb-24">
            <button onClick={() => setPreview(false)} className="inline-flex items-center gap-2 text-sm text-stone-500 hover:text-accent mb-8 transition-colors">
              ← Close Preview
            </button>
            {form.tags && (
              <div className="flex flex-wrap gap-2 mb-4">
                {form.tags.split(',').map(t => t.trim()).filter(Boolean).map(tag => (
                  <span key={tag} className="text-xs px-2 py-0.5 bg-accent/10 text-accent rounded-full font-medium border border-accent/20">{tag}</span>
                ))}
              </div>
            )}
            <h1 className="font-display text-4xl md:text-5xl font-bold text-white leading-tight mb-4">{form.title || 'Untitled'}</h1>
            {form.coverImage && (
              <div className="rounded-2xl overflow-hidden mb-10 aspect-video">
                <img src={form.coverImage} alt={form.title} className="w-full h-full object-cover" />
              </div>
            )}
            <div
              className="prose prose-invert prose-stone max-w-none prose-headings:text-white prose-p:text-stone-300 prose-a:text-accent prose-strong:text-white prose-li:text-stone-300"
              dangerouslySetInnerHTML={{ __html: form.content || '<p>No content yet.</p>' }}
            />
          </div>
        </div>
      )}

      <div className="p-8 max-w-3xl">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/admin/blogs" className="text-stone-400 hover:text-white transition-colors">
            ← Back
          </Link>
          <h1 className="font-display text-2xl font-bold text-white">
            {isNew ? 'New Post' : 'Edit Post'}
          </h1>
          <button onClick={() => setPreview(true)} className="ml-auto text-xs text-stone-400 border border-stone-700 px-3 py-1.5 rounded-full hover:border-accent hover:text-accent transition-colors">
            Preview
          </button>
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

          <ImageUpload
            label="Cover Image"
            value={form.coverImage}
            onChange={url => setForm({ ...form, coverImage: url })}
          />

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

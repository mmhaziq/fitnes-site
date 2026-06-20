'use client';

import AdminGuard from '@/components/admin/AdminGuard';
import { useEffect, useState } from 'react';
import { format } from 'date-fns';

export default function AdminContactsPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetch_ = () =>
    fetch('/api/contact').then(r => r.json()).then(data => { setItems(data); setLoading(false); });

  useEffect(() => { fetch_(); }, []);

  const markRead = async (id: string, read: boolean) => {
    await fetch(`/api/contact/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ read }),
    });
    fetch_();
  };

  const del = async (id: string) => {
    if (!confirm('Delete this inquiry?')) return;
    await fetch(`/api/contact/${id}`, { method: 'DELETE' });
    fetch_();
  };

  const unread = items.filter(i => !i.read).length;

  return (
    <AdminGuard>
      <div className="p-8 max-w-4xl">
        <div className="flex items-center gap-3 mb-8">
          <h1 className="font-display text-2xl font-bold text-white">Inquiries</h1>
          {unread > 0 && (
            <span className="bg-accent text-stone-950 text-xs font-bold px-2 py-0.5 rounded-full">{unread} new</span>
          )}
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-6 h-6 border-2 border-stone-700 border-t-accent rounded-full animate-spin" />
          </div>
        ) : items.length === 0 ? (
          <p className="text-stone-500 text-center py-20">No inquiries yet.</p>
        ) : (
          <div className="space-y-3">
            {items.map(item => (
              <div key={item._id} className={`bg-stone-900 border rounded-xl p-5 ${item.read ? 'border-stone-800' : 'border-accent/40'}`}>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-semibold text-white">{item.name}</p>
                      {!item.read && <span className="text-xs bg-accent/20 text-accent px-2 py-0.5 rounded-full font-medium">New</span>}
                    </div>
                    <p className="text-stone-400 text-xs mb-1">{item.email}{item.phone ? ` · ${item.phone}` : ''}</p>
                    <p className="text-stone-300 text-sm mt-2">{item.message}</p>
                    <p className="text-stone-600 text-xs mt-2">{item.createdAt ? format(new Date(item.createdAt), 'MMM d, yyyy · h:mm a') : ''}</p>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <button onClick={() => markRead(item._id, !item.read)} className="text-xs text-stone-400 hover:text-white transition-colors border border-stone-700 px-3 py-1 rounded-full">
                      {item.read ? 'Mark Unread' : 'Mark Read'}
                    </button>
                    <button onClick={() => del(item._id)} className="text-red-400 text-xs hover:underline">Delete</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminGuard>
  );
}

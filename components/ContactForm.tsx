'use client';

import { useState } from 'react';

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    setStatus(res.ok ? 'sent' : 'error');
    if (res.ok) setForm({ name: '', email: '', phone: '', message: '' });
  };

  if (status === 'sent') {
    return (
      <div className="bg-stone-800 border border-accent/30 rounded-2xl p-8 text-center">
        <p className="text-accent text-2xl mb-2">✓</p>
        <p className="text-white font-semibold mb-1">Message sent!</p>
        <p className="text-stone-400 text-sm">I'll get back to you as soon as possible.</p>
        <button onClick={() => setStatus('idle')} className="mt-4 text-xs text-stone-500 hover:text-stone-300 transition-colors">
          Send another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <div>
        <label className="block text-xs font-semibold text-stone-400 uppercase tracking-wider mb-1.5">Name</label>
        <input
          required
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
          className="w-full px-4 py-2.5 bg-stone-800 border border-stone-700 rounded-xl text-white text-sm placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent/60"
          placeholder="Your name"
        />
      </div>
      <div>
        <label className="block text-xs font-semibold text-stone-400 uppercase tracking-wider mb-1.5">Email</label>
        <input
          required
          type="email"
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
          className="w-full px-4 py-2.5 bg-stone-800 border border-stone-700 rounded-xl text-white text-sm placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent/60"
          placeholder="you@email.com"
        />
      </div>
      <div>
        <label className="block text-xs font-semibold text-stone-400 uppercase tracking-wider mb-1.5">Phone (optional)</label>
        <input
          value={form.phone}
          onChange={e => setForm({ ...form, phone: e.target.value })}
          className="w-full px-4 py-2.5 bg-stone-800 border border-stone-700 rounded-xl text-white text-sm placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent/60"
          placeholder="+92 300 0000000"
        />
      </div>
      <div>
        <label className="block text-xs font-semibold text-stone-400 uppercase tracking-wider mb-1.5">Message</label>
        <textarea
          required
          rows={4}
          value={form.message}
          onChange={e => setForm({ ...form, message: e.target.value })}
          className="w-full px-4 py-2.5 bg-stone-800 border border-stone-700 rounded-xl text-white text-sm placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent/60 resize-none"
          placeholder="Tell me about your goals..."
        />
      </div>
      {status === 'error' && <p className="text-red-400 text-sm">Something went wrong. Please try again.</p>}
      <button
        type="submit"
        disabled={status === 'sending'}
        className="w-full py-3 bg-accent text-stone-950 font-bold rounded-full hover:bg-accent-light transition-colors text-sm disabled:opacity-60"
      >
        {status === 'sending' ? 'Sending…' : 'Send Message'}
      </button>
    </form>
  );
}

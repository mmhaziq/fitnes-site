'use client';

import { useRef, useState } from 'react';

interface Props {
  value: string;
  onChange: (url: string) => void;
  label?: string;
}

export default function ImageUpload({ value, onChange, label = 'Image' }: Props) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const upload = async (file: File) => {
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const preset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
    if (!cloudName || !preset) {
      setError('Cloudinary not configured. Paste a URL instead.');
      return;
    }
    setUploading(true);
    setError('');
    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', preset);
    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, { method: 'POST', body: data });
    setUploading(false);
    if (res.ok) {
      const json = await res.json();
      onChange(json.secure_url);
    } else {
      setError('Upload failed. Check Cloudinary settings.');
    }
  };

  return (
    <div>
      <label className="admin-label">{label}</label>
      <div className="flex gap-2 items-start">
        <input
          className="admin-field flex-1"
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder="https://... or upload →"
        />
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="px-3 py-2.5 bg-stone-700 text-stone-300 text-xs rounded-xl hover:bg-stone-600 transition-colors disabled:opacity-50 whitespace-nowrap"
        >
          {uploading ? 'Uploading…' : 'Upload'}
        </button>
        <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={e => e.target.files?.[0] && upload(e.target.files[0])} />
      </div>
      {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
      {value && (
        <img src={value} alt="preview" className="mt-2 h-20 rounded-lg object-cover border border-stone-700" />
      )}
    </div>
  );
}

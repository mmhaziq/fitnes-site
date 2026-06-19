'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';

interface Props {
  content: string;
  onChange: (html: string) => void;
}

export default function RichEditor({ content, onChange }: Props) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({ openOnClick: false }),
    ],
    content,
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });

  if (!editor) return null;

  const btn = (action: () => boolean, active: boolean, label: string) => (
    <button
      type="button"
      onClick={() => action()}
      className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
        active ? 'bg-accent text-stone-950' : 'bg-stone-700 text-stone-300 hover:bg-stone-600'
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="border border-stone-700 rounded-xl overflow-hidden">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-1.5 p-3 border-b border-stone-700 bg-stone-800">
        {btn(() => editor.chain().focus().toggleBold().run(), editor.isActive('bold'), 'B')}
        {btn(() => editor.chain().focus().toggleItalic().run(), editor.isActive('italic'), 'I')}
        {btn(() => editor.chain().focus().toggleHeading({ level: 2 }).run(), editor.isActive('heading', { level: 2 }), 'H2')}
        {btn(() => editor.chain().focus().toggleHeading({ level: 3 }).run(), editor.isActive('heading', { level: 3 }), 'H3')}
        {btn(() => editor.chain().focus().toggleBulletList().run(), editor.isActive('bulletList'), '• List')}
        {btn(() => editor.chain().focus().toggleOrderedList().run(), editor.isActive('orderedList'), '1. List')}
        {btn(() => editor.chain().focus().toggleBlockquote().run(), editor.isActive('blockquote'), '" Quote')}
        <button
          type="button"
          onClick={() => {
            const url = window.prompt('Enter URL');
            if (url) editor.chain().focus().setLink({ href: url }).run();
          }}
          className="px-2.5 py-1 rounded text-xs font-medium bg-stone-700 text-stone-300 hover:bg-stone-600"
        >
          Link
        </button>
        {btn(() => editor.chain().focus().unsetLink().run(), false, 'Unlink')}
      </div>

      <EditorContent
        editor={editor}
        className="prose prose-invert max-w-none p-4 min-h-[300px] focus:outline-none text-sm bg-stone-800 text-stone-200 [&_.ProseMirror]:outline-none"
      />
    </div>
  );
}

import Link from "next/link";
import { api } from "@/lib/api";

type Note = {
  id: number;
  content: string;
  created_at: string;
  creator_id: number;
};

const fmt = (iso: string) =>
  new Date(iso).toLocaleString(undefined, {
    year:   "numeric",
    month:  "short",
    day:    "2-digit",
    hour:   "2-digit",
    minute: "2-digit",
  });

export default async function NotePage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  let note: Note;

  try {
    note = await api<Note>(`/notes/${id}`);
  } catch {
    return <p className="text-red-500">Note not found.</p>;
  }

  return (
    <div className="max-w-md mx-auto mt-10 space-y-4 p-6 bg-white rounded-lg shadow-md">
      <Link
        href="/"
        className="inline-block px-4 py-2 bg-amber-300 text-gray-800 rounded-md hover:bg-amber-600 transition-colors"
      >
        ← 
      </Link>
      <h1 className="text-lg font-bold text-gray-800">Note #{note.id}</h1>

      <div className="min-h-[200px]">
        <p className="whitespace-pre-wrap">{note.content}</p>
      </div>

      <small className="block text-gray-500">
        by user {note.creator_id} at {fmt(note.created_at)}
      </small>
    </div>
  );
}

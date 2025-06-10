
import { api } from "@/lib/api";

type Note = {
  id: number;
  content: string;
  created_at: string;
  creator_id: number;
};

export default async function NotePage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;                     // ← plain destructure
  let note: Note;

  try {
    note = await api<Note>(`/notes/${id}`);  // now uses the real string
  } catch {
    return <p className="text-red-500">Note not found.</p>;
  }

  return (
    <div>
      <h1>Note #{note.id}</h1>
      <p>{note.content}</p>
      <small>
        by user {note.creator_id} at {new Date(note.created_at).toLocaleString()}
      </small>
    </div>
  );
}

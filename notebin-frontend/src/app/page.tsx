"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";

type Note = {
  id: number;
  content: string;
  created_at: string;
  creator_id: number;
};

type User = {
  id: number;
  username: string;
};

export default function HomePage() {
  const [creatorId, setCreatorId] = useState<number | undefined>();
  const [content, setContent] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [notes, setNotes] = useState<Note[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const router = useRouter();

  async function loadUsers() {
    try {
      const data = await api<User[]>("/users");
      setUsers(data);
    } catch (e: any) {
      setError(e.message);
    }
  }
  async function loadNotes() {
    try {
      const data = await api<Note[]>("/notes");
      const sixHoursAgo = Date.now() - 6 * 60 * 60 * 1000;
      const freshNotes = data.filter(n => {
        const created = new Date(n.created_at).getTime();
        return created >= sixHoursAgo;
      });
      setNotes(freshNotes);
    } catch (e: any) {
      setError(e.message);
    }
  }
  useEffect(() => {
    loadUsers();
    loadNotes();
  }, []);

  async function handleSubmit() {
    if (!creatorId || !content.trim()) {
      setError("Please select a user and enter content.");
      return;
    }
    try {
      const note = await api<Note>("/notes", {
        method: "POST",
        body: JSON.stringify({ creator_id: creatorId, content }),
      });
      router.push(`/note/${note.id}`);
    } catch (e: any) {
      setError(e.message);
    }
  }

  const handleNoteClick = (noteId: number) => {
    router.push(`/note/${noteId}`);
  };

  const fmt = (iso: string) =>
    new Date(iso).toLocaleString(undefined, {
      year:   "numeric",
      month:  "short",
      day:    "2-digit",
      hour:   "2-digit",
      minute: "2-digit",
    });

  return (
    <div className="max-w-md mx-auto mt-10 space-y-6">
      <h2 className="text-lg font-medium text-gray-800">New Note</h2>

      {}
      <select
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
        value={creatorId ?? ""}
        onChange={(e) => setCreatorId(Number(e.target.value))}
      >
        <option value="" disabled>
          Select user…
        </option>
        {users.map((u) => (
          <option key={u.id} value={u.id}>
            {u.username}
          </option>
        ))}
      </select>

      {}
      <div className="flex justify-between items-center mb-1">
        <label htmlFor="content" className="font-medium">
          Note content…
        </label>
        <span className="text-sm text-gray-500">
          Max 500
        </span>
      </div>
      <textarea
        id="content"
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 min-h-[200px]"
        placeholder="Note content…"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        maxLength={500}
      />
      <button
        className="w-full px-4 py-2 bg-amber-300 text-gray-800 rounded-md hover:bg-amber-600 transition-colors"
        onClick={handleSubmit}
      >
        Submit
      </button>
      {error && <p className="text-red-500">{error}</p>}

      {}
      <div className="space-y-2">
        <h3 className="text-md font-semibold mt-6">All Notes</h3>
        {notes.length === 0 && <p className="text-gray-500">No notes yet.</p>}
        {notes.map((n) => {
          const user = users.find(u => u.id === n.creator_id);
          return (
            <div
              key={n.id}
              className="border p-3 rounded bg-white hover:bg-gray-50 cursor-pointer transition-colors"
              onClick={() => handleNoteClick(n.id)}
            >
              <p className="line-clamp-1 overflow-hidden text-ellipsis">
                {n.content.split("\n")[0]}
                {n.content.includes("\n") || n.content.length > 100 ? "..." : ""}
              </p>
              <small className="text-gray-500">
                #{n.id} • {user?.username ?? "Unknown"} • {fmt(n.created_at)}
              </small>
            </div>
          );
        })}
      </div>
    </div>
  );
}

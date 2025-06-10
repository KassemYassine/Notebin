"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";

type Note = {
  id: number;
  content: string;
  created_at: string;
  creator_id: number;
};

export default function HomePage() {
  const [creatorId, setCreatorId] = useState<number | undefined>();
  const [content, setContent] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function handleSubmit() {
    if (!creatorId || !content.trim()) {
      setError("Please enter both creator ID and content.");
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

  return (
    <div className="max-w-md mx-auto mt-10 space-y-4">
      <h2 className="text-lg font-medium">Write a Note 📝</h2>
      <input
        type="number"
        className="input input-bordered w-full"
        placeholder="Your user ID"
        onChange={(e) => setCreatorId(Number(e.target.value))}
      />
      <textarea
        className="textarea textarea-bordered w-full"
        placeholder="Note content…"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button className="btn btn-primary w-full" onClick={handleSubmit}>
        Submit
      </button>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}

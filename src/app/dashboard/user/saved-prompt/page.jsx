"use client";
import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";

export default function SavedPromptsPage() {
  const [prompts, setPrompts] = useState([]);

  useEffect(() => {
    async function fetchSaved() {
      const session = await authClient.getSession();
      if (!session) return;
  
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/user/saved/${session.user.id}`);
      const data = await res.json();
      setPrompts(data);
    }
    fetchSaved();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Saved Prompts</h1>
      {prompts.length === 0 ? <p className="text-gray-500">No saved prompts found.</p> : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {prompts.map((p) => <div key={p._id} className="p-4 border rounded-xl">{p.title}</div>)}
        </div>
      )}
    </div>
  );
}
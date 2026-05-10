"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreatePostPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    setLoading(true);

    const response = await fetch("/api/posts", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        title,
        content,
      }),
    });

    setLoading(false);

    if (response.ok) {
      router.push("/");
      router.refresh();
    }
  }

  return (
    <main className="min-h-screen bg-[#0f0f10] text-white p-6">
      <div className="max-w-2xl mx-auto">
        <div className="bg-[#18181b] border border-zinc-800 rounded-2xl p-8 shadow-xl">
          <h1 className="text-3xl font-bold mb-6">
            Create Post
          </h1>

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            <input
              type="text"
              placeholder="Post title"
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
              className="w-full bg-[#27272a] border border-zinc-700 rounded-xl px-4 py-3 outline-none focus:border-blue-500"
              required
            />

            <textarea
              placeholder="Write something..."
              value={content}
              onChange={(e) =>
                setContent(e.target.value)
              }
              rows={8}
              className="w-full bg-[#27272a] border border-zinc-700 rounded-xl px-4 py-3 outline-none focus:border-blue-500 resize-none"
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-500 transition px-6 py-3 rounded-xl font-semibold"
            >
              {loading
                ? "Creating..."
                : "Create Post"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
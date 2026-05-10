"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface Props {
  postId: string;
}

export default function CommentForm({
  postId,
}: Props) {
  const router = useRouter();

  const [content, setContent] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    if (!content.trim()) return;

    setLoading(true);

    const response = await fetch(
      "/api/comments",
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({
          content,
          postId,
        }),
      }
    );

    setLoading(false);

    if (response.ok) {
      setContent("");

      router.refresh();
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[#18181b] border border-zinc-800 rounded-2xl p-6 mb-8"
    >
      <h3 className="text-xl font-bold mb-4">
        Add Comment
      </h3>

      <textarea
        placeholder="Write your comment..."
        value={content}
        onChange={(e) =>
          setContent(e.target.value)
        }
        rows={4}
        className="w-full bg-[#27272a] border border-zinc-700 rounded-xl px-4 py-3 outline-none focus:border-blue-500 resize-none"
      />

      <button
        type="submit"
        disabled={loading}
        className="mt-4 bg-blue-600 hover:bg-blue-500 transition px-5 py-3 rounded-xl font-semibold"
      >
        {loading
          ? "Posting..."
          : "Post Comment"}
      </button>
    </form>
  );
}
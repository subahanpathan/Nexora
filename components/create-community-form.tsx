"use client";

import { useState } from "react";

interface Props {
  postId: string;
}

export default function CreateCommentForm({
  postId,
}: Props) {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  async function createComment() {
    if (!content) return;

    try {
      setLoading(true);

      const response = await fetch("/api/comment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content,
          postId,
        }),
      });

      if (response.ok) {
        setContent("");
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border mt-6">
      <h2 className="text-2xl font-bold mb-4">
        Add Comment
      </h2>

      <textarea
        placeholder="Write your comment..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full border rounded-lg px-4 py-3 mb-4 h-28"
      />

      <button
        onClick={createComment}
        disabled={loading}
        className="bg-black text-white px-6 py-3 rounded-lg"
      >
        {loading ? "Posting..." : "Post Comment"}
      </button>
    </div>
  );
}
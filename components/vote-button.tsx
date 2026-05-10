"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface Props {
  postId: string;
  initialVotes: number;
}

export default function VoteButton({
  postId,
  initialVotes,
}: Props) {
  const router = useRouter();

  const [votes, setVotes] =
    useState(initialVotes);

  const [loading, setLoading] =
    useState(false);

  async function handleVote() {
    if (loading) return;

    setLoading(true);

    const response = await fetch(
      "/api/vote",
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({
          postId,
        }),
      }
    );

    const data = await response.json();

    if (data.removed) {
      setVotes((prev) => prev - 1);
    } else {
      setVotes((prev) => prev + 1);
    }

    setLoading(false);

    router.refresh();
  }

  return (
    <button
      onClick={handleVote}
      className="flex items-center gap-2 bg-[#232329] hover:bg-[#2a2a31] transition px-4 py-2 rounded-xl border border-zinc-700"
    >
      <span className="text-orange-400">
        ▲
      </span>

      <span className="font-semibold">
        {votes}
      </span>
    </button>
  );
}
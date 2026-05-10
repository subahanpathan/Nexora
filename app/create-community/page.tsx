"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

export default function CreateCommunityPage() {
  const router = useRouter();

  const [name, setName] =
    useState("");

  const [slug, setSlug] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    setLoading(true);

    const response = await fetch(
      "/api/community",
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({
          name,
          slug,
        }),
      }
    );

    setLoading(false);

    if (response.ok) {
      router.push(`/c/${slug}`);
    }
  }

  return (
    <main className="min-h-screen bg-[#0f0f10] text-white flex items-center justify-center px-6">
      <div className="w-full max-w-xl bg-[#18181b] border border-zinc-800 rounded-3xl p-8 shadow-2xl">
        <h1 className="text-4xl font-bold mb-2">
          Create Community
        </h1>

        <p className="text-zinc-400 mb-8">
          Start your own Reddit-style
          community
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          <div>
            <label className="block mb-2 text-sm font-medium text-zinc-300">
              Community Name
            </label>

            <input
              type="text"
              placeholder="Programming"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              className="w-full bg-[#27272a] border border-zinc-700 rounded-xl px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-zinc-300">
              Community Slug
            </label>

            <input
              type="text"
              placeholder="programming"
              value={slug}
              onChange={(e) =>
                setSlug(e.target.value)
              }
              className="w-full bg-[#27272a] border border-zinc-700 rounded-xl px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-500 transition py-3 rounded-xl font-semibold"
          >
            {loading
              ? "Creating..."
              : "Create Community"}
          </button>
        </form>
      </div>
    </main>
  );
}
export type AIResponse = {
  answer: string;
  sources?: { title: string; url: string }[];
  suggestions?: string[];
};

export async function askThreadifyAI(query: string): Promise<AIResponse> {
  // Simulate network latency
  await new Promise((resolve) => setTimeout(resolve, 1500));

  const responses: Record<string, AIResponse> = {
    "default": {
      answer: "I can help you find threads, summarize discussions, or discover new communities based on your interests. Try asking something specific like 'Summarize the latest AI trends' or 'Find designers to follow'.",
      suggestions: [
        "Summarize t/aiengineering latest threads",
        "Who is hiring for React roles?",
        "Top design systems in 2026",
      ],
    },
    "summarize": {
      answer: "The latest discussions in t/aiengineering focus on 'Local RAG' optimization. Engineers are moving away from managed vector databases towards lean, single-file implementations for 30% better latency.",
      sources: [
        { title: "We replaced our entire RAG stack with 400 lines", url: "#" },
        { title: "Local embedding benchmarks 2026", url: "#" },
      ],
    },
  };

  if (query.toLowerCase().includes("summarize")) return responses["summarize"];
  return responses["default"];
}

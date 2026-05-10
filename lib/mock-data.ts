export type Post = {
  community: string;
  communityColor: string;
  author: string;
  verified?: boolean;
  role?: string;
  time: string;
  title: string;
  body?: string;
  image?: string; // gradient class
  imageLabel?: string;
  votes: number;
  comments: number;
  tag?: string;
  hiring?: boolean;
  topReply?: { author: string; text: string };
};

export const posts: Post[] = [
  {
    community: "design.systems",
    communityColor: "from-indigo-500 to-violet-500",
    author: "Mira Okafor",
    verified: true,
    role: "Principal Designer · Linear",
    time: "2h",
    title:
      "Designing calm interfaces: how layered surfaces and ambient glow replace decoration",
    body:
      "After 6 months rebuilding our internal tools, here's what shipped, what failed, and a small library of components anyone can steal.",
    image: "from-indigo-500/40 via-violet-500/30 to-fuchsia-500/30",
    imageLabel: "Case study · 14 min read",
    votes: 4820,
    comments: 312,
    tag: "Featured",
    topReply: {
      author: "Daniel Park",
      text: "The grain overlay tip alone is worth the entire write-up. Bookmarked.",
    },
  },
  {
    community: "aiengineering",
    communityColor: "from-fuchsia-500 to-rose-500",
    author: "Kenji Watanabe",
    role: "Founding Engineer · Northwind AI",
    time: "5h",
    title:
      "We replaced our entire RAG stack with a single 400-line file. Here's the architecture.",
    body:
      "A surprisingly small, fully-local pipeline that beat our previous vendor on both latency and recall. Open-source repo inside.",
    votes: 2914,
    comments: 198,
    topReply: {
      author: "Sara Lin",
      text: "Wild that this matches our internal benchmark within 3%. Going to try the eval harness tomorrow.",
    },
  },
  {
    community: "founders",
    communityColor: "from-amber-400 to-orange-500",
    author: "Threadify Talent",
    verified: true,
    role: "Hiring across 12 roles",
    time: "1h",
    title: "We're hiring a Founding Product Designer (remote, $180K–$240K + equity)",
    body:
      "Help shape the next era of social. You'll own design end-to-end across web and mobile, working directly with the founders.",
    votes: 612,
    comments: 47,
    hiring: true,
    image: "from-amber-400/30 via-orange-500/25 to-rose-500/30",
    imageLabel: "Open roles · Remote · Full-time",
  },
  {
    community: "buildinpublic",
    communityColor: "from-emerald-400 to-cyan-500",
    author: "Aria Chen",
    role: "Solo founder · Drift Studio",
    time: "8h",
    title:
      "$0 → $42K MRR in 9 months by selling beautiful niche software to designers",
    body:
      "Honest breakdown of what worked: distribution, pricing, the painful pivot, and what I'd do differently.",
    votes: 5320,
    comments: 421,
    topReply: {
      author: "Mateo Alvarez",
      text: "The pricing experiment chart is gold. We just doubled our entry tier based on this thread.",
    },
  },
];

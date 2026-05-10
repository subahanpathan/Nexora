import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const communities = [
    { name: "design.systems", slug: "design_systems", color: "from-indigo-500 to-violet-500", description: "Design systems and component architecture." },
    { name: "aiengineering", slug: "aiengineering", color: "from-fuchsia-500 to-rose-500", description: "Building with LLMs and agents." },
    { name: "founders", slug: "founders", color: "from-amber-400 to-orange-500", description: "Insights for early-stage builders." },
    { name: "buildinpublic", slug: "buildinpublic", color: "from-emerald-400 to-cyan-500", description: "Transparency and solo founder growth." },
  ];

  for (const c of communities) {
    await prisma.community.upsert({
      where: { slug: c.slug },
      update: {},
      create: c,
    });
  }

  console.log("Seed successful");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
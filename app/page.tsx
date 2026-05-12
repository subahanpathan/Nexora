import { getPosts } from "@/lib/actions/post";
import { getCommunities } from "@/lib/actions/community";
import { PostFeed } from "@/components/post/post-feed";
import { Composer } from "@/components/post/composer";
import { Hero } from "@/components/hero";
import { ProfessionalRow } from "@/components/professional-row";
import { FeedTabs } from "@/components/feed-tabs";
import { Suspense } from "react";
import { FeedSkeleton } from "@/components/post/post-skeleton";

export default async function Page() {
  return (
    <div className="space-y-6">
      <Hero />
      <ProfessionalRow />
      <FeedTabs />
      <Suspense fallback={<FeedSkeleton />}>
        <HomeFeedSection />
      </Suspense>
    </div>
  );
}

async function HomeFeedSection() {
  const [postsData, communities] = await Promise.all([
    getPosts({ limit: 10 }),
    getCommunities(),
  ]);

  return (
    <>
      <Composer communities={communities} />
      <PostFeed initialPosts={postsData.posts} />
    </>
  );
}

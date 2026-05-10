import { getPosts } from "@/lib/actions/post";
import { getCommunities } from "@/lib/actions/community";
import { PostFeed } from "@/components/post/post-feed";
import { Composer } from "@/components/post/composer";
import { Hero } from "@/components/hero";
import { ProfessionalRow } from "@/components/professional-row";
import { FeedTabs } from "@/components/feed-tabs";

export default async function Page() {
  const [postsData, communities] = await Promise.all([
    getPosts({ limit: 10 }),
    getCommunities(),
  ]);

  return (
    <div className="space-y-6">
      <Hero />
      <ProfessionalRow />
      <FeedTabs />
      <Composer communities={communities} />
      <PostFeed initialPosts={postsData.posts} />
    </div>
  );
}

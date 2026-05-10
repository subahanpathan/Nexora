import { Post, User, Community, Vote, Comment } from "@prisma/client";

export type ExtendedPost = Post & {
  author: User;
  community: Community;
  votes: Vote[];
  _count: {
    comments: number;
  };
};

export type ExtendedComment = Comment & {
  author: User;
  votes: Vote[];
  replies?: ExtendedComment[];
};

export type ExtendedCommunity = Community & {
  _count: {
    members: number;
    posts: number;
  };
};

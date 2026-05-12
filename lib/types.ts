import { Community } from "@prisma/client";

export type ExtendedPost = {
  id: string;
  title: string;
  content: string;
  imageUrl: string | null;
  imageLabel: string | null;
  hiring: boolean;
  tag: string | null;
  summary: string | null;
  createdAt: Date;
  updatedAt: Date;
  authorId: string;
  communityId: string;
  author: {
    id: string;
    username: string;
    verified: boolean;
    image: string | null;
  };
  community: {
    id: string;
    name: string;
    slug: string;
    color: string | null;
  };
  votes: {
    id: string;
    type: number;
    userId: string;
    postId: string | null;
  }[];
  _count: {
    comments: number;
  };
};

export type ExtendedComment = {
  id: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  postId: string;
  parentId: string | null;
  authorId: string;
  author: {
    id: string;
    username: string;
    image: string | null;
    verified: boolean;
  };
  votes: {
    id: string;
    type: number;
    userId: string;
    postId: string | null;
    commentId: string | null;
  }[];
  replies?: ExtendedComment[];
};

export type ExtendedCommunity = Community & {
  _count: {
    members: number;
    posts: number;
  };
};

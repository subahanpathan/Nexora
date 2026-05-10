import { z } from "zod";

export const PostSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").max(100),
  content: z.string().min(3, "Content must be at least 3 characters"),
  communityId: z.string().min(1, "Community is required"),
  imageUrl: z.string().optional(),
  imageLabel: z.string().optional(),
});

export const CommentSchema = z.object({
  content: z.string().min(1, "Comment cannot be empty"),
  postId: z.string(),
  parentId: z.string().optional(),
});

export const VoteSchema = z.object({
  postId: z.string().optional(),
  commentId: z.string().optional(),
  type: z.enum(["1", "-1"]),
});

export const CommunitySchema = z.object({
  name: z.string().min(3).max(20).regex(/^[a-zA-Z0-9_]+$/, "Only alphanumeric and underscores"),
  description: z.string().min(10).max(500),
});

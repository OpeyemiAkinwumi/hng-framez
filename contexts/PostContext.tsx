import { createContext } from "react";

export type Post = {
  id: string;
  title: string;
  content: string;
  author: any; // Firestore DocumentReference or string (depending on your model)
  authorName?: string; // ✅ optional, because we resolve it manually
  created_at: any; // Timestamp
  comment?: string[];
  likes?: number;
  media?: string[];
};


export type PostContextType = {
  posts: Post[];
  fetchPosts: () => Promise<void>;
  fetchPostById: (id: string) => Promise<Post | null>;
  createPost: (title: string, content: string) => Promise<void>;
  deletePost: (id: string) => Promise<void>;
};

export const PostContext = createContext<PostContextType | null>(null);

import React, { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  deleteDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db, auth } from "../FirebaseConfig";

import { Post, PostContext } from "./PostContext";
import { Alert } from "react-native";

type PostProviderProp = {
  children: React.ReactNode;
};

export function PostProvider({ children }: PostProviderProp) {
  const [posts, setPosts] = useState<Post[]>([]);

  const postsCollectionRef = collection(db, "posts");

  // ✅ Fetch all posts
  async function fetchPosts() {
    try {
      const snapshot = await getDocs(postsCollectionRef);
      const postList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Post[];
      setPosts(postList);
    } catch (error) {
      console.error("❌ Error fetching posts:", error);
    }
  }

  // ✅ Fetch single post by ID
  async function fetchPostById(id: string): Promise<Post | null> {
    try {
      const docRef = doc(db, "posts", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() } as Post;
      } else {
        console.warn("⚠️ No post found with ID:", id);
        return null;
      }
    } catch (error) {
      console.error("❌ Error fetching post by ID:", error);
      return null;
    }
  }

// ✅ Create new post
async function createPost(title: string, content: string) {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error("User not authenticated");

    // 1️⃣ Get the user's document from the 'users' collection
    const userDocRef = doc(db, "users", user.uid);
    const userDocSnap = await getDoc(userDocRef);

    if (!userDocSnap.exists()) throw new Error("User data not found");

    const userData = userDocSnap.data();

    // 2️⃣ Create the post using the author's name from userData
    await addDoc(postsCollectionRef, {
      title,
      content,
      authorId: user.uid,
      authorName: userData.name || "Anonymous", // replace 'name' with the actual field in your users collection
      created_at: serverTimestamp(),
    });

    console.log("✅ Post created successfully!");
    fetchPosts(); // refresh list
  } catch (error: any) {
    console.error(error);
    Alert.alert("Post Creation Failed", error.message);
  }
}

  // ✅ Delete post
  async function deletePost(id: string) {
    try {
      const postRef = doc(db, "posts", id);
      await deleteDoc(postRef);
      console.log("🗑️ Post deleted successfully!");
      setPosts((prev) => prev.filter((post) => post.id !== id));
    } catch (error: any) {
      throw Error(error.message);
      Alert.alert("Logout Failed", error.message);
    }
  }

  // Auto-fetch posts on mount
  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <PostContext.Provider
      value={{ posts, fetchPostById, fetchPosts, createPost, deletePost }}
    >
      {children}
    </PostContext.Provider>
  );
}

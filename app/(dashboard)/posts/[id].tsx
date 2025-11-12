import { Pressable, StyleSheet } from "react-native";
import ThemedView from "../../../components/ThemeView";
import ThemedTitle from "../../../components/ThemedTitle";
import Spacer from "../../../components/Spacer";

import { useLocalSearchParams } from "expo-router";
import ThemedText from "../../../components/ThemedText";
import { useEffect, useState } from "react";
import { usePost } from "../../../hooks/usePost";
import { Post } from "../../../contexts/PostContext";
import { colors } from "../../../constants/Colors";
import ThemedCard from "../../../components/ThemeCard";
import { Ionicons } from "@expo/vector-icons";
import { auth } from "../../../FirebaseConfig";
import ThemedLoader from "../../../components/ThemedLoader";

export default function PostDetails() {
  const [posts, setPost] = useState<Post | null>(null);
  const { id } = useLocalSearchParams();

  const { toggleLike } = usePost();

  const user = auth.currentUser;
  const isLiked = user ? posts?.likedBy?.includes(user.uid) : false;
  const likeCount = posts?.likedBy?.length || 0;

  // Make sure id is a string
  const postId = Array.isArray(id) ? id[0] : id;

  const { fetchPostById } = usePost();

  useEffect(() => {
    async function getPost() {
      if (!postId) return; // safety check
      const postData = await fetchPostById(postId);
      // do something with postData

      setPost(postData);
    }

    getPost();
  }, [postId]);

  console.log("This is the post", posts);

  if (!posts) {
    return <ThemedLoader />;
  }

  return (
    <ThemedView styles={styles.container} safe={true}>
      <Spacer />
      <ThemedCard styles={styles.card}>
        <ThemedText styles={styles.title}>{posts?.title}</ThemedText>

        <Spacer height={5} />
        <ThemedText>Written by {posts?.authorName}</ThemedText>
        <Spacer />

        <ThemedText>Post description:</ThemedText>
        <Spacer height={10} />

        <ThemedText styles={{ fontSize: 16, fontWeight: 600 }}>
          {posts?.content}
        </ThemedText>

        <ThemedText styles={[{ fontStyle: "italic" }, styles.likeLength]}>
          {likeCount > 0 ? likeCount : ""}
        </ThemedText>
        {/* ❤️ Like button at bottom-right */}
        <Pressable
          style={styles.likeButton}
          onPress={() => toggleLike(postId, posts?.likedBy)}
        >
          <Ionicons
            name={isLiked ? "heart" : "heart-outline"}
            size={24}
            color={isLiked ? "red" : "gray"}
          />
        </Pressable>
      </ThemedCard>
      <Spacer />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
    // justifyContent: "center",
    paddingBottom: 70,
  },
  title: {
    fontSize: 24,
    fontWeight: 700,
  },
  card: {
    flex: 1,
  },
  delete: {
    marginTop: 40,
    backgroundColor: colors.dark.status.error,
    width: 200,
    alignSelf: "center",
  },
  likeButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    zIndex: 99,
  },
  likeLength: {
    position: "absolute",
    bottom: 20,
    right: 45,
    zIndex: 99,
  },
});

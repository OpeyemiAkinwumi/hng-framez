import { StyleSheet, FlatList } from "react-native";
import { useEffect, useState } from "react";
import ThemedView from "../../components/ThemeView";
import Spacer from "../../components/Spacer";
import ThemedTitle from "../../components/ThemedTitle";
import ThemedText from "../../components/ThemedText";
import ThemedButton from "../../components/ThemedButton";
import { colors } from "../../constants/Colors";
import { useUser } from "../../hooks/useUser";
import { usePost } from "../../hooks/usePost";
import { Post } from "../../contexts/PostContext";
import { auth } from "../../FirebaseConfig";
import ThemedCard from "../../components/ThemeCard";

export default function Profile() {
  const [error, setError] = useState<string | null>(null);
  const [userPosts, setUserPosts] = useState<Post[]>([]);

  const { userData, logout } = useUser();
  const { posts, fetchPosts } = usePost();

  console.log(posts);

  console.log(userData);

  useEffect(() => {
    async function loadPosts() {
      await fetchPosts(); // fetch all posts first

      const currentUserId = auth.currentUser?.uid; // ✅ current user's UID

      if (!currentUserId) return;

      // Filter posts where the post's authorId matches the current user
      const filteredPosts = posts.filter(
        (post) => post.authorId === currentUserId
      );
      setUserPosts(filteredPosts);
    }

    loadPosts();
  }, []);

  async function handleLogout() {
    setError(null);
    try {
      await logout();
    } catch (err: any) {
      setError(err.message);
    }
  }

  return (
    <ThemedView safe={true} styles={styles.container}>
      <Spacer height={50} />
      <ThemedTitle styles={styles.title}>Profile</ThemedTitle>
      <Spacer />

      <ThemedText styles={styles.heading}>Hello, {userData?.name}</ThemedText>
      <Spacer />

      <ThemedText styles={{ fontWeight: 600, marginBottom: 10 }}>
        Your Posts:
      </ThemedText>

      <FlatList
        data={userPosts}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 50 }}
        renderItem={({ item }) => (
          <ThemedCard styles={styles.postCard}>
            <ThemedText styles={{ fontWeight: 600 }}>{item.title}</ThemedText>
            <ThemedText>{item.content}</ThemedText>
            <ThemedText
              styles={{ fontStyle: "italic", fontSize: 12, marginTop: 4 }}
            >
              {item.created_at?.toDate
                ? item.created_at.toDate().toLocaleString()
                : ""}
            </ThemedText>
          </ThemedCard>
        )}
      />

      {error && <ThemedText styles={styles.error}>{error}</ThemedText>}

      <Spacer height={20} />

      <ThemedButton styles={{ marginTop: "auto" }} onPress={handleLogout}>
        <ThemedText
          styles={{
            color: colors.light.text.primary,
            textAlign: "center",
            fontWeight: "700",
          }}
        >
          Logout
        </ThemedText>
      </ThemedButton>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
    paddingBottom: 70,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
  },
  heading: {
    fontSize: 18,
    fontWeight: "600",
  },
  error: {
    color: colors.light.status.error,
    borderColor: colors.light.status.error,
    borderWidth: 1,
    borderRadius: 6,
    padding: 4,
    marginTop: 10,
  },
  postCard: {
    // backgroundColor: colors.light.background.base,
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    width: "100%",
  },
});

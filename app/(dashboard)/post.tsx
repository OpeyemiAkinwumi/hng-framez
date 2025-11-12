import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import ThemedView from "../../components/ThemeView";
import Spacer from "../../components/Spacer";
import ThemedTitle from "../../components/ThemedTitle";
import ThemedText from "../../components/ThemedText";
import { usePost } from "../../hooks/usePost";
import ThemedCard from "../../components/ThemeCard";
import { colors } from "../../constants/Colors";
import { useRouter } from "expo-router";
import { Post } from "../../contexts/PostContext";
import { formatTimeAgo } from "../../utils/utils";
// import { FlatList } from "react-native/types_generated/index";

export default function profile() {
  const { posts } = usePost();

  console.log(posts);

  const router = useRouter();

  return (
    <ThemedView styles={styles.container} safe={true}>
      <Spacer />
      <ThemedTitle styles={styles.title}>Feeds</ThemedTitle>

      <Spacer />

      <FlatList
        data={posts}
        style={{ width: "100%" }}
        keyExtractor={(item) => item.id ?? Math.random().toString()} // ✅ always string
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <Pressable
            style={{ width: "100%" }}
            onPress={() => router.push(`/posts/${item.id}`)}
          >
            <ThemedCard styles={styles.card}>
              <ThemedTitle styles={styles.title}>{item.title}</ThemedTitle>
              <ThemedText styles={{marginVertical: 2,fontWeight: 500}}>{item.content}</ThemedText>
              <ThemedText styles={{fontStyle: "italic"}}>Written by {item.authorName}</ThemedText>
              <ThemedText>{formatTimeAgo(item.created_at)}</ThemedText>
            </ThemedCard>
          </Pressable>
        )}
      />
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
  heading: {
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  },
  list: {
    marginTop: 40,
  },
  meta: { fontSize: 12, opacity: 0.7, marginTop: 8 },
  card: {
    width: "100%",
    // marginHorizontal: "5%",
    marginVertical: 10,
    padding: 10,
    // paddingLeft: 14,
    borderLeftColor: colors.light.primary.dark,
    borderLeftWidth: 4,
    display: "flex",
  },
  // title: {
  //   fontSize: 20,
  //   fontWeight: "bold",
  //   marginBottom: 10,
  // },
});

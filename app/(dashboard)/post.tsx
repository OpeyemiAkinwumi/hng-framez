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
import { Ionicons } from "@expo/vector-icons";
import { auth } from "../../FirebaseConfig";
// import { FlatList } from "react-native/types_generated/index";

export default function profile() {
  const { posts, toggleLike } = usePost();

  // console.log(posts);

  const router = useRouter();

  return (
    <ThemedView styles={styles.container} safe={true}>
      <Spacer />
      <ThemedTitle styles={styles.title}>Feeds</ThemedTitle>
      {/* <Spacer /> */}
      {/* <FlatList
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
      /> */}
      // ✅ Render FlatList with heart icon
      <FlatList
        data={posts}
        style={{ width: "100%" }}
        keyExtractor={(item) => item.id ?? Math.random().toString()}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => {
          const user = auth.currentUser;
          const isLiked = user ? item.likedBy?.includes(user.uid) : false;
          const likeCount = item.likedBy?.length || 0;

          return (
            <View style={{ width: "100%" }}>
              <Pressable
                style={{ width: "100%" }}
                onPress={() => router.push(`/posts/${item.id}`)}
              >
                <ThemedCard styles={styles.card}>
                  <ThemedTitle styles={styles.title}>{item.title}</ThemedTitle>
                  <ThemedText styles={{ marginVertical: 2, fontWeight: "500" }}>
                    {item.content}
                  </ThemedText>
                  <ThemedText styles={{ fontStyle: "italic" }}>
                    Written by {item.authorName}
                  </ThemedText>
                  <ThemedText>{formatTimeAgo(item.created_at)}</ThemedText>
                </ThemedCard>
              </Pressable>

              <ThemedText styles={[{ fontStyle: "italic" }, styles.likeLength]}>
                {likeCount > 0 ? likeCount : ""}
              </ThemedText>
              {/* ❤️ Like button at bottom-right */}
              <Pressable
                style={styles.likeButton}
                onPress={() => toggleLike(item.id, item.likedBy)}
              >
                <Ionicons
                  name={isLiked ? "heart" : "heart-outline"}
                  size={18}
                  color={isLiked ? "red" : "gray"}
                />
              </Pressable>
            </View>
          );
        }}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
    // justifyContent: "center",
    paddingBottom: 30,
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
    marginTop: 30,
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
  // title: {
  //   fontSize: 20,
  //   fontWeight: "bold",
  //   marginBottom: 10,
  // },
});

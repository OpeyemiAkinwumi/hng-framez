import {
  Keyboard,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import ThemedView from "../../components/ThemeView";
import ThemedTitle from "../../components/ThemedTitle";
import Spacer from "../../components/Spacer";
import { useState } from "react";
import ThemedButton from "../../components/ThemedButton";
import ThemedTextInput from "../../components/ThemedTextInput";
import { usePost } from "../../hooks/usePost";
import { useRouter } from "expo-router";

export default function create() {
  const [title, setTitle] = useState("");
  // const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const { createPost } = usePost();

  const router = useRouter();

  async function handleSubmit() {
    if (!title.trim() || !content.trim()) return;

    setIsLoading(true);

    // create the book
    await createPost(title, content);

    // reset fields
    setTitle("");
    // setAuthor("");
    setContent("");

    // redirect
    router.replace("/post");

    // reset loading state
    setIsLoading(false);
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ThemedView styles={styles.container}>
        <Spacer height={70} />
        <ThemedTitle styles={styles.title}>Profile</ThemedTitle>
        <Spacer height={70} />
        {/* <Spacer /> */}

        <ThemedTextInput
          styles={styles.input}
          placeholder="Title"
          value={title}
          keyboardType="email-address"
          onChangeText={setTitle}
        />
        <Spacer />

        {/* <ThemedTextInput
          styles={styles.input}
          placeholder="Author"
          value={author}
          onChangeText={setAuthor}
        />
        <Spacer /> */}

        <ThemedTextInput
          styles={styles.multiline}
          placeholder="What's on your mind?"
          value={content}
          onChangeText={setContent}
          multiline={true}
        />
        <Spacer />

        <ThemedButton onPress={handleSubmit} disabled={isLoading}>
          <Text
            style={{ color: "#1A1A1A", textAlign: "center", fontWeight: 700 }}
          >
            {isLoading ? "Saving..." : "Create Post"}
          </Text>
        </ThemedButton>
      </ThemedView>
    </TouchableWithoutFeedback>
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
  input: {
    padding: 20,
    borderRadius: 6,
    alignSelf: "stretch",
    // marginHorizontal: 40,
  },
  multiline: {
    padding: 20,
    borderRadius: 6,
    minHeight: 100,
    alignSelf: "stretch",
    // marginHorizontal: 40,
  },
});

import { StyleSheet, Pressable, Text } from "react-native";
import ThemedView from "../../components/ThemeView";
import ThemedTitle from "../../components/ThemedTitle";
import Spacer from "../../components/Spacer";
import ThemedText from "../../components/ThemedText";
import { Link } from "expo-router";

import { colors } from "../../constants/Colors";
import ThemedButton from "../../components/ThemedButton";

export default function login() {
  function handleSubmit() {
    console.log("Hello login");
  }

  return (
    <ThemedView styles={styles.container}>
      <ThemedTitle styles={styles.title}>Welcome, Back</ThemedTitle>

      <Spacer />

      <ThemedButton onPress={handleSubmit}>
        <Text
          style={{
            color: colors.light.text.primary,
            textAlign: "center",
            fontWeight: 700,
          }}
        >
          Login
        </Text>
      </ThemedButton>

      <Spacer height={100} />

      <ThemedText styles={styles.text}>
        Don't have an account?{" "}
        <Link style={styles.link} href="signup">
          Sign up
        </Link>
      </ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: 700,
  },

  text: {
    textAlign: "center",
    width: "100%",
    fontWeight: 500,
  },
  link: {
    // color: "#7045FF",
    fontWeight: 900,
  },
});

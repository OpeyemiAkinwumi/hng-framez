import { StyleSheet, Pressable, Text } from "react-native";
import ThemedView from "../../components/ThemeView";
import ThemedTitle from "../../components/ThemedTitle";
import Spacer from "../../components/Spacer";
import ThemedText from "../../components/ThemedText";
import { Link } from "expo-router";

import { colors } from "../../constants/Colors";
import ThemedButton from "../../components/ThemedButton";

export default function signup() {
  function handleSubmit() {
    console.log("Hello signup");
  }

  return (
    <ThemedView styles={styles.container}>
      <ThemedTitle styles={styles.title}>Create your Account</ThemedTitle>

      <Spacer />

      <ThemedButton onPress={handleSubmit}>
        <Text
          style={{
            color: colors.light.text.primary,
            textAlign: "center",
            fontWeight: 700,
          }}
        >
          Create Account
        </Text>
      </ThemedButton>

      <Spacer height={100} />

      <ThemedText styles={styles.text}>
        Have an account?{" "}
        <Link style={styles.link} href="login">
          Sign in
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

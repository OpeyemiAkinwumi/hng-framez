import {
  Keyboard,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
} from "react-native";
import ThemedView from "../../components/ThemeView";
import ThemedTitle from "../../components/ThemedTitle";
import Spacer from "../../components/Spacer";
import ThemedText from "../../components/ThemedText";
import { Link } from "expo-router";

import { colors } from "../../constants/Colors";
import ThemedButton from "../../components/ThemedButton";
import ThemedTextInput from "../../components/ThemedTextInput";
import { useState } from "react";

export default function login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  function handleSubmit() {
    console.log("Hello login");
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ThemedView styles={styles.container}>
        <ThemedTitle styles={styles.title}>Welcome, Back</ThemedTitle>

        <Spacer />
        <ThemedTextInput
          placeholder="Email"
          keyboardType="email-address"
          onChangeText={setEmail}
          value={email}
        />

        <Spacer height={10} />

        <ThemedTextInput
          placeholder="Password"
          onChangeText={setPassword}
          value={password}
          secureTextEntry
        />

        <Spacer height={25} />

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
    </TouchableWithoutFeedback>
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

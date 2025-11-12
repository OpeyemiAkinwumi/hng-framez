import {
  StyleSheet,
  Pressable,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import ThemedView from "../../components/ThemeView";
import ThemedTitle from "../../components/ThemedTitle";
import Spacer from "../../components/Spacer";
import ThemedText from "../../components/ThemedText";
import { Link, useRouter } from "expo-router";

import { colors } from "../../constants/Colors";
import ThemedButton from "../../components/ThemedButton";
import ThemedTextInput from "../../components/ThemedTextInput";
import { useState } from "react";
import { useUser } from "../../hooks/useUser";

export default function signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const [error, setError] = useState(null);

  const { user, signup } = useUser();

  const router = useRouter();

  async function handleSubmit() {
    // console.log("Hello signup");
    // console.log("current user", user);
    setError(null);
    try {
      await signup({ email, password, name });
      console.log("current user is:", user);

      router.push("/login");
    } catch (error: any) {
      // console.log(error.message);
      setError(error.message);
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ThemedView styles={styles.container}>
        <ThemedTitle styles={styles.title}>Create your Account</ThemedTitle>

        <Spacer />

        <ThemedTextInput
          placeholder="Name"
          keyboardType="email-address"
          onChangeText={setName}
          value={name}
        />

        <Spacer height={10} />

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

        <Spacer height={10} />

        <ThemedTextInput
          placeholder="Confirm Password"
          onChangeText={setConfirmPass}
          value={confirmPass}
          secureTextEntry
        />

        <Spacer />

        {error && <Text style={styles.error}>{error}</Text>}

        <Spacer height={25} />

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
  error: {
    color: colors.light.status.error,

    borderColor: colors.light.status.error,
    borderWidth: 1,
    borderRadius: 6,
    padding: 4,
  },
});

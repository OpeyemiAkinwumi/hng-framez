import { Image, StyleSheet, Text, useColorScheme, View } from "react-native";

import ButtonLink from "./ButtonLink";
import Spacer from "./Spacer";
import { colors } from "../constants/Colors";
import { Link } from "expo-router";
import ThemedView from "./ThemeView";
import ThemedText from "./ThemedText";
import ThemedTitle from "./ThemedTitle";

export default function HomeScreen() {
  return (
    <ThemedView styles={styles.container}>
      <Image style={styles.image} source={require("../assets/girl.png")} />

      <ThemedTitle styles={styles.title}>Welcome to Framez</ThemedTitle>

      <ThemedText styles={styles.text}>
        By tapping Accept, you agree to{" "}
        <Link style={styles.link} href="#">
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link style={styles.link} href="#">
          Privacy Policy
        </Link>
      </ThemedText>

      <Spacer />

      <ButtonLink
        bg="#DCED05"
        title="Create new account"
        href="/signup"
        color="#1A1A1A"
      />

      <Spacer height={5} />
      <ButtonLink bg="#4B4B4B" title="Login" href="/login" color="#F5F7F4" />
      <ButtonLink bg="#4B4B4B" title="create" href="/create" color="#F5F7F4" />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: 70,
    // padding: 20,
    // fontFamily: "Montserrat"
  },
  image: {
    width: 350,
    height: 350,
    // marginBottom: 10%
    marginBottom: 60,
    opacity: 0.7,
  },
  title: {
    fontSize: 28,
    fontWeight: 900,
  },

  text: {
    fontSize: 14,
    marginTop: 5,
    textAlign: "center",
  },
  link: {
    // color: "#7045FF",
    fontWeight: 600,
  },
});

import { Image, StyleSheet, Text, useColorScheme, View } from "react-native";
import { colors } from "../constants/Colors";
import ThemedView from "./ThemeView";
import { useUser } from "../hooks/useUser";
import { useRouter } from "expo-router";
import { useEffect } from "react";

export default function SplashScreen() {
  const { user } = useUser();

  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      if (user) router.replace("/post");
    }, 4000);
  }, [user]);

  return (
    <ThemedView styles={[styles.container]}>
      <Image source={require("../assets/logo.png")} style={styles.image} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 125,
    height: 144.25,
    resizeMode: "cover",
  },
});

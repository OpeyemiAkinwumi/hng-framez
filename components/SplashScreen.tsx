import { Image, StyleSheet, Text, useColorScheme, View } from "react-native";
import { colors } from "../constants/Colors";
import ThemedView from "./ThemeView";

export default function SplashScreen() {
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

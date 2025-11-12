import { StyleSheet, useColorScheme, ActivityIndicator } from "react-native";
import { colors } from "../constants/Colors";
import ThemedView from "./ThemeView";

export default function ThemedLoader() {
  const colorScheme = useColorScheme();

  const theme = colors[colorScheme ?? "light"];

  return (
    <ThemedView
      styles={{
        flex: 1,
        justifyContent: "center",
        alignContent: "center",
      }}
    >
      <ActivityIndicator size="large" color={theme.text.primary} />
    </ThemedView>
  );
}

import { StyleSheet, Text, View } from "react-native";
import ThemedView from "../../components/ThemeView";
import ThemedTitle from "../../components/ThemedTitle";
import Spacer from "../../components/Spacer";

export default function create() {
  return (
    <ThemedView safe={true} styles={style.container}>
      <Spacer height={50} />
      <ThemedTitle styles={style.title}>Create Post</ThemedTitle>
    </ThemedView>
  );
}

const style = StyleSheet.create({
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
});

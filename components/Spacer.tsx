import { StyleSheet, Text, View } from "react-native";

export default function Spacer({
  height = 20,
}: // width = "100%",
{
  height?: number;
  width?: string | number;
}) {
  return <View style={[{ height }, { width: "100%" }]}></View>;
}

const styles = StyleSheet.create({});

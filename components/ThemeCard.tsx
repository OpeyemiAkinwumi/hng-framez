import {
  StyleProp,
  StyleSheet,
  TextStyle,
  useColorScheme,
  View,
} from "react-native";
import { colors } from "../constants/Colors";
import React from "react";

type ThemeProps = {
  styles?: StyleProp<TextStyle>;
  children: React.ReactNode;
};

export default function ThemedCard({ styles, children, ...props }: ThemeProps) {
  const colorScheme = useColorScheme();

  const theme = colors[colorScheme ?? "light"];

  return (
    <View
      style={[
        { backgroundColor: theme.background.surface },
        style.card,
        styles,
      ]}
      {...props}
    >
      {children}
    </View>
  );
}

const style = StyleSheet.create({
  card: {
    borderRadius: 5,
    padding: 20,
    width: "100%",
  },
});

import {
  StyleSheet,
  useColorScheme,
  StyleProp,
  Text,
  TextStyle,
} from "react-native";
import { colors } from "../constants/Colors";

type ThemeProps = {
  styles?: StyleProp<TextStyle>;
  children?: React.ReactNode;
};

export default function ThemedText({ styles, children, ...props }: ThemeProps) {
  const colorScheme = useColorScheme();

  const theme = colors[colorScheme ?? "light"];

  return (
    <Text
      {...props}
      style={[
        {
          color: theme.text.secondary,
        },
        styles,
      ]}
    >
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({});

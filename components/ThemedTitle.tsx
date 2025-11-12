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

export default function ThemedTitle({
  styles,
  children,
  ...props
}: ThemeProps) {
  const colorScheme = useColorScheme();

  const theme = colors[colorScheme ?? "light"];

  return (
    <Text
      {...props}
      style={[
        {
          color: theme.text.primary,
        },
        styles,
      ]}
    >
      {children}
    </Text>
  );
}

const style = StyleSheet.create({});

import {
  StyleSheet,
  useColorScheme,
  View,
  StyleProp,
  ViewStyle,
} from "react-native";
import { colors } from "../constants/Colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type ThemeViewProps = {
  styles: StyleProp<ViewStyle>;
  children?: React.ReactNode;
  safe?: boolean;
};

export default function ThemedView({
  styles,
  children,
  safe = false,
  ...props
}: ThemeViewProps) {
  const colorScheme = useColorScheme();

  const theme = colors[colorScheme ?? "light"];

  if (!safe)
    return (
      <View
        {...props}
        style={[
          {
            backgroundColor: theme.background.base,
          },
          {
            padding: 20,
          },
          styles,
        ]}
      >
        {children}
      </View>
    );

  const insets = useSafeAreaInsets();

  return (
    <View
      {...props}
      style={[
        {
          backgroundColor: theme.background.base,
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
        },
        {
          padding: 20,
        },
        styles,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({});

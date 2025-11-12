import {
  StyleSheet,
  useColorScheme,
  StyleProp,
  ViewStyle,
  Pressable,
} from "react-native";
import { colors } from "../constants/Colors";

type ThemeViewProps = {
  styles?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
  disabled?: boolean;
  onPress: () => void;
};

export default function ThemedButton({
  styles,
  children,
  onPress,
  disabled,
  ...props
}: ThemeViewProps) {
  const colorScheme = useColorScheme();

  const theme = colors[colorScheme ?? "light"];

  return (
    <Pressable
      onPress={onPress}
      {...props}
      style={({ pressed }) => [style.btn, pressed && style.pressed, styles]}
    >
      {children}
    </Pressable>
  );
}

const style = StyleSheet.create({
  btn: {
    backgroundColor: colors.light.primary.light,
    padding: 15,
    borderRadius: 5,
    width: "100%",
  },
  pressed: {
    opacity: 0.5,
  },
});

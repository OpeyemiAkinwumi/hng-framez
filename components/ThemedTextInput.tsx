import {
  useColorScheme,
  StyleProp,
  TextStyle,
  TextInput,
  KeyboardTypeOptions,
} from "react-native";
import { colors } from "../constants/Colors";

type ThemeProps = {
  styles?: StyleProp<TextStyle>;
  placeholder: string;
  keyboardType?: KeyboardTypeOptions;
  onChangeText?: (text: string) => void;
  value: string;
  secureTextEntry?: boolean;
  multiline?: boolean;
};

export default function ThemedTextInput({
  styles,
  placeholder,
  keyboardType,
  onChangeText,
  value,
  secureTextEntry,
  multiline,
  ...props
}: ThemeProps) {
  const colorScheme = useColorScheme();

  const theme = colors[colorScheme ?? "light"];

  return (
    <TextInput
      placeholder={placeholder}
      keyboardType={keyboardType}
      onChangeText={onChangeText}
      value={value}
      secureTextEntry
      multiline={multiline}
      {...props}
      placeholderTextColor={theme.text.secondary}
      style={[
        {
          color: theme.text.primary,
          padding: 20,
          backgroundColor: theme.background.surface,
          borderRadius: 6,
          width: "100%",
        },
        styles,
      ]}
    />
  );
}

import { Stack } from "expo-router";
import { StyleSheet } from "react-native";
import { UserProvider } from "../contexts/UserProvider";

export default function RootLayout() {
  return (
    <UserProvider>
      <Stack screenOptions={{ headerShown: false }}>
        {/* <Stack.Screen
        name="index"
        options={{ title: "Home", headerShown: false }}
      />
      <Stack.Screen
        name="signup"
        options={{ title: "Sign Up", headerShown: false }}
      />
      <Stack.Screen
        name="login"
        options={{ title: "Log in", headerShown: false }}
      /> */}
      </Stack>
    </UserProvider>
  );
}

const styles = StyleSheet.create({});

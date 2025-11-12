import { Stack } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import GuestOnly from "../../components/auth/GuestOnly";

export default function _layout() {
  return (
    <GuestOnly>
      <Stack screenOptions={{ headerShown: false }} />
    </GuestOnly>
  );
}

const styles = StyleSheet.create({});

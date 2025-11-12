import { StyleSheet, Text } from "react-native";
import ThemedView from "../../components/ThemeView";
import Spacer from "../../components/Spacer";
import ThemedTitle from "../../components/ThemedTitle";
import { useUser } from "../../hooks/useUser";
import ThemedButton from "../../components/ThemedButton";
import { colors } from "../../constants/Colors";
import { useState } from "react";
// import { useRouter } from "expo-router";
import ThemedText from "../../components/ThemedText";

export default function profile() {
  const [error, setError] = useState(null);

  const { userData, logout } = useUser();

  // const router = useRouter();

  console.log("Nah the user be dis", userData);

  async function handleLogout() {
    setError(null);
    try {
      await logout();
      // router.push("/");
    } catch (error: any) {
      // console.log(error.message);
      setError(error.message);
    }
  }

  return (
    <ThemedView safe={true} styles={style.container}>
      <Spacer height={50} />
      <ThemedTitle styles={style.title}>Profile</ThemedTitle>

      <Spacer />

      <ThemedText styles={style.heading}>Hello, {userData?.name}</ThemedText>

      {error && <Text style={style.error}>{error}</Text>}
      <Spacer height={10} />

      <ThemedButton styles={{ marginTop: "auto" }} onPress={handleLogout}>
        <Text
          style={{
            color: colors.light.text.primary,
            textAlign: "center",
            fontWeight: 700,
          }}
        >
          Logout
        </Text>
      </ThemedButton>
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
  heading: {
    fontSize: 18,
    fontWeight: 600,
  },
  error: {
    color: colors.light.status.error,

    borderColor: colors.light.status.error,
    borderWidth: 1,
    borderRadius: 6,
    padding: 4,
    marginTop: "auto",
  },
});

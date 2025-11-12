import React, { useEffect } from "react";
import { useUser } from "../../hooks/useUser";
import { useRouter } from "expo-router";
import { Text } from "react-native";
import ThemedLoader from "../ThemedLoader";

type ProtectedRoutesProp = {
  children: React.ReactNode;
};

export default function UserOnly({ children }: ProtectedRoutesProp) {
  const { user } = useUser();

  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.replace("/login");
    }
  }, [user]);

  //   if (!user)

  return user ? children : <ThemedLoader />;
}

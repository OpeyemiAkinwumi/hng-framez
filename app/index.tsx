import { useEffect, useState } from "react";
import { Image, StyleSheet } from "react-native";
import SplashScreen from "../components/SplashScreen";
import HomeScreen from "../components/HomeScreen";

// SplashScreen.preventAutoHideAsync();

export default function Home() {
  const [isShowSplash, setIsShowSplash] = useState(true);

  //   const [loaded, error] = useFonts({
  //     "Montserrat-black": require("../assets/fonts/Montserrat-Black.ttf"),
  //     "Montserrat-bold": require("../assets/fonts/Montserrat-Bold.ttf"),
  //     "Montserrat-regular": require("../assets/fonts/Montserrat-Regular.ttf"),
  //     "Montserrat-medium": require("../assets/fonts/Montserrat-Medium.ttf"),
  //     "Montserrat-light": require("../assets/fonts/Montserrat-Light.ttf"),
  //   });

  //   useEffect(() => {
  //     if (loaded || error) {
  //       //   SplashScreen.hideAsync();
  //     }
  //   }, [loaded, error]);

  //   if (!loaded && !error) {
  //     return null;
  //   }

  useEffect(() => {
    setTimeout(() => {
      setIsShowSplash(false);
    }, 5000);
  });

  return isShowSplash ? <SplashScreen /> : <HomeScreen />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontWeight: 900,
    fontSize: 18,
  },
});

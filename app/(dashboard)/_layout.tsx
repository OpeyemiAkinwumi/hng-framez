import { Tabs } from "expo-router";
import { useColorScheme } from "react-native";
import { colors } from "../../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import UserOnly from "../../components/auth/UserOnly";
import { PostProvider } from "../../contexts/PostProvider";

export default function DashboardLayout() {
  const colorScheme = useColorScheme();

  const theme = colors[colorScheme ?? "light"];

  return (
    <PostProvider>
      <UserOnly>
        {" "}
        <Tabs
          screenOptions={{
            headerShown: false,
            tabBarStyle: {
              backgroundColor: theme.background.surface,
              paddingTop: 5,
              height: 80,
            },
            tabBarActiveTintColor: theme.accent.purple,
            tabBarInactiveTintColor: theme.text.secondary,
            tabBarShowLabel: false,
          }}
        >
          <Tabs.Screen
            name="post"
            options={{
              title: "Posts",
              tabBarIcon: ({ focused }) => (
                <Ionicons
                  size={24}
                  name={focused ? "home" : "home-outline"}
                  color={focused ? theme.accent.purple : theme.text.secondary}
                />
              ),
            }}
          />
          <Tabs.Screen
            name="create"
            options={{
              title: "Create",
              tabBarIcon: ({ focused }) => (
                <Ionicons
                  size={24}
                  name={focused ? "create" : "create-outline"}
                  color={focused ? theme.accent.purple : theme.text.secondary}
                />
              ),
            }}
          />
          <Tabs.Screen
            name="profile"
            options={{
              title: "Profile",
              tabBarIcon: ({ focused }) => (
                <Ionicons
                  size={24}
                  name={focused ? "person" : "person-outline"}
                  color={focused ? theme.accent.purple : theme.text.secondary}
                />
              ),
            }}
          />
          <Tabs.Screen
            name="posts/[id]"
            options={{
              href: null, // does not display the icon on the tabs panel
            }}
          />
        </Tabs>
      </UserOnly>
    </PostProvider>
  );
}

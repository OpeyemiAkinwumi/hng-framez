import { StyleSheet, Text, View } from "react-native";
import { Link } from "expo-router";

type ButtonLinkProp = {
  title: string;
  href: string;
  bg: string;
  color: string;
};

export default function ButtonLink({ title, href, bg, color }: ButtonLinkProp) {
  //   const currentTheme = "dark";

  return (
    <Link
      href={href}
      style={[
        {
          color: color,
          backgroundColor: bg,
        },
        styles.btn,
      ]}
    >
      {title}
    </Link>
  );
}

const styles = StyleSheet.create({
  btn: {
    width: "100%",
    textAlign: "center",
    paddingVertical: 15,
    borderRadius: 20,
    fontWeight: 700,
    fontSize: 14,
    marginTop: 5,
  },
});

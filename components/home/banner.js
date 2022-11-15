import { View, Image, StyleSheet } from "react-native";
import { theme } from "../theme";

export default function Banner() {
  const styles = StyleSheet.create({
    adBanner: {
      backgroundColor: "#fff",
      justifyContent: "center",
      alignItems: "center",
      resizeMode: "contain",
    },
    adBannerImage: {
      width: theme.deviceWidth,
      height: 80,
    },
  });

  return (
    <View style={styles.adBanner}>
      <Image style={styles.adBannerImage} source={theme.homebanerImage} />
    </View>
  );
}

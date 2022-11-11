import { View, Image, StyleSheet } from "react-native";
import { theme } from "../theme";

export default function Banner() {
  const bannerImage = {
    uri: "https://static.spartacodingclub.kr/043a96e34c19/static/v5/images/navbar/mobile_navbar_banner.png?t=1634535923",
  };

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
      <Image style={styles.adBannerImage} source={bannerImage} />
    </View>
  );
}

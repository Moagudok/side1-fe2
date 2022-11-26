import { View, Image, Text, StyleSheet } from "react-native";
// import {
//   AdMobBanner,
//   AdMobInterstitial,
//   PublisherBanner,
//   AdMobRewarded,
//   setTestDeviceIDAsync,
//   TestIds,
// } from 'expo-ads-admob';
// import * as Device from 'expo-device';
import { theme } from "../theme";
// import { useEffect } from "react";
// import { useState } from "react";

const styles = StyleSheet.create({
  adBannerImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
});

export default function Banner() {

  return (
    <Image
      style={styles.adBannerImage}
      source={require("../../assets/banner.jpg")}
    />
  );
}



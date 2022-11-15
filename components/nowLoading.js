import { View, Text, StyleSheet, ActivityIndicator, Image } from "react-native";

const styles = StyleSheet.create({
  nowLoading: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
    backgroundColor: "rgba(255,255,255,0.5)",
  },
  loadingText: {
    fontSize: 20,
    color: "#000",
    marginTop: 10,
    fontWeight: "bold",
  },
  loadingImage: {
    width: 100,
    height: 100,
  },
});

export const NowLoading = () => {
  return (
    <View style={styles.nowLoading}>
      <ActivityIndicator size="large" />
    </View>
  );
};

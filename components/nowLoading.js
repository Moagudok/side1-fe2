import { View, Text, StyleSheet, ActivityIndicator } from "react-native";

const styles = StyleSheet.create({
  nowLoading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export const NowLoading = () => {
  return (
    <View style={styles.nowLoading}>
      <ActivityIndicator size="large" />
    </View>
  );
};

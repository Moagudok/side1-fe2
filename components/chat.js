import { View, Text, StyleSheet } from "react-native";

export default function Search({ navigation }) {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      justifyContent: "center",
      alignItems: "center",
    },
  });

  return (
    <View style={styles.container}>
      <Text style={{fontSize: 32, fontWeight: "bold"}}>Chat</Text>
    </View>
  );
}

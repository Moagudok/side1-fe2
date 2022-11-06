import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { bottomMenuList } from "../../database/item";

export default function HomeBottom( { navigation } ) {
  const styles = StyleSheet.create({
    bottomMenu: {
      position: "absolute",
      bottom: 0,
      left: 0,
      backgroundColor: "#fff",
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "center",
      borderTopWidth: 1,
      borderTopColor: "#eee",
      paddingVertical: 10,
    },
    bottomMenuItem: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    bottomMenuText: {
      fontSize: 10,
      marginTop: 5,
    },
  });

  return (
    <View style={{marginTop : 80 }}>
    <View style={styles.bottomMenu}>
      {Object.keys(bottomMenuList).map((key) => {
        return (
          <TouchableOpacity
            onPress={() => navigation.navigate(bottomMenuList[key].menu)}
            key={key}
            style={styles.bottomMenuItem}
          >
            <FontAwesome5
              name={bottomMenuList[key].icon}
              size={24}
              color="black"
            />
            <Text style={styles.bottomMenuText}>
              {bottomMenuList[key].name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
    </View>
  );
}

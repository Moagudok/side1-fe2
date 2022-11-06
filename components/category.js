import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { categoryList } from "../database/item";
import { theme } from "./theme";

export default function Category({ navigation }) {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
    },
    categoryList: {
      flex: 1,
      backgroundColor: "#fff",
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
      paddingVertical: 10,
    },
    categoryItem: {
      paddingHorizontal: 10,
      paddingVertical: 10,
      justifyContent: "center",
      alignItems: "center",
    },
    categoryImage: {
      width: theme.deviceWidth / 4,
      height: theme.deviceWidth / 4,
      borderRadius: theme.deviceWidth / 8,
      borderColor: "#fff",
      borderWidth: 3,
    },
    categoryText: {
      fontSize: 12,
      marginTop: 10,
    },
  });

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.categoryList}>
          {Object.keys(categoryList).map((key) => {
            return (
              <TouchableOpacity
                onPress={() => navigation.navigate("ProductList")}
                key={key}
                style={styles.categoryItem}
              >
                <Image
                  source={{ uri: categoryList[key].image }}
                  style={styles.categoryImage}
                />
                <Text style={styles.categoryText}>
                  {categoryList[key].name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}

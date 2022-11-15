import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { theme } from "./theme";
import { useSelector } from "react-redux";

export default function Category({ navigation }) {
  const categoryList = useSelector((state) => state.categoryList);

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
      width: theme.deviceWidth / 3 - 20,
      height: theme.deviceWidth / 3 - 20,
      borderRadius: theme.deviceWidth / 6 - 10,
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
          {categoryList.map((item, index) => {
            return (
              <TouchableOpacity
                key={index}
                style={styles.categoryItem}
                onPress={() => {
                  navigation.navigate("ProductList", {
                    categoryId: item.id,
                    categoryName: item.name,
                    url: `list?category=${item.id}&search&page=`,
                  });
                }}
              >
                <Image
                  style={styles.categoryImage}
                  source={{ uri: item.image }}
                />
                <Text style={styles.categoryText}>{item.name}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}

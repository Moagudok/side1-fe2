import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { theme } from "../theme";
import { useSelector } from "react-redux";

export default function Category({ navigation }) {
  const categoryList = useSelector((state) => state.categoryList);

  const styles = StyleSheet.create({
    categoryList: {
      paddingHorizontal: 20,
      marginBottom: 10,
      marginTop: 20,
    },
    categoryTitle: {
      fontSize: 15,
      fontWeight: "bold",
      marginBottom: 10,
    },
    categoryItem: {
      marginRight: 20,
    },
    categoryImage: {
      width: theme.deviceWidth / 6,
      height: theme.deviceWidth / 6,
      borderRadius: theme.deviceWidth / 12,
      borderColor: "#fff",
      borderWidth: 3,
    },
    categoryText: {
      fontSize: 12,
      marginTop: 5,
      fontWeight: "400",
      textAlign: "center",
    },
  });

  return (
    <View style={styles.categoryList}>
      <Text style={styles.categoryTitle}>카테고리</Text>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
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
                source={{ uri: item.image }}
                style={styles.categoryImage}
              />
              <Text style={styles.categoryText}>{item.name}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

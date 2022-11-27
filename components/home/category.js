import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import { styles } from "./categroryStyle";

export default function Category({ navigation }) {
  const categoryList = useSelector((state) => state.categoryList);

  const category =
    categoryList.map((item, index) => {
      return (
        <TouchableOpacity
          key={index}
          style={styles.categoryItem}
          onPress={() => {
            navigation.navigate("ProductList", {
              categoryId: item.id,
              categoryName: item.name,
              url: `category=${item.id}&search&cursor`,
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
    })

  return (
    <View style={styles.categoryList}>
      <Text style={styles.categoryTitle}>카테고리</Text>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {category}
      </ScrollView>
    </View>
  );
}
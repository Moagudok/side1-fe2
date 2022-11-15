import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { theme } from "../theme";
import { useSelector } from "react-redux";

export default function NewItem({ navigation }) {
  const newItemList = useSelector((state) => state.newItemList);

  const styles = StyleSheet.create({
    newItem: {
      paddingHorizontal: 20,
      marginTop: 20,
    },
    newItemTitle: {
      fontSize: 16,
      marginBottom: 10,
    },
    itemName: {
      marginVertical: 5,
      fontSize: 15,
      fontWeight: "bold",
      marginBottom: 5,
      marginTop: 10,
    },
    itemPrice: {
      fontSize: 12,
      color: "#999",
    },
    itemTitle: {
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 10,
    },
    itemImage: {
      width: theme.deviceWidth * 0.4,
      height: theme.deviceWidth * 0.4,
      borderRadius: 10,
      marginRight: 10,
    },
  });

  return (
    <View style={styles.newItem}>
      <Text style={styles.newItemTitle}>신규 상품</Text>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {newItemList.map((item) => (
          <TouchableOpacity
            key={item.id}
            onPress={() => navigation.navigate("ItemDetail", { id: item.id })}
          >
            <View>
              <Image source={{ uri: item.image }} style={styles.itemImage} />
              <Text style={styles.itemName}>{item.product_group_name}</Text>
              <Text style={styles.itemPrice}>{item.price}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

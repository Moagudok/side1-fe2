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

export default function BestItem({ navigation }) {
  const bestItemList = useSelector((state) => state.bestItemList);
  const styles = StyleSheet.create({
    itemBox: {
      paddingHorizontal: 20,
      marginTop: 20,
    },
    itemImage: {
      width: theme.deviceWidth * 0.4,
      height: theme.deviceWidth * 0.4,
      borderRadius: 10,
      marginRight: 10,
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
      fontSize: 16,
      marginBottom: 10,
    },
  });

  return (
    <View style={styles.itemBox}>
      <Text style={styles.itemTitle}>인기 상품</Text>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {bestItemList.map((item) => (
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

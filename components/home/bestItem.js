import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { itemList } from "../../database/item";
import { theme } from "../theme";

export default function BestItem({ navigation }) {
  const styles = StyleSheet.create({
    itemBox: {
      paddingHorizontal: 20,
      marginTop: 20,
    },
    itemImage: {
      width: theme.deviceWidth / 2,
      height: theme.deviceWidth / 2,
      borderRadius: 10,
      marginRight: 10,
    },
    itemName: {
      marginVertical: 5,
      fontSize: 15,
      fontWeight: "bold",
      marginBottom: 5,
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
  });

  return (
    <View style={styles.itemBox}>
      <Text style={styles.itemTitle}>인기 상품</Text>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {Object.keys(itemList).map((key) => {
          return (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("ItemDetail", { item: itemList[key] })
              }
              key={key}
              style={styles.item}
            >
              <Image
                source={{ uri: itemList[key].image }}
                style={styles.itemImage}
              />
              <Text style={styles.itemName}>{itemList[key].name}</Text>
              <Text style={styles.itemPrice}>{itemList[key].price}원</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

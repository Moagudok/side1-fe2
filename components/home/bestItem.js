import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useSelector } from "react-redux";
import { styles } from "./homeScrollitemStyle";

export default function BestItem({ navigation }) {
  const bestItemList = useSelector((state) => state.bestItemList);

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
              <View style={styles.itemImageBox}>
                <Image source={{ uri: item.image }} style={styles.itemImage} />
              </View>
              <Text style={styles.paymentTermText}>{item.payment_term} 1회</Text>
              <Text style={styles.itemGroupName}>
                {item.product_group_name}
              </Text>
              <Text style={styles.itemName}>{item.product_name}</Text>
              <Text style={styles.itemPrice}>
                {item.price.toLocaleString()}원
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

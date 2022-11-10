import {View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Dimensions} from "react-native";
import {newItemList} from "../../database/item";
import {theme} from "../theme";

export default function NewItem({ navigation }) {
    
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
          {Object.keys(newItemList).map((key) => {
            return (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("ItemDetail", { item: newItemList[key] })
                }
                key={key}
                style={styles.item}
              >
                <Image
                  source={{ uri: newItemList[key].image }}
                  style={styles.itemImage}
                />
                <Text
                  numberOfLines={1}
                  ellipsizeMode={"tail"}
                  style={styles.itemName}
                >
                  {newItemList[key].name}
                </Text>
                <Text style={styles.itemPrice}>{newItemList[key].price}원</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    );
}
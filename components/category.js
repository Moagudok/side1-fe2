import { useEffect } from "react";
import axios from "axios";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { theme } from "./theme";
import { useSelector, useDispatch } from "react-redux";

export default function Category({ navigation }) {
  const categoryList = useSelector((state) => state.categoryList);
  const dispatch = useDispatch();

  const categorySet = () => {
    return axios.get("http://13.124.175.83:8001/consumer/product/category/");
  };

  useEffect(() => {
    categorySet().then((res) => {
      dispatch({
        type: "SET_CATEGORY_LIST",
        list: res.data,
      });
    });
  }, []);

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
      width: theme.deviceWidth / 6,
      height: theme.deviceWidth / 6,
      borderRadius: theme.deviceWidth / 12,
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

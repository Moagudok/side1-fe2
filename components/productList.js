import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useEffect, useState, useRef } from "react";
import { theme, backendServer } from "./theme";
import { NowLoading } from "./nowLoading";
import axios from "axios";

export default function ProductList({ route, navigation }) {
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [productLists, setProductLists] = useState([]);
  const url = backendServer.productList + route.params.url + page;
  const totalPage = useRef(0);
  const limit = 10;

  const getDATA = async () => {
    setIsLoading(true);
    const res = await axios.get(url);
    const data = res.data;
    totalPage.current = Math.ceil(data.count / limit);
    setProductLists([...productLists, ...data.results]);
    setIsLoading(false);
  };

  useEffect(() => {
    getDATA();
  }, []);

  const addData = () => {
    if (!isLoading && page <= totalPage.current) {
      setPage(page + 1);
      getDATA();
    }
    return null;
  };

  const ProductRenderItem = ({ item, navigation }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("ItemDetail", { id: item.id });
        }}
      >
        <View style={styles.productImageBox}>
          <View style={styles.productTerm}>
            <Text style={styles.productTermText}>{item.payment_term} 1회</Text>
          </View>
          <Image style={styles.productImage} source={{ uri: item.image }} />
        </View>
        <Text style={styles.productGroupName}>{item.product_group_name}</Text>
        <Text style={styles.productName}>{item.product_name}</Text>
        <Text style={styles.productPrice}>{item.price.toLocaleString()}원</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={productLists}
        renderItem={({ item, index }) => (
          <ProductRenderItem
            item={item}
            index={index}
            navigation={navigation}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
        onEndReached={addData}
        numColumns={2}
        onEndReachedThreshold={0.5}
        ListFooterComponent={() => {
          return isLoading ? <NowLoading /> : null;
        }}
      />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.bgColor,
    flex: 1,
  },
  productImageBox: {
    marginTop: 10,
  },
  productTerm: {
    position: "absolute",
    top: -3,
    right: 5,
    backgroundColor: theme.mainColor,
    borderRadius: 5,
    padding: 5,
    zIndex: 1,
  },
  productTermText: {
    color: "white",
    fontSize: 12,
  },
  productImage: {
    width: theme.deviceWidth / 2 - 20,
    height: theme.deviceWidth / 2 - 20,
    marginHorizontal: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  productName: {
    fontSize: 12,
    fontWeight: "500",
    color: "#333",
    textAlign: "center",
    marginBottom: 5,
  },
  productGroupName: {
    fontSize: 10,
    color: "#999",
    textAlign: "center",
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 12,
    fontWeight: "500",
    color: "#333",
    marginTop: 5,
    marginBottom: 20,
    textAlign: "center",
    color: theme.primaryColor,
    letterSpacing: 2,
  },
});

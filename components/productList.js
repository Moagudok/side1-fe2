import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useEffect, useState, useRef, memo } from "react";
import { theme, backendServer } from "./theme";
import { NowLoading } from "./nowLoading";
import axios from "axios";

//memo
export default memo(function ProductList({ navigation, route }) {
  const urlparams = route.params.url;
  const [isLoading, setIsLoading] = useState(true);
  const [productLists, setProductLists] = useState([]);
  const [url, setUrl] = useState(backendServer.productList + urlparams);

  const paymentTermColor = {
    일: "#FFB72B",
    주: "#FE83C6",
    월: "#DA1212",
  };

  const getDATA = async () => {
    setIsLoading(true);
    if(url === null) {
      setIsLoading(false);
      return;
    }
    const res = await axios.get(url);
    const data = res.data;
    setProductLists([...productLists, ...data.results]);
    setUrl(data.next);
    setIsLoading(false);
  };

  useEffect(() => {
    getDATA();
  }, []);

  const ProductRenderItem = ({ item, navigation }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("ItemDetail", { id: item.id });
        }}
      >
        <View style={styles.productImageBox}>
          <Image style={styles.productImage} source={{ uri: item.image }} />
        </View>
        <View
            style={{
              ...styles.productTerm,
              backgroundColor: paymentTermColor[item.payment_term],
            }}
          >
            <Text style={styles.productTermText}>{item.payment_term} 1회</Text>
          </View>
        <Text style={styles.productGroupName}>{item.subtitle}</Text>
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
        onEndReached={getDATA}
        numColumns={2}
        onEndReachedThreshold={0.5}
        ListFooterComponent={() => {
          return isLoading ? <NowLoading /> : null;
        }}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.bgColor,
    flex: 1,
  },
  productImageBox: {
    marginTop: 10,
  },
  productTerm: {
    // position: "absolute",
    marginBottom: 10,
    marginHorizontal: 10,
    backgroundColor: theme.mainColor,
    borderRadius: 5,
    padding: 5,
  },
  productTermText: {
    textAlign: "center",
    color: "#F7F7F7",
    fontSize: 14,
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
    marginBottom: 20,
    textAlign: "center",
    color: theme.primaryColor,
    letterSpacing: 2,
  },
});

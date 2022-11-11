import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  FlatList,
} from "react-native";
import axios from "axios";
import { theme, backendServer } from "./theme";
import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NowLoading } from "./nowLoading";

export default function ProductList({ route, navigation }) {
  const isLoading = useSelector((state) => state.isLoading);
  const [totalPage, setTotalPage] = useState(0);
  const [page, setPage] = useState(1);
  const url = backendServer.productList + route.params.url + page;
  const productLists = useSelector((state) => state.productLists);
  const flatRef = useRef();
  const dispatch = useDispatch();

  const getDATA = async () => {
    dispatch({ type: "SET_IS_LOADING", isLoading: true });
    axios.get(url).then((res) => {
    setTotalPage(Math.ceil(res.data.count/ 10));
      dispatch({
        type: "SET_PRODUCT_LIST",
        list: [...res.data.results],
      });
    dispatch({ type: "SET_IS_LOADING", isLoading: false });
    });
  };

  useEffect(() => {
      getDATA();
  }, []);

  const addData = () => {
    if (!isLoading && page <= totalPage) {
      setPage(page + 1);
      getDATA();
      console.log(page +"/"+ totalPage);
    }
  };

  const ProductRenderItem = ({ item, navigation }) => {
    return (
      <TouchableOpacity style={styles.productItem} onPress={() => {
        navigation.navigate("ItemDetail", {
          id: item.id,
          name: item.product_name,
          group_name: item.product_group_name,
          description: item.description,
          image: item.image,
          views: item.views,
          price: item.price,
        });
      }}>
        <Image style={styles.productImage} source={{ uri: item.image }} />
        <Text style={styles.productName}>{item.product_name}</Text>
        <Text style={styles.productPrice}>{item.price}</Text>
      </TouchableOpacity>
    );
  };

        

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatRef}
        data={productLists}
        renderItem={({ item }) => (
          <ProductRenderItem item={item} navigation={navigation} />
        )}
        keyExtractor={(item,index) => index.toString()}
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
  productBoxList: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
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

import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { theme, themeIcon, backendServer } from "./theme";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { NowLoading } from "./nowLoading";
import axios from "axios";
import Cookies from 'universal-cookie';

export default function ItemDetail({ route, navigation }) {
  const id = route.params.id;
  const login = useSelector((state) => state.login);
  const [data, setData] = useState({});
  const [IsLoading, setIsLoading] = useState(true);
  const [cookies, setCookies] = useState(null);
  const dispatch = useDispatch();

  const getData = async () => {
    const res = await axios.get(`${backendServer.productDetail}${id}`, {
      headers: {
        Cookies: cookies,
      },
    });
    const resData = res.data.detail_product_data
    setCookies(new Cookies(res.headers["set-cookie"]));
    setData(resData);
    setIsLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if(!data || !data.id) return;
      navigation.setOptions({
        title: `[${data.product_group_name}] ${data.product_name}`,
        headerTitleAlign: "center",
        headerTitleStyle: { fontSize: 16, fontWeight: "300" },
      });  
  }, [data]);    

  useEffect(() => {
    dispatch({
      type: "PAYMENT_DATA",
      paymentData: {
        id: data.id,
        group_name: data.product_group_name,
        name: data.product_name,
        seller: data.seller,
        price: data.price,
        image: data.image,
        paymentTerm: data.payment_term,
      },
    });
  }, [data]);
  
  return IsLoading ? (
    <NowLoading />
  ) : (
    <View>
      <ScrollView style={styles.container}>
        <View style={styles.backButton}>
          <TouchableOpacity style={{width: 50, height: 50,}}onPress={() => navigation.goBack()}>
            {themeIcon.backButton}
          </TouchableOpacity>
          <View style={styles.viewsBox}>
            <Text style={styles.views}>조회수 {data.views}</Text>
          </View>
        </View>
        <View>
          <Image source={{ uri: data.image }} style={styles.image} />
        </View>
        <View style={styles.productInfo}>
          <View style={styles.subNumBox}>
            <Text style={styles.subNumText}>
              구독자수 {data.num_of_subscribers}
            </Text>
          </View>
          <Text style={styles.sellerName}>{data.seller}</Text>
          <Text style={styles.productGroupName}>{data.product_group_name}</Text>
          <Text style={styles.productName}>{data.product_name}</Text>
          <Text style={styles.productTerm}>{data.payment_term} 1회 배송</Text>
          <Text style={styles.productPrice}>
            {data.price.toLocaleString()}원
          </Text>
          <View style={styles.line} />
          <Text style={styles.productDescription}>{data.description}</Text>
        </View>
        <View style={styles.detailInfo}>
          {!data.productimages
            ? null
            : data.productimages.map((item) => {
                return (
                  <Image
                    source={{ uri: item.image }}
                    style={styles.detailImage}
                    key={item.id}
                  />
                );
              })}
        </View>
        <View style={styles.line} />
        <View style={styles.precautions}>
          <Text style={styles.precautionsTitle}>주의사항</Text>
          <Text style={styles.precautionsText}>
            등록된 판매 상품과 상품의 내용, 거래 정보 및 가격은 판매자가 등록한
            것으로 모아구독은 해당 내용에 대하여 일체의 책임을 지지 않습니다.
          </Text>
        </View>
      </ScrollView>
      <TouchableOpacity
        style={styles.buyButton}
        onPress={() => {
          login
            ?
            navigation.navigate("Payments")
            : navigation.navigate("LoginPage");
        }}
      >
        <Text style={styles.buyButtonText}>구독하기</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    marginBottom: 50,
  },
  viewsBox: {
    backgroundColor: "white",
    padding: 3,
    borderRadius: 5,
    fontWeight: "bold",
  },
  views: {
    color: "gray",
    fontSize: 12,
  },
  image: {
    width: theme.deviceWidth,
    height: theme.deviceWidth,
    resizeMode: "cover",
  },
  productInfo: {
    padding: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    top: -20,
    zIndex: 1,
    backgroundColor: "white",
  },
  subNumBox: {
    borderRadius: 5,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subNumText: {
    color: "gray",
    fontSize: 12,
  },
  sellerName: {
    fontSize: 14,
    fontWeight: "300",
    marginBottom: 5,
    color: "#B2B2B2",
  },
  productGroupName: {
    fontSize: 14,
    fontWeight: "200",
    marginBottom: 5,
  },
  productName: {
    fontSize: 25,
    fontWeight: "300",
    color: theme.fontColor,
    marginBottom: 10,
  },
  productTerm: {
    fontSize: 14,
    fontWeight: "300",
    color: "#000000",
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: "400",
    color: "#ff0000",
  },
  line: {
    marginHorizontal: -20,
    height: 1,
    backgroundColor: "#F9F2ED",
    marginVertical: 10,
    marginVertical: 20,
  },
  productDescription: {
    fontSize: 16,
    color: theme.fontColor,
  },
  detailImage: {
    width: theme.deviceWidth,
    height: theme.deviceWidth,
    resizeMode: "cover",
    marginBottom: 1,
  },
  buyButton: {
    position: "absolute",
    padding: 20,
    width: theme.deviceWidth,
    backgroundColor: "#ff0000",
    justifyContent: "center",
    alignItems: "center",
    bottom: 0,
  },
  buyButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "300",
    letterSpacing: 2,
    fontWeight: "300",
  },
  precautions: {
    padding: 20,
  },
  precautionsTitle: {
    fontSize: 16,
    fontWeight: "300",
    color: theme.fontColor,
    marginBottom: 10,
  },
  precautionsText: {
    fontSize: 14,
    fontWeight: "300",
    color: theme.fontColor,
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
    zIndex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: theme.deviceWidth - 40,
    zIndex: 1,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: "300",
    color: theme.fontColor,
  },
});

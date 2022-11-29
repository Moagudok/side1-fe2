import { View, Text, Image, StyleSheet, TextInput, ScrollView, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import { theme, themeIcon, backendServer } from "./theme";
import { useSelector } from "react-redux";
import { refresh } from "./refresh";
import { NowLoading } from "./nowLoading";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Mypage({ navigation }) {
  const login = useSelector((state) => state.login);
  const userInfo = useSelector((state) => state.userInfo);
  const [PaymentData, setPaymentData] = useState([]);
  const [subUrl, setSubUrl] = useState("sub");
  const [loading, setLoading] = useState(false);

  const GetPaymentData = async () => {
    setLoading(true);
    const refreshToken = await AsyncStorage.getItem("refresh");
    const accessToken = await refresh(refreshToken);
    const auth = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    if (accessToken) {
      try {
        const res = await axios.get(`${backendServer.paymentData}${subUrl}`, auth);
        setPaymentData(res.data)
        setLoading(false);
      } catch (e) {
        console.log(e);
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    !login ? navigation.navigate("Home") : null;
  }, [login]);

  useEffect(() => {
    GetPaymentData();
  }, [subUrl]);

  const NotProduct = () => {
    return (
      <View style={styles.notProduct}>
        <Text style={styles.notProductText}>구독중인 상품이 없습니다.</Text>
        <Text style={styles.notProductText}>상품을 구독해보세요!</Text>
      </View>
    );
  };



  return (
    loading ? <NowLoading /> : 
    PaymentData.length === 0 ? <NotProduct /> :
      <View style={styles.container}>
        <View style={styles.fillterButton}>
          <TouchableOpacity onPress={() => { setSubUrl("sub") }} style={{ ...styles.fillterButtonBox, backgroundColor: "#00BFA6" }}><Text style={{ ...styles.fillterButtonText, color: "#fff" }}>#구독중</Text></TouchableOpacity>
          <TouchableOpacity onPress={() => { setSubUrl("7ago") }} style={{ ...styles.fillterButtonBox, backgroundColor: "#FFC107" }}><Text style={styles.fillterButtonText}>#7일전</Text></TouchableOpacity>
          <TouchableOpacity onPress={() => { setSubUrl("now") }} style={{ ...styles.fillterButtonBox, backgroundColor: "#FF8DC7" }}><Text style={{ ...styles.fillterButtonText, color: "#fff" }}>#당일 만료</Text></TouchableOpacity>
          <TouchableOpacity onPress={() => { setSubUrl("exp") }} style={{ ...styles.fillterButtonBox, backgroundColor: "#DC3535" }}><Text style={{ ...styles.fillterButtonText, color: "#fff" }}>#구독 만료</Text></TouchableOpacity>
        </View>
        <ScrollView>
          {PaymentData.map((order, index) => (
            <TouchableOpacity key={index} style={styles.orderView}>
              <View style={styles.orderBox}>
                <Image source={{ uri: order.image }} style={styles.orderImage} />
                <View style={styles.orderInfo}>
                  <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={styles.orderTitle}
                  >
                    {order.product_group_name}
                  </Text>
                  <Text style={styles.orderDate}>{order.product_name}</Text>
                  <Text style={styles.orderPrice}>{order.price.toLocaleString()}원</Text>
                  <Text style={styles.orderperiod}>{order.period[0]} ~{order.period[1]}</Text>
                </View>
                <TouchableOpacity
                  onPress={() => navigation.navigate("Chat", { room: `room${order.id}`, name: order.product_name, image: order.image, user: userInfo.id, userName: userInfo.name, seller: order.seller })}
                  style={styles.chatButton}>
                  <Text style={styles.chatButtonText}>문의</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.bgColor,
    flex: 1,
    paddingVertical: 20,
  },
  searchBox: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginTop: 10,
  },
  search: {
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 30,
    paddingHorizontal: 20,
    fontSize: 12,
  },
  fillterButton: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    paddingHorizontal: 5,
    marginBottom: 10,
  },
  fillterButtonBox: {
    borderRadius: 20,
    paddingVertical: 10,
    marginHorizontal: 5,
  },
  fillterButtonText: {
    fontWeight: "600",
    paddingHorizontal: 10,
    fontSize: 10,
    color: "#333",
    letterSpacing: 2,
    textAlign: "center",
  },
  orderView: {
    // paddingHorizontal: 10,
  },
  orderBox: {
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
    flexDirection: "row",
    // alignItems: "center",
  },
  chatButton: {
    justifyContent: "center",
    backgroundColor: "yellow",
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  chatButtonText: {
    color: "#000",
    fontSize: 14,
    fontWeight: "600",
  },
  orderImage: {
    width: theme.deviceWidth * 0.2,
    height: theme.deviceWidth * 0.2,
    borderColor: "#eee",
    borderWidth: 1,
  },
  orderTitle: {
    fontSize: 19,
    fontWeight: "600",
    color: "#333",
  },
  orderDate: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginTop: 5,
  },
  orderPrice: {
    fontSize: 15,
    fontWeight: "600",
    color: "red",
    marginTop: 10,
  },
  orderStatus: {
    backgroundColor: "#00BFA6",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    marginTop: 15,
  },
  orderStatusText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#fff",
  },
  orderInfo: {
    flex: 1,
    alignItems: "flex-start",
    marginLeft: 20,
  },
  orderperiod: {
    fontSize: 12,
    color: "#cacaca",
    marginTop: 5,
  },
  notProduct: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  notProductText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
  },
});

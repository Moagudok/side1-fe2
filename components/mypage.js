import { View, Text, Image, StyleSheet, TextInput, ScrollView, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import { theme } from "./theme";
import { useSelector } from "react-redux";

export default function Mypage({ navigation }) {
  const [searchText, setSearchText] = useState("");
  const login = useSelector((state) => state.login);

  useEffect(() => {
    !login ? navigation.navigate("Login") : null;
  }, [login]);

  const orderList = [
    {
        name: "프리미엄 오일 레몬 허브 100ml",
        date: "주1회 (토)",
        price: "구독료 1,000원",
        orderStatus: "구독중",
        image: {
            uri: "https://img-cf.kurly.com/cdn-cgi/image/width=400,format=auto/shop/data/goods/1466071146574l0.jpg",
        }
            
    },
    {
        name: "홍대 쭈꾸미 1kg",
        date: "주1회 (토)",
        price: "구독료 2,000원",
        orderStatus: "구독만료",
        image:
        {uri: "https://product-image.kurly.com/cdn-cgi/image/width=400,format=auto/product/image/e3d6f36e-f1e4-474c-bea8-38e1abb7113a.jpg",}
    },
    {
        name: "프리미엄 손질 생새우살 200g",
        date: "주1회 (월)",
        price: "구독료 3,000원",
        orderStatus: "구독취소중",
        image:
        {uri:"https://img-cf.kurly.com/cdn-cgi/image/width=400,format=auto/shop/data/goods/1653040890807l0.jpeg",}
    },
    {
        name: "한우 불고기 1kg",
        date: "주2회 (화,목)",
        price: "구독료 4,000원",
        orderStatus: "취소완료",
        image:
        {uri:"https://product-image.kurly.com/cdn-cgi/image/width=400,format=auto/product/image/2bac77f7-2ed8-4a60-b5ec-d1494f591ead.jpg",}
    },
    {
        name: "치즈롤 돈카츠 150g 2개",
        date: "주1회 (토)",
        price: "구독료 5,000원",
        orderStatus: "구독중",
        image:
        {uri:"https://img-cf.kurly.com/cdn-cgi/image/width=400,format=auto/shop/data/goods/165104939315l0.jpg",}
    },
    {
        name: "고추장 제육 돈 불고기 600g",
        date: "주1회 (토)",
        price: "구독료 6,000원",
        orderStatus: "구독중",
        image:
        {uri:"https://img-cf.kurly.com/cdn-cgi/image/width=400,format=auto/shop/data/goods/1653038532582l0.jpeg",}
    },
  ]
  return (
    <View style={styles.container}>
      <View style={styles.searchBox}>
        <TextInput
          value={searchText}
          onChangeText={(text) => setSearchText(text)}
          onSubmitEditing={(e) => recentlySearchAdd(e.nativeEvent.text)}
          placeholder="상품명을 입력해주세요"
          style={styles.search}
        />
      </View>
      <View style={styles.fillterButton}>
        <Text style={styles.fillterButtonText}>#구독중</Text>
        <Text style={styles.fillterButtonText}>#종료 7일전</Text>
        <Text style={styles.fillterButtonText}>#구독 만료</Text>
        <Text style={{...styles.fillterButtonText, backgroundColor: "red", color: "#fff"}}>#구독 취소</Text>
        <Text style={{...styles.fillterButtonText, backgroundColor: "red", color: "#fff"}}>#취소 진행중</Text>
      </View>
      <ScrollView>
        {orderList.map((order, index) => (
        <TouchableOpacity key={index} style={styles.orderView}>
            <View style={styles.orderBox}>
                <Image source={order.image} style={styles.orderImage} />
                <View style={styles.orderInfo}>
                    <Text 
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={styles.orderTitle}>
                        {order.name}
                    </Text>
                    <Text style={styles.orderDate}>
                       {order.date}
                    </Text>
                    <Text style={styles.orderPrice}>
                       {order.price}
                    </Text>
                    <View style={{...styles.orderStatus,
                        backgroundColor: order.orderStatus === "구독중" ? "#00BFA6" : order.orderStatus === "구독만료" ? "#FFC107" : "#FF5252"
                    }}>
    
                        <Text style={styles.orderStatusText}>
                            {order.orderStatus}
                        </Text>
                    </View>
                </View>
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
    marginBottom: 200,
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
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  fillterButtonText: {
    fontWeight: "600",
    backgroundColor: "yellow",
    paddingHorizontal: 10,
    paddingVertical: 7,
    fontSize: 12,
    color: "#333",
    marginRight: 10,
    marginBottom: 10,
    letterSpacing: 2,
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
    orderImage: {
        //box size width
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
        fontSize: 17,
        fontWeight: "600",
        color: "red",
        marginTop: 10,
    },
    orderStatus: {
        backgroundColor: "yellow",
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
});

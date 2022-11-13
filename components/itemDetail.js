import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TouchableHighlight,
} from "react-native";
import { theme,backendServer } from "./theme";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ItemDetail({ route, navigation }) {
  const login = useSelector((state) => state.login);
  const [item, setItem] = useState({});

  useEffect(() => {
    axios.get("http://13.124.175.83:8001/consumer/product/detail/1")
    .then((res) => {
      setItem(res.data)
    })
  }, []);


  return (
    <View style={styles.container}>
      <ScrollView
        style={{
          width: theme.deviceWidth,
        }}
      >
        <View style={styles.itemImageBox}>
          <View style={styles.detailImageBox}>
            <Image style={styles.detailImage} source={{ uri: item.image }} />
            <Text>{item.group_name}</Text>
            <Text style={styles.itemTitle}>{item.product_name}</Text>
            <Text style={styles.itemSubTitle}>월 구독료</Text>
            <Text style={styles.itemPrice}>{item.price}원</Text>
          </View>
          <View style={styles.seller}>
            <Text style={styles.sellerText}>{item.seller}</Text>
            <TouchableOpacity>
              <Text style={styles.sellerReviewPoint}>조회수 {item.views}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.line}></View>
          <Text style={styles.itemDescTitle}>상품설명</Text>

          <View style={styles.notedInfomation}>
            <Text style={styles.notedInfomationTitle}>{item.description}</Text>
          </View>

          <Image
            style={{
              ...styles.itemDescImgae,
              height: theme.deviceWidth,
            }}
            source={{ uri: item.image }}
          />
          <View style={styles.sellerInfo}>
            <Text style={styles.sellerInfoText}>
              등록된 판매 상품과 상품의 내용, 거래 정보 및 가격은 판매자가
              등록한 것으로 구독마켓은 해당 내용에 대하여 일체의 책임을 지지
              않습니다.
            </Text>
          </View>
        </View>
      </ScrollView>
      <TouchableHighlight
        underlayColor={"#000000"}
        style={styles.bottomMenu}
        onPress={() => {
          login
            ? navigation.navigate("Payments", { id: id, name: item.group_name, price: item.price, image: item.image })
            : navigation.navigate("LoginPage");
        }}
      >
        <View>
          <Text style={styles.bottomMenuText}>구독하기</Text>
        </View>
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  itemImageBox: {
    width: theme.deviceWidth,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  detailImageBox: {
    width: theme.deviceWidth,
    justifyContent: "center",
    alignItems: "center",
  },
  detailImage: {
    width: theme.deviceWidth,
    height: theme.deviceWidth,
    marginBottom: 20,
  },
  itemTitle: {
    fontSize: 40,
    fontWeight: "bold",
    marginTop: 10,
    letterSpacing: 2,
    color: "#000",
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
    letterSpacing: 2,
    color: "#f4511e",
  },
  itemSubTitle: {
    fontSize: 14,
    marginTop: 10,
    letterSpacing: 2,
    color: "#000",
  },
  itemDescTitle: {
    fontSize: 19,
    marginTop: 20,
    letterSpacing: 2,
    fontWeight: "500",
  },
  line: {
    width: theme.deviceWidth - 80,
    height: 1,
    backgroundColor: "#ededed",
    marginTop: 20,
  },
  bottomMenu: {
    width: "100%",
    height: 50,
    backgroundColor: "#f4511e",
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  bottomMenuText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    letterSpacing: 2,
  },
  itemDescImgae: {
    width: theme.deviceWidth,
    marginTop: 20,
    resizeMode: "contain",
  },
  sellerInfo: {
    width: "100%",
    height: 100,
    padding: 20,
    marginBottom: 40,
  },
  sellerInfoText: {
    fontSize: 12,
    letterSpacing: 2,
    color: "#E14D2A",
  },
  sellerInfoText: {
    fontSize: 12,
    letterSpacing: 2,
    color: "#E14D2A",
  },
  seller: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: "#ededed",
    marginTop: 20,
    borderRadius: 10,
  },
  sellerText: {
    fontSize: 14,
    letterSpacing: 2,
    color: "#000",
    fontWeight: "bold",
  },
  sellerReviewPoint: {
    fontSize: 14,
    letterSpacing: 2,
    color: "#E14D2A",
  },
  notedInfomation: {
    padding: 20,
  },
  notedInfoTextBox: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginBottom: 3,
  },
  notedInfoText: {
    fontSize: 12,
    letterSpacing: 2,
    color: "#000",
  },
});

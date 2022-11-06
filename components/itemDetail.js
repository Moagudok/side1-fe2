import { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TouchableHighlight,
} from "react-native";
import { theme } from "./theme";

export default function ItemDetail({ route, navigation }) {
  const { name, price, image } = route.params.item;
  const [aspectRatio, setAspectRatio] = useState(1);
  //임시 이미지
  const descImage =
    "https://thumbnail6.coupangcdn.com/thumbnails/remote/q89/image/retail/images/2020/12/07/18/6/94368389-0fa9-4d45-861f-56e2e032ff74.jpg";

  useEffect(() => {
    Image.getSize(descImage, (width, height) => {
      const Ratio = height / width;
      setAspectRatio(Ratio);
    });
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView
        style={{
          width: "100%",
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image style={styles.detailImage} source={{ uri: image }} />
          <Text style={styles.itemTitle}>{name}</Text>
          <Text style={styles.itemSubTitle}>월 구독료</Text>
          <Text style={styles.itemPrice}>{price}원</Text>
          <View style={styles.seller}>
            <Text style={styles.sellerText}>딸기농장</Text>
            <TouchableOpacity>
              <Text style={styles.sellerReviewPoint}>5.0 ★★★★★</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.line}></View>
          <Text style={styles.itemDescTitle}>상품설명</Text>

          <View style={styles.notedInfomation}>
            <View style={styles.notedInfoTextBox}>
              <Text style={styles.notedInfoText}>소비자 상담</Text>
              <Text style={styles.notedInfoText}>1600-1234</Text>
            </View>
            <View style={styles.notedInfoTextBox}>
              <Text style={styles.notedInfoText}>품명 및 모델명</Text>
              <Text style={styles.notedInfoText}>논산 딸기</Text>
            </View>
            <View style={styles.notedInfoTextBox}>
              <Text style={styles.notedInfoText}>제조사(수입사)</Text>
              <Text style={styles.notedInfoText}>논산 농장</Text>
            </View>
            <View style={styles.notedInfoTextBox}>
              <Text style={styles.notedInfoText}>제조사(원산지)</Text>
              <Text style={styles.notedInfoText}>국내산</Text>
            </View>
          </View>

          <Image
            style={{
              ...styles.itemDescImgae,
              height: theme.deviceWidth * aspectRatio,
            }}
            source={{ uri: descImage }}
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
        onPress={() => {navigation.navigate('Payments', {item: route.params.item})}}
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
  detailImage: {
    width: theme.deviceWidth,
    height: 300,
    borderBottomRightRadius: 50,
    borderBottomLeftRadius: 50,
  },
  itemTitle: {
    fontSize: 40,
    fontWeight: "bold",
    marginTop: 20,
    letterSpacing: 2,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
    // 자간
    letterSpacing: 2,
    color: "#f4511e",
  },
  itemDescTitle: {
    fontSize: 15,
    marginTop: 20,
    letterSpacing: 2,
  },
  line: {
    width: "70%",
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
  itemSubTitle: {
    fontSize: 14,
    marginTop: 10,
    letterSpacing: 2,
    color: "#000",
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
    width: "60%",
    height: 100,
    marginBottom: 10,
    marginTop: 20,
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

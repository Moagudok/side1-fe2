import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { theme } from "./theme";

const { width } = Dimensions.get("window");

export default function ProductList({ navigation }) {
  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.bgColor,
    },
    productBoxList: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginTop: 10,
      },
    productImage: {
      width: width / 2 - 20,
        height: width / 2 - 20,
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

  return (
    <ScrollView style={styles.container}>
      <View style={styles.productBoxList}>
        <TouchableOpacity>
          <Image
            source={{
              uri: "https://product-image.kurly.com/product/image/a495968f-355a-4a82-9bc7-27f596c0168d.jpg",
            }}
            style={styles.productImage}
          />
          <Text style={styles.productName}>삼진어묵 김치 우동 어묵 전골</Text>
          <Text style={styles.productPrice}>월구독 37,210원</Text>
          </TouchableOpacity>
            <TouchableOpacity>
          <Image
            source={{
              uri: "https://product-image.kurly.com/cdn-cgi/image/width=400,format=auto/product/image/f6216485-6fa1-4980-9b02-8e163c32eff9.jpg",
            }}
            style={styles.productImage}
          />
           <Text style={styles.productName}>쿨피스 프리미엄 복숭아맛</Text>
          <Text style={styles.productPrice}>월구독 51,650원</Text>
          </TouchableOpacity>
          <TouchableOpacity>
          <Image
            source={{
              uri: "https://img-cf.kurly.com/cdn-cgi/image/width=400,format=auto/shop/data/goods/1651025209366l0.jpg",
            }}
            style={styles.productImage}
          />
           <Text style={styles.productName}>유기농 꿀 고구마 3kg</Text>
          <Text style={styles.productPrice}>월구독 217,210원</Text>
          </TouchableOpacity>
          <TouchableOpacity>
          <Image
            source={{
              uri: "https://img-cf.kurly.com/cdn-cgi/image/width=400,format=auto/shop/data/goods/1603870263444l0.jpg",
            }}
            style={styles.productImage}
          />
           <Text style={styles.productName}>4인 가족 간편 김장 패키지</Text>
          <Text style={styles.productPrice}>월구독 134,110원</Text>
          </TouchableOpacity>
          <TouchableOpacity>
          <Image
            source={{
              uri: "https://img-cf.kurly.com/cdn-cgi/image/width=400,format=auto/shop/data/goods/1653037400439l0.jpeg",
            }}
            style={styles.productImage}
          />
           <Text style={styles.productName}>시그니처 베이글 11종(2개입)</Text>
          <Text style={styles.productPrice}>월구독 105,800원</Text>
          </TouchableOpacity>
          <TouchableOpacity>
          <Image
            source={{
              uri: "https://img-cf.kurly.com/cdn-cgi/image/width=400,format=auto/shop/data/goods/1653035852198l0.jpeg",
            }}
            style={styles.productImage}
          />
           <Text style={styles.productName}>[풀무원] 새콤달콤유부초밥</Text>
          <Text style={styles.productPrice}>월구독 135,800원</Text>
          </TouchableOpacity>
          <TouchableOpacity>
          <Image
            source={{
              uri: "https://img-cf.kurly.com/cdn-cgi/image/width=400,format=auto/shop/data/goods/1653035678890l0.jpeg",
            }}
            style={styles.productImage}
          />
           <Text style={styles.productName}>[고기반찬] 양념 LA 갈비 800g</Text>
          <Text style={styles.productPrice}>월구독 1,005,800원</Text>
          </TouchableOpacity>
             </View>

    </ScrollView>
  );
}
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { theme } from "./theme";
import { useState } from "react";
import {PaymentSelectModal} from "./paymentSelect";


export default function Payments({ navigation, route }) {
  const [subscriptionPeriod, setSubscriptionPeriod] = useState({
    start: new Date().toISOString().slice(0, 10),
    end: new Date(new Date().setMonth(new Date().getMonth() + 1))
      .toISOString()
      .slice(0, 10),
  });

  const { id, name, group_name, image, price, description, views } =
    route.params;

  const paySelect = {
    kakaopay: { name: "카카오페이", value: "kakaopay" },
    tosspay: { name: "토스페이", value: "tosspay" },
  };

  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.bgColor,
      paddingHorizontal: 20,
      marginBottom: 50,
    },
    paymentTitle: {
      fontSize: 20,
      fontWeight: "bold",
      textAlign: "center",
      marginTop: 20,
      marginBottom: 20,
    },
    itemImage: {
      width: theme.deviceWidth - 40,
      height: 200,
      resizeMode: "cover",
      borderRadius: 10,
    },
    itemTitle: {
      fontSize: 40,
      fontWeight: "bold",
      marginTop: 20,
    },
    itemPrice: {
      fontSize: 22,
      fontWeight: "bold",
      marginTop: 10,
      color: theme.primaryColor,
    },
    subDate: {
      fontSize: 18,
      marginTop: 10,
      color: theme.primaryColor,
    },
    inputBox: {
      padding: 15,
      fontSize: 15,
      backgroundColor: "#fff",
      marginTop: 5,
      borderRadius: 10,
      marginBottom: 5,
    },
    paymentChoiceTitle: {
      fontSize: 12,
      marginTop: 25,
      marginBottom: 10,
    },
    paymentChoiceBox: {
      borderRadius: 10,
      padding: 20,
      marginTop: 5,
      backgroundColor: "yellow",
    },
    paymentSelect: {
      textAlign: "center",
      fontSize: 16,
      fontWeight: "bold",
      color: "#000",
    },
    paymentComplete: {
      borderRadius: 10,
      marginTop: 10,
    },
  });

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.paymentTitle}>결제 정보 입력</Text>
      <Image style={styles.itemImage} source={{ uri: image }} />
      <Text style={styles.itemTitle}>{name}</Text>
      <Text style={styles.itemPrice}>월 구독료 {price}원</Text>
      <Text style={styles.subDate}>
        구독 기간 {subscriptionPeriod.start} ~ {subscriptionPeriod.end}
      </Text>
      <Text style={styles.paymentChoiceTitle}>결제 방법 선택</Text>
      <TouchableOpacity
        style={styles.paymentChoiceBox}
        onPress={() => navigation.navigate("PaymentSelect")}
      >
        <Text style={styles.paymentSelect}>카카오 페이 결제</Text>
      </TouchableOpacity>
      <Text style={styles.paymentChoiceTitle}>배송정보 입력</Text>
      <TextInput style={styles.inputBox} placeholder="성함" />
      <TextInput style={styles.inputBox} placeholder="주소를 입력해주세요." />
      <TextInput
        keyboardType="numeric"
        style={styles.inputBox}
        placeholder="휴대폰 번호를 입력해주세요."
      />
      <View style={styles.paymentComplete}>
        <TouchableOpacity
          style={{
            backgroundColor: theme.primaryColor,
            padding: 15,
            borderRadius: 10,
          }}
          onPress={() =>
            navigation.navigate("KaKaoPay", { paySelect: paySelect })
          }
        >
          <Text style={{ color: "#fff", textAlign: "center", fontSize: 15 }}>
            결제하기
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

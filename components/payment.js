import {
  View,
  Text,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { styles } from "./paymentStyle";
import { payselectList } from "./paymentSelectList";
import Postcode from '@actbase/react-daum-postcode';

export default function Payments({ navigation, route }) {
  const paymentSelectItem = useSelector((state) => state.paymentSelectItem);
  const paymentData = useSelector((state) => state.paymentData);
  const userInfo = useSelector((state) => state.userInfo);
  const [addressInput, setAddressInput] = useState(false);
  const [address, setAddress] = useState(userInfo.address);
  const dispatch = useDispatch();
  const [subscriptionPeriod, setSubscriptionPeriod] = useState({
    start: new Date().toISOString().slice(0, 10),
    end: new Date(new Date().setMonth(new Date().getMonth() + 1))
      .toISOString()
      .slice(0, 10),
  });

  const postInputBox = () => (
    <Postcode
      style={{ zIndex: 999, width: "100%", height: "100%" }}
      jsOptions={{ animation: true }}
      onSelected={(data) => {
        setAddress(data.address);
        setAddressInput(false);
      }}
    />
  );

  const PaymentMethodLists = () => {
    return payselectList.map((item) => (
      <TouchableOpacity
        key={item.id}
        style={styles.paymentMethodBox}
        onPress={() => {
          dispatch({
            type: "PAYMENT_SELECT",
            paymentSelectItem: item.id,
          });
        }}
      >
        <Text style={styles.paymentMethodText}>{item.name}</Text>
      </TouchableOpacity>
    ));
  };

  return (
    <View>
      {addressInput ? postInputBox() : null}
      <ScrollView

        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <View>
          <Text style={styles.paymentinfoTitle}>결제 상품 정보</Text>
        </View>
        <View style={styles.paymentItemInfoImage}>
          <Image source={{ uri: paymentData.image }} style={styles.paymentinfoImage} />
          <View style={styles.paymentItemInfoText}>
            <Text style={styles.paymentinfoSeller}>{paymentData.seller}</Text>
            <Text style={styles.paymentinfoGroupName}>{paymentData.group_name}</Text>
            <Text style={styles.paymentinfoName}>{paymentData.name}</Text>
            <Text style={styles.paymentinfoPrice}>
              {paymentData.price.toLocaleString()}원
            </Text>
            <Text style={styles.paymentTerm}>{paymentData.paymentTerm} 1회 배송</Text>
          </View>
        </View>
        <View style={styles.paymentMethod}>
          <Text style={styles.paymentinfoTitle}>결제 수단</Text>
          <TouchableOpacity
            style={{ ...styles.paymentMethodButton, backgroundColor: payselectList[paymentSelectItem - 1].bgcolor }}
            onPress={() => navigation.navigate("PaymentSelect")}
          >
            <Text style={{ ...styles.paymentMethodText, color: payselectList[paymentSelectItem - 1].color }}>{payselectList[paymentSelectItem - 1].name}</Text>
          </TouchableOpacity>
        </View>
        <View>
          <Text style={styles.paymentinfoTitle}>결제 정보 입력</Text>
        </View>
        <View style={styles.paymentInputBox}>
          <TextInput
            value={userInfo.name}
            style={styles.paymentinfoInput}
            placeholder="배송 받으실 분 이름을 입력해주세요."
          />
          <TextInput
            value={userInfo.email}
            keyboardType="email-address"
            style={styles.paymentinfoInput}
            placeholder="배송 받으실 분 이메일을 입력해주세요."
          />
          <TextInput
            onFocus={() => setAddressInput(true)}
            value={address}
            onChangeText={text => setAddress(text)}
            style={styles.paymentinfoInput}
            placeholder="배송 받으실 분 주소를 입력해주세요."
          />
          <TextInput style={styles.paymentinfoInput} placeholder="상세 주소" />
        </View>
        <Text style={styles.subscriptionPeriod}>
          구독기간 : {subscriptionPeriod.start} ~ {subscriptionPeriod.end}
        </Text>
        <Text style={styles.conditions}>
          위 주문 내용을 확인 하였으며, 구독에 동의합니다. 회원 본인은 개인정보
          이용 및 제공 및 결제에 동의 합니다.
        </Text>
        <View style={styles.paymentButtonBox}>
          <TouchableOpacity style={styles.paymentButton}
            onPress={() => navigation.navigate("KaKaoPay", {
              payValue: payselectList[paymentSelectItem - 1].value,
            })}
          >
            <Text style={styles.paymentButtonText}>결제하기</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  )
}
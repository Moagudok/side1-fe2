import { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { theme, backendServer } from './theme';
import { useSelector } from 'react-redux';
import { refresh } from './refresh';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const PaymentResult = ({ route, navigation }) => {
  const userInfo = useSelector((state) => state.userInfo);
  const paymentData = useSelector((state) => state.paymentData);
  const dateNow = useSelector((state) => state.dateNow);
  const dateNext = useSelector((state) => state.dateNext);
  const imp_success = route.params.imp_success;
  const error_msg = route.params.error_msg;

  const paymentSave = async () => {
    if (imp_success === "true") {
      // const refreshToken = await AsyncStorage.getItem("refresh");
      const refreshToken = await AsyncStorage.getItem("refresh");
      const accessToken = await refresh(refreshToken);
      const auth = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
      const body = {
        productId: paymentData.id,
        price: paymentData.price,
        subscriptionDate: dateNow,
        expirationDate: dateNext,
        paymentDueDate: dateNext,
        // consumerId: userInfo.id,
        sellerId: 1,
      };
      console.log(body)
      console.log(accessToken)
      try {
        const res = await axios.post(`${backendServer.payment}`, body, auth)
        // consoloe.log("res", res.data);
      } catch (e) {
        // console.log("error", e.response);
      }
    }
  };

  useEffect(() => {
    paymentSave();
  }, []);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.bgColor,
      paddingHorizontal: 20,
      paddingVertical: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
    paymentResultText: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    paymentResultButton: {
      backgroundColor: theme.primaryColor,
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 10,
    },
    paymentResultButtonText: {
      textAlign: 'center',
      color: '#fff',
      fontSize: 16,
    },
  });

  return (
    <View style={styles.container}>
      {imp_success === "true" ? (
        <View>
          <Text style={styles.paymentResultText}>
            결제가 완료 되셨습니다.
          </Text>
          <TouchableOpacity onPress={
            () => navigation.navigate('Home')
          }>
            <View style={styles.paymentResultButton}>
              <Text style={styles.paymentResultButtonText}>
                메인화면으로 이동하기
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      ) : (
        <View>
          <Text style={{ ...styles.paymentResultText, color: "red" }}>
            {error_msg}
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Payments", {
                id: 1,
                name: "테스트",
                group_name: "테스트",
                price: 1000,
                image: "https://picsum.photos/200",
                description: "테스트",
                views: 100,
              });
            }}
            style={styles.paymentResultButton}>
            <Text style={styles.paymentResultButtonText}>
              이전 화면으로 돌아가기
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
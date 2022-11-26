import { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { theme, backendServer } from './theme';
import { useSelector } from 'react-redux';
import axios from 'axios';

export const PaymentResult = ({ route, navigation }) => {
  const userInfo = useSelector((state) => state.userInfo);
  const paymentData = useSelector((state) => state.paymentData);
  const imp_success = route.params.imp_success;
  const error_msg = route.params.error_msg;

  const paymentSave = async () => {
    if(imp_success === "true") {
      const body = {
        productId: paymentData.id,
        price: paymentData.price,
        subscriptionDate: new Date().toISOString().slice(0, 10),
        expirationDate: new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString().slice(0, 10),
        paymentDueDate: new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString().slice(0, 10),
        consumerId: userInfo.id,
        sellerId: 1,
      };
      try{
      const res = await axios.post(`${backendServer.payment}`, body)
    } catch (e) {
      console.log(e);
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
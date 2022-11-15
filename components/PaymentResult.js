import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { theme } from './theme';

export const PaymentResult = ({ route, navigation }) => {
   console.log(route.params);

   const imp_success = route.params.imp_success;
    const imp_uid = route.params.imp_uid;
    const merchant_uid = route.params.merchant_uid;
    const error_msg = route.params.error_msg;
    
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
        {imp_success === "ture" ? (
          <View>
            <Text style={styles.paymentResultText}>
              결제가 완료 되셨습니다.
            </Text>
            <TouchableOpacity onPress={
                () => navigation.navigate('Mypage')
            }>
              <View style={styles.paymentResultButton}>
                <Text style={styles.paymentResultButtonText}>
                  마이페이지로 이동하기
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
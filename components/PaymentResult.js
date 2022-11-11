import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { theme } from './theme';

export const PaymentResult = ({ route }) => {
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
            fontSize: 40,
            fontWeight: 'bold',
            marginBottom: 20,
        },
    });

    return (
        <View style={styles.container}>
            {imp_success === "true" ? (
                <Text style={styles.paymentResultText}>결제가 완료 되셨습니다.</Text>
            ) : (
                <Text style={{...styles.paymentResultText, color: "red"}}>{error_msg}</Text>
            )}
        </View>
    );
}
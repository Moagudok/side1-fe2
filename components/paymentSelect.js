import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useDispatch,useSelector } from "react-redux";
import { payselectList } from "./paymentSelectList";

export const PaymentSelect = ({ navigation }) => {
  const dispatch = useDispatch();
  const paymentSelectItem = useSelector((state) => state.paymentSelectItem);

  const styles = StyleSheet.create({
    payselectContainer: {
      flex: 1,
      paddingHorizontal: 20,
      alignItems: "center",
      justifyContent: "center",
    },
    paymentSelectTitle: {
      fontSize: 16,
      fontWeight: "300",
      color: "#000"
    },
    paymentSelectBox: {
      width: "80%",
      height: 50,
      borderRadius: 5,
      backgroundColor: "yellow",
      marginBottom: 10,
      alignItems: "center",
      justifyContent: "center",
    },
  });

  const handlePaymentSelect = (id) => {
    dispatch({ type: "PAYMENT_SELECT", paymentSelectItem: id });
    navigation.goBack();
  };

  return (
    <View style={styles.payselectContainer}>
      {payselectList.map((item) => (
        <TouchableOpacity
          key={item.id}
          style={[styles.paymentSelectBox, { backgroundColor: item.bgcolor }]}
          onPress={() => handlePaymentSelect(item.id)}
        >
          <Text style={[styles.paymentSelectTitle, { color: item.color }]}>{item.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};
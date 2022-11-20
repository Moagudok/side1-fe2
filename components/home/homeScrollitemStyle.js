import { StyleSheet } from "react-native";
import { theme } from "../theme";

export const styles = StyleSheet.create({
  itemBox: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  itemTitle: {
    fontSize: 16,
    marginBottom: 10,
  },
  itemGroupName: {
    fontSize: 12,
    color: theme.primaryColor,
    marginTop: 5,
  },
  itemName: {
    marginVertical: 5,
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 5,
  },
  itemPrice: {
    fontSize: 12,
    color: "#999",
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  // itemImageBox: {
  //   shadowColor: "#000",
  //   shadowOffset: {
  //     width: 0,
  //     height: 2,
  //   },
  //   shadowOpacity: 0.25,
  //   shadowRadius: 3.84,
  //   elevation: 5,
  // },
  itemImage: {
    width: theme.deviceWidth * 0.4,
    height: theme.deviceWidth * 0.4,
    borderRadius: 5,
    marginRight: 20,
    marginBottom: 10,
  },
  paymentTerm: {
    fontSize: 12,
    color: "#999",
    marginTop: 5,
  },
  paymentTermText: {
    fontSize: 12,
    color: "#999",
  },
});

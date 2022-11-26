import { theme } from "./theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    contentContainer: {
        marginTop: 10,
        paddingHorizontal: 20,
    },
    paymentinfoTitle: {
        fontSize: 12,
        marginBottom: 10,
        fontWeight: "400",
    },
    paymentItemInfoImage: {
        marginTop: 10,
        flexDirection: "row",
        marginBottom: 30,
        alignItems: "center",
    },
    paymentinfoImage: {
        width: theme.deviceWidth * 0.4,
        height: theme.deviceWidth * 0.4,
        marginRight: 20,
    },
    paymentItemInfoText: {
        marginBottom: 10,
    },
    paymentinfoSeller: {
        fontSize: 12,
        fontWeight: "300",
        marginBottom: 5,
        color: "#B2B2B2",
    },
    paymentinfoGroupName: {
        fontSize: 14,
        color: theme.primaryColor,
        marginBottom: 5,
    },
    paymentinfoName: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 5,
    },
    paymentinfoPrice: {
        marginVertical: 5,
        fontSize: 16,
        color: "red",
    },
    paymentTerm: {
        fontSize: 12,
        color: "#999",
    },
    paymentinfoInputName: {
        marginTop: 10,
    },
    paymentinfoInput: {
        fontSize: 14,
        paddingHorizontal: 5,
        marginBottom: 10,
        borderBottomColor: "#999",
        borderBottomWidth: 0.5,
        paddingVertical: 10,
    },
    paymentMethod: {
        marginTop: 1,
        marginBottom: 20,
    },
    paymentMethodButton: {
        marginTop: 10,
        backgroundColor: "yellow",
        padding: 20,
        borderRadius: 30,
        marginBottom: 10,
    },
    paymentMethodText: {
        fontSize: 16,
        fontWeight: "300",
        textAlign: "center",
    },
    subscriptionPeriod: {
        marginTop: 20,
        fontSize: 16,
        color: "red",
        marginBottom: 10,
    },
    paymentButtonBox: {
        marginBottom: 60,
    },
    paymentButton: {
        marginTop: 20,
        backgroundColor: theme.primaryColor,
        padding: 20,
    },
    paymentButtonText: {
        fontSize: 16,
        fontWeight: "300",
        textAlign: "center",
        color: "white",
    },
    paymentMethodBox: {
        backgroundColor: "white",
        padding: 5,
        borderRadius: 10,
        marginBottom: 10,
    },
    paymentMethodBoxText: {
        fontSize: 14,
        fontWeight: "300",
        marginLeft: 10,
    },
});
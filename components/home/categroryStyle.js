import { StyleSheet } from "react-native";
import { theme } from "../theme";

export const styles = StyleSheet.create({
    categoryList: {
        paddingHorizontal: 20,
        marginBottom: 10,
        marginTop: 20,
    },
    categoryTitle: {
        fontSize: 15,
        fontWeight: "bold",
        marginBottom: 10,
    },
    categoryItem: {
        marginRight: 20,
    },
    categoryImage: {
        width: theme.deviceWidth / 6,
        height: theme.deviceWidth / 6,
        borderRadius: theme.deviceWidth / 12,
    },
    categoryText: {
        fontSize: 12,
        marginTop: 5,
        fontWeight: "400",
        textAlign: "center",
    },
});
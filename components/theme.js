import { Dimensions } from "react-native";
import {FontAwesome5} from "@expo/vector-icons";

export const theme = {
    bgColor: '#EDEDED',
    primaryColor: 'red',
    deviceWidth: Dimensions.get('window').width,
    mainColor: '#FF6F61',
};

export const themeIcon = {
    searchIcon: <FontAwesome5 name="search" size={12} color="#333" />,
    lightIcon: <FontAwesome5 name="lightbulb" size={12} color="#333" />
}

export const stackStyle = {
  bg: "#EEEEEE",
  color: "#3C4048",
};
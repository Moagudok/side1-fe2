import { Dimensions } from "react-native";
import {FontAwesome5} from "@expo/vector-icons";

const backSrv = "http://13.124.175.83:8001";

export const theme = {
    bgColor: '#EDEDED',
    primaryColor: 'red',
    deviceWidth: Dimensions.get('window').width,
    mainColor: '#FF6F61',
};

export const themeIcon = {
    searchIcon: <FontAwesome5 name="search" size={12} color="#333" />,
    lightIcon: <FontAwesome5 name="lightbulb" size={12} color="#333" />,
    adIcon : <FontAwesome5 name="ad" size={16} color="black" />,
    chatIcon : <FontAwesome5 name="comment-alt" size={16} color="#000" />
}

export const stackStyle = {
  bg: "#EEEEEE",
  color: "#3C4048",
};

export const backendServer = {
  category: `${backSrv}/consumer/product/category/`,
  productList: `${backSrv}/consumer/product/`,
  productDetail: `${backSrv}/consumer/product/detail/`,
  homeApi : `${backSrv}/consumer/home/`,
};

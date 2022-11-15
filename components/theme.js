import { Dimensions } from "react-native";
import {FontAwesome5} from "@expo/vector-icons";

const backSrv = "http://52.79.143.145:8001";

export const theme = {
    bgColor: '#EDEDED',
    primaryColor: 'red',
    deviceWidth: Dimensions.get('window').width,
    mainColor: '#FF6F61',
    homebanerImage: {uri: "https://static.spartacodingclub.kr/043a96e34c19/static/v5/images/navbar/mobile_navbar_banner.png?t=1634535923",},
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
  lastSearch : `${backSrv}/search/latest`,
};

// http://52.79.143.145:8001/consumer/product/list?category=1&search&page=1


import { Dimensions } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

const backSrv = "http://52.79.143.145:8001";
const backSrv2 = "http://52.79.143.145:8000";
const backSrv3 = "http://52.79.143.145:8003";
const backSrv4 = "http://52.79.143.145:8004";
const backSrv5 = "http://52.79.143.145:8080";

export const theme = {
  bgColor: '#F7F7F7',
  bgColor: '#fff',
  primaryColor: 'red',
  deviceWidth: Dimensions.get('window').width,
  mainColor: '#FF6F61',
  homebanerImage: { uri: "https://static.spartacodingclub.kr/043a96e34c19/static/v5/images/navbar/mobile_navbar_banner.png?t=1634535923", },
};

export const themeIcon = {
  searchIcon: <FontAwesome5 name="search" size={12} color="#333" />,
  lightIcon: <FontAwesome5 name="lightbulb" size={12} color="#333" />,
  adIcon: <FontAwesome5 name="ad" size={16} color="black" />,
  chatIcon: <FontAwesome5 name="comment-alt" size={14} color="#000" />,
  creditCard: <FontAwesome5 name="credit-card" size={16} color="black" />,
  backButton: <FontAwesome5 name="chevron-left" size={18} color="black" />
}

export const stackStyle = {
  bg: "#000000",
  bg: "#fff",
  color: "#000",
};
//http://52.79.143.145:8001/consumer/mypage?type=exp

export const backendServer = {
  category: `${backSrv}/consumer/product/category/`,
  productList: `${backSrv}/consumer/product/cursor/list?`,
  productDetail: `${backSrv}/consumer/product/detail/`,
  homeApi: `${backSrv}/consumer/home`,
  lastSearch: `${backSrv3}/search/latest`,
  tophitSearch: `${backSrv3}/search/tophits`,
  login: `${backSrv2}/user/login`,
  join: `${backSrv2}/user/join`,
  refreshTokenApi: `${backSrv2}/user/token/refresh`,
  user: `${backSrv2}/user`,
  paymentData: `${backSrv}/consumer/mypage?type=`,
  payment: `${backSrv5}/payment`,
};

// http://52.79.143.145:8001/consumer/product/cursor/list?category=1&search&cursor

// http://52.79.143.145:8001/consumer/product/list?category=1&search&page=1

// http://52.79.143.145:8001/consumer/home/

// http://52.79.143.145:8001/consumer/product/detail/14

// http://52.79.143.145:8001/user/join

// http://52.79.143.145:8003/search/latest
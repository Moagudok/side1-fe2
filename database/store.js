import { bottomLoginFalse, bottomLoginTrue } from "./bottomMenuList";
import AsyncStorage from "@react-native-async-storage/async-storage";

const UserGet = async () => {
    const username = "username"
}

export function reducer(state, action) {
  switch (action.type) {
    case "SET_CATEGORY_LIST":
      return {
        ...state,
        categoryList: action.list,
      };
    case "SET_NEW_ITEM_LIST":
      return {
        ...state,
        newItemList: action.list,
      };
    case "SET_BEST_ITEM_LIST":
      return {
        ...state,
        bestItemList: action.list,
      };
    case "SET_LOGIN":
      return {
        ...state,
        login: action.login,
        bottomMenuList: action.login ? bottomLoginTrue : bottomLoginFalse,
      };
    case "LOGOUT":
      AsyncStorage.removeItem("refresh");
      AsyncStorage.removeItem("access");
      return {
        ...state,
        login: false,
        bottomMenuList: bottomLoginFalse,
      };
    case "ADD_CHAT_MESSAGE":
      return {
        ...state,
        chatMessages: [...state.chatMessages, action.message],
      };
    case "RESET_CHAT_MESSAGE":
      return {
        ...state,
        chatMessages: action.list,
      };
    case "SOCKET":
      return {
        ...state,
        socket: action.socket,
      };
    case "PAYMENT_DATA":
      return {
        ...state,
        paymentData: action.paymentData,
      };
    case "PAYMENT_SELECT":
      return {
        ...state,
        paymentSelectItem: action.paymentSelectItem,
      };
    case "SET_USER_INFO":
      return {
        ...state,
        userInfo: action.userInfo,
      };
    case "GET_DATE_NOW":
      return {
        ...state,
        dateNow: action.dateNow,
      };
    case "GET_DATE_NEXT":
      return {
        ...state,
        dateNext: action.dateNext,
      };
    default:
      return {
        ...state,
        categoryList: [],
        login: false,
        chatMessages: [],
        socket: null,
        bottomMenuList: bottomLoginFalse,
        productGetUrl: "",
        newItemList: [],
        bestItemList: [],
        paymentSelectItem: 1,
        paymentData: null,
        userInfo: null,
        dateNow: null,
        dateNext: null,
      };
  }
}

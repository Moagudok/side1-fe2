import { bottomLoginFalse, bottomLoginTrue } from "./bottomMenuList";

export function reducer(state, action) {
  switch (action.type) {
    case "SET_RECENTLY_SEARCH_LIST":
      return {
        ...state,
        recentlySearchList: action.list,
      };
    case "SET_SEARCH_TEXT":
      return {
        ...state,
        searchText: action.text,
      };
    case "RESET_SEARCH_TEXT":
      return {
        ...state,
        searchText: "",
      };
    case "SET_CATEGORY_LIST":
      return {
        ...state,
        categoryList: action.list,
      };
    case "SET_LOGIN":
      return {
        ...state,
        login: action.login,
        bottomMenuList: action.login ? bottomLoginTrue : bottomLoginFalse,
      };
    case "LOGOUT":
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
    case "SOCKET":
      return {
        ...state,
        socket: action.socket,
      };
    case "SET_PRODUCT_LIST":
      return {
        ...state,
        productLists: [...state.productLists, ...action.list],
      };
    case "SET_IS_LOADING":
      return {
        ...state,
        isLoading: action.isLoading,
      };
    default:
      return {
        ...state,
        recentlySearchList: [],
        categoryList: [],
        searchText: "",
        login: false,
        chatMessages: [],
        socket: null,
        bottomMenuList: bottomLoginFalse,
        productLists: [],
        productGetUrl: "",
        isLoading: false,
      };
  }
}

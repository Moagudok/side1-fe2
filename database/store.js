import { bottomLoginFalse ,bottomLoginTrue  } from "./bottomMenuList";

export function reducer (state, action) {
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
        }
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
    default:
    return {
        ...state,
        recentlySearchList: [],
        categoryList: [],
        searchText: "",
        login: false,
        bottomMenuList: bottomLoginFalse,
    };
  }
}
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
    default:
    return {
        ...state,
        recentlySearchList: [],
        searchText: "",
    };
  }
}
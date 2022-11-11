import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { theme, themeIcon } from "./theme";
import { useSelector, useDispatch } from "react-redux";

export default function Search({ navigation }) {
  const dispatch = useDispatch();
  const searchText = useSelector((state) => state.searchText);

  const recentlySearchList = useSelector((state) => state.recentlySearchList);

  const recentlySearchAdd = (text) => {
    dispatch({
      type: "SET_RECENTLY_SEARCH_LIST",
      list: [...recentlySearchList, text],
    });
    dispatch({
      type: "RESET_SEARCH_TEXT",
    });
    navigation.navigate("ProductList", {
      search: "search",
      searchText: text,
      url: `list?category&search=${text}&page=`,
    });
  };

  const recentlySearchResult = (text) => {
    navigation.navigate("ProductList", {
      search: "search",
      searchText: text,
      url: `list?category&search=${text}&page=`,
    });
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.bgColor,
    },
    searchBox: {
      paddingHorizontal: 20,
      paddingVertical: 15,
      marginTop: 10,
      marginBottom: 10,
    },
    search: {
      height: 50,
      backgroundColor: "#fff",
      borderRadius: 30,
      paddingHorizontal: 20,
      fontSize: 12,
    },
    recentlyTitleBox: {
      paddingHorizontal: 15,
      alignItems: "center",
      flexDirection: "row",
      marginTop: 10,
      marginLeft: 5,
    },
    recentlyTitle: {
      fontSize: 20,
      fontWeight: "500",
      letterSpacing: 1,
      marginLeft: 10,
      color: "#333",
    },
    recentlySearchList: {
      paddingHorizontal: 20,
      paddingVertical: 15,
      alignItems: "center",
      flexDirection: "row",
      flexWrap: "wrap",
      overflow: "hidden",
    },
    recentlySearchNameBox: {
      height: 40,
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 15,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
      marginRight: 10,
      marginBottom: 10,
    },
    recentlySearchName: {
      fontSize: 12,
      color: "#333",
      letterSpacing: 1,
    },
    notRecentlySearchList: {
      height: 50,
      alignItems: "center",
      justifyContent: "center",
    },
    recommendationBox: {
      paddingHorizontal: 20,
    },
    recommendationTitleBox: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 10,
    },
    recommendationTitle: {
      fontSize: 20,
      fontWeight: "500",
      letterSpacing: 1,
      color: "#333",
      marginLeft: 10,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.searchBox}>
        <TextInput
          value={searchText}
          onChangeText={(text) => {
            dispatch({
              type: "SET_SEARCH_TEXT",
              text: text,
            });
          }}
          onSubmitEditing={(e) => recentlySearchAdd(e.nativeEvent.text)}
          placeholder="상품명을 입력해주세요"
          style={styles.search}
        />
      </View>
      <View style={styles.recentlyTitleBox}>
        {themeIcon.searchIcon}
        <Text style={styles.recentlyTitle}>최근 검색어</Text>
      </View>
      <View style={styles.recentlySearchList}>
        {recentlySearchList.length > 0 ? (
          recentlySearchList.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.recentlySearchNameBox}
              onPress={() => {
                recentlySearchResult(item);
              }}
            >
              <Text style={styles.recentlySearchName}>{item}</Text>
            </TouchableOpacity>
          ))
        ) : (
          <View style={styles.notRecentlySearchList}>
            <Text>최근 검색어가 없습니다.</Text>
          </View>
        )}
      </View>
      <View style={styles.recommendationBox}>
        <View style={styles.recommendationTitleBox}>
          {themeIcon.lightIcon}
          <Text style={styles.recommendationTitle}>추천 검색어</Text>
        </View>
      </View>
    </View>
  );
}

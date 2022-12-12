import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { theme, themeIcon, backendServer } from "./theme";
import { useEffect, useState } from "react";
import { refresh } from "./refresh";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Search({ navigation }) {
  const [recentlySearchList, setRecentlySearchList] = useState([]);
  const [tophits, setTopHits] = useState([]);
  const [searchText, setSearchText] = useState("");

  const recentlySearchGet = async () => {
    const refreshToken = await AsyncStorage.getItem("refresh");
    const access = await refresh(refreshToken);
    const auth = {
      headers: {
        Authorization: `Bearer ${access}`,
      }
    }
    try {
      const res = await axios.get(backendServer.lastSearch, auth);
      const searchData = JSON.parse(res.data);
      setRecentlySearchList(searchData);
    } catch (e) {
      console.log("라스트 서치 에러");
    }
  };

  const recentSearchSave = async (text) => {
    const refreshToken = await AsyncStorage.getItem("refresh");
    const access = await refresh(refreshToken);
    const body = {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    };
    const bodyText = { search: text }
    try {
      const res = await axios.post(backendServer.lastSearch, bodyText, body);
    }
    catch (e) {
      console.log(e)
      console.log("라스트 서치 저장 에러");
    }
  };

  const topHitsGet = async () => {
    const res = await axios.get(backendServer.tophitSearch);
    const searchData = JSON.parse(res.data);
    setTopHits(searchData);
  };

  useEffect(() => {
    recentlySearchGet();
    topHitsGet();
  }, []);

  const recentlySearchAdd = (text) => {
    if (!recentlySearchList.includes(text)) {
      setRecentlySearchList([{ searchText: text }, ...recentlySearchList]);
      recentSearchSave(text);
    }
    setSearchText("");
    navigation.navigate("ProductList", {
      search: "search",
      searchText: text,
      url: `category&search=${text}&cursor`,
    });
  };

  const recentlySearchResult = (text) => {
    navigation.navigate("ProductList", {
      search: "search",
      searchText: text,
      url: `category&search=${text}&cursor`,
    });
    setRecentlySearchList([{ searchText: text }, ...recentlySearchList]);
    recentSearchSave(text);
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
    recommendationList: {
      flexDirection: "row",
      flexWrap: "wrap",
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.searchBox}>
        <TextInput
          value={searchText}
          onChangeText={(text) => {
            setSearchText(text);
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
                recentlySearchResult(item.searchText);
              }}
            >
              <Text style={styles.recentlySearchName}>{item.searchText}</Text>
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
        <View style={styles.recommendationList}>
          {tophits.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.recentlySearchNameBox}
              onPress={() => {
                recentlySearchResult(item._id);
              }}
            >
              <Text style={styles.recentlySearchName}>{item._id}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
}

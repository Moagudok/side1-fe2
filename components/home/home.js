import axios from "axios";
import moment from "moment-timezone";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SplashScreen from "expo-splash-screen";
import { ScrollView, StyleSheet, View } from "react-native";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { refresh } from "../refresh";
import { UserInfo } from "./userInfo";
import { Recommand } from "./recommand";
import { NowLoading } from "../nowLoading";
import { theme, backendServer } from "../theme";
import HomeBottom from "./homeBottomMenu";
import BestItem from "./bestItem";
import NewItem from "./newItem";
import Category from "./category";
import Banner from "./banner";


async function dismissSplashScreen() {
  await SplashScreen.hideAsync();
}

export default function Home({ navigation }) {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const sethomeData = async () => {
    const res = await axios.get(backendServer.homeApi);
    const data = res.data;
    const categories = JSON.parse(data.categories);
    dispatch({ type: "SET_CATEGORY_LIST", list: categories });
    dispatch({ type: "SET_BEST_ITEM_LIST", list: data.popular_products });
    dispatch({ type: "SET_NEW_ITEM_LIST", list: data.new_products });
  };

  const getCurrentTime = () => {
    const nowTime = moment().tz("Asia/Seoul");
    // nowTime + 1month
    const nextTime = moment().tz("Asia/Seoul").add(1, "month");
    dispatch({ type: "GET_DATE_NOW", dateNow: nowTime.format("YYYY-MM-DD") });
    dispatch({ type: "GET_DATE_NEXT", dateNext: nextTime.format("YYYY-MM-DD") });
  };

  const getRefreshToken = async () => {
    try {
      const refreshToken = await AsyncStorage.getItem("refresh");
      const access = await refresh(refreshToken);
      if (access) {
        dispatch({ type: "SET_LOGIN", login: true });
      } else {
        dispatch({ type: "LOGOUT" });
      }
    } catch (e) {
    }
  };

  const getUserInfo = async () => {
    const userInfo = await UserInfo();
    if (userInfo) {
      dispatch({ type: "SET_USER_INFO", userInfo: userInfo });
    }
  };

  useEffect(() => {
    dismissSplashScreen();
    sethomeData();
    getRefreshToken();
    setIsLoading(false);
    getUserInfo();
    getCurrentTime();
  }, []);

  const styles = StyleSheet.create({
    homeStyle: {
      backgroundColor: theme.bgColor,
      flex: 1,
    },
  });

  return isLoading ? (
    <NowLoading />
  ) : (
    <View style={styles.homeStyle}>
      <ScrollView showsHorizontalScrollIndicator={false}
      >
        <Banner />
        <Category navigation={navigation} />
        <BestItem navigation={navigation} />
        <Recommand />
        <NewItem navigation={navigation} />
      </ScrollView>
      <HomeBottom navigation={navigation} />
    </View>
  );
}

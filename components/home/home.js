import { ScrollView, StyleSheet, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { theme, backendServer } from "../theme";
import HomeBottom from "./homeBottomMenu";
import BestItem from "./bestItem";
import NewItem from "./newItem";
import Category from "./category";
import Banner from "./banner";
import { Recommand } from "./recommand";
import { NowLoading } from "../nowLoading";
import * as SplashScreen from "expo-splash-screen";
import axios from "axios";

async function dismissSplashScreen() {
  await SplashScreen.hideAsync();
}

export default function Home({ navigation }) {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const sethomeData = async () => {
    const res = await axios.get(backendServer.homeApi);
    const data = res.data;
    dispatch({ type: "SET_CATEGORY_LIST", list: data.categories });
    dispatch({ type: "SET_BEST_ITEM_LIST", list: data.popular_products });
    dispatch({ type: "SET_NEW_ITEM_LIST", list: data.new_products });
    setIsLoading(false);
  };

  useEffect(() => {
    dismissSplashScreen();
    sethomeData();
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
      <ScrollView showsHorizontalScrollIndicator={false}>
        <StatusBar style="auto" />
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

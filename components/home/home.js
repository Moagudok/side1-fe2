import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {theme} from "../theme";
import HomeBottom from "./homeBottomMenu";
import BestItem from "./bestItem";
import NewItem from "./newItem";
import Category from "./category";
import Banner from "./banner";
import {Recommand} from "./recommand";
import * as SplashScreen from "expo-splash-screen";
import axios from "axios";

async function dismissSplashScreen() {
  await SplashScreen.hideAsync();
}
 

export default function Home({ navigation }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dismissSplashScreen();
  }, []);

  useEffect(() => {
    axios.get("http://13.124.175.83:8001/consumer/home/").then((res) => {
      dispatch({ type: "SET_CATEGORY_LIST", list: res.data.categories });
    });
  }, []);
      
  const styles = StyleSheet.create({
    homeStyle: {
      backgroundColor: theme.bgColor,
      flex: 1,
    },
  });

  return (
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


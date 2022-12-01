import * as SplashScreen from "expo-splash-screen";
import HomeBottom from "./homeBottomMenu";
import BestItem from "./bestItem";
import NewItem from "./newItem";
import Category from "./category";
import Banner from "./banner";
import { ScrollView, View } from "react-native";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { UserInfo } from "./userInfo";
import { Recommand } from "./recommand";
import { NowLoading } from "../nowLoading";
import { getRefreshToken } from "./getToken";
import { getCurrentTime } from "./getTime";
import { sethomeData } from "./setHome";
import { styles } from "./styles";

async function dismissSplashScreen() {
  await SplashScreen.hideAsync();
}

export default function Home({ navigation }) {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  const setDispatch = async () => {
    await getRefreshToken() ? dispatch({ type: "SET_LOGIN", login: true }) : dispatch({ type: "SET_LOGIN", login: false });
    dispatch({ type: "SET_CATEGORY_LIST", list: await (await sethomeData()).categories });
    dispatch({ type: "SET_BEST_ITEM_LIST", list: await (await sethomeData()).popular_products });
    dispatch({ type: "SET_NEW_ITEM_LIST", list: await (await sethomeData()).new_products });
    dispatch({ type: "SET_USER_INFO", userInfo: await (await UserInfo()) });
    dispatch({ type: "GET_DATE_NOW", dateNow: getCurrentTime().nowTime.format("YYYY-MM-DD") });
    dispatch({ type: "GET_DATE_NEXT", dateNext: getCurrentTime().nextTime.format("YYYY-MM-DD") });
  };

  useEffect(() => {
    dismissSplashScreen();
    sethomeData();
    setDispatch();
    setIsLoading(false);
  }, []);

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

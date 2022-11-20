import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider } from "react-redux";
import { reducer } from "./database/store";
import { createStore } from "redux";
import Home from "./components/home/home";
import ItemDetail from "./components/itemDetail";
import Mypage from "./components/mypage";
import LoginPage from "./components/login";
import Category from "./components/category";
import Search from "./components/search";
import Chat from "./components/chat";
import ProductList from "./components/productList";
import Payments from "./components/payment";
import KaKaoPay from "./components/kakaopay";
import {PaymentResult} from "./components/PaymentResult";
import { Logout } from "./components/logout";
import { headerOption } from "./headerOptions";
import {PaymentSelect} from "./components/paymentSelect";
import {Text, View} from "react-native";

export default function App({ navigation }) {
  const Stack = createNativeStackNavigator();
  const store = createStore(reducer);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={Home}
            options={headerOption("모아 구독")}
          />
          <Stack.Screen
            name="ItemDetail"
            component={ItemDetail}
            options={{ ...headerOption("상품 상세"), headerShown: false, headerLeft: () => {
                return (
                  <View style={{ marginLeft: 20 }}>
                    <Text onPress={() => navigation.goBack()}>뒤로</Text>
                  </View>
                );
              }, }}
          />
          <Stack.Screen
            name="Mypage"
            component={Mypage}
            options={{
              ...headerOption("마이페이지"),
              headerRight: () => <Logout />,
            }}
          />
          <Stack.Screen
            name="Category"
            component={Category}
            options={headerOption("카테고리")}
          />
          <Stack.Screen
            name="Search"
            component={Search}
            options={headerOption("검색")}
          />
          <Stack.Screen
            name="Chat"
            component={Chat}
            options={headerOption("문의하기")}
          />
          <Stack.Screen
            name="ProductList"
            component={ProductList}
            options={{ ...headerOption("상품 리스트") }}
          />
          <Stack.Screen
            name="Payments"
            component={Payments}
            options={headerOption("결제 정보 입력")}
          />
          <Stack.Screen
            name="LoginPage"
            component={LoginPage}
            options={headerOption("로그인")}
          />
          <Stack.Screen
            name="KaKaoPay"
            component={KaKaoPay}
            options={headerOption("결제 진행중")}
          />
          <Stack.Screen
            name="PaymentResult"
            component={PaymentResult}
            options={headerOption("결제 결과")}
          />
          <Stack.Screen
          name="PaymentSelect"
          component={PaymentSelect}
          options={headerOption("결제수단 선택")}
        />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

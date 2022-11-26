import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider } from "react-redux";
import { reducer } from "./database/store";
import { createStore } from "redux";
import {PaymentResult} from "./components/PaymentResult";
import { Logout } from "./components/logout";
import { headerOption } from "./headerOptions";
import {PaymentSelect} from "./components/paymentSelect";
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
import JoinPage from "./components/join";
import JoinComplete from "./components/joinComplete";
import { AppInfo } from "./components/appInfo";

export default function App({ navigation }) {
  const Stack = createNativeStackNavigator();
  const store = createStore(reducer);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <StatusBar style="light" />
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            title="모아구독"
            component={Home}
            options={headerOption("모아 구독")}
          />
          <Stack.Screen
            name="ItemDetail"
            component={ItemDetail}
            options={{ ...headerOption("상품 상세")}}
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
          <Stack.Screen
            name="JoinPage"
            component={JoinPage}
            options={headerOption("회원가입")}
          />
          <Stack.Screen
            name="JoinComplete"
            component={JoinComplete}
            options={headerOption("회원가입 완료")}
          />
          <Stack.Screen
            name="AppInfo"
            component={AppInfo}
            options={headerOption("앱 정보")}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

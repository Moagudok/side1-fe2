import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from "react-redux";
import { reducer } from "./database/store";
import { createStore, } from "redux";
import { stackStyle } from "./components/theme";
import Home from './components/home/home';
import ItemDetail from './components/itemDetail';
import Mypage from './components/mypage';
import LoginPage from './components/login';
import Category from './components/category';
import Search from './components/search';
import Chat from './components/chat';
import ProductList from './components/productList';
import Payments from './components/payment';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';


export default function App({ navigation }) {
  const Stack = createNativeStackNavigator();
  const store = createStore(reducer);
  const headerOption = (title) => {
    return {
      title: title,
      headerBackButtonMenuEnabled: true,
      headerStyle: {
        backgroundColor: stackStyle.bg,
      },
      headerTintColor: stackStyle.color,
      headerTitleStyle: {
        fontWeight: "bold",
      },
      headerTitleAlign: "center",
    };
  };

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={Home}
            options={headerOption("Home")}
          />
          <Stack.Screen
            name="ItemDetail"
            component={ItemDetail}
            options={headerOption("상품 상세")}
          />
          <Stack.Screen
            name="Mypage"
            component={Mypage}
            options={headerOption("마이페이지")}
          />
          <Stack.Screen
            name="LoginPage"
            component={LoginPage}
            options={headerOption("로그인")}
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
            options={headerOption("채팅")}
          />
          <Stack.Screen
            name="ProductList"
            component={ProductList}
            options={headerOption("상품 리스트")}
          />
          <Stack.Screen
            name="Payments"
            component={Payments}
            options={headerOption("결제")}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
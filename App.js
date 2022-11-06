import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from "react-redux";
import Home from './components/home/home';
import ItemDetail from './components/itemDetail';
import Mypage from './components/mypage';
import Category from './components/category';
import Search from './components/search';
import Chat from './components/chat';
import ProductList from './components/productList';
import Payments from './components/payment';
import { reducer } from "./database/store";
import { createStore, } from "redux";

const store = createStore(reducer);

export default function App({ navigation }) {

  const Stack = createNativeStackNavigator();
  const stackStyle = {
    bg: '#EEEEEE',
    color: '#3C4048',
  }

  const nameTitle = "상품정보";

  return (
    <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Home"
          component={Home}
          options={{
            title: '구독 마켓',
            headerStyle: {
              backgroundColor: stackStyle.bg,
            },
            headerTintColor: stackStyle.color,
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerTitleAlign: 'center',
          }}
          />        
        <Stack.Screen
        name="ItemDetail"
        component={ItemDetail}
        options={{
          title: nameTitle,
          headerBackButtonMenuEnabled: true,
          headerStyle: {
            backgroundColor: stackStyle.bg,
          },
          headerTintColor: stackStyle.color,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTitleAlign: 'center',
        }}
       />
        <Stack.Screen
        name="Mypage"
        component={Mypage}
        options={{
          title: '마이페이지',
          headerStyle: {
            backgroundColor: stackStyle.bg,
          },
          headerTintColor: stackStyle.color,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTitleAlign: 'center',
        }}
       />
       <Stack.Screen
        name="Category"
        component={Category}
        options={{
          title: '카테고리',
          headerStyle: {
            backgroundColor: stackStyle.bg,
          },
          headerTintColor: stackStyle.color,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTitleAlign: 'center',
        }}
       />
       <Stack.Screen
        name="Search"
        component={Search}
        options={{
          title: '검색',
          headerStyle: {
            backgroundColor: stackStyle.bg,
          },
          headerTintColor: stackStyle.color,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTitleAlign: 'center',
        }}
       />
       <Stack.Screen
        name="Chat"
        component={Chat}
        options={{
          title: '채팅',
          headerStyle: {
            backgroundColor: stackStyle.bg,
          },
          headerTintColor: stackStyle.color,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTitleAlign: 'center',
        }}
       />
       <Stack.Screen
        name="ProductList"  
        component={ProductList}
        options={{
          title: '상품목록',
          headerStyle: {
            backgroundColor: stackStyle.bg,
          },
          headerTintColor: stackStyle.color,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTitleAlign: 'center',
        }}
       />
       <Stack.Screen
        name="Payments"
        component={Payments}
        options={{
          title: '결제',
          headerStyle: {
            backgroundColor: stackStyle.bg,
          },
          headerTintColor: stackStyle.color,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTitleAlign: 'center',
        }}
        />
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  );
}
# 모아 구독

<img style="width: 500px;" src="https://i.ibb.co/dcG77Rt/Screenshot-20221107-224432-submarkettest.jpg" />

## 설치및 실행 방법

<a href="https://github.com/nabacamp-side/side1-fe2/wiki/ReactNative-Expo-%EC%84%A4%EC%B9%98%EB%B0%8F-%EC%8B%A4%ED%96%89-%EB%B0%A9%EB%B2%95">링크 참조</a>

## 사용 기술

- React
- ReactNative
- ReactNative Navigation
- ReactNative Vector Icons
- React Redux
- Redux
- Javascript ES6

## 주요 기능

- 로그인(JWT 토큰 사용)
- 회원가입(이메일 인증)
- 결제 (아임포트)
- 채팅 (Socket.io)
- API 통신 (Axios)
- Redux (Redux, action, reducer, store)
- AsyncStorage (로그인 정보 저장)
- ReactNative Navigation (화면 이동)
- ReactNative Vector Icons (아이콘)

## React Native

React Native 란 웹 개발 도구인 React와 같은 컴포넌트 기반의 접근법을 사용하여 모바일 앱을 만들 수 있는 프레임워크입니다. 이 프레임워크를 사용하면 모바일 앱을 만들 때 코드를 재사용할 수 있어 개발 속도를 빠르게 할 수 있습니다. 또한 React Native는 안드로이드와 iOS 모두에서 작동하므로 한 번 작성한 코드를 두 개의 모바일 플랫폼에서 사용할 수 있습니다.

### JWT & Asnc Storege

JWT(JSON Web Token)은 비밀번호나 다른 종류의 인증 정보를 전달할 때 사용하는 토큰입니다. AsyncStorage는 React Native에서 사용하는 비동기 데이터 저장소입니다. JWT 토큰을 AsyncStorage에 저장하는 방법은 다음과 같습니다.

```Javascript
import AsyncStorage from '@react-native-community/async-storage';

// JWT 토큰을 AsyncStorage에 저장하는 함수
const storeToken = async (token) => {
  try {
    await AsyncStorage.setItem('token', token);
  } catch (e) {
    // 오류가 발생했을 때 처리
  }
};
```
위 코드는 JWT 토큰을 AsyncStorage에 저장하는 기본적인 예시입니다. 실제로 사용할 때는 적절한 예외 처리와 다른 세부 사항을 고려해서 코드를 작성해야 합니다.


## Socket.io

Socket.io은 웹 클라이언트와 서버 간의 양방향 실시간 통신을 가능하게 하는 자바스크립트 라이브러리이다. 리액트 네이티브를 포함한 다양한 프론트엔드 프레임워크와 함께 사용할 수 있다.

Socket.io을 React Native와 함께 사용하려면 Socket.io 프로토콜의 클라이언트 측 구현을 제공하는 socket.io-client 패키지를 설치해야 합니다. 다음과 같이 npm 또는 yarn 패키지 관리자를 사용하여 이 패키지를 설치할 수 있습니다.

```bash
# Using npm
npm install socket.io-client

# Using yarn
yarn add socket.io-client
```

socket.io-client 패키지가 설치되면 패키지에서 Socket 클래스를 가져와서 이 클래스를 사용하여 다음과 같은 새 Socket 인스턴스를 생성하여 React Native 앱에서 사용할 수 있습니다.

```javascript
import io from 'socket.io-client';

const socket = io('http://your-socket-io-server.com');
```

그런 다음 이 socket 인스턴스를 사용하여 Socket.io 클라이언트에서 제공하는 다양한 방법(예: emit() 및 on()을 사용하여 서버에서 메시지를 보내고 받을 수 있습니다. 예를 들어 emit() 메소드를 사용하여 다음과 같은 메시지를 서버에 보낼 수 있습니다.

```javascript
socket.emit('message', { data: 'Hello from React Native!' });
```

또한 on() 메서드를 사용하여 다음과 같은 서버의 메시지를 수신할 수 있습니다.

```javascript
socket.on('message', (message) => {
  console.log(message);
});
```

### React Native Navigation

React Native Navigation은 리액트 네이티브 앱에서 스크린을 전환하고 앱의 구조를 관리하는 라이브러리입니다. 네이티브 네비게이션을 사용하면 앱의 사용자 인터페이스를 쉽게 작성할 수 있으며, 앱의 기능을 강력하고 사용자 친화적으로 구현할 수 있습니다.

```javascript
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from './screens/HomeScreen';
import DetailsScreen from './screens/DetailsScreen';

const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    Details: DetailsScreen,
  },
  {
    initialRouteName: 'Home',
  }
);
```

이 예에서 루트 스택 탐색기는 두 개의 경로를 포함하는 스택 탐색기입니다. 홈 및 세부 정보. 홈 경로는 초기 경로이며 홈 스크린 구성 요소에 해당합니다. Details 경로는 DetailsScreen 구성 요소에 해당합니다.

이 네비게이터를 사용하려면 다음과 같이 앱에서 렌더링하기만 하면 됩니다.

```javascript
import React from 'react';
import { View } from 'react-native';
import RootStack from './navigators/RootStack';

const App = () => {
  return (
    <View style={{ flex: 1 }}>
      <RootStack />
    </View>
  );
};

export default App;

```

이 예에서 App 구성 요소는 RootStack 탐색기를 렌더링합니다. 이 탐색기는 현재 탐색 상태에 따라 적절한 화면을 렌더링합니다.

## Redux

Redux는 JavaScript 애플리케이션에서 상태를 관리하기 위해 사용하는 라이브러리입니다. Redux는 애플리케이션의 상태를 예측 가능한 방식으로 관리할 수 있도록 도와줍니다. Redux는 일반적으로 리액트 애플리케이션과 함께 사용되지만, 다른 프레임워크와도 같이 사용할 수 있습니다.

```javascript
import { createStore } from 'redux';

function reducer(state, action) {
  if (action.type === 'ADD_TODO') {
    return {
      todos: [...state.todos, action.todo],
    };
  }
  // For any unknown action, return the current state
  return state;
}

const store = createStore(reducer);

store.dispatch({
  type: 'ADD_TODO',
  todo: { text: 'Learn Redux', completed: false },
});

console.log(store.getState());
```

Provider로 지정된 컴포넌트에서 스테이트를 상태 관리 하였습니다.
그렇게 하면 불필요한 렌더를 막을수 있습니다.

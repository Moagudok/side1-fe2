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
- 채팅 (Websocket)
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

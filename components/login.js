import {View,Text, StyleSheet, Image, TextInput, TouchableOpacity, Vibration, Platform} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { theme } from "./theme";
import { useEffect, useState } from "react";

export default function LoginPage({navigation}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [incorrect, setIncorrect] = useState(false);
  const login = useSelector((state) => state.login);

  const dispatch = useDispatch();

  const loginButton = () => {
    if (email === "1234" && password === "1234") {
      dispatch({ type: "SET_LOGIN", login: true });
    } else {
      Platform.OS === "ios" ? Vibration.vibrate() : Vibration.vibrate(1000);
      setIncorrect(true);  
      setTimeout(() => 
        setIncorrect(false), 1000);
    }
  };

  useEffect(() => {
    login ? navigation.goBack() : null;
  }, [login]);
    
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.bgColor,
      justifyContent: "center",
    },
    loginImageBox: {
      alignItems: "center",
    },
    styleImage: {
      width: theme.deviceWidth * 0.5,
      height: theme.deviceWidth * 0.5,
      marginBottom: 20,
    },
    loginTitle: {
      fontWeight: "bold",
      textAlign: "center",
      marginBottom: 20,
      fontSize: 20,
    },
    loginInputBox: {
      paddingHorizontal: 30,
    },
    loginInput: {
      alignItems: "center",
      backgroundColor: "#fff",
      paddingVertical: 10,
      borderRadius: 25,
      marginBottom: 10,
      paddingHorizontal: 20,
      fontSize: 12,
    },
    loginButton: {
      alignItems: "center",
      backgroundColor: theme.mainColor,
      paddingVertical: 10,
      borderRadius: 25,
      marginBottom: 10,
      marginHorizontal: 30,
    },
    loginJoinTile: {
      textAlign: "center",
      color: "#999",
      fontSize: 12,
    },
    incorrect: {
      width: "100%",
      height: "100%",      
      position: "absolute",
      backgroundColor: "rgba(255, 0, 0, 0.5)",
      paddingVertical: 10,
      paddingHorizontal: 20,
      justifyContent: "center",
    },
    incorrectText: {
      color: "#fff",
      fontSize: 20,
      fontWeight: "bold",
      textAlign: "center",
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.loginImageBox}>
        <Image
          style={styles.styleImage}
          source={require("../assets/free-icon-street-market-5853784.png")}
        />
      </View>
      <View style={styles.loginInputBox}>
        <Text style={styles.loginTitle}>LOGIN</Text>
        <TextInput
          placeholder="아이디 혹은 이메일"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.loginInput}
        />
        <TextInput  
          placeholder="비밀번호"
          onSubmitEditing={loginButton}
          returnKeyType="send"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={true}
          style={styles.loginInput}
        />
      </View>
      <TouchableOpacity onPress={loginButton} style={styles.loginButton}>
        <Text style={{ color: "#fff" }}>로그인</Text>
      </TouchableOpacity>
      <Text style={styles.loginJoinTile}>아직 회원이 아니신가요?</Text>
      {incorrect ? (
        <View style={styles.incorrect}>
          <Text style={styles.incorrectText}>
            아이디 혹은 비밀번호가 틀렸습니다.
          </Text>
        </View>
      ) : null}
    </View>
  );
}

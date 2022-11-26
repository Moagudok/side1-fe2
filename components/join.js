import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Vibration,
  Platform,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { theme, backendServer } from "./theme";
import { useEffect, useState } from "react";
import axios from "axios";

export default function JoinPage({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [incorrect, setincorrect] = useState(false);
  const [incorrectMsg, setincorrectMsg] = useState("");
  const login = useSelector((state) => state.login);

  const joinButton = async () => {
    const user = {
      email,
      password,
      name,
      address,
      is_seller: 0,
    };
    if (password !== password2) {
      setincorrect(true);
      setincorrectMsg("비밀번호가 일치하지 않습니다.");
      Vibration.vibrate(Platform.OS === "ios" ? 0 : 1000);
      setTimeout(() => {
        setincorrect(false);
      }, 1000);
    } else {
      try {
        const res = await axios.post(`${backendServer.join}`, user);
        console.log(res.data)
        navigation.replace("JoinComplete");
      } catch (e) {
        console.error(e.response.data)
        e.response.data.address && setincorrectMsg(e.response.data.address);
        e.response.data.email && setincorrectMsg(e.response.data.email);
        e.response.data.password && setincorrectMsg(e.response.data.password);
        setincorrect(true);
        Vibration.vibrate(Platform.OS === "ios" ? 0 : 1000);
        setTimeout(() => {
          setincorrect(false);
        }, 1000);
      }
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
      width: theme.deviceWidth * 0.2,
      height: theme.deviceWidth * 0.2,
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
      width: theme.deviceWidth,
      position: "absolute",
      top: 0,
      backgroundColor: "rgba(255, 0, 0, 0.5)",
      paddingVertical: 10,
      paddingHorizontal: 20,
      justifyContent: "center",
    },
    incorrectText: {
      color: "#fff",
      fontSize: 16,
      fontWeight: "200",
      fontStyle: "italic",
      textAlign: "center",
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.loginImageBox}>
        <Image
          style={styles.styleImage}
          source={require("../assets/subscribe.png")}
        />
      </View>
      <View style={styles.loginInputBox}>
        <Text style={styles.loginTitle}>회원 가입</Text>
        <TextInput
          placeholder="아이디 혹은 이메일"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.loginInput}
        />
        <TextInput
          placeholder="성함"
          value={name}
          onChangeText={(text) => setName(text)}
          style={styles.loginInput}
        />
        <TextInput
          placeholder="주소"
          value={address}
          onChangeText={(text) => setAddress(text)}
          style={styles.loginInput}
        />
        <TextInput
          placeholder="비밀번호"
          onSubmitEditing={joinButton}
          returnKeyType="send"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={true}
          style={styles.loginInput}
        />
        <TextInput
          placeholder="비밀번호 확인"
          onSubmitEditing={joinButton}
          returnKeyType="send"
          value={password2}
          onChangeText={(text) => setPassword2(text)}
          secureTextEntry={true}
          style={styles.loginInput}
        />
      </View>
      <TouchableOpacity onPress={joinButton} style={styles.loginButton}>
        <Text style={{ color: "#fff" }}>회원가입</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.replace("LoginPage")}
      >
        <Text style={styles.loginJoinTile}>이미 회원이신가요? 로그인</Text>
      </TouchableOpacity>
      {incorrect ? (
        <View style={styles.incorrect}>
          <Text style={styles.incorrectText}>
            {incorrectMsg}
          </Text>
        </View>
      ) : null}
    </View>
  );
}

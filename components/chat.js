import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { io } from "socket.io-client";
import { theme } from "./theme";

export default function Search({ navigation }) {
  const [message, setMessage] = useState("");
  const chatMessages = useSelector((state) => state.chatMessages);
  const socket = useSelector((state) => state.socket);
  const scrollViewRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    const socket = io("http://52.78.159.41:4005");
    dispatch({ type: "SOCKET", socket });
    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket) {
      socket.emit("Welcome", "Hello");
    }
  }, [socket]);

  useEffect(() => {
    if (socket) {
      socket.on("chat message", (message) => {
        dispatch({
          type: "ADD_CHAT_MESSAGE",
          message: {
            msg: message,
            me: false,
            date: new Date(),
          },
        });
      });
    }
  }, [socket]);

  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [chatMessages]);

  const sendMessage = () => {
    socket.emit("chat message", message);
    setMessage("");
    //msg me true
    dispatch({
      type: "ADD_CHAT_MESSAGE",
      message: {
        msg: message,
        me: true,
        date: new Date(),
      },
    });
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={scrollViewRef}
        onContentSizeChange={() =>
          scrollViewRef.current.scrollToEnd({ animated: true })
        }
        scrollToOverflowEnabled={true}
        data={chatMessages}
        renderItem={({ item }) => (
          <View
            style={{
              alignItems: item.me ? "flex-end" : "flex-start",
              padding: 5,
            }}
          >
            <View
              style={{
                backgroundColor: item.me ? "#DCF8C6" : "#eee",
                padding: 10,
                borderRadius: 7,
                maxWidth: theme.deviceWidth * 0.6,
              }}
            >
              <Text>{item.msg}</Text>
            </View>
            <Text
              style={{
                color: "#ccc",
                fontSize: 10,
                marginTop: 2,
              }}
            >
              {item.me ? "유저" : "판매자"}
            </Text>
            <Text style={{ color: "#ccc", fontSize: 10 }}>
              {item.date ? item.date.toLocaleTimeString() : ""}
            </Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={message}
          onChangeText={(text) => setMessage(text)}
          placeholder="메세지를 입력하세요"
          returnKeyLabel="전송"
          returnKeyType="send"
          onSubmitEditing={sendMessage}
          onFocus={() => {
            scrollViewRef.current.scrollToEnd({ animated: true });
          }}
        />
        <TouchableOpacity style={styles.sendBtn} onPress={sendMessage}>
          <Text style={styles.sendButtonText}>전송</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 5,
    paddingVertical: 10,
    backgroundColor: "#fff",
  },
  chatContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  chatContentContainer: {
    padding: 20,
  },
  myMessageContainer: {
    alignSelf: "flex-end",
    backgroundColor: "yellow",
    padding: 10,
    marginLeft: 50,
    borderRadius: 10,
    marginBottom: 10,
  },
  messageContainer: {
    alignSelf: "flex-start",
    backgroundColor: "#eee",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    marginRight: 50,
  },
  myMessageText: {
    color: "#000",
    fontSize: 14,
  },
  messageText: {
    fontSize: 14,
    color: "#000",
  },
  inputContainer: {
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#fff",
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
  },
  sendBtn: {
    width: 80,
    height: 40,
    backgroundColor: "#000",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
  sendButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});

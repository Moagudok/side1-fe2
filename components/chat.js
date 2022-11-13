import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { io } from "socket.io-client";
import { theme } from "./theme";

export default function Chat({ navigation, route }) {
  const [message, setMessage] = useState("");
  const chatMessages = useSelector((state) => state.chatMessages);
  const socket = useSelector((state) => state.socket);
  const scrollViewRef = useRef();
  const inputRef = useRef();
  const { name, image, room } = route.params;
  const dispatch = useDispatch();

  useEffect(() => {
    const socket = io("http://52.78.159.41:4005/chat");
    socket.emit("join", room);
    dispatch({ type: "SOCKET", socket });
    return () => {
      socket.emit("leave", room);
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    console.log(room);
    if (socket) {
      socket.on("chat message", (msg) => {
        dispatch({
          type: "ADD_CHAT_MESSAGE",
          message: {
            id : new Date().getTime(),
            room: room,
            msg: msg,
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
    if (message) {
      socket.emit("chat message", room, message);
      setMessage("");
      dispatch({
        type: "ADD_CHAT_MESSAGE",
        message: {
          id : new Date().getTime(),
          room: room,
          msg: message,
          me: true,
          date: new Date(),
        },
      });
      console.log(chatMessages);
    }
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-evenly",
          backgroundColor: "#000",
        }}
      >
        <Image style={{ width: 70, height: 70 }} source={image} />
        <Text style={{ fontSize: 16, fontWeight: "300", color: "white" }}>
          {name}
        </Text>
      </View>
      <FlatList
        ref={scrollViewRef}
        onContentSizeChange={() =>
          scrollViewRef.current.scrollToEnd({ animated: false })
        }
        scrollToOverflowEnabled={true}
        data={chatMessages}
        renderItem={({ item }) => 
          item.room === room ? (
            <View
              style={{
                alignItems: item.me ? "flex-end" : "flex-start",
                marginVertical: 10,
                width: theme.deviceWidth * 1,
              }}
            >
              <View
                style={{
                  backgroundColor: item.me ? "yellow" : "#eee",
                  padding: 10,
                  borderRadius: 10,
                  marginHorizontal: 10,
                  maxWidth: theme.deviceWidth * 0.6,
                }}
              >
                <Text
                  style={{
                    color: item.me ? "#000" : "#000",
                    fontSize: 12,
                    fontWeight: "300",
                  }}
                >
                  {item.msg}
                </Text>
              </View>
              <View style={{alignItems: "flex-end",paddingHorizontal: 10}}>
                {item.me ? <Text style={{ fontSize: 10, color: "#aaa" }}>구매자</Text> : <Text style={{ fontSize: 10, color: "#aaa" }}>판매자</Text>}
                <Text style={{fontSize: 10, color: "gray" }}>{new Date(item.date).toLocaleTimeString()}</Text>
              </View>

            </View>
          ) : null
        }
        keyExtractor={(item) => item.id}
      />          
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={message}
          ref={inputRef}
          onChangeText={(text) => setMessage(text)}
          placeholder="메세지를 입력하세요"
          returnKeyLabel="전송"
          returnKeyType="send"
          autoFocus={true}
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

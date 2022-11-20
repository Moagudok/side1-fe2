import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import { useState, useRef, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { io } from "socket.io-client";
import { theme } from "./theme";
import axios from "axios";

export default function Chat({ navigation, route }) {
  const { name, image, room, user } = route.params;
  const [message, setMessage] = useState("");
  // const chatMessages = useSelector((state) => state.chatMessages);
  const socket = useSelector((state) => state.socket);
  const [pageLoad, setPageLoad] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [userList, setUserList] = useState();
  const chatMessages = useSelector((state) => state.chatMessages);
  const inputRef = useRef();
  const scrollViewRef = useRef();
  const dispatch = useDispatch();

  const chatdataGet = async () => {
    const res = await axios.get(
      `http://52.78.159.41:4005/chatList/?room=${room}`
    );
    dispatch({ type: "RESET_CHAT_MESSAGE", list: res.data });
  };

  const chatJoin = () => {
    if (socket) {
      socket.emit("join", room, user);
    }
  };

  const chatLeave = () => {
    if (socket) {
      socket.emit("leave", room, user);
      socket.disconnect();
    }
  };

  useEffect(() => {
    chatdataGet();
    setPageLoad(true);
  }, []);

  useEffect(() => {
    const socket = io("http://52.78.159.41:4005/chat");
    // const socket = io("http://localhost:4005/chat");
    socket.emit("join", room, user);
    socket.on("join users", (users) => {
      setUserList(users);
    });
    dispatch({ type: "SOCKET", socket });
    return () => {
      socket.emit("leave", room, user);
      socket.on("join users", (users) => {
        setUserList(users);
      });
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on("join users", (users) => {
        console.log(users);
        setUserList(users);
      });
    }
  }, [socket]);

  useEffect(() => {
    if (socket) {
      socket.on("chat message", (room, user, message) => {
        socket.on("join users", (users) => {
          setUserList(users);
        });
        dispatch({
          type: "ADD_CHAT_MESSAGE",
          message: { room, user, message, time: new Date() },
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
      socket.emit("chat message", room, user, message);
      setMessage("");
      dispatch({
        type: "ADD_CHAT_MESSAGE",
        message: { user, message, room, time: new Date() },
      });
    }
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "#000",
        }}
      >
        <Image style={{ width: 70, height: 70 }} source={image} />
        <Text
          style={{
            fontSize: 20,
            fontWeight: "300",
            color: "white",
            paddingHorizontal: 20,
          }}
        >
          {name}
        </Text>
      </View>
      {userList ? (
        <View style={{ flexDirection: "row", backgroundColor: "skyblue" }}>
          {userList.map((item, index) => (
            <Text key={index} style={{ margin: 10, color: "#000" }}>
              {item.user}
            </Text>
          ))}
        </View>
      ) : (
        <Text style={{ margin: 10, color: "#000" }}>{user}</Text>
      )}
      <FlatList
        ref={scrollViewRef}
        onContentSizeChange={() =>
          scrollViewRef.current.scrollToEnd({ animated: false })
        }
        // top scroll page nation
        // onScroll={(e) => {
        //   if (e.nativeEvent.contentOffset.y === 0) {
        //     pageLoad ? console.log("true") : console.log("false");

        //   }
        // }}
        scrollToOverflowEnabled={true}
        data={chatMessages}
        renderItem={({ item }) =>
          room === item.room ? (
            <View
              style={{
                alignItems: item.user === user ? "flex-end" : "flex-start",
              }}
            >
              <View
                style={{
                  borderRadius: 10,
                  margin: 5,
                  backgroundColor: item.user === user ? "yellow" : "#eee",
                }}
              >
                <Text
                  style={{
                    padding: 10,
                    fontSize: 14,
                    fontWeight: "300",
                    color: item.user === user ? "#000" : "#000",
                  }}
                >
                  {item.message}
                </Text>
              </View>
              <View
                style={{
                  alignItems: item.user === user ? "flex-end" : "flex-start",
                }}
              >
                <Text
                  style={{
                    paddingHorizontal: 10,
                    fontSize: 10,
                    fontWeight: "300",
                    color: "#000",
                  }}
                >
                  {item.user}
                </Text>
                <Text
                  style={{
                    paddingHorizontal: 10,
                    fontSize: 10,
                    fontWeight: "300",
                    color: "#000",
                  }}
                >
                  {new Date(item.time).toLocaleTimeString()}
                </Text>
              </View>
            </View>
          ) : null
        }
        keyExtractor={(item, index) => index}
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

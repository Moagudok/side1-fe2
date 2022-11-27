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
import axios from "axios";

export default function Chat({ navigation, route }) {
  const { name, image, room, user, userName, seller } = route.params;
  const [message, setMessage] = useState("");
  const socket = useSelector((state) => state.socket);
  const chatMessages = useSelector((state) => state.chatMessages);
  const inputRef = useRef();
  const chatDataIp = `http://localhost:8008/chatList/?room=${room}`;
  const chatSocketIp = `http://localhost:8008/chat`
  const scrollViewRef = useRef();
  const dispatch = useDispatch();

  const chatdataGet = async () => {
    try {
      const res = await axios.get(chatDataIp);
      dispatch({ type: "RESET_CHAT_MESSAGE", list: res.data });
    } catch (e) {
      console.log("chatdataGet error", e);
      console.log(e);
    }
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
  }, []);

  useEffect(() => {
    const socket = io(chatSocketIp);
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
      socket.on("chat message", (room, user, userName, message) => {
        socket.on("join users", (users) => {
          setUserList(users);
        });
        dispatch({
          type: "ADD_CHAT_MESSAGE",
          message: { room, user, message, userName, time: new Date() },
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
      socket.emit("chat message", room, user, userName, message, seller);
      setMessage("");
      dispatch({
        type: "ADD_CHAT_MESSAGE",
        message: { userName, user, message, room, time: new Date() },
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
          marginBottom: 10,
        }}
      >
        <Image style={{ width: 70, height: 70 }} source={{ uri : image }} />
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
                alignItems: item.userName === userName ? "flex-end" : "flex-start",
                marginBottom: 10,
              }}
            >
              <View
                style={{
                  borderRadius: 10,
                  backgroundColor: item.userName === userName ? "yellow" : "#eee",
                }}
              >
                <Text
                  style={{
                    padding: 10,
                    fontSize: 14,
                    fontWeight: "300",
                    color: item.userName === userName ? "#000" : "#000",
                  }}
                >
                  {item.message}
                </Text>
              </View>
              <View
                style={{
                  alignItems: item.userName === userName ? "flex-end" : "flex-start",
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
                  {item.userName}
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
    borderRadius: 10,
    marginBottom: 10,
  },
  messageContainer: {
    alignSelf: "flex-start",
    backgroundColor: "#eee",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
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

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { io } from "socket.io-client";

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
        dispatch({ type: "ADD_CHAT_MESSAGE", message: {
          msg: message,
          me: false,
        } });        
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
    dispatch({ type: "ADD_CHAT_MESSAGE", message: {
      msg: message,
      me: true,
    } });
  };
    

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        style={styles.chatContainer}
        contentContainerStyle={styles.chatContentContainer}
      >
        {chatMessages.map((message, index) => (
          message.me ? (
            <View key={index} style={styles.myMessageContainer}>
              <Text style={styles.myMessageText}>{message.msg}</Text>
            </View>
          ) : (
            <View key={index} style={styles.messageContainer}>
              <Text style={styles.messageText}>{message.msg}</Text>
            </View>
          )
        ))}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={message}
          onChangeText={
            (text) => setMessage(text)
          }
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendButtonText}>입력</Text>
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
  sendButton: {
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
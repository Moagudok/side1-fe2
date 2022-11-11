import { useDispatch } from "react-redux";
import { TouchableOpacity, Text } from "react-native";

export const Logout = () => {
  const dispatch = useDispatch();
  const logout = () => {
    dispatch({ type: "LOGOUT" });
  };
  return (
    <TouchableOpacity onPress={logout}>
      <Text>로그아웃</Text>
    </TouchableOpacity>
  );
};

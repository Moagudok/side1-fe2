import { refresh } from "../refresh";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const getRefreshToken = async () => {
    try {
        const refreshToken = await AsyncStorage.getItem("refresh");
        const access = await refresh(refreshToken);
        if (access) {
            return true;
        } else {
            return false;
        }
    } catch (e) {
        return false;
    }
};
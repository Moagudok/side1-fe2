import axios from "axios"
import { backendServer } from "../theme"
import { refresh } from "../refresh"
import AsyncStorage from "@react-native-async-storage/async-storage"

export const UserInfo = async () => {
    const refreshToken = await AsyncStorage.getItem("refresh")
    const accessToken = await refresh(refreshToken)
    console.log("유저인포", accessToken)
    const auth = {headers: {Authorization: `Bearer ${accessToken}`,}}
    try {
        const res = await axios.get(backendServer.user, auth)
        return await res.data
    } catch (e) {
        console.log(e.response)
        return false
    }

}
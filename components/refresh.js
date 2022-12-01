import { backendServer } from "./theme";
import axios from "axios";

export const refresh = async (refresh) => {
    const refreshToken = {
        refresh: refresh,
    }
    try {
        const res = await axios.post(backendServer.refreshTokenApi, refreshToken);
        return res.data.access;
    } catch (e) {
        //retry
        console.log("refresh error", e.config.status);
    }
}

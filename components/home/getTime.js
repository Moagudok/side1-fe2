import moment from "moment-timezone";

export const getCurrentTime = () => {
    const nowTime = moment().tz("Asia/Seoul");
    const nextTime = moment().tz("Asia/Seoul").add(30, "days");
    return { nowTime, nextTime };
};
const koreaTimeNow = new Date().toLocaleString("ko-KR", { timeZone: "Asia/Seoul" });
const koreaTime1month = new Date(new Date().setMonth(new Date().getMonth() + 1)).toLocaleString("ko-KR", { timeZone: "Asia/Seoul" });

//2022-01-01
const koreaTimeNow1 = new Date().toLocaleString("ko-KR", { timeZone: "Asia/Seoul" }).split(' ')[0];
console.log(koreaTimeNow1);

//2022-01-01
const koreaTime1month1 = new Date(new Date().setMonth(new Date().getMonth() + 1)).toLocaleString("ko-KR", { timeZone: "Asia/Seoul" }).split(' ')[0];
console.log(koreaTime1month1);

//2022-01-01 00:00:00
const koreaTimeNow2 = new Date().toLocaleString("ko-KR", { timeZone: "Asia/Seoul" });
console.log(koreaTimeNow2);

//2022-01-01 00:00:00
const koreaTime1month2 = new Date().toISOString({ timeZone: "Asia/Seoul" });
console.log(koreaTime1month2);
import React from "react";
import { useSelector } from "react-redux";
/* 아임포트 결제모듈을 불러옵니다. */
import IMP from "iamport-react-native";

/* 로딩 컴포넌트를 불러옵니다. */
import Loading from "./Loading";
export function KaKaoPay({ navigation, route }) {
  /* [필수입력] 결제 종료 후, 라우터를 변경하고 결과를 전달합니다. */
  function callback(response) {
    navigation.replace("PaymentResult", response);
  }

  const paymentData = useSelector((state) => state.paymentData);
  const userInfo = useSelector((state) => state.userInfo);

  const paySelect = route.params.payValue;

  /* [필수입력] 결제에 필요한 데이터를 입력합니다. */
  const data = {
    // pg: 'kakaopay', // PG사
    pg: paySelect,// PG사
    pay_method: "card",
    name: paymentData.name, // 주문명
    merchant_uid: `mid_${new Date().getTime()}`,
    amount: paymentData.price, // 결제금액
    buyer_name: userInfo.name, // 구매자 이름
    buyer_tel: "010-1234-1234", // 구매자 전화번호
    buyer_email: userInfo.email,
    buyer_addr: userInfo.address,
    app_scheme: "example",
    // [Deprecated v1.0.3]: m_redirect_url
  };

  return (
    <IMP.Payment
      userCode={"imp34388066"} // 가맹점 식별코드
      //   tierCode={'AAA'}      // 티어 코드: agency 기능 사용자에 한함
      loading={<Loading />} // 로딩 컴포넌트
      data={data} // 결제 데이터
      callback={callback} // 결제 종료 후 콜백
    />
  );
}

export default KaKaoPay;

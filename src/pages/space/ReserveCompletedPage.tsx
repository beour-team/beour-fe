// 예약 - 예약 신청 완료 페이지
import { useLocation, useNavigate } from "react-router-dom";
import { formatTimeRanges } from "../../utils/format-time-range";
import { call, checkedBox, how, money, place } from "../../assets/theme";
import { useState } from "react";
import { PATHS } from "../../routes/paths";
import { user } from "../../constants/dummy-data/dummy-user";
import PageHeader from "../../components/header/PageHeader";

const ReserveCompletePage = () => {
  const location = useLocation();
  const nav = useNavigate();
  const {
    selectedDate,
    selectedTime,
    useType,
    text,
    name,
    maxCapacity,
    contact,
    pricePerHour,
  } = location.state || {};

  // 혹시 date 객체로 안넘어올까봐
  const date = selectedDate ? new Date(selectedDate) : null;
  const [isAgreed, setIsAgreed] = useState(false);
  const hourCount = selectedTime?.length || 0;
  const totalPrice = pricePerHour * hourCount;

  const handleComplete = () => {
    nav(PATHS.GUEST.RESERVATIONS, {
      state: {
        reservationCompleteData: {
          selectedDate,
          selectedTime,
          useType,
          text,
          name,
          maxCapacity,
          contact,
          pricePerHour,
          totalPrice,
          user,
        },
      },
    });
  };

  return (
    <div>
      <div className="mx-[1.5rem]">
        <PageHeader children="공간예약" />
      </div>

      <div className="mx-[1.8rem] text-24-Bold leading-[3.5rem]">
        <div>
          {date ? (
            <>
              {selectedDate?.getFullYear()}년 {selectedDate?.getMonth() + 1}월{" "}
              {""}
              {selectedDate?.getDate()}일
            </>
          ) : (
            "날짜 선택 안됨"
          )}
        </div>
        <div>{formatTimeRanges(selectedTime)} 로 예약할게요</div>
      </div>

      <div className="mx-[1.5rem] my-[3rem]">
        <div className="flex items-center gap-2">
          <img src={place} alt="공간아이콘" />
          <p className="text-14-Medium text-[#313131]">{name}</p>
        </div>
        <div className="flex items-center my-[0.5rem] gap-2">
          <img src={how} alt="인원 수" />
          <p className="text-14-Medium text-[#313131]">{maxCapacity}명</p>
        </div>
        <div className="flex items-center gap-2">
          <img src={call} alt="연락처" />
          <div className="text-14-Medium text-[#313131] flex items-center gap-3">
            숙소 문의
            <a
              href="tel:01012345678"
              className="text-14-Medium text-cr-blue underline"
            >
              {contact}
            </a>
          </div>
        </div>
      </div>
      <div className="border-cr-100 border-[0.4rem]" />

      <div className="mx-[2rem] my-[3rem]">
        <p className="mb-[3rem] text-13-SemiBold">예약 정보</p>
        <div className="flex items-center gap-[2rem]">
          <p className="text-13-SemiBold text-cr-500">예약자</p>
          <div className="flex items-center gap-3">
            <p className="text-14-SemiBold">{user.nickname}</p>
            <p className="text-14-Medium">
              {user.name} {user.phone}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-[1rem] my-[2rem]">
          <p className="text-13-SemiBold text-cr-500">이용목적</p>
          <p className="text-14-SemiBold">
            {useType && useType.length > 0 ? useType.join(", ") : "선택 안됨"}
          </p>
        </div>
        <div className="flex items-start gap-[1rem]">
          <p className="text-13-SemiBold text-cr-500 flex-shrink-0 whitespace-nowrap leading-[2.2rem]">
            요청사항
          </p>
          <p className="text-14-Medium flex-1 leading-[2.2rem]">
            {text || "요청사항이 없습니다."}
          </p>
        </div>
      </div>
      <div className="border-cr-100 border-[0.4rem]" />

      <div className="mx-[2rem] my-[3rem]">
        <p className="mb-[3rem] text-13-SemiBold">가격 정보</p>

        <p className="text-13-Bold">1시간</p>
        <p className="text-13-SemiBold text-cr-700 my-[1rem]">
          {pricePerHour}원 X {hourCount}시간
        </p>

        <div className="px-[1.5rem] flex items-center justify-between bg-cr-200 h-[5rem] rounded-[1rem] my-[1.5rem]">
          <p className="text-13-SemiBold">총 결제 금액</p>
          <p className="text-13-SemiBold">{totalPrice}원</p>
        </div>
        <div className="my-[1rem] flex items-center gap-3">
          <img src={money} alt="금액" />
          <p className="text-12-Regular text-cr-blue">
            결제 방법은 호스트가 연락으로 안내할거에요.
          </p>
        </div>
      </div>

      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 bg-white z-50 py-[1.5rem]">
        <div
          className="flex items-center  cursor-pointer"
          onClick={() => setIsAgreed(!isAgreed)}
        >
          <div
            className={`w-[2.4rem] h-[2.4rem] mr-[1rem] border-[1px] rounded-[0.5rem] flex items-center justify-center transition ${
              isAgreed ? "bg-black" : "bg-white border-cr-300"
            }`}
          >
            {isAgreed && <img src={checkedBox} />}
          </div>
          <span className="text-13-Medium">
            매장 주의사항/환불 정책을 확인했고 동의합니다.
          </span>
        </div>

        <div className="mt-[2rem]">
          <button
            onClick={handleComplete}
            disabled={!isAgreed}
            className={`text-cr-white text-16-Medium h-[5rem] w-[38.5rem] rounded-[1rem] ${
              isAgreed ? "bg-cr-black" : "bg-cr-400"
            }`}
          >
            예약하기
          </button>
        </div>
      </div>
    </div>
  );
};
export default ReserveCompletePage;

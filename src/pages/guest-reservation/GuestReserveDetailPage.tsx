// 게스트 예약 상세 페이지
import {
  call,
  chatWhite,
  how,
  money,
  moneyGray,
  place,
  rightArrow,
  warning,
} from "../../assets/theme";
import ReserveTag from "../../components/guest-result/ReserveTag";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { PATHS } from "../../routes/paths";
import PageHeader from "../../components/header/PageHeader";

const GuestReserveDetailPage = () => {
  const location = useLocation();
  const reservation = location.state?.reservation;
  const category = location.state?.category;
  const nav = useNavigate();

  return (
    <div>
      <div className="mx-[1.5rem]">
        <PageHeader children="예약 상세" />
      </div>

      <div className="mx-[1.8rem] mb-[2rem]">
        <ReserveTag status={reservation?.status} category={category} />
      </div>

      <div className="mx-[1.8rem] text-24-Bold leading-[3.5rem]">
        <div>
          {new Date(reservation.date).getFullYear()}년{" "}
          {new Date(reservation.date).getMonth() + 1}월{" "}
          {new Date(reservation.date).getDate()}일
        </div>
        <div>
          {reservation.startTime?.slice(0, 5)} -{" "}
          {reservation.endTime?.slice(0, 5)}
        </div>
      </div>

      <div className="mx-[1.5rem] text-24-Bold leading-[3.5rem]">
        <div className="my-[3rem]">
          <div className="flex justify-between">
            <div className="flex items-center gap-2">
              <img src={place} alt="공간아이콘" />
              <p className="text-14-Medium text-[#313131]">
                {reservation?.spaceName}
              </p>
            </div>

            <div
              onClick={() =>
                nav(`${PATHS.GUEST.MAP}/${reservation.reservationId}`)
              }
              className="text-12-Regular text-cr-600 underline mr-[1rem] flex items-center gap-3 cursor-pointer"
            >
              지도보기
              <img
                src={rightArrow}
                alt="오른쪽 화살표"
                className="w-[0.6rem]"
              />
            </div>
          </div>

          <div className="flex items-center my-[0.3rem] gap-2">
            <img src={how} alt="인원 수" />
            <p className="text-14-Medium text-[#313131]">
              {reservation?.guestCount}명
            </p>
          </div>

          <div className="flex items-center gap-2">
            <img src={call} alt="연락처" />
            <div className="text-14-Medium text-[#313131] flex items-center gap-3">
              숙소 문의
              <a
                href="tel:01012345678"
                className="text-14-Medium text-cr-blue underline"
              >
                010-1234-5678
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="border-cr-100 border-[0.4rem]" />

      <div className="mx-[2rem] my-[3rem]">
        <p className="mb-[3rem] text-13-SemiBold">예약 정보</p>
        {reservation && (
          <div className="flex items-center gap-[2rem]">
            <p className="text-13-SemiBold text-cr-500">예약자</p>
            <div className="flex items-center gap-3">
              <p className="text-14-SemiBold">{reservation.user.nickname}</p>
              <p className="text-14-Medium">
                {reservation.user.name} {reservation.user.phone}
              </p>
            </div>
          </div>
        )}

        <div className="flex items-center gap-[1rem] my-[2rem]">
          <p className="text-13-SemiBold text-cr-500">예약번호</p>
          <p className="text-14-SemiBold">{reservation?.reservationId}</p>
        </div>

        <div className="flex items-center gap-[1rem] my-[2rem]">
          <p className="text-13-SemiBold text-cr-500">이용목적</p>
          <p className="text-14-SemiBold">베이킹 연습</p>
        </div>

        <div className="flex items-start gap-[1rem]">
          <p className="text-13-SemiBold text-cr-500 flex-shrink-0 whitespace-nowrap leading-[2.2rem]">
            요청사항
          </p>
          <p className="text-14-Medium flex-1 leading-[2.2rem]">
            요청사항입니다.
          </p>
        </div>
      </div>
      <div className="border-cr-100 border-[0.4rem]" />

      <div className="mx-[2rem] mt-[3rem] pb-[9rem]">
        <p className="mb-[3rem] text-13-SemiBold">가격 정보</p>

        <p className="text-13-Bold">1시간</p>
        <p className="text-13-SemiBold text-cr-700 my-[1rem]">
          {reservation?.price}원 X 1시간
        </p>

        <div className="px-[1.5rem] flex items-center justify-between bg-cr-200 h-[5rem] rounded-[1rem] my-[1.5rem]">
          <p className="text-13-SemiBold">총 결제 금액</p>
          <p className="text-13-SemiBold">99000원</p>
        </div>

        {category === "past" || reservation?.status === "CONFIRMED" ? (
          <div className="my-[1rem] flex items-center gap-3">
            <img src={money} alt="금액" />
            <p className="text-12-Regular text-cr-blue">
              호스트 결제 확인 완료!
            </p>
          </div>
        ) : (
          <div className="my-[1rem] flex items-center gap-3">
            <img src={moneyGray} alt="금액" />
            <p className="text-12-Regular text-cr-500">호스트 결제 확인 전</p>
          </div>
        )}
      </div>

      <div className="fixed bottom-0 left-[51.5%] -translate-x-1/2 bg-white z-50 py-[1.5rem]">
        <div className="mt-[2rem]">
          {category === "past" || category === "cancel" ? (
            <button className="text-cr-white text-16-Medium h-[5rem] w-[38.4rem] rounded-[1rem] bg-cr-blue">
              <div
                className="flex items-center gap-4 justify-center"
                onClick={() =>
                  toast("채팅 기능은 준비 중이에요", {
                    icon: <img src={warning} alt="경고" />,
                    style: {
                      borderRadius: "10px",
                      background: "#2A2C32",
                      color: "#FFFFFF",
                      width: "35.4rem",
                      height: "4rem",
                      fontSize: "1.4rem",
                      marginBottom: "7rem",
                    },
                    duration: 1000,
                  })
                }
              >
                <img src={chatWhite} alt="채팅 문의" />
                <div>호스트 채팅 문의</div>
              </div>
            </button>
          ) : (
            <div className="flex items-center justify-center gap-5">
              <button className="text-cr-white text-16-Medium h-[5rem] w-[19rem] rounded-[1rem] bg-cr-600">
                예약 취소하기
              </button>
              <button className="text-cr-white text-16-Medium h-[5rem] w-[19rem] rounded-[1rem] bg-cr-blue">
                <div
                  className="flex items-center gap-4 justify-center"
                  onClick={() =>
                    toast("채팅 기능은 준비 중이에요", {
                      icon: <img src={warning} alt="경고" />,
                      style: {
                        borderRadius: "10px",
                        background: "#2A2C32",
                        color: "#FFFFFF",
                        width: "35.4rem",
                        height: "4rem",
                        fontSize: "1.4rem",
                        marginBottom: "7rem",
                      },
                      duration: 1000,
                    })
                  }
                >
                  <img src={chatWhite} alt="채팅 문의" />
                  <div>호스트 채팅 문의</div>
                </div>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default GuestReserveDetailPage;

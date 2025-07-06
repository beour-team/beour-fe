import { useEffect, useState } from "react";
import GuestFooter from "../../components/GuestFooter";
import ReserveToggle from "./ReserveToggle";
import CurrentReservations from "./CurrentResrvations";
import PastReservations from "./PastReservations";
import CanceledReservations from "./CanceledReservations";
import { bluecheck, grayArea, notification } from "../../assets/theme";
import { useLocation, useNavigate } from "react-router-dom";
import { formatTimeRanges } from "../../utils/format-time-range";
import type { ReservationCompleteData } from "../../types/reserve-complete-data";

type ReservationCategory = "current" | "past" | "cancel";

const GuestReservePage = () => {
  const [selectedCategory, setSelectedCategory] =
    useState<ReservationCategory>("current");
  const nav = useNavigate();
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reservationCompleteData, setReservationCompleteData] =
    useState<ReservationCompleteData | null>(null);
  const days = ["일", "월", "화", "수", "목", "금", "토"];
  const date = reservationCompleteData?.selectedDate
    ? new Date(reservationCompleteData.selectedDate)
    : null;
  const dayName = date ? days[date.getDay()] : "";

  useEffect(() => {
    if (location.state?.reservationCompleteData) {
      setReservationCompleteData(location.state.reservationCompleteData);
      setIsModalOpen(true);
      nav(location.pathname, { replace: true, state: {} }); // 초기화
    }
  }, [location.state, location.pathname, nav]);

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center ml-[2rem] mr-[2.1rem] mt-[3.9rem] mb-[3rem]">
        <div className="text-18-Bold">나의 예약</div>
        <img
          src={notification}
          alt="알림"
          className="w-[1.99rem] object-contain cursor-pointer"
        />
      </div>

      <div className="flex justify-center mb-[2rem]">
        <ReserveToggle
          selected={selectedCategory}
          setSelected={setSelectedCategory}
        />
      </div>
      <div className="pb-[7rem]">
        {selectedCategory === "current" && <CurrentReservations />}
        {selectedCategory === "past" && <PastReservations />}
        {selectedCategory === "cancel" && <CanceledReservations />}
      </div>

      {/* 예약 완료 시 모달 */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-[1.2rem] w-[30.5rem]">
            <div className="flex items-center gap-[1rem] my-[2.3rem] px-[2rem]">
              <img src={bluecheck} alt="완료" className="w-[2rem]" />
              <div className="text-18-SemiBold">예약이 신청되었어요!</div>
            </div>

            <div className="flex items-center px-[1.7rem] gap-3 my-[0.8rem]">
              <img src={grayArea} alt="위치" className="w-[2.6rem]" />
              <p className="text-14-Medium text-cr-700">
                {reservationCompleteData?.name}
              </p>
            </div>

            {reservationCompleteData && date && (
              <div className="mx-[2.3rem] text-13-SemiBold mb-[3rem]">
                {date?.getFullYear()}. {date?.getMonth() + 1}. {date?.getDate()}{" "}
                ({dayName}){" "}
                {formatTimeRanges(reservationCompleteData.selectedTime ?? [])}{" "}
                {reservationCompleteData?.maxCapacity}인
              </div>
            )}

            <p className="text-14-Medium text-cr-500 mx-[2.3rem]">
              호스트가 확인 후 연락 드릴거에요
            </p>
            <button
              onClick={handleModalClose}
              className="bg-cr-blue text-cr-white text-14-SemiBold w-[25.5rem] h-[4.4rem] rounded-[0.7rem] my-[2rem] mx-[2.3rem]"
            >
              확인
            </button>
          </div>
        </div>
      )}

      <div>
        <GuestFooter />
      </div>
    </div>
  );
};
export default GuestReservePage;

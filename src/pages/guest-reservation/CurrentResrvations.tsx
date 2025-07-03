import { rightArrow, space3 } from "../../assets/theme";
import ReserveTag from "../../components/guest-result/ReserveTag";
import { currentReservationData } from "../../constants/dummy-data/reserve-data";
import { formatReservationDateTime } from "../../utils/data-formatter";

const CurrentReservations = () => {
  return (
    <div>
      <div className="mx-[2rem] text-13-Medium text-cr-600 my-[2rem]">
        총 {currentReservationData.length}개
      </div>

      <div className="border border-[#ECECEC]"></div>

      <div>
        {currentReservationData.map((reservation, index) => (
          <div
            key={reservation.reservationId}
            className={`my-[1rem] py-[2rem] ${
              index !== currentReservationData.length
                ? "border-b-[0.2rem] border-[#ECECEC]"
                : ""
            }`}
          >
            <div className="mx-[2rem]">
              <div className="flex items-center gap-5 mb-[1.5rem]">
                <ReserveTag state={reservation.status} />
                <div className="text-[1.2rem]">
                  예약 번호 {reservation.reservationId}
                </div>
              </div>

              <div className="flex items-center gap-5">
                <img
                  src={space3}
                  alt="공간 사진"
                  className="w-[8.5rem] h-[8.5rem] rounded-[1.2rem]"
                />

                <div className="flex flex-col justify-between flex-1">
                  <div className="text-16-SemiBold">
                    {reservation.spaceName}
                  </div>

                  <div className="text-13-SemiBold py-[1rem]">
                    {formatReservationDateTime(
                      reservation.date,
                      reservation.startTime,
                      reservation.endTime
                    )}{" "}
                    {reservation.guestCount}인
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="rounded-[4.9rem] bg-cr-primary px-[1.3rem] py-[0.7rem]">
                      <span className="text-cr-blue text-13-Medium">
                        요리 연습
                      </span>
                    </div>

                    <div className="underline cursor-pointer text-cr-600 text-12-Medium flex gap-2">
                      예약 상세
                      <img
                        src={rightArrow}
                        alt="오른쪽 화살표"
                        className="w-[0.6rem]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default CurrentReservations;

import { useState } from "react";
import { rightArrow, leftArrow } from "../../assets/theme";
import ReserveTag from "../../components/guest-result/ReserveTag";
import ReviewButton from "./ReviewButton";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../../routes/paths";
import { formatReservationDateTime } from "../../utils/data-formatter";
import { usePastReservations } from "../../hooks/guest-reservation/usePastReservations";
import type { ReservationItem } from "../../types/guest-reservation/reservations";

//백엔드 api에 태그 필요
const PastReservations = () => {
  const [page, setPage] = useState(0);
  const { data, error } = usePastReservations(page);
  const nav = useNavigate();

  if (error)
    return (
      <div className="text-center text-14-Medium text-cr-600">
        예약이 존재하지 않습니다.
      </div>
    );

  const reservations = data?.reservations ?? [];
  const last = data?.last ?? true;

  const handlePrevPage = () => {
    if (page > 0) setPage((prev) => prev - 1);
  };

  const handleNextPage = () => {
    if (!last) setPage((prev) => prev + 1);
  };

  return (
    <div>
      <div className="mx-[2rem] text-13-Medium text-cr-600 my-[2rem]">
        총 {reservations.length}개
      </div>

      <div className="border border-[#ECECEC]"></div>

      <div>
        {reservations.map((reservation: ReservationItem, index: number) => (
          <div
            key={reservation.reservationId}
            className={`my-[1rem] py-[2rem] ${
              index !== reservations.length
                ? "border-b-[0.2rem] border-[#ECECEC]"
                : ""
            }`}
          >
            <div className="mx-[2rem]">
              <div className="flex items-center gap-5 mb-[1.5rem]">
                <ReserveTag category="past" />
                <div className="text-[1.2rem]">
                  예약 번호 {reservation.reservationId}
                </div>
              </div>

              <div className="flex items-center gap-5">
                <img
                  src={reservation.spaceThumbImageUrl}
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

                    <div
                      className="underline cursor-pointer text-cr-600 text-12-Medium flex gap-2"
                      onClick={() =>
                        nav(
                          `${PATHS.GUEST.RESERVATIONS}/${reservation.reservationId}`,
                          {
                            state: {
                              category: "past",
                            },
                          }
                        )
                      }
                    >
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
              <ReviewButton
                date={reservation.date}
                hasReview={reservation.reviewId !== 0}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-4 my-[1rem] text-16-Medium cursor-pointer">
        {page > 0 && (
          <img src={leftArrow} alt="이전" onClick={handlePrevPage} />
        )}
        {!last && <img src={rightArrow} alt="다음" onClick={handleNextPage} />}
      </div>
    </div>
  );
};
export default PastReservations;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { rightArrow } from "../../assets/theme";
import ReserveTag from "../../components/guest-result/ReserveTag";
// import { currentReservationData } from "../../constants/dummy-data/reserve-data";
import { formatReservationDateTime } from "../../utils/data-formatter";
import { PATHS } from "../../routes/paths";
import { useCurrentReservations } from "../../hooks/guest-reservation/useCurrentReservations";
import type { ReservationItem } from "../../types/guest-reservation/reservations";
// import { user } from "../../constants/dummy-data/dummy-user";
//404일때 화면 만들면 좋을듯 (데이터 없을때 -> 로딩용 컴포넌트)

const CurrentReservations = () => {
  const nav = useNavigate();
  const [page, setPage] = useState(0);

  const { data, isLoading, isError } = useCurrentReservations(page);

  if (isLoading) return <div>화면 로딩</div>;
  if (isError) return <div className="text-center">에러가 발생했습니다.</div>;
  if (!data) return null;

  const { reservations, totalPage, last } = data;

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
                <ReserveTag status={reservation.status} category="current" />
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
                      onClick={() =>
                        nav(
                          `${PATHS.GUEST.RESERVATIONS}/${reservation.reservationId}`,
                          {
                            state: {
                              category: "current",
                            },
                          }
                        )
                      }
                      className="underline cursor-pointer text-cr-600 text-12-Medium flex gap-2"
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
            </div>
          </div>
        ))}
      </div>

      {/* Pagination 버튼 */}
      <div className="flex justify-center gap-2 mt-[2rem] mb-[5rem]">
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 0))}
          disabled={page === 0}
          className="text-14-Medium text-cr-600"
        >
          이전
        </button>
        <span className="text-14-Medium text-cr-500">
          {page + 1} / {totalPage}
        </span>
        <button
          onClick={() => setPage((p) => (last ? p : p + 1))}
          disabled={last}
          className="text-14-Medium text-cr-600"
        >
          다음
        </button>
      </div>
    </div>
  );
};
export default CurrentReservations;

import { clock, person, rightArrow } from "../../assets/theme";

const ReservationCard = ({
  name,
  place,
  time,
  people,
  reserveId,
  initialStatus,
}) => {
  return (
    <div className="rounded-[12px] p-6 w-full space-y-5 bg-white text-black">
      {/* 1. 이름 + 상태 버튼 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-20-SemiBold text-cr-black dark:text-black">
            {name}
          </span>
          <div className="text-12-Regular px-2 py-1 rounded-[5px] bg-cr-blue text-white">
            예약 확정
          </div>
          <span className="text-10-Regular text-cr-500">
            예약번호 {reserveId}
          </span>
        </div>
      </div>

      {/* 2. 위치 */}
      <div className="text-13-Medium text-cr-700">{place}</div>

      {/* 3. 시간 + 인원 + > */}
      <div className="flex items-center justify-between text-14-SemiBold text-cr-600">
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-1">
            <img src={clock} alt="" />
            <span className="text-cr-black">{time}</span>
          </div>
          <span className="text-cr-400">|</span>
          <div className="flex items-center gap-1">
            <img src={person} alt="" />
            <span className="text-cr-black">{people}인</span>
          </div>
        </div>
        <img src={rightArrow} alt="" />
      </div>
    </div>
  );
};

export default ReservationCard;

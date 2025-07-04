import React, { useState } from "react";
import { clsx } from "clsx";
import { clock, person, rightArrow } from "../../assets/theme";

const statusMap = {
  pending: {
    label: "승인 대기",
    labelColor: "bg-cr-300 text-cr-600",
    bg: "bg-white text-black",
    actions: [
      { text: "승인 거부", color: "bg-cr-500 text-white" },
      { text: "예약 승인", color: "bg-cr-blue text-white" },
    ],
  },
  confirmed: {
    label: "예약 확정",
    labelColor: "bg-cr-blue text-white",
    bg: "bg-white text-black",
    actions: [
      { text: "예약 취소", color: "bg-cr-red text-white" },
      { text: "승인 완료", color: "bg-cr-200 text-cr-500", disabled: true },
    ],
  },
  cancelled: {
    label: "승인 취소",
    labelColor: "bg-cr-red30 text-cr-red",
    bg: "bg-white text-black",
    actions: [
      { text: "예약 내역 삭제", color: "bg-cr-500 text-white" },
      { text: "예약 재승인", color: "bg-cr-blue text-white" },
    ],
  },
};

const HostReservationCard = ({
  name,
  place,
  time,
  people,
  reserveId,
  initialStatus = "pending", // 초기 상태
  onDelete = () => {}, // 예약 내역 삭제 콜백
}) => {
  // 상태를 useState로 관리
  const [status, setStatus] = useState(initialStatus);

  const statusData = statusMap[status];

  // 버튼 클릭 로직
  const handleAction = (actionText) => {
    if (status === "pending") {
      if (actionText === "승인 거부") setStatus("cancelled");
      if (actionText === "예약 승인") setStatus("confirmed");
    }
    if (status === "confirmed") {
      if (actionText === "예약 취소") setStatus("cancelled");
    }
    if (status === "cancelled") {
      if (actionText === "예약 내역 삭제") onDelete();
      if (actionText === "예약 재승인") setStatus("confirmed");
    }
    // 예약 내역 삭제, 승인 완료 등은 상태 변화 없음
  };

  return (
    <div className={clsx("rounded-[12px] p-6 w-full space-y-5", statusData.bg)}>
      {/* 상단: 이름 + 상태 + 예약번호 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-20-SemiBold text-cr-black dark:text-black">
            {name}
          </span>
          <div
            className={clsx(
              "text-12-Regular px-2 py-1 rounded-[5px]",
              statusData.labelColor
            )}
          >
            {statusData.label}
          </div>
          <span className="text-10-Regular text-cr-500">
            예약번호 {reserveId}
          </span>
        </div>
      </div>

      {/* 장소 */}
      <div className="text-13-Medium text-cr-700">{place}</div>

      {/* 시간 + 인원 */}
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

      {/* 하단 버튼 */}
      <div className="grid grid-cols-2 gap-2 pt-2">
        {statusData.actions.map((action, idx) => (
          <button
            key={idx}
            className={clsx(
              "h-[44px] rounded-xl text-14-SemiBold",
              action.color,
              action.disabled && "opacity-50 cursor-not-allowed"
            )}
            disabled={action.disabled}
            onClick={() => {
              if (!action.disabled) handleAction(action.text);
            }}
          >
            {action.text}
          </button>
        ))}
      </div>
    </div>
  );
};

export default HostReservationCard;

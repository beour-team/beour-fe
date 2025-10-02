import { useState } from "react";
import { clsx } from "clsx";
import { clock, person, rightArrow } from "../../assets/theme";
import type { HostReservationCardProps } from "../../types/HostReservationCardProps";

type Status = "pending" | "confirmed" | "cancelled";

type Action = {
  text: string;
  color: string;
  disabled: boolean;
};

type StatusMap = {
  [key in Status]: {
    label: string;
    labelColor: string;
    actions: Action[];
  };
};

const statusMap: StatusMap = {
  pending: {
    label: "승인 대기",
    labelColor: "bg-cr-300 text-cr-600",
    actions: [
      { text: "승인 거부", color: "bg-cr-500 text-white", disabled: false },
      { text: "예약 승인", color: "bg-cr-blue text-white", disabled: false },
    ],
  },
  confirmed: {
    label: "예약 확정",
    labelColor: "bg-cr-blue text-white",
    actions: [
      { text: "예약 취소", color: "bg-cr-red text-white", disabled: false },
      { text: "승인 완료", color: "bg-cr-200 text-cr-500", disabled: true },
    ],
  },
  cancelled: {
    label: "승인 취소",
    labelColor: "bg-cr-red30 text-cr-red",
    actions: [
      {
        text: "예약 내역 삭제",
        color: "bg-cr-500 text-white",
        disabled: false,
      },
      { text: "예약 재승인", color: "bg-cr-blue text-white", disabled: false },
    ],
  },
};

const HostReservationCard = ({
  name,
  place,
  time,
  people,
  reserveId,
  initialStatus = "pending",
  onDelete = () => {},
}: HostReservationCardProps) => {
  // 상태를 useState로 관리
  const [status, setStatus] = useState(initialStatus);

  const statusData = statusMap[status];

  // 버튼 클릭 로직
  const handleAction = (actionText: string) => {
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
  };

  return (
    <div
      className={clsx(
        "rounded-[12px] p-6 w-full space-y-5 bg-white text-black"
      )}
    >
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

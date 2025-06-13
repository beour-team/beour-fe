// 예약 확정, 승인 대기 등의 태그 (기본값 : 예약 확정)
// 사용 완료, 예약 취소는 status 존재 하지 않음

interface ReserveTagProps {
  bgColor?: string;
  textColor?: string;
  state?: string;
}

const ReserveTag = ({ bgColor, textColor, state }: ReserveTagProps) => {
  let displayText = state;
  let bgClass = bgColor || "bg-cr-primary";
  let textClass = textColor || "text-cr-blue";

  if (state === "CONFIRMED") {
    displayText = "예약 확정";
    bgClass = "bg-cr-primary";
    textClass = "text-cr-blue";
  } else if (state === "PENDING") {
    displayText = "승인 대기";
    bgClass = "bg-cr-300";
    textClass = "text-cr-500";
  }

  return (
    <div className={`${bgClass} px-2 py-[0.3rem] rounded-[0.5rem]`}>
      <span className={`text-12-Medium ${textClass}`}>{displayText}</span>
    </div>
  );
};

export default ReserveTag;

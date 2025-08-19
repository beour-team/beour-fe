// 예약 확정, 승인 대기 등의 태그 (기본값 : 예약 확정)

interface ReserveTagProps {
  bgColor?: string;
  textColor?: string;
  status?: string;
  category: "current" | "past" | "cancel";
}

const ReserveTag = ({
  bgColor,
  textColor,
  status,
  category,
}: ReserveTagProps) => {
  let displayText = status;

  if (category === "current") {
    if (status === "ACCEPTED") {
      displayText = "예약 확정";
      bgColor = "bg-cr-primary";
      textColor = "text-cr-blue";
    } else if (status === "PENDING") {
      displayText = "승인 대기";
      bgColor = "bg-cr-300";
      textColor = "text-cr-500";
    }
  } else if (category === "past") {
    displayText = "사용 완료";
    bgColor = "bg-cr-900";
    textColor = "text-cr-100";
  } else if (category === "cancel") {
    displayText = "예약 취소";
    bgColor = "bg-cr-red30";
    textColor = "text-cr-red";
  }

  return (
    <div
      className={`${bgColor} px-1 py-[0.4rem] w-[5.8rem] h-[2.2rem] rounded-[0.5rem]`}
    >
      <span className={`text-14-Medium ${textColor}`}>{displayText}</span>
    </div>
  );
};

export default ReserveTag;

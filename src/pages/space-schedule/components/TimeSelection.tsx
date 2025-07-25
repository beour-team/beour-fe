import React, { useRef } from "react";

interface TimeSelectionProps {
  selectedTime: string[];
  onTimeSelect: (time: string[]) => void;
}

const TimeSelection: React.FC<TimeSelectionProps> = ({
  selectedTime,
  onTimeSelect,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  // 시간 목록
  const hours = [
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00",
    "22:00",
  ];

  // 비활성화된 시간들
  const disabledTime = ["12:00", "13:00", "19:00"];

  const handleTimeClick = (hour: string) => {
    const isSelected = selectedTime.includes(hour);
    if (isSelected) {
      onTimeSelect(selectedTime.filter((t) => t !== hour));
    } else {
      onTimeSelect([...selectedTime, hour]);
    }
  };

  return (
    <div className="my-[3rem]">
      <p className="text-14-SemiBold my-[1rem]">대여 시간을 선택해주세요</p>
      <div className="overflow-x-auto max-w-full mt-[3rem]">
        <div
          ref={scrollRef}
          className="flex gap-[0.5rem] mb-2 whitespace-nowrap overflow-x-auto scrollbar-hide"
        >
          {hours.map((hour) => {
            const isDisabled = disabledTime.includes(hour);
            const isSelected = selectedTime.includes(hour);

            return (
              <div key={hour} className="flex flex-col items-center">
                <button
                  onClick={() => {
                    if (!isDisabled) {
                      handleTimeClick(hour);
                    }
                  }}
                  disabled={isDisabled}
                  className={`w-[6.7rem] h-[5.4rem] rounded-md text-12-Regular ${
                    isDisabled
                      ? "bg-cr-300 text-cr-500 cursor-not-allowed"
                      : isSelected
                      ? "bg-cr-blue text-white"
                      : "bg-cr-400"
                  }`}
                >
                  {hour}
                </button>
                <span className="mt-[1rem] text-12-Regular text-cr-700">
                  {isDisabled ? "대여불가" : "30,000"}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TimeSelection;

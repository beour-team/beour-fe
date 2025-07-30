import React from "react";
import checkBox from "../../../assets/img/checkBox.svg";
import checkedBox from "../../../assets/img/checkedBox.svg";

interface HolidayCheckboxProps {
  isHoliday: boolean;
  onToggle: () => void;
}

const HolidayCheckbox: React.FC<HolidayCheckboxProps> = ({
  isHoliday,
  onToggle,
}) => {
  return (
    <div className="flex items-center gap-[1rem] my-[1.6rem]">
      <button
        onClick={onToggle}
        className="w-[2.4rem] h-[2.4rem] flex items-center justify-center"
      >
        <img
          src={isHoliday ? checkedBox : checkBox}
          alt={isHoliday ? "체크됨" : "체크 안됨"}
          className="w-full h-full"
        />
      </button>
      <label
        onClick={onToggle}
        className="text-16-Medium text-cr-black cursor-pointer"
      >
        선택 일자 휴무일 설정하기
      </label>
    </div>
  );
};

export default HolidayCheckbox;

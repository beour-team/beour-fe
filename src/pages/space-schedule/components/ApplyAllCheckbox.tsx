import React from "react";
import checkBox from "../../../assets/img/checkBox.svg";
import checkedBox from "../../../assets/img/checkedBox.svg";

interface ApplyAllCheckboxProps {
  applyToAll: boolean;
  onToggle: () => void;
}

const ApplyAllCheckbox: React.FC<ApplyAllCheckboxProps> = ({
  applyToAll,
  onToggle,
}) => {
  return (
    <div className="flex items-center gap-[1rem] my-[1.6rem]">
      <button
        onClick={onToggle}
        className="w-[2.4rem] h-[2.4rem] flex items-center justify-center"
      >
        <img
          src={applyToAll ? checkedBox : checkBox}
          alt={applyToAll ? "체크됨" : "체크 안됨"}
          className="w-full h-full"
        />
      </button>
      <label
        onClick={onToggle}
        className="text-13-Regular text-cr-black cursor-pointer"
      >
        모든 일자에 똑같이 적용하기
      </label>
    </div>
  );
};

export default ApplyAllCheckbox;

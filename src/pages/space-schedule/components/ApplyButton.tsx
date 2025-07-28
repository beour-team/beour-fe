import React from "react";

interface ApplyButtonProps {
  onApply: () => void;
}

const ApplyButton: React.FC<ApplyButtonProps> = ({ onApply }) => {
  return (
    <button
      onClick={onApply}
      className="w-full bg-cr-black text-cr-white py-[1.6rem] rounded-[1rem] text-16-SemiBold"
    >
      적용하기
    </button>
  );
};

export default ApplyButton;

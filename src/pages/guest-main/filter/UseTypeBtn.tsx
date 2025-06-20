import { useState } from "react";

interface UseTypeBtnProps {
  useType?: string[];
  setUseType?: React.Dispatch<React.SetStateAction<string[]>>;
}

const UseTypeBtn = ({ useType, setUseType }: UseTypeBtnProps) => {
  const internalState = useState<string[]>([]);
  const currentUseType = useType ?? internalState[0];
  const currentSetUseType = setUseType ?? internalState[1];

  const buttonLabels = [
    "단체 모임",
    "요리 연습",
    "바리스타 실습",
    "플리마켓",
    "촬영",
    "기타",
  ];
  // const [useType, setuseType] = useState<string[]>([]);
  const toggleSelection = (label: string) => {
    if (currentUseType.includes(label)) {
      currentSetUseType(currentUseType.filter((item) => item !== label));
    } else {
      currentSetUseType([...currentUseType, label]);
    }
  };

  return (
    <div className="flex items-center flex-wrap gap-4">
      {buttonLabels.map((label) => (
        <button
          key={label}
          onClick={() => toggleSelection(label)}
          className={`text-14-Medium px-7 py-[0.8rem] rounded-[1.4rem] ${
            currentUseType.includes(label)
              ? "bg-cr-blue text-white"
              : "bg-cr-100 text-cr-500"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
};

export default UseTypeBtn;
